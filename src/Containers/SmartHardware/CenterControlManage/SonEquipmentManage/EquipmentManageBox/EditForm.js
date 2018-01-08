
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
		Store.dispatch(change('EditForm','weight',this.detail.extra.weight));

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

	}
	onCancel=()=>{
		State.openEditDialog = false;
	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		
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
  	
	onchooseDeviceType=(deviceType)=>{

  		Store.dispatch(change('EditForm','deviceType',deviceType.value));

  	}


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
			
			// Store.dispatch(change('EditForm', 'deviceType', ""));
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
	
	

	// 编辑设备定义
	onSubmit=(values)=>{

		var newExtraObj = Object.assign(this.detail.extra,{weight:values.weight})
		values.extraJson = JSON.stringify(newExtraObj);
	 	State.editSonEquipment(values);
		
	}

	returnDeviceType=()=>{
		let deviceTypeOptions = [{label:"灯控制器",value:"LAMP"},
								{label:"雾化膜控制器",value:"ATOMIZATION_MEMBRANE"},
								{label:"空调控制器",value:"AIR_CONDITION"},
								{label:"空气质量仪控制器",value:"AIR_SENSOR"},
								{label:"温湿度计控制器",value:"HUMITURE_SENSOR"},
								{label:"人体感应控制器",value:"BODY_SENSOR"}]
		let {detail} =this.props;
		var deviceTypeText ;
		for(var i=0;i<deviceTypeOptions.length;i++){
			if(detail.deviceType == deviceTypeOptions[i].value){
				deviceTypeText =  deviceTypeOptions[i].label;
				return deviceTypeText;
			}
		}

		console.log("deviceTypeText",deviceTypeText);
		return deviceTypeText;

	}


	render(){
		let {floorsOptions,propertyOption,locationOptions,defaultChecked} =this.state;
		
		const { error, handleSubmit, reset ,detail} = this.props;
		let spaceTypeOptions = [{label:"会议室",value : 'MEETING'},{label:"独立办公室",value : 'OFFICE'},{label:"大厅",value : 'HALL'}]

		return(
			<div style={{padding:'20px 0 0 50px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div style={{margin:"0 0 20px 10px",fontSize: 14,color:'black'}}>
						<div><span>智能硬件ID：</span><span style={{color:"#ff6868"}}>{detail.serialNo}</span></div>
						<div style={{marginTop:15}}><span>设备类型：</span><span>{this.returnDeviceType()}</span></div>
					</div>
					

					<KrField grid={1/2} name="name" 
						type="text" 
						label="名称" 
						requireLabel={true}
						onBlur = {this.onChangeTitle}
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField grid={1/2} name="weight" 
						type="text" 
						label="权值" 
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField name="communityId" 
						component="searchCommunityAll" 
						onChange = {this.onChangeSearchCommunity}
						label="社区名称"  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
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

					<KrField name="spaceType" 
						component="select" 
						label="空间类型"
						onChange = {this.onchangeSpaceType}
						options={spaceTypeOptions}  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField name="spaceId" grid={1/2}
						component="select" 
						options={locationOptions}
						label="房间"
						onChange = {this.onchooseCorrespondingLocation}  
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField grid={1/2} name="location" 
						type="text" 
						label="位置描述"
						style={{width:'252px',margin:'0 35px 5px 0'}}
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
	var weightReg =/^([1-9]\d*)(\.{0,1}\d*[1-9])?$/;
	if(!values.communityId){
		errors.communityId = '社区名称为必填项';
	}
	if(!values.floor){
		errors.floor = '楼层为必填项';
	}

	if(!values.spaceType){
		errors.spaceType = '空间类型为必填项';
	}

	if(values.spaceType && (values.spaceType=="MEETING"||values.spaceType=="OFFICE")){
		if(!values.spaceId){
			errors.spaceId = '当空间类型为会议室或独立办公室时，房间号为必填项';
		}
	}

	if(!values.name || /^\s+$/.test(values.name)){
		errors.name = '名称为必填项';
	}
	if(values.name && values.name.length>11){
		errors.name = '名称最多11个字符';
	}
	
	if(!values.weight || /^\s+$/.test(values.weight)){
		errors.weight = '权值为必填项';
	}
	if(values.weight  && !weightReg.test(values.weight)){
		errors.weight = '权值必须为正数';
	}

	if(!values.deviceType){
		errors.deviceType = '设备类型为必填项';
	}

	if(values.location && values.location.length>50){
		errors.location = '位置描述最多50个字符';
	}

	if(values.memo && values.memo.length>50){
		errors.memo = '备注最多50个字符';
	}
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);






