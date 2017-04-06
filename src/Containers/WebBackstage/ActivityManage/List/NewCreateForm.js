import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	DateComponent,
	Editor
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
class NewCreateForm extends Component{
	constructor(props){
		super(props);
		this.state={
			// 上传轮播图是否显示
			// rotateShow : true
			beginDate:'',
			endDate:'',
			beginTime:'',
			endTime:''
		}
	}
	componentWillMount() {
		let response = {
			top:'0',
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	componentDidMount(){ }
	componentWillReceiveProps(){}
	// 取消新建
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 提交
	onSubmit=(values)=>{
		// 时间是否正确
		if(!State.timeIsTrue){
			Message.error('结束时间不能大于开始日期');
			return;
		}
		// 置顶时如果序列号重复不能提交
		if(values.top==0){
			if(State.serialNumRepeat){
				Message.error('排序号已经存在');
				return;
			}
		}
		values.publishType = this.publishType ;
		values.beginDate = values.startDate.substr(0,values.startDate.indexOf(" "))+" "+values.startTime+":00";
		values.endDate = values.stopDate.substr(0,values.stopDate.indexOf(" "))+" "+values.endTime+":00";
		if(values.top == 1){
			values.sort = '';
		}
		var EArr = [];
		if(State.choseName){
			EArr.push("NAME")
		}
		if(State.chosePhone){
			EArr.push("PHONE")
		}
		if(State.choseCompany){
			EArr.push("COMPANY")
		}
		if(State.chosePosition){
			EArr.push("POSITION")
		}
		if(State.choseAdd){
			EArr.push("ADDRESS")
		}
		if(values.mapField){
			values.xPoint = values.mapField.pointLng;
			values.yPoint = values.mapField.pointLat;
			values.address = values.mapField.detailSearch;
		}
		var searchParams = Object.assign({},State.searchParams);
		searchParams.time = +new Date();
		values.enroll = EArr;
		Http.request('newCreateActivity',{},values).then(function(response){
			State.openNewCreate = !State.openNewCreate;
			Message.success('操作成功');			
			State.searchParams = searchParams;
			Store.dispatch(reset('NewCreateForm'));
		}).catch(function(err){
			Message.error(err.message);
		});
	}
	//存为草稿
	toSave=()=>{
		this.publishType = 0;
	}
	// 发布
	toPublish=()=>{
		this.publishType = 1;
	}
	// 置顶
	chooseStick=()=>{
		State.isStick = true;
	}
	 // 不置顶
	noStick=()=>{
		State.isStick = false;
	}
	chooseCompany=(e)=>{
		if(e.target.checked){
			State.choseCompany = true;
		}else{
			State.choseCompany = false;
		}
	}
	choosePosition=(e)=>{
		if(e.target.checked){
			State.chosePosition = true;
		}else{
			State.chosePosition = false;
		}
	}
	chooseAdd=(e)=>{
		if(e.target.checked){
			State.choseAdd = true;
		}else{
			State.choseAdd = false;
		}
	}
	// 城市组件选到三级
	changeCity=(thirdId,secondId,city)=>{
		State.initailPoint = city.substr(city.lastIndexOf('/')+1);
		Store.dispatch(change('NewCreateForm', 'cityId', secondId));
		Store.dispatch(change('NewCreateForm', 'countyId', thirdId));
	}
	// 检验排序号是否重复
	NumRepeat=(value)=>{
		if(!value){
			State.serialNumRepeat = false;
		}else if(value && !/^[1-9]\d{0,4}$/.test(String(value))){
			return;
		}else{
			Http.request('getActivitySerialNumRepeat',{sort:value}).then(function(response){
				State.serialNumRepeat = false;
			}).catch(function(err){
				State.serialNumRepeat = true;
			});
		}
	}
	// 开始日期改变
	beginDateChange=(value)=>{
		let _this = this;
		var beginDate = new Date(value);
		beginDate = beginDate.getTime();
		_this.setState({
			beginDate:beginDate
		},function(){
			_this.compareTime();
		})
	}
	// 结束日期改变
	endDateChange=(value)=>{
		let _this =this;
		var endDate = new Date(value);
		endDate = endDate.getTime();
		_this.setState({
			endDate:endDate
		},function(){
			_this.compareTime();
		})
	}
	// 开始时间改变
	beginTimeChange=(value)=>{
		let _this =this;
		this.setState({
			beginTime:value
		},function(){
			_this.compareTime();
		})
	}
	// 结束时间改变
	endTimeChange=(value)=>{
		let _this =this;
		this.setState({
			endTime:value
		},function(){
			_this.compareTime();
		})
	}
	// 时间校验
	compareTime=()=>{
		let _this =this;
		if(_this.state.beginDate && _this.state.endDate){
			if(_this.state.endDate <_this.state.beginDate){
				State.timeIsTrue  = false;
				Message.error('结束时间不能大于开始日期');
			}else if(_this.state.endDate ==_this.state.beginDate){
				if(_this.state.beginTime && _this.state.endTime){
					var beginTime = _this.state.beginTime;
					var endTime = _this.state.endTime;
					var beginHour = beginTime.substr(0,2);
					var beginMin = beginTime.substr(3);
					var endHour = endTime.substr(0,2);
					var endMin = endTime.substr(3);
					if(endHour<beginHour){
						State.timeIsTrue  = false;
						Message.error('结束时间不能大于开始日期');
					}else if(endHour == beginHour){
						if(beginMin > endMin){
							State.timeIsTrue  = false;
							Message.error('结束时间不能大于开始日期');
						}
					}else{
						State.timeIsTrue  = true;
					}
				}else{
					State.timeIsTrue  = true;
				}
			}else{
				State.timeIsTrue  = true;
			}
		}else{
			State.timeIsTrue  = true;
		}
	}
	render(){
		const { handleSubmit} = this.props;
		// 对应功能选项
		let correspondingFunction =[{
			label: 'CEO Time',
			value: 'CEO_TIME'
		},{
			label: '公开氪',
			value: 'OPEN_KR'
		},{
			label: '社区福利',
			value: 'COMMUNITY_WELFARE'
		},{
			label: 'Open Day',
			value: 'OPEN_DAY'
		}];
		let partakeMan =[{
			label: '会员专属',
			value: 'MEMBER_ONLY'
		},{
			label: '会员优先',
			value: 'MEMBER_FIRST'
		},{
			label: '仅限氪空间项目',
			value: 'KR_PROJECT_ONLY'
		}];
		let checkboxOptions=[{
			label: '姓名',
			value: 1
		},{
			label: '电话',
			value: 2
		},{
			label: '公司名称',
			value: 3
		},{
			label: '职务',
			value: 4
		},{
			label: '地址',
			value: 5
		}]
		return (
			<div className="new-create-activity">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">新建活动</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
						<div className="activity-info">
							<div className="activity-title">
								<span>1</span>
								<span></span>
								<span>活动信息</span>
							</div>
							<div className="activity-detail-info">
								<img src={require('./images/selectOne.svg')} className="select-one"/>
								<KrField grid={1/2}
									name="name"
									type="text"
									label="活动名称"
									requireLabel={true}
									style={{width:252,zIndex:11}}
									/>
								<KrField name="type"
									component="select"
									options={correspondingFunction}
									label="活动类型"
									requireLabel={true}
									style={{width:'252px',marginLeft:24,zIndex:11}}
								/>
								<Grid >
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:262,padding:0}}>
												<KrField
													name="startDate"
													component="date"
													onChange={this.onStartChange}
													style={{width:170}}
													simple={true}
													requireLabel={true}
													label='活动时间'
													onChange = {this.beginDateChange}
												/>
												<KrField
													name="startTime"
													component="selectTime"
													style={{width:80,marginTop:14,zIndex:10}}
													onChange = {this.beginTimeChange}
													label=''/>
											</ListGroupItem>
											<ListGroupItem style={{marginTop:32,padding:0}}>至</ListGroupItem>
											<ListGroupItem style={{width:262,textAlign:'left',padding:"14px 0  0 0"}}>
												<KrField
													name="stopDate"
													component="date"
													style={{width:170}}
													simple={true}
													requireLabel={false}
													onChange = {this.endDateChange}
												/>
												<KrField
													name="endTime"
													component="selectTime"
													style={{width:80,zIndex:10}}
													onChange = {this.endTimeChange}
													label=''/>
											</ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
								<KrField grid={1/2} name="cityIdAndCountyId" requireLabel={true} component="city" label="举办地址" style={{width:'252px'}}  onSubmit={this.changeCity} />
								<span style={{display:"inline-block",width:22,textAlign:"right",height:74,lineHeight:"83px"}}>-</span>
								<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:12}}>
									<KrField name="mapField"
										component="mapnew"
										placeholder="例如：北京市海淀区中关村大街"
										style={{width:242,height:36}}
										mapStyle={{width:500,height:300}}
										initailPoint ={State.initailPoint}
									/>
								</div>
								<KrField grid={1/2} name="contact" type="text" label="活动联系人" style={{width:'252px'}}/>
								<KrField grid={1/2} name="contactPhone" type="text" label="活动联系人电话" style={{width:'252px',marginLeft:24}}/>
								<KrField name="joinType"
									component="select"
									options={partakeMan}
									label="参与人"
									style={{width:'252px'}}
								/>
								<KrField grid={1/2} name="maxPerson" type="text" label="人数限制" style={{width:'252px',marginLeft:24}}/>
								<KrField grid={1/2} name="top" component="group" label="是否置顶"  style={{width:'252px'}} >
									<KrField name="top" grid={1/2} label="置顶" type="radio" value='1' style={{marginRight:'50'}} onClick={this.chooseStick}/>
									<KrField name="top" grid={1/2} label="不置顶" type="radio" value='0' onClick={this.noStick}/>
				              	</KrField>
				              	{/*置顶不显示排序*/}
								<KrField name="sort" type="text" label="排序"  style={{display:State.isStick?"none":"inline-block",width:252,marginLeft:24}} onChange={this.NumRepeat}/>
								{State.serialNumRepeat && <div style={{display:State.isStick?"none":"inline-block",width:"64%",textAlign:"right",fontSize:14,color:"red",paddingLeft:26,paddingBottom:7}}>该排序号已存在</div>}
								<div style={{display:State.isStick?"block":"none",fontSize:14,marginBottom:10}}>
									<span style={{fontSize:14,color:"red",marginRight:8}}>*</span>
									<span>上传轮播图</span>
								</div>
								{/*置顶显示轮播图*/}
				              	<KrField name="pcCoverPic"
									component="newuploadImage"
									innerstyle={{width:524,height:159,padding:10}}
									photoSize={'1920*520'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'500'}
									requestURI = {State.requestURI}
									label="电脑端轮播图"
									inline={false}
									style={{display:State.isStick?"block":"none",marginBottom:9}}
								/>
								<KrField name="appCoverPic"
									component="newuploadImage"
									innerstyle={{width:217,height:157,padding:10}}
									photoSize={'750*520'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'300'}
									label="手机端轮播图"
									requestURI = {State.requestURI}
									inline={false}
									style={{display:State.isStick?"block":"none",marginBottom:9}}
								/>
								<KrField name="infoPic"
									component="newuploadImage"
									innerstyle={{width:392,height:230,padding:10}}
									photoSize={'650*365'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'200'}
									requestURI = {State.requestURI}
									requireLabel={true}
									label="上传列表详情图"
									inline={false}
								/>
							</div>
						</div>
						<div className="enroll-info">
							<div className="enroll-title">
								<span>2</span>
								<span></span>
								<span>报名信息</span>
							</div>
							<div className="enroll-detail-info">
								<img src={require('./images/selectOne.svg')} className="select-one"/>
								<KrField component="editor" name="summary" label="活动介绍" defaultValue=''/>
								<Grid style={{margin:"19px 0 30px 7px"}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{marginRight:48}}>
												<input type="checkbox"  style={{marginRight:10}} checked="checked" readOnly/>
												<span style={{fontSize:14,color:"#333333"}} >姓名</span>
											</ListGroupItem>
											<ListGroupItem style={{marginRight:48}}>
												<input type="checkbox"  style={{marginRight:10}} checked="checked" readOnly/>
												<span style={{fontSize:14,color:"#333333"}} >电话</span>
											</ListGroupItem>
											<ListGroupItem style={{marginRight:48}}>
												<input type="checkbox"  onChange={this.chooseCompany} style={{marginRight:10}}/>
												<span style={{fontSize:14,color:"#333333"}} >公司名称</span>
											</ListGroupItem>
											<ListGroupItem style={{marginRight:48}}>
												<input type="checkbox"  onChange={this.choosePosition} style={{marginRight:10}}/>
												<span style={{fontSize:14,color:"#333333"}} >职务</span>
											</ListGroupItem>
											<ListGroupItem style={{}}>
												<input type="checkbox"  onChange={this.chooseAdd} style={{marginRight:10}}/>
												<span style={{fontSize:14,color:"#333333"}} >地址</span>
											</ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
								<Grid style={{marginTop:19,marginBottom:'80px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:'166px',textAlign:'right',padding:0}}>
												<Button  label="发布" type='submit' onClick={this.toPublish}/>
											</ListGroupItem>
											<ListGroupItem style={{width:'140px',textAlign:'center',padding:0}}>
												<Button  label="存为草稿" type='submit' onClick={this.toSave}/>
											</ListGroupItem>
											<ListGroupItem style={{width:'166px',textAlign:'left',padding:0}}>
												<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
											</ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
							</div>
						</div>
					</div>

				</form>
		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}
	let phone = /(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/;
	let numContr =/^[1-9]\d{0,4}$/;
	if (values.contactPhone && !phone.test(values.contactPhone) ) {
      errors.contactPhone = '请输入正确电话号';
  	}
	if(values.top==1){
		if(!values.appCoverPic){
			errors.appCoverPic = "请上传手机端轮播图"
		}
		if(!values.pcCoverPic){
			errors.pcCoverPic = "请上传电脑端轮播图"
		}
	}
	if(!values.name){
		errors.name = '请输入活动名称';
	}else if(values.name){
		var nameNum = values.name.replace(/(^\s*)|(\s*$)/g, "");
		if(nameNum.length >30){
			errors.name = '活动名称最多输入30个字符';
		}
	}
	if(values.mapField){

		var mapFieldNum = values.mapField.detailSearch.replace(/(^\s*)|(\s*$)/g, "");
		if(mapFieldNum.length >30){
			errors.cityIdAndCountyId = '详细地址最多为30个字符';
		}
	}
	if(values.contact){
		var contactNum = values.contact.replace(/(^\s*)|(\s*$)/g, "");
		if(contactNum.length >10){
			errors.contact = '活动联系人最多为10个字符';
		}
	}
	if(values.sort){
		var sortNum = (values.sort+'').replace(/(^\s*)|(\s*$)/g, "");
		if(!numContr.test(sortNum)){
			errors.sort = '排序号必须为五位以内正整数';
		}
	}
	if(values.maxPerson){
		var personNum = (values.maxPerson+'').replace(/(^\s*)|(\s*$)/g, "");
		if(!numContr.test(personNum)){
			errors.maxPerson = '人数限制必须为五位以内正整数';
		}
	}
	if(!values.type){
		errors.type = '请选择活动类型';
	}
	if(!values.startDate || !values.startTime || !values.stopDate || !values.endTime ){
		errors.startDate = "请填写完整的活动时间";
	}
	if(!values.countyId){
		errors.cityIdAndCountyId = "请选择举办地址";
	}
	if(!values.infoPic){
		errors.infoPic = '请上传详情图';
	}
	if(values.mapField && !values.mapField.detailSearch){
		errors.cityIdAndCountyId = "请填写完整的举办地址";
	}
	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
