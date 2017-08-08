
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {ShallowEqual} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
} from 'kr-ui';
import {Http} from 'kr/Utils';
import State from './State';
class EditEquipmentForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
			locationOpen:false,
			floorsOptions:[],
			locationOptions:[],
			confirmSubmit : false,
			doorNumHas:false,
			communityId :'',
			propertyOption :[{label:"",value:""}],
			propertyId :"",
			hardwareidHas : false,
			isOnlines:true,
			showTitle :'',
			hardwareId:'',
			typeId : '',
			startDeviceCode : '',
			startHardwareId : '',
			propertyId :  '',
			functionId :  '',
			locationId : '',
			id: '',
			initializeValues:{},
			// 初始值设置为没有点击新增并添加
			isNewAndAdd : false
		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
		}
	}
	getBasicData=(detail)=>{
		let _this = this;
		let SearchLocationParams = {communityId:detail.communityId,whereFloor:detail.floor,type:detail.propertyId}
		Http.request('getLocationByProperty',SearchLocationParams)
		.then(function(response){
			var locationArr = []
    		for (var i=0;i<response.length;i++){
    			locationArr[i] = {label:response[i].name,value:response[i].id}
    		}
    		_this.setState({
    			locationOptions : locationArr
    		})
		});
		Http.request('getFloorByComunity',{communityId:detail.communityId})
	    	.then(function(response){
	    		var arrNew = []
	    		for (var i=0;i<response.floors.length;i++){
	    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
	    		}
	    		_this.setState({
	    			floorsOptions : arrNew,
	    			floor : detail.floor,
	    			communityId : detail.communityId,
	    			propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}],
	    		})
	    	}).catch(function(err){
    	})

		_this.setState({
			id : detail.id,
		})

		if(detail.propertyId && detail.propertyId!==1  ){
			_this.setState({
				locationOpen : !_this.state.locationOpen
			})
		}
		Store.dispatch(initialize('EditEquipmentForm', detail));
	}
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		Store.dispatch(change('EditEquipmentForm', 'floor', ""));
  		Store.dispatch(change('EditEquipmentForm', 'propertyId', ""));
  		Store.dispatch(change('EditEquipmentForm', 'locationId', ""));
  		this.setState({
			locationOpen : false
		})
  		let _this = this;
  		if(community == null){
  			_this.setState({
  				locationOpen : false,
  				floorsOptions : []
  			})
  			Store.dispatch(change('EditEquipmentForm', 'propertyId', ""))
			return;
		}
		let CommunityId = {
			communityId : community.id
		}
		this.setState({
			communityId :community.id,
			locationOpen : false
		})
    	Store.dispatch(change('EditEquipmentForm', 'communityId', community.communityId));
    	this.getFloorByComunityFun(CommunityId);
  	}
  	// 根据社区Id获取楼层
  	getFloorByComunityFun=(CommunityId)=>{
  		let _this = this;
  		Http.request('getFloorByComunity',CommunityId)
    	.then(function(response){
    		var arrNew = []
    		for (var i=0;i<response.floors.length;i++){
    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
    		}
    		_this.setState({
    			floorsOptions : arrNew
    		})
    	}).catch(function(err){

    	})
  	}
  	
  	//选择属性(获取会议室／大门)
	onchooseProperty=(propertyId)=>{
		let _this = this;
		if(propertyId == null){
			_this.setState({
  				locationOpen : false,
  				propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}],

  			})
  			return;
		}
  		if(propertyId.value == 2 || propertyId.value == 3 || propertyId.value == 4 ||propertyId.value == 5){
  			_this.setState({
  				locationOpen : true,
  				propertyId : propertyId.value,
  				propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}],

  			})
  			let SearchLocationParams = {communityId:_this.state.communityId,whereFloor:_this.state.floor,type:propertyId.value}
  			Http.request('getLocationByProperty',SearchLocationParams).
			then(function(response){
				var locationArr = []
	    		for (var i=0;i<response.length;i++){
	    			locationArr[i] = {label:response[i].name,value:response[i].id}
	    		}
	    		_this.setState({
	    			locationOptions : locationArr
	    		})
			});
  		}else{
  			_this.setState({
  				locationOpen : false,
  				propertyId : propertyId.value,
  				propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}],

  			})
  		}
  		Store.dispatch(change('EditEquipmentForm','propertyId',propertyId.value));
  		Store.dispatch(change('EditEquipmentForm','locationId',""));

  	}

	// 选择对应位置
	onchooseCorrespondingLocation=(locationId)=>{
		if(locationId == null){
			return;
		}
		this.setState({
			locationId : locationId.value
		})
		Store.dispatch(change('EditEquipmentForm','locationId',locationId.value));
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			_this.setState({
				propertyOption :[{label: '',value: ''}],
				locationOpen :false,
			})
			Store.dispatch(change('EditEquipmentForm', 'propertyId', ""));
		}else{
			_this.setState({
				floor : floor.value,
				propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}]
			})
		}
	}
	onChangeTitle=(showTitle)=>{
		Store.dispatch(change('EditEquipmentForm','showTitle',showTitle));
		this.setState({
			showTitle : showTitle
		})
	}

	// 判断智能硬件ID是否存在
	hardwareIdHasFun=(hardwareId)=>{
		let _this = this;
		this.setState({
			hardwareidHasStatus:false,
			hardwareId :hardwareId
		})
		if(!hardwareId || /^\s+$/.test(hardwareId)){
			return;
		}
		let hardwareIdparams = {
			deviceId :hardwareId,
		}
		Http.request('getDeviceIDRepeat',hardwareIdparams)
		.then(function(response){
	 		_this.setState({
	 			hardwareidHasStatus : false,
	 			defaultChecked : true
	 		})
		}).catch(function(err){
	 		let {hardwareIdHas} = _this.props;
	 		hardwareIdHas && hardwareIdHas();
	 		_this.setState({
	 			hardwareidHasStatus: true,
	 			defaultChecked : true
	 		})
		});
	}

	// 编辑设备定义
	onSubmit=(values)=>{
		values.id = this.state.id;
		let _this = this;
		values.enable = this.state.isOnlines?"ONLINE":"OFFLINE";
		let EditParams = {
				communityId : values.communityId,
				deviceCode : values.deviceCode,
				enable : values.enable,
				floor : values.floor,
				functionId : values.functionId,
				hardwareId : values.hardwareId,
				id : values.id,
				locationId : values.locationId,
				propertyId : values.propertyId,
				showTitle : values.showTitle,
				typeId : values.typeId,
				makerId : values.makerId
			}
		// 此处判断智能硬件是否存在
		let hardwareIdParams  = {
			code :values.hardwareId,
			type :"hardwareid",
			id :values.id
		}
		Http.request('doorNumberAndHardwareId',hardwareIdParams).then(function(response){
			State.editSecondDoor(EditParams);
			State.openEditDialog = false;
		}).catch(function(err){
	 		Message.error(err.message);
		});

	}
	// 关闭编辑窗口
	closeEditEquipment =()=>{
		const {closeEditEquipment} = this.props;
		closeEditEquipment && closeEditEquipment();
	}
	render(){
		let {floorsOptions,propertyOption,propertyId,locationOptions,defaultChecked} =this.state;
		const { error,handleSubmit,pristine,reset,detail} = this.props;
		
		return(
			<div style={{padding:'35px 0 0 35px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="communityId"
						component="searchCommunityAll"
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"
						requireLabel={true}
						style={{width:252,margin:'0 35px 5px 0'}}
						inline={false}
					/>
					<KrField name="floor"
						component="select"
						label="楼层"
						options = {floorsOptions}
						requireLabel={true}
						style={{width:'252px'}}
						onChange = {this.getFloor}
					/>
					<KrField grid={1/2} name="showTitle"
						component = "input"
						ref = "showTitleInput"
						type="text"
						label="展示标题"
						requireLabel={true}
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					<KrField grid={1/2} name="deviceCode"
						component = "input"
						type="text"
						label="门编号"
						requireLabel={true}
						style={{width:'252px'}}
					/>
					<KrField grid={1/2} name="hardwareId"
						component = "input"
						type="text"
						label="智能硬件ID"
						requireLabel={true}
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.hardwareIdHasFun}
					/>
					
					<KrField name="propertyId"
						component="select"
						label="属性"
						onChange = {this.onchooseProperty}
						options={propertyOption}
						requireLabel={true}
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					
					<KrField name="locationId"
						component="select"
						options={locationOptions}
						label="对应位置"
						onChange = {this.onchooseCorrespondingLocation}
						style={{width:'252px',display:this.state.locationOpen?'block':'none'}}
					/>
					<KrField name="makerId" 
						component="select" 
						label="厂家" 
						options = {State.makerOptions}
						requireLabel={true}  
						errors={{requiredValue:'厂家为必填项'}} 
						style={{width:'252px'}}

					/>

					<Grid style={{marginTop:19,marginBottom:'4px'}}>
						<Row style={{textAlign:'center'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeEditEquipment} />
								</ListGroupItem>
							</ListGroup>
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	if(!values.communityId){
		errors.communityId = '社区名称为必填项';
	}
	if(!values.floor){
		errors.floor = '楼层为必填项,社区已选才有楼层配置';
	}
	if(!values.showTitle || /^\s+$/.test(values.showTitle)){
		errors.showTitle = '展示标题为必填项';
	}
	if(values.showTitle && values.showTitle.length>13){
		errors.showTitle = '展示标题最多13个字符';
	}
	if(!values.deviceCode || /^\s+$/.test(values.showTitle)){
		errors.deviceCode = '门编号为必填项';
	}
	if(values.deviceCode  && values.deviceCode.length>50){
		errors.deviceCode = '门编号最多50个字符';
	}
	if(!values.hardwareId || /^\s+$/.test(values.hardwareId)){
		errors.hardwareId = '智能硬件ID为必填项';
	}
	if(values.hardwareId && values.hardwareId.length>50){
		errors.hardwareId = '智能硬件ID最多50个字符';
	}
	if(!values.typeId){
		errors.typeId = '类型为必填项';
	}
	if(!values.propertyId){
		errors.propertyId = '属性为必填项';
	}
	// if(values.property == "meetingRoom" || values.property == "functionRoom" ){
	// 	if(!values.locationId){
	// 		errors.locationId = '对应位置为必填项';
	// 	}
	// }
	// if(!values.functionId){
	// 	errors.functionId = '对应功能为必填项';
	// }
	return errors;
}
export default EditEquipmentForm = reduxForm({
	form: 'EditEquipmentForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditEquipmentForm);
