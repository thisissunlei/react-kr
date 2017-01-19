
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {ShallowEqual} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	err
} from 'kr-ui';
class EditEquipmentForm extends Component{
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
			deviceCode:'',
			hardwareId:'',
			typeId : '',
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
		let editParams = {id : detail.id }
		let _this = this;
		let floorArr = [{label:detail.floor,value:detail.floor}];
		let propertyArr =[{label:detail.propertyName,value:detail.propertyId}];
		let locationArr =[{label:detail.locationName,value:detail.locationId}];
		_this.setState({
			floorsOptions : floorArr,
			id : detail.id,
			propertyOption :propertyArr,
			locationOptions : locationArr,
			propertyOption : propertyArr,

			communityId : detail.communityId,
			communityName : detail.communityName,
			showTitle : detail.showTitle,
			deviceCode : detail.deviceCode,
			hardwareId : detail.hardwareId,
			typeId : detail.typeId,
			propertyId : detail.propertyId,
			propertyName : detail.propertyName,
			functionId : detail.functionId,
			functionName : detail.functionName,
			locationId : detail.locationId,
			locationName : detail.locationName,
			floor : detail.floor
		})
		let editRealDetail = {
			locationOptions : locationArr,
			propertyOption : propertyArr,
			communityId : detail.communityId,
			communityName : detail.communityName,
			showTitle : detail.showTitle,
			deviceCode : detail.deviceCode,
			hardwareId : detail.hardwareId,
			typeId : detail.typeId,
			propertyId : detail.propertyId,
			propertyName : detail.propertyName,
			functionId : detail.functionId,
			functionName : detail.functionName,
			locationId : detail.locationId,
			locationName : detail.locationName,
			floor : detail.floor,
			statusClick : 0
		}
		Store.dispatch(initialize('EditEquipmentForm', editRealDetail));
		_this.setState({
			itemData:editRealDetail,
		})
		if(editRealDetail.propertyId && editRealDetail.propertyId!==1){
			_this.setState({
				locationOpen : !_this.state.locationOpen
			})
		}
	}
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
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
			communityId :community.id
		})
    	Store.dispatch(change('EditEquipmentForm', 'communityId', community.communityId));
    	Store.dispatch(Actions.callAPI('getFloorByComunity',CommunityId))
    	.then(function(response){
    		var arrNew = []
    		for (var i=0;i<response.whereFloors.length;i++){
    			arrNew[i] = {label:response.whereFloors[i],value:response.whereFloors[i]}
    		}
    		_this.setState({
    			floorsOptions : arrNew
    		})
    	}).catch(function(err){
    	})
  	}
  	//选择类型
  	onchooseType=(typeId)=>{
  		this.setState({
  			typeId :typeId.value,
  		})
  		if(typeId == null){
			return;
		}
    	Store.dispatch(change('EditEquipmentForm','typeId',typeId.value));
  	}
  	//选择属性(获取会议室／大门)
	onchooseProperty=(propertyId)=>{
		let _this = this;
		if(propertyId == null){
			_this.setState({
  				locationOpen : true,
  				propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '功能室',value: 3}]
  			})
  			return;
		}
  		if(propertyId.value == "2" || propertyId.value == "3" ){
  			_this.setState({
  				locationOpen : true,
  				propertyId : propertyId.value
  			})
  			let SearchLocationParams = {communityId:_this.state.communityId,whereFloor:_this.state.floor}
  			Store.dispatch(Actions.callAPI('getLocationByProperty',SearchLocationParams)).
			then(function(response){
				var locationArr = []
	    		for (var i=0;i<response.length;i++){
	    			locationArr[i] = {label:response[i].boardroomname,value:response[i].id}
	    		}
	    		_this.setState({
	    			locationOptions : locationArr
	    		})
			});	
  		}else{
  			_this.setState({
  				locationOpen : false
  			})
  		}
  		Store.dispatch(change('EditEquipmentForm','propertyId',propertyId.value));
  		this.setState({
			statusClick : 1
		})
  	}
	//选择对应功能
	onchooseCorrespondingFunction=(functionId)=>{
		if(functionId == null){
			return;
		}
		this.setState({
			functionId : functionId.value
		})
		
    	Store.dispatch(change('EditEquipmentForm','functionId',functionId.value));
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
				propertyOption :[{label: '大门',value: '1'},{label: '会议室',value: '2'},{label: '功能室',value: '3'}]
				
			})
		}
		
	}
	onChangeTitle=(showTitle)=>{
		this.setState({
			showTitle : showTitle
		})
	}
	// 判断门编号是否存在
	doorNumHas=(deviceCode)=>{
		this.setState({
			doorNumHas:false,
			deviceCode : deviceCode
		})
		if(!deviceCode || /^\s+$/.test(deviceCode)){
			return;
		}
		let _this = this;
		let params = {
			code :deviceCode,
			type :"deviceCode",
			id : ''
		}
		Store.dispatch(Actions.callAPI('doorNumberAndHardwareId',params)).
		then(function(response){	
		}).catch(function(err){
		 	if(err.code == -1){
		 		let {isDoorNumHas} = _this.props;
		 		isDoorNumHas && isDoorNumHas();
		 		_this.setState({
		 			doorNumHas:true
		 		})
		 	}
		});
	}
	// 判断智能硬件ID是否存在
	hardwareIdHas=(hardwareId)=>{
		this.setState({
			hardwareidHas:false,
			hardwareId :hardwareId
		})
		if(!hardwareId || /^\s+$/.test(hardwareId)){
			return;
		}
		let _this = this;
		let hardwareIdparams = {
			code :hardwareId,
			type :"hardwareid",
			id : ''
		}
		Store.dispatch(Actions.callAPI('doorNumberAndHardwareId',hardwareIdparams))
		.then(function(response){
		}).catch(function(err){
		 	if(err.code == -1){
		 		let {hardwareIdHas} = _this.props;
		 		hardwareIdHas && hardwareIdHas();
		 		_this.setState({
		 			hardwareidHas : true,
		 			defaultChecked : true
		 		})	
		 	}
		});
	}
	// 是否上线
	chooseONLINE=(e)=>{
		this.setState({
			isOnlines : !this.state.isOnlines
		},function(){
			Store.dispatch(change('EditEquipmentForm','enable',this.state.isOnlines));
		})
		
	}
	// 新增设备定义
	onSubmit=(values)=>{
		let _this = this;
		values.enable = this.state.isOnlines?"ONLINE":"OFFLINE";
		if(this.state.hardwareidHas){
			let {hardwareIdHas} =this.hardwareIdHas;
			hardwareIdHas && hardwareIdHas();
			return;
		}else if(this.state.doorNumHas){
			let {isDoorNumHas} =this.props;
			isDoorNumHas && isDoorNumHas();
			return;
		}
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	// 取消
	closeEditEquipment =()=>{
		const {closeEditEquipment} = this.props;
		closeEditEquipment && closeEditEquipment(); 
	}
	render(){
		let {floorsOptions,propertyOption,propertyId,locationOptions,defaultChecked} =this.state;
		const { error,handleSubmit,pristine,reset,detail} = this.props;
		// 类型待选项
		let typeOptions = [{
			label: '门禁',
			value: 1
		}];
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
		}]
		return(
			<div style={{padding:'35px 0 0 35px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="communityId" 
						component="searchCommunity" 
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'社区为必填项'}} 
						style={{width:252,margin:'0 35px 5px 0'}}
					/>
					<KrField name="floor" 
						component="select" 
						label="楼层" 
						options = {floorsOptions}
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'社区为必填项'}} 
						style={{width:'252px'}}
						onChange = {this.getFloor}
					/>
					<KrField grid={1/2} name="showTitle" 
						type="text" 
						label="展示标题" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'展示标题为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onChange = {this.onChangeTitle}
					/>
					<KrField grid={1/2} name="deviceCode" 
						type="text" 
						label="门编号" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门编号为必填项'}} 
						style={{width:'252px'}}
						onChange = {this.doorNumHas}
					/>
					<KrField grid={1/2} name="hardwareId" 
						type="text" 
						label="智能硬件ID" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onChange = {this.hardwareIdHas}
					/>
					<KrField name="typeId" 
						component="select" 
						label="类型" 
						onChange = {this.onchooseType}
						options={typeOptions} 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'类型为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField name="propertyId" 
						component="select" 
						label="属性"
						onChange = {this.onchooseProperty}
						options={propertyOption}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'属性为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="functionId" 
						component="select" 
						options={correspondingFunction}
						label="对应功能"
						onChange = {this.onchooseCorrespondingFunction}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'对应功能为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField name="locationId" 
						component="select" 
						options={locationOptions}
						label="对应位置"
						onChange = {this.onchooseCorrespondingLocation}  
						style={{width:'252px',display:this.state.locationOpen?'block':'none'}}
					/>
					<div>
						<input type="checkbox"  defaultChecked={this.state.isOnlines} onChange={this.chooseONLINE}/> 
						<span style={{fontSize:14,color:"#333333"}} >保存后自动上线</span>
					</div>
					
					<Grid style={{marginTop:19,marginBottom:'4px'}}>
						<Row style={{textAlign:'center'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								{/*<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="保存并添加" type="button"  cancle={true} onTouchTap={this.onSubmitOpenNew} />
								</ListGroupItem>*/}
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
		errors.floor = '楼层为必填项';
	}
	if(!values.showTitle || /^\s+$/.test(values.showTitle)){
		errors.showTitle = '展示标题为必填项';
	}
	if(!values.deviceCode || /^\s+$/.test(values.deviceCode)){
		errors.deviceCode = '门编号为必填项';
	}
	if(!values.hardwareId || /^\s+$/.test(values.hardwareId)){
		errors.hardwareId = '智能硬件ID为必填项';
	}
	if(!values.typeId){
		errors.typeId = '类型为必填项';
	}
	if(!values.propertyId){
		errors.propertyId = '属性必填，先选择社区和楼层再选属性';
	}
	// if(values.property == "meetingRoom" || values.property == "functionRoom" ){
	// 	if(!values.locationId){
	// 		errors.locationId = '对应位置为必填项';
	// 	}
	// }
	if(!values.functionId){
		errors.functionId = '对应功能为必填项';
	}
	return errors;
}
export default EditEquipmentForm = reduxForm({
	form: 'EditEquipmentForm',
	validate,
})(EditEquipmentForm);