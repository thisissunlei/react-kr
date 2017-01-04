
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';
class NewCreateDefinitionForm extends Component{
	constructor(props,context){
		super(props,context);
		this.state={
			locationOpen:false
		}
	}
	onSubmit=(values)=>{
		console.log("values",values); 
	}
	onCancel=()=>{
		const {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		if(community == null){
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm', 'communityName', community.communityName));
  	}
  	//选择类型
  	onchooseType=(equipmentType)=>{
  		if(equipmentType == null){
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm','equipmentType',equipmentType.value));
  	}
  	//选择属性
	onchooseProperty=(property)=>{
		let _this = this;
		if(property == null){
			_this.setState({
  				locationOpen : false
  			})
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm','property',property.value));
  		if(property.value == "meetingRoom" || property.value == "functionRoom" ){
  			_this.setState({
  				locationOpen : true
  			})
  		}else{
  			_this.setState({
  				locationOpen : false
  			})
  		}
  	}
	//选择对应功能
	onchooseCorrespondingFunction=(correspondingFunction)=>{
		if(correspondingFunction == null){
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm','correspondingFunction',correspondingFunction.value));
	}
	onchooseCorrespondingLocation=(correspondingLocation)=>{
		if(correspondingLocation == null){
			return;
		}
		Store.dispatch(change('NewCreateDefinitionForm','correspondingLocation',correspondingLocation.value));
	}
	render(){
		// 类型待选项
		let typeOptions = [{
			label: '门禁',
			value: 'doorLock'
		}, {
			label: '请选择',
			value: ''
		}];
		// 属性待选项
		let propertyOption=[{
			label: '大门',
			value: 'bigDoor'
		},{
			label: '会议室',
			value: 'meetingRoom'
		},{
			label: '功能室',
			value: 'functionRoom'
		}]
		// 对应功能选项
		let correspondingFunction =[{
			label: '开门',
			value: 'openDoor'
		},{
			label: '开门／预定',
			value: 'openOrReserve'
		},{
			label: '预定',
			value: 'reserve'
		}]
		const { error, handleSubmit, pristine, reset} = this.props;
		return(
			<div style={{padding:'35px 0 0 35px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="communityName" 
						component="searchCommunity" 
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'社区为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="floor" 
						component="searchCommunity" 
						label="楼层" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'社区为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField grid={1/2} name="showTitle" 
						type="text" 
						label="展示标题" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'展示标题为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField grid={1/2} name="doorNum" 
						type="text" 
						label="门编号" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门编号为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField grid={1/2} name="hardwareID" 
						type="text" 
						label="智能硬件ID" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'智能硬件ID为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="equipmentType" 
						component="select" 
						label="类型" 
						onChange = {this.onchooseType}
						options={typeOptions} 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'类型为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField name="property" 
						component="select" 
						label="属性"
						onChange = {this.onchooseProperty}
						options={propertyOption}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'属性为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="correspondingFunction" 
						component="select" 
						options={correspondingFunction}
						label="对应功能"
						onChange = {this.onchooseCorrespondingFunction}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'对应功能为必填项'}} 
						style={{width:'252px'}}
					/>
					<KrField name="correspondingLocation" 
						component="select" 
						options={correspondingFunction}
						label="对应位置"
						onChange = {this.onchooseCorrespondingLocation}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'对应位置为必填项'}} 
						style={{width:'252px',display:this.state.locationOpen?'block':'none'}}
					/>
					<Grid style={{marginTop:19,marginBottom:'4px'}}>
						<Row style={{textAlign:'center'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="保存并添加" type="button"  cancle={true} onTouchTap={this.onCancel} />
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
	if(!values.communityName){
		errors.communityName = '社区名称为必填项';
	}
	if(!values.floor){
		errors.floor = '楼层为必填项';
	}
	if(!values.showTitle){
		errors.showTitle = '展示标题为必填项';
	}
	if(!values.doorNum){
		errors.doorNum = '门编号为必填项';
	}
	if(!values.hardwareID){
		errors.hardwareID = '智能硬件ID为必填项';
	}
	if(!values.equipmentType){
		errors.equipmentType = '类型为必填项';
	}
	if(!values.property){
		errors.property = '属性为必填项';
	}
	if(values.property == "meetingRoom" || values.property == "functionRoom" ){
		// if(value)
	}
	if(!values.correspondingFunction){
		errors.correspondingFunction = '对应功能为必填项';
	}
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);