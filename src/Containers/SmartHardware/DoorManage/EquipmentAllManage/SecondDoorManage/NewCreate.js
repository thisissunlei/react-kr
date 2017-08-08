
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err
} from 'kr-ui';
class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			locationOpen:false,
			floorsOptions:[],
			locationOptions:[],
			confirmSubmit : false,
			doorNumHas:false,
			doorNumHasStatus :false,
			communityId :'',
			propertyOption :[{label:"",value:""}],
			propertyId :"",
			hardwareidHasStatus : false,
			isOnlines:true,
			showTitle :'',
			deviceCode:'',
			hardwareId:'',
			typeId : '',
			propertyId :  '',
			functionId :  '',
			locationId : ''
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
  			Store.dispatch(change('NewCreateDefinitionForm', 'propertyId', ""))
			return;
		}
		let CommunityId = {
			communityId : community.id
		}
		this.setState({
			communityId :community.id
		})
    	Store.dispatch(change('NewCreateDefinitionForm', 'communityId', community.communityId));
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
  	//选择类型
  	onchooseType=(typeId)=>{
  		this.setState({
  			typeId :typeId.value
  		})
  		if(typeId == null){
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm','typeId',typeId.value));
  	}
  	//选择属性(会议室／大门)
	onchooseProperty=(propertyId)=>{
		let _this = this;
		if(propertyId == null){
			_this.setState({
  				locationOpen : false
  			})
			return;
		}
  		if(propertyId.value == 2 || propertyId.value == 3 ||propertyId.value == 4 || propertyId.value == 5){
  			_this.setState({
  				locationOpen : true
  			})
  			let SearchLocationParams = {communityId:_this.state.communityId,
  										whereFloor:_this.state.floorNum,
  										type:propertyId.value}
  			
  			Http.request('getLocationByProperty',SearchLocationParams).then(function(response){
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
  				locationOpen : false
  			})
  		}
  		this.setState({
  			propertyId : propertyId.value
  		})
  		Store.dispatch(change('NewCreateDefinitionForm','propertyId',propertyId.value));
  	}
	
	// 选择对应位置
	onchooseCorrespondingLocation=(locationId)=>{
		this.setState({
			locationId : locationId.value
		})
		if(locationId == null){
			return;
		}
		Store.dispatch(change('NewCreateDefinitionForm','locationId',locationId.value));
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			_this.setState({
				propertyOption :[{label: '',value: ''}],
				locationOpen :false,
			})
			Store.dispatch(change('NewCreateDefinitionForm', 'propertyId', ""));
		}else{
			_this.setState({
				floorNum : floor.value
			},function(){
				_this.setState({
					propertyOption :[{label: '大门',value: 1},{label: '会议室',value: 2},{label: '独立办公室',value: 3},{label: '路演厅',value: 4},{label: '配置门',value: 5}]
				})
			})
		}
		
	}
	onChangeTitle=(showTitle)=>{
		this.setState({
			showTitle : showTitle 
		})
	}
	
	// 判断智能硬件ID是否存在
	hardwareIdHasFun=(hardwareId)=>{
		this.setState({
			hardwareidHasStatus:false,
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
		Http.request('doorNumberAndHardwareId',hardwareIdparams)
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
		 		Message.error(err.message);
		});
	}

	// 新增设备定义
	onSubmit=(values)=>{
		let _this = this;
		values.enable = _this.state.isOnlines?"ONLINE":"OFFLINE";
		let deviceCodeParams = {
			code :values.deviceCode,
			type :"deviceCode",
			id : ''
		}
		let hardwareIdParams  = {
			code :values.hardwareId,
			type :"hardwareid",
			id :''
		}

		Http.request('doorNumberAndHardwareId',hardwareIdParams).then(function(response){

				State.newCreateSecondDoor(values);
 
		}).catch(function(err){
	 		let {hardwareIdHas} = _this.props;
	 		 hardwareIdHas &&  hardwareIdHas();
	 		 Message.error(err.message)

		});
		
	}
	render(){
		let {floorsOptions,propertyOption,propertyId,locationOptions,defaultChecked} =this.state;
		
		
		const { error, handleSubmit, pristine, reset} = this.props;
		return(
			<div style={{padding:'35px 0 0 35px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="communityId" 
						component="searchCommunityAll" 
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'社区为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						inline={false}
					/>
					<KrField name="floor" 
						component="select" 
						label="楼层" 
						options = {floorsOptions}
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'楼层为必填项'}} 
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
						onBlur = {this.onChangeTitle}
					/>
					<KrField grid={1/2} name="deviceCode" 
						type="text" 
						label="门编号" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门编号为必填项'}} 
						style={{width:'252px'}}
						onBlur = {this.doorNumHasFun}
					/>
					<KrField grid={1/2} name="hardwareId" 
						type="text" 
						label="智能硬件ID" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.hardwareIdHasFun}
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
						requiredValue={true} 
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
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
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
	if(values.showTitle && values.showTitle.length>13){
		errors.showTitle = '展示标题最多13个字符';
	}
	if(!values.deviceCode || /^\s+$/.test(values.deviceCode)){
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
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
