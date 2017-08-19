
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {ShallowEqual} from 'kr/Utils';

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
class EditForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
			//是否显示位置下拉框
			locationOpen:false,
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
			floorNum :'',
			propertyOption :[{label:"",value:"",code:''}],

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
		console.log("detail",detail);
		var propertyOptionS = State.propertyOption;
		var paramType =''
		let _this = this;
		if(detail.communityId && detail.floor){
			for(var i=0;i<propertyOptionS.length;i++){
				if(propertyOptionS[i].value == detail.doorType){
					paramType = propertyOptionS[i].code;
				}
			}
			let SearchLocationParams = {
									communityId:detail.communityId,
									whereFloor:detail.floor,
									type:paramType
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
		
		if(detail.communityId){
			Http.request('getFloorByComunity',{communityId:detail.communityId}).then(function(response){
	    		var arrNew = []
	    		for (var i=0;i<response.floors.length;i++){
	    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
	    		}
	    		_this.setState({
	    			floorsOptions : arrNew,
	    			floor : detail.floor,
	    			communityId : detail.communityId,
	    			propertyOption :State.propertyOption
	    		})
		    }).catch(function(err){

	    	})
		}

		_this.setState({
			id : detail.id,
			floorNum : detail.floor
		})

		if(detail.doorType && detail.doorType!=="GATE"  ){
			_this.setState({
				locationOpen : !_this.state.locationOpen
			})
		}
		Store.dispatch(initialize('EditForm', detail));
	}
	onCancel=()=>{
		State.openEditDialog = false;
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		

  		Store.dispatch(change('EditForm', 'floor', ""))
  		let _this = this;
  		if(community == null){
  			_this.setState({
  				locationOpen : false,
  				floorsOptions : []
  			})
			return;
		}
		let CommunityId = {
			communityId : community.id
		}
		this.setState({
			communityId :community.id,
			locationOpen :false
		})
    	Store.dispatch(change('EditForm', 'communityId', community.communityId));
		Store.dispatch(change('EditForm','roomId',''));
  		Store.dispatch(change('EditForm','doorType',''));

    	Http.request('getFloorByComunity',CommunityId).then(function(response){
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
  	
  	//选择属性(会议室／大门/路演厅)
	onchooseProperty=(doorType)=>{
		console.log("doorType",doorType);
		let _this = this;
		if(doorType == null){
			_this.setState({
  				locationOpen : false
  			})
			return;
		}
  		if(doorType.value == "GATE"){
  			Store.dispatch(change('EditForm','roomId',''));
  			_this.setState({
  				locationOpen : false
  			})
  			
  		}else{
  			_this.setState({
  				locationOpen : true
  			})
  			let SearchLocationParams = {communityId:_this.state.communityId,
  										whereFloor:_this.state.floorNum,
  										type:doorType.code}
  			
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
  		
  		Store.dispatch(change('EditForm','doorType',doorType.value));
  	}
	
	// 选择对应位置
	onchooseCorrespondingLocation=(roomId)=>{
		if(roomId == null){
			return;
		}
		Store.dispatch(change('EditForm','roomId',roomId.value));
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			_this.setState({
				propertyOption :[{label: '',value: ''}],
				locationOpen :false,
			})
			Store.dispatch(change('EditForm', 'doorType', ""));
		}else{
			_this.setState({
				floorNum : floor.value
			},function(){
				console.log("State.propertyOption",State.propertyOption);
				_this.setState({
					propertyOption :State.propertyOption
				})
			})
		}
		
	}
	
	
	// 判断智能硬件ID是否存在
	hardwareIdHasFun=(hardwareId)=>{
		let {detail} = this.props;
		console.log("detail",detail);
		if(!hardwareId || /^\s+$/.test(hardwareId)){
			return;
		}
		let _this = this;
		let hardwareIdparams = {
			deviceId :hardwareId,
			id: detail.id
		}
		Http.request('getDeviceIDRepeat',hardwareIdparams).then(function(response){
	 		
		}).catch(function(err){
	 		
	 		Message.error(err.message);
		});
	}

	// 编辑设备定义
	onSubmit=(values)=>{
		console.log("values",values);
		let {detail} = this.props;
		let _this = this;
		let hardwareIdparams = {
			deviceId :values.deviceId,
			id: detail.id
		}

		Http.request('getDeviceIDRepeat',hardwareIdparams).then(function(response){

	 		State.editSecondDoor(values);

		}).catch(function(err){

	 		Message.error(err.message);

		});
		
	}
	render(){
		let {floorsOptions,propertyOption,doorType,locationOptions,defaultChecked,locationOpen} =this.state;
		
		const { error, handleSubmit, reset ,detail} = this.props;
		return(
			<div style={{padding:'20px 0 0 50px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div style={{margin:"0 0 20px 10px",fontSize: 14,color:'black'}}><span>智能硬件ID：</span><span>{detail.deviceId}</span></div>
					
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
					<KrField grid={1/2} name="title" 
						type="text" 
						label="展示标题" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'展示标题为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					<KrField grid={1/2} name="doorCode" 
						type="text" 
						label="门编号" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'门编号为必填项'}} 
						style={{width:'252px'}}
						onBlur = {this.doorNumHasFun}
					/>
					
					
					<KrField name="doorType" 
						component="select" 
						label="属性"
						onChange = {this.onchooseProperty}
						options={propertyOption}  
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'属性为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>
					<KrField name="maker" grid={1/2}
						component="select" 
						label="厂家" 
						options = {State.makerOptions}
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'厂家为必填项'}} 
						style={{width:'252px'}}
					/>
					{
						locationOpen && <KrField name="roomId" grid={1/2}
							component="select" 
							options={locationOptions}
							label="对应位置"
							onChange = {this.onchooseCorrespondingLocation}  
							style={{width:'252px',margin:'0 35px 5px 0',display:this.state.locationOpen?'block':'none'}}
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
		errors.title = '展示标题为必填项';
	}
	if(values.title && values.title.length>13){
		errors.title = '展示标题最多13个字符';
	}
	if(!values.doorCode || /^\s+$/.test(values.doorCode)){
		errors.doorCode = '门编号为必填项';
	}
	if(values.doorCode  && values.doorCode.length>50){
		errors.doorCode = '门编号最多50个字符';
	}
	if(!values.deviceId || /^\s+$/.test(values.deviceId)){
		errors.deviceId = '智能硬件ID为必填项';
	}
	if(values.deviceId && values.deviceId.length>50){
		errors.deviceId = '智能硬件ID最多50个字符';
	}
	if(!values.doorType){
		errors.doorType = '属性为必填项';
	}
	if(!values.maker){
		errors.maker = '厂家为必填项';
	}
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
