
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
	//选择对应功能
	onchooseCorrespondingFunction=(functionId)=>{
		this.setState({
			functionId : functionId.value
		})
		if(functionId == null){
			return;
		}
    	Store.dispatch(change('NewCreateDefinitionForm','functionId',functionId.value));
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
	// 判断门编号是否存在
	doorNumHasFun=(deviceCode)=>{
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
		Http.request('doorNumberAndHardwareId',params).
		then(function(response){
			_this.setState({
	 			doorNumHasStatus : false
	 		})
		}).catch(function(err){
	 		let {isDoorNumHas} = _this.props;
	 		isDoorNumHas && isDoorNumHas();
	 		_this.setState({
	 			doorNumHas:true,
	 			doorNumHasStatus : true
	 		})
		});
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
		});
	}
	chooseONLINE=(e)=>{
		this.setState({
			isOnlines : !this.state.isOnlines
		},function(){
			Store.dispatch(change('NewCreateDefinitionForm','enable',this.state.isOnlines));
		})
		
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
// 此处判断门编号是否存在
		Http.request('doorNumberAndHardwareId',deviceCodeParams).
		then(function(response){
			Http.request('doorNumberAndHardwareId',hardwareIdParams).
			then(function(response){
				const  {onSubmit} = _this.props;
				onSubmit && onSubmit(values);
 
			}).catch(function(err){
		 		let {hardwareIdHas} = _this.props;
		 		 hardwareIdHas &&  hardwareIdHas();
			});
		}).catch(function(err){
	 		let {isDoorNumHas} = _this.props;
	 		isDoorNumHas && isDoorNumHas();
		});		
	}
	render(){
		let {floorsOptions,propertyOption,propertyId,locationOptions,defaultChecked} =this.state;
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
					<KrField name="makerId" 
						component="select" 
						label="厂家" 
						options = {State.makerOptions}
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'厂家为必填项'}} 
						style={{width:'252px'}}
					/>
					<div style={{marginLeft:6}}>
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
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
