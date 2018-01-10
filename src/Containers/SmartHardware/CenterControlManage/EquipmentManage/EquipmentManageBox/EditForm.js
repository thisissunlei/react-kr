
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
class EditForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail
		this.state={
			
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
		}
	}
	
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
	}


	componentDidMount(){
		Store.dispatch(initialize('EditForm', this.detail));
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
		const {onCancel}=this.props;
		onCancel && onCancel();

	}
	// 社区模糊查询
  	onChangeSearchCommunity=(community)=>{
  		

  		Store.dispatch(change('EditForm', 'floor', ''))

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
    	Store.dispatch(change('EditForm', 'communityId', community.communityId));
		Store.dispatch(change('EditForm','spaceId',''));


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
  			Store.dispatch(change('EditForm','spaceType',''));
			return;
		}
  		
  		Store.dispatch(change('EditForm','spaceType',spaceType.value));
  	}
	
	// 选择对应位置
	onchooseCorrespondingLocation=(spaceId)=>{
		if(spaceId == null){
			return;
		}
		Store.dispatch(change('EditForm','spaceId',spaceId.value));
	}
	// 选择楼层
	getFloor=(floor)=>{
		let _this = this;
		if(!floor){
			// Store.dispatch(change('EditForm', 'spaceType', ""));
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
	
	

	
	onSubmit=(values)=>{

		let _this = this;
		console.log("values",values);
		var deviceTypeObj = {deviceType:"GATEWAY_PANEL",id :this.detail.id}
		var submitValue = Object.assign(values,deviceTypeObj);
	 	State.editCenterControl(submitValue);
		
		
	}

	render(){
		let {floorsOptions,locationOptions,defaultChecked} =this.state;
		let spaceOptions = [{label:"会议室",value:"MEETING"},{label:"独立办公室",value:"OFFICE"},{label:"大厅",value:"HALL"}]
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding:'20px 0 0 55px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div style={{margin:"0 0 20px 10px",fontSize: 14,color:'black'}}>
						<div><span>智能硬件ID：</span><span style={{color:"#ff6868"}}>{this.detail.serialNo}</span></div>
						<div style={{marginTop:15}}><span>标记别名：</span><span style={{color:"#ff6868"}}>{this.detail.alias}</span></div>
					</div>
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
						onChange = {this.onchooseProperty}
						options={spaceOptions}  
						requireLabel={true} 
						style={{width:'252px',margin:'0 35px 5px 0'}}
					/>

					<KrField name="spaceId" grid={2}
						component="select" 
						options={locationOptions}
						label="房间"
						onChange = {this.onchooseCorrespondingLocation}  
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
	if(!values.title || /^\s+$/.test(values.title)){
		errors.title = '屏幕显示名称为必填项';
	}
	if(values.title && values.title.length>11){

		errors.title = '屏幕显示名称最多11个字符';
	}
	
	if(!values.deviceId || /^\s+$/.test(values.deviceId)){
		errors.deviceId = '智能硬件ID为必填项';
	}
	if(values.deviceId && values.deviceId.length>50){
		errors.deviceId = '智能硬件ID最多50个字符';
	}


	if(!values.spaceType){
		errors.spaceType = '空间类型类型为必填项';
	}
	if(values.spaceType && (values.spaceType=='MEETING' ||values.spaceType=='OFFICE')&& !values.spaceId){
		errors.spaceId ='空间类型为会议室或独立办公室,房间必填'
	}
	
	return errors;
}
export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
