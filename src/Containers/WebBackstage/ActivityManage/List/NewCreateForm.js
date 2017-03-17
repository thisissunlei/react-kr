
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
	CheckboxGroup,
} from 'kr-ui';
import './index.less';
import State from './State';
 class NewCreateForm extends Component{
	constructor(props){
		super(props);
		// this.state={
		// 	// 上传轮播图是否显示
		// 	rotateShow : true
		// }
	}
	componentWillMount() {
		
		let response = {
			top:'0',
		}
		Store.dispatch(initialize('NewCreateForm',response));
	}
	componentDidMount(){
		// 百度地图API功能
		var map = new BMap.Map("allmap");    // 创建Map实例
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);
	}
	
	// 存为草稿
	toSave=()=>{
		console.log("你点击存为草稿");
	}
	// 取消新建
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 提交
	onSubmit=(values)=>{
		console.log("values你点击了发布",values);
		Store.dispatch(Actions.callAPI('activityUploadpic',{},values)).then(function(response){
			State.openNewCreate = !State.openNewCreate;
			Steate.searchParams.timer = new Date();
		}).catch(function(err){
			reject(err);
		});
	}
	// 置顶
	chooseStick=()=>{
		State.isStick = true;
	}
	 // 不置顶
	noStick=()=>{
		State.isStick = false;
	}
	render(){
		const { handleSubmit} = this.props;
		
		
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
		}];
		let partakeMan =[{
			label: '开门',
			value: 1
		},{
			label: '开门／预定',
			value: 2
		},{
			label: '预定',
			value: 3
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
		console.log("State.isStick",State.isStick);
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

							<KrField grid={1/2} name="name" type="text" label="活动名称" requireLabel={true} style={{width:'252px'}} />
							<KrField name="type" 
								component="select" 
								options={correspondingFunction}
								label="活动类型"
								requireLabel={true} 
								 
								style={{width:'252px',marginLeft:24}}
							/>
							<KrField grid={1/2} name="countyId" type="text" label="举办地址" style={{width:'252px'}}/>
							<span style={{display:"inline-block",width:22,textAlign:"right",height:74,lineHeight:"83px"}}>-</span>
							<div style={{display:"inline-block",verticalAlign: "bottom"}}>
								<KrField grid={1/2} name="address" type="input" style={{width: 252,paddingLeft: 3,verticalAlign: "bottom",boxSizing: "border-box"}}/>
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
								
								label="上传列表详情图"
								inline={false}
							/>
							<KrField name="summary" 
								component="select" 
								options={partakeMan}
								label="富文本编辑框"
								style={{width:'252px'}}
							/>
							<div id="allmap"></div>
							
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

							<CheckboxGroup options={checkboxOptions} name="enroll"/>
							<Grid style={{marginTop:19,marginBottom:'80px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'166px',textAlign:'right',padding:0,paddingRight:15}}>
											<Button  label="发布" type='submit'/>
										</ListGroupItem>
										<ListGroupItem style={{width:'140px',textAlign:'center',padding:0}}>
											<Button  label="存为草稿" onTouchTap={this.toSave}/>
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
	
	if(values.top){
		
	}
	if(!values.name){
		errors.name = '请输入活动名称';
	}
	if(!values.type){
		errors.type = '请选择活动类型';
	}
	// 置顶时必需上传轮播图
	if(State.isStick){
		if(!values.coverPic){
			errors.coverPic = '上传轮播图';
		}
	}
	// if(!values.infoPic){
	// 	errors.infoPic = '请上传详情图';
	// }

	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
