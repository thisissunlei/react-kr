
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
			
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
			floorNum :'',
			propertyOption :State.propertyOption,

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
	componentDidMount(){
		Store.dispatch(initialize('EditForm', this.detail));
		// Store.dispatch(change('EditForm',"roomId",this.detail.roomId));

	}
	getBasicData=(detail)=>{
		
		
		let _this = this;
		//获取房间下拉列表
		if(detail.communityId && detail.floor){
			
			let SearchLocationParams = {
									communityId:detail.communityId,
									whereFloor:detail.floor,
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
		//获取楼层下拉列表
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
	    		})
		    }).catch(function(err){

	    	})
		}

		_this.setState({
			id : detail.id,
			floorNum : detail.floor
		})

		// console.log("locationOptions",_this.state.locationOptions)
		
		// console.log("detail",detail);
	}
	onCancel=()=>{
		State.openEditDialog = false;
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		
  		// console.log("community",community);
  		let _this = this;
  		if(!community){
  			_this.setState({
  				floorsOptions : [],
  				locationOptions :[]
  			})
  			Store.dispatch(change('EditForm', 'floor', ""))
  			Store.dispatch(change('EditForm','roomId',''));
			return;
		}
		
		this.setState({
			communityId :community.id,
		})
    	Store.dispatch(change('EditForm', 'communityId', community.id));
		Store.dispatch(change('EditForm','roomId',''));
  		Store.dispatch(change('EditForm', 'floor', ""))

  		let communityIdParam = {communityId : community.id}
    	this.getFloorOption(communityIdParam);
  	}


  	getFloorOption = (communityIdParam)=>{
  		let _this =this;
  		Http.request('getFloorByComunity',communityIdParam).then(function(response){
    		var arrNew = []
    		for (var i=0;i<response.floors.length;i++){
    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
    		}
    		_this.setState({
    			floorsOptions : arrNew
    		})
    	}).catch(function(err){
    		Message.error(err.message);
    	})
  	}
  	
  	//选择门类型
	onchooseProperty=(doorType)=>{

  		Store.dispatch(change('EditForm','doorType',doorType.value));

  	}
	
	// 选择房间
	onchooseCorrespondingLocation=(roomId)=>{

		if(!roomId){
			Store.dispatch(change('EditForm','roomId',''));
			return;
		}
		// console.log("roomId",roomId);
		Store.dispatch(change('EditForm','roomId',roomId.value));
		
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			
			Store.dispatch(change('EditForm', 'doorType', ""));
		}else{
			_this.setState({
				floorNum : floor.value
			},function(){
				_this.getRoomOption();
			})
		}
		
	}

	getRoomOption=()=>{
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
		let {detail} = this.props;
		// console.log("detail",detail);
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
		// console.log("values",values);
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
		let {floorsOptions,propertyOption,doorType,locationOptions,defaultChecked} =this.state;
		
		const { error, handleSubmit, reset ,detail} = this.props;
		return(
			<div style={{padding:'20px 0 0 50px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div style={{margin:"0 0 20px 10px",fontSize: 16,color:'black'}}><span>智能硬件ID：</span><span style={{color:"#ff6868"}}>{detail.deviceId}</span></div>
					
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

					<KrField name="roomId" grid={1/2}
						component="select" 
						options={locationOptions}
						label="房间"
						onChange = {this.onchooseCorrespondingLocation}  
						style={{width:'252px',margin:'0 35px 5px 0',display:"block"}}
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
						style={{width:'252px'}}
					/>

					<KrField grid={1/2} name="title" 
						type="text" 
						label="屏幕显示标题" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'屏幕显示标题为必填项'}} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					<KrField grid={1/2} name="doorCode" 
						type="text" 
						label="屏幕显示编号" 
						requireLabel={true} 
						requiredValue={true} 
						errors={{requiredValue:'屏幕显示编号为必填项'}} 
						style={{width:'252px'}}
						onBlur = {this.doorNumHasFun}
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
	if(!values.title || /^\s+$/.test(values.title)){
		errors.title = '屏幕显示标题为必填项';
	}
	if(values.title && values.title.length>11){
		errors.title = '屏幕显示标题最多11个字符';
	}
	if(!values.doorCode || /^\s+$/.test(values.doorCode)){
		errors.doorCode = '屏幕显示编号为必填项';
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
	if(!values.maker){
		errors.maker = '厂家为必填项';
	}
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
