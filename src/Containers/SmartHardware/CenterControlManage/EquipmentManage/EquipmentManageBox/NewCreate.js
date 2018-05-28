
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
	err
} from 'kr-ui';
class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
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
		Store.dispatch(change('NewCreateDefinitionForm','spaceId',''));


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
	onchooseProperty=(spaceType)=>{
		let _this = this;
		if(spaceType == null){
  			Store.dispatch(change('NewCreateDefinitionForm','spaceType',''));
			return;
		}
  		
  		Store.dispatch(change('NewCreateDefinitionForm','spaceType',spaceType.value));
  	}
	
	// 选择对应位置
	onchooseCorrespondingLocation=(spaceId)=>{
		if(spaceId == null){
			return;
		}
		Store.dispatch(change('NewCreateDefinitionForm','spaceId',spaceId.value));
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			// Store.dispatch(change('NewCreateDefinitionForm', 'spaceType', ""));
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
	  			floor:_this.state.floorNum
  			}
  			
  			Http.request('getspacelistapi',SearchLocationParams).then(function(response){
				var listData = response.items;
				var locationArr = []
	    		for (var i=0;i<listData.length;i++){
	    			locationArr[i] = {label:listData[i].name,value:listData[i].id}
	    		}
	    		_this.setState({
	    			locationOptions : locationArr
	    		})
			});
	}
	

	// 新增设备定义
	onSubmit=(values)=>{
		
		let _this = this;
		var deviceTypeObj = {deviceType:"GATEWAY_PANEL"}
		var submitValue = Object.assign(values,deviceTypeObj);

	 	State.newCreateCenterControl(submitValue);
		
	}
	render(){
		let {floorsOptions,locationOptions,defaultChecked} =this.state;
		let spaceOptions = [{label:"会议室",value:"MEETING"},{label:"独立办公室",value:"OFFICE"},{label:"大厅",value:"HALL"}]
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

					<KrField name="spaceType" 
						component="select" 
						label="空间类型"
						onChange = {this.onchooseProperty}
						options={spaceOptions}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门类型为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField name="spaceId" grid={2}
						component="select" 
						options={locationOptions}
						label="空间名称"
						onChange = {this.onchooseCorrespondingLocation}  
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					
					<KrField grid={1/2} name="serialNo" 
						type="text" 
						label="智能硬件ID" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					
					
					
					<KrField grid={1/2} name="name" 
						type="text" 
						label="屏幕显示名称" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'展示名称为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					
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
	if(!values.name || /^\s+$/.test(values.name)){
		errors.name = '屏幕显示名称为必填项';
	}
	if(values.name && values.name.length>11){
		errors.name = '屏幕显示名称最多11个字符';
	}
	if(!values.serialNo || /^\s+$/.test(values.serialNo)){
		errors.serialNo = '智能硬件ID为必填项';
	}
	if(values.serialNo && values.serialNo.length>50){
		errors.serialNo = '智能硬件ID最多50个字符';
	}
	if(!values.spaceType){
		errors.spaceType = '空间类型为必填项';
	}
	if(values.spaceType && (values.spaceType=='MEETING' ||values.spaceType=='OFFICE')&& !values.spaceId){
		errors.spaceId ='空间类型为会议室或独立办公室,空间名称必填'
	}
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
