
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	Notify,
	DateComponent,
	Checkbox,
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
			
		}
		// Store.dispatch(reset('NewCreateForm'));
		
	}
	componentWillMount() {
		
		let response = {
			top:'0',
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	componentDidMount(){
	}
	
	
	// 取消新建
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 提交
	onSubmit=(values)=>{

		values.publishType = this.publishType ;

		values.beginDate = values.startDate.substr(0,values.startDate.indexOf(" "))+" "+values.startTime+":00";
		values.endDate = values.stopDate.substr(0,values.stopDate.indexOf(" "))+" "+values.endTime+":00";

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

		values.yPoint = values.mapField.pointLng;
		values.xPoint = values.mapField.pointLat;
		values.address = values.mapField.detailSearch;
		values.enroll = EArr;

		Store.dispatch(Actions.callAPI('newCreateActivity',{},values)).then(function(response){
			State.openNewCreate = !State.openNewCreate;
			State.timer = new Date();
		}).catch(function(err){
			
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
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

	// 复选框
	chooseName=(e)=>{
		if(e.target.checked){
			State.choseName = true;
		}else{
			State.choseName = false;
		}
	}
	choosePhone=(e)=>{
		if(e.target.checked){
			State.chosePhone = true;
		}else{
			State.chosePhone = false;
		}
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
		// console.log("thirdId,secondId,city",thirdId,secondId,city);
		State.initailPoint = city.substr(city.lastIndexOf('/')+1);
		// console.log("State.initailPoint",State.initailPoint);
		Store.dispatch(change('NewCreateForm', 'cityId', secondId));
		Store.dispatch(change('NewCreateForm', 'countyId', thirdId));

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
			label: '仅限会员',
			value: 'ONLY_MEMBER'
		},{
			label: '仅限受邀者',
			value: 'ONLY_INVITA'
		},{
			label: '无限制',
			value: 'ANYBODY'
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
			<form onSubmit={handleSubmit(this.onSubmit)} ref="newCreateForm">

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
								 
								style={{width:'252px',marginLeft:24,zIndex:1}}
							/>

							
							<Grid style={{marginTop:19}}>
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
											/>
											<KrField
												name="startTime"  
												component="selectTime" 
												// onChange={this.onStartChange} 
												style={{width:80,marginTop:14,zIndex:10}} 
												
												// requireLabel={true} 
												label=''/>
											
										</ListGroupItem>
										
										<ListGroupItem style={{width:262,textAlign:'left',padding:"14px 0  0 15px"}}>
											<KrField 
												name="stopDate"  
												component="date" 
												// onChange={this.onStartChange} 
												style={{width:170}} 
												simple={true} 
												requireLabel={false} 
												
											/>
											<KrField
												name="endTime"  
												component="selectTime" 
												
												style={{width:80,zIndex:10}} 
												
												
												label=''/>
										</ListGroupItem>
									</ListGroup>					
								</Row>
							</Grid>



							<KrField grid={1/2} name="cityIdAndCountyId" requireLabel={true} component="city" label="举办地址" style={{width:'252px'}}  onSubmit={this.changeCity} />
							<span style={{display:"inline-block",width:22,textAlign:"right",height:74,lineHeight:"83px"}}>-</span>
							<div style={{display:"inline-block",verticalAlign:"middle",marginLeft:12}}>
								<KrField name="mapField" 
									component="map" 
									placeholder="例如：北京市海淀区中关村大街"
									style={{width:242,height:36}}
									mapStyle={{width:400,height:400}}
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
							<KrField name="sort" type="text" label="排序"  style={{display:State.isStick?"none":"inline-block",width:252,marginLeft:24}}/>
							{/*置顶显示轮播图*/}
			              	<KrField name="coverPic" 
								component="newuploadImage" 
								innerstyle={{width:524,height:159,padding:10}} 
								photoSize={'1920*520'} 
								pictureFormat={'JPG,PNG,GIF'} 
								pictureMemory={'500'}
								requireLabel={true}
								label="上传轮播图"
								inline={false}
								style={{display:State.isStick?"block":"none"}}
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
							<KrField component="editor" name="summary" label="活动介绍"/>
							
							<Grid style={{marginTop:19,marginBottom:80}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{marginRight:48}}>
											
											<input type="checkbox"  onChange={this.chooseName}/> 
											<span style={{fontSize:14,color:"#333333"}} >姓名</span>
					
										</ListGroupItem>
										<ListGroupItem style={{marginRight:48}}>
											
											<input type="checkbox"  onChange={this.choosePhone}/> 
											<span style={{fontSize:14,color:"#333333"}} >电话</span>
										</ListGroupItem>

										<ListGroupItem style={{marginRight:48}}>
											<input type="checkbox"  onChange={this.chooseCompany}/> 
											<span style={{fontSize:14,color:"#333333"}} >公司名称</span>
	
										</ListGroupItem>
										<ListGroupItem style={{marginRight:48}}>
											<input type="checkbox"  onChange={this.choosePosition}/> 
											<span style={{fontSize:14,color:"#333333"}} >职务</span>

										</ListGroupItem>
										<ListGroupItem style={{}}>
											<input type="checkbox"  onChange={this.chooseAdd}/> 
											<span style={{fontSize:14,color:"#333333"}} >地址</span>

										</ListGroupItem>
										
									</ListGroup>					
								</Row>
							</Grid>


							
							<Grid style={{marginTop:19,marginBottom:'80px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'166px',textAlign:'right',padding:0,paddingRight:15}}>
											<Button  label="发布" type='submit' onClick={this.toPublish}/>
										</ListGroupItem>
										<ListGroupItem style={{width:'140px',textAlign:'center',padding:0}}>
											<Button  label="存为草稿" type='submit' onClick={this.toSave}/>
										</ListGroupItem>
										<ListGroupItem style={{width:'166px',textAlign:'left',padding:0,paddingLeft:15}}>
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
	// console.log("values校验",values);
	if(values.top){
		
	}
	if(!values.name){
		errors.name = '请输入活动名称';
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
	
	// 置顶时必需上传轮播图
	if(State.isStick){
		if(!values.coverPic){
			errors.coverPic = '上传轮播图';
		}
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
