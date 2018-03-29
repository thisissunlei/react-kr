
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
			
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
			propertyOption :State.propertyOption,
			noShowDoorCode : false,
			doorTypeState : '',
			doorCodeText : ''
		}
	}

	
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		

  		Store.dispatch(change('NewCreateDefinitionForm', 'floor', ''))

  		let _this = this;
  		if(!community){
  			_this.setState({
  				
  				floorsOptions : [],
  				locationOptions:[]
  			})
			return;
		}
		let httpParam = {
			communityId : community.id
		}
		this.setState({
			communityId :community.id,
		})
    	Store.dispatch(change('NewCreateDefinitionForm', 'communityId', community.communityId));
  		// Store.dispatch(change('NewCreateDefinitionForm','doorType',''));
		Store.dispatch(change('NewCreateDefinitionForm','roomId',''));


    	Http.request('getFloorByComunity',httpParam).then(function(response){
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
  	
  	//选择属性(会议室／大门)
	onchooseProperty=(doorType)=>{

		let _this = this;
		let {doorCodeText} =this.state;
		if(doorType == null){
			  Store.dispatch(change('NewCreateDefinitionForm','doorType',''));
			  this.setState({
				  doorTypeState : ''
			  })
			return;
		}
		if(doorType.value =="MEETING"){
			this.setState({
				noShowDoorCode : true
			},function(){
				
				Store.dispatch(change('NewCreateDefinitionForm','doorCode',' '));
				
			})
		}else if(doorType.value =="OFFICE"){
			this.setState({
				noShowDoorCode: false,
			},function(){
				if(doorCodeText){
					Store.dispatch(change('NewCreateDefinitionForm','doorCode',doorCodeText));
				}
			})
		}else{
			this.setState({
				
				noShowDoorCode: false
			})
		}

		this.setState({
			doorTypeState : doorType.value,
		})
  		
  		Store.dispatch(change('NewCreateDefinitionForm','doorType',doorType.value));
  	}
	
	// 选择对应位置
	onchooseCorrespondingLocation=(roomId)=>{
		if(roomId == null){
			this.setState({
				doorCodeText : ''
			})
			Store.dispatch(change('NewCreateDefinitionForm','roomId',''));
			Store.dispatch(change('NewCreateDefinitionForm','doorCode',''));
			return;
		}
		
		Store.dispatch(change('NewCreateDefinitionForm','roomId',roomId.value));


		let {doorTypeState} = this.state;
		if(doorTypeState && doorTypeState == "OFFICE"){
			Store.dispatch(change('NewCreateDefinitionForm','doorCode',roomId.label));
		}else{

		}
		this.setState({
			doorCodeText : roomId.label
		})
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			// Store.dispatch(change('NewCreateDefinitionForm', 'doorType', ""));
		}else{
			_this.setState({
				floorNum : floor.value
			},function(){
				_this.getRoom();
			})
			
		}
		
	}

	getRoom =()=>{
		let _this =this;
		let SearchLocationParams = 
			{
	  			communityId:_this.state.communityId,
	  			whereFloor:_this.state.floorNum
  			}
  			
  			Http.request('getLocationByProperty',SearchLocationParams).then(function(response){
				var locationArr = []
	    		for (var i=0;i<response.length;i++){
	    			locationArr[i] = {label:response[i].name,value:response[i].id}
	    		}
	    		_this.setState({
	    			locationOptions : locationArr
	    		})
			});
	}
	
	
	// 判断智能硬件ID是否存在
	hardwareIdHasFun=(hardwareId)=>{
		
		if(!hardwareId || /^\s+$/.test(hardwareId)){
			return;
		}
		let _this = this;
		let hardwareIdparams = {
			deviceId :hardwareId,
		}
		Http.request('getDeviceIDRepeat',hardwareIdparams).then(function(response){
	 		
		}).catch(function(err){
	 		
	 		Message.error(err.message);
		});
	}

	// 新增设备定义
	onSubmit=(values)=>{
		let _this = this;
		let hardwareIdparams = {
			deviceId :values.deviceId
		}

		Http.request('getDeviceIDRepeat',hardwareIdparams).then(function(response){

	 		State.newCreateSecondDoor(values);

		}).catch(function(err){

	 		Message.error(err.message);

		});
		
	}
	render(){
		let {floorsOptions,propertyOption,doorType,locationOptions,defaultChecked,noShowDoorCode,
			doorTypeState,doorCodeText} =this.state;
		
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding:'20px 0 0 55px'}}>
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
					<KrField name="roomId" grid={2}
						component="select" 
						options={locationOptions}
						label="房间"
						onChange = {this.onchooseCorrespondingLocation}  
						style={{width:'252px',margin:'0 35px 5px 0',display:"block"}}
					/>
					
					<KrField grid={1/2} name="deviceId" 
						type="text" 
						label="智能硬件ID" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.hardwareIdHasFun}
					/>
					
					<KrField name="doorType" 
						component="select" 
						label="门类型"
						onChange = {this.onchooseProperty}
						options={propertyOption}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门类型为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="maker" grid={1/2}
						component="select" 
						label="厂家" 
						options = {State.makerOptions}
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'厂家为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0',display:"block"}}
					/>
					<KrField grid={1/2} name="title" 
						type="text" 
						label="屏幕显示标题：" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'展示标题为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					{!noShowDoorCode &&
						<KrField grid={1/2} name="doorCode" 
							type="text" 
							label="屏幕显示编号：" 
							style={{width:'252px'}}
							onBlur = {this.doorNumHasFun}
						/>
					}

					
					
					
					<KrField
						label="备注"
						name ="memo"
						component = 'textarea'
						style={{width:538}}
					/>
					
					
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px'}}>
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
	if(!values.title || /^\s+$/.test(values.title)){
		errors.title = '屏幕显示标题为必填项';
	}
	if(values.title && values.title.length>11){

		errors.title = '屏幕显示标题最多11个字符';
	}
	
	if(values.doorCode  && values.doorCode.length>9){
		errors.doorCode = '屏幕显示编号最多9个字符';
	}
	if(!values.deviceId || /^\s+$/.test(values.deviceId)){
		errors.deviceId = '智能硬件ID为必填项';
	}
	if(values.deviceId && values.deviceId.length>50){
		errors.deviceId = '智能硬件ID最多50个字符';
	}
	

	if(!values.doorType){
		errors.doorType = '门类型为必填项';
	}
	if(values.doorType && (values.doorType=='MEETING' ||values.doorType=='OFFICE')&& !values.roomId){
		errors.roomId ='门类型为会议室或独立办公室，房间必选'
	}

	if(values.doorType && (values.doorType=='GATE' ||values.doorType=='SPECIAL_CONTROL')&& !values.doorCode){
		errors.doorCode ='门类型为大门或配置门时，屏幕显示编号必填'
	}

	if(!values.maker){
		errors.maker = '厂家为必填项';
	}
	
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
