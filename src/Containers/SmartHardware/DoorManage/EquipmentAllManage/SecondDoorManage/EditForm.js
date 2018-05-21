
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
			noShowDoorCode : false,
			doorTypeState : '',
			doorCodeText : ''

		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		this.getBasicData(this.detail);
		if(this.detail.doorType == "MEETING"){
			this.setState({
				noShowDoorCode : true
			})
			Store.dispatch(change('EditForm', 'doorCode', ''))
		}

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
		
	}
	getBasicData=(detail)=>{
		
		
		let _this = this;
		//获取房间下拉列表
		if(detail.communityId && detail.floor){
			
			let SearchLocationParams = {
									communityId:detail.communityId,
									floor:detail.floor,
								}
			Http.request('getspacelistapi',SearchLocationParams).then(function(response){
				var listDate = response.items;
				var locationArr = []
	    		for (var i=0;i<listDate.length;i++){
					locationArr[i] = {label:listDate[i].name,value:listDate[i].id}
					if(listDate[i].id == _this.detail.roomId){
						
						_this.setState({
							doorCodeText : listDate[i].name
						})
					}
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
  	
  	//选择门类型
	onchooseProperty=(doorType)=>{

		
		  let _this = this;
		  let {doorCodeText} =this.state;
		  if(doorType == null){
				Store.dispatch(change('EditForm','doorType',''));
				this.setState({
					doorTypeState : ''
				})
			  return;
		  }
		  if(doorType.value =="MEETING"){
			  this.setState({
				  noShowDoorCode : true
			  },function(){
				  
				  Store.dispatch(change('EditForm','doorCode',' '));
				  
			  })
		  }else if(doorType.value =="OFFICE"){
			  this.setState({
				  noShowDoorCode: false,
			  },function(){
				  if(doorCodeText){
					  Store.dispatch(change('EditForm','doorCode',doorCodeText));
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
			
			Store.dispatch(change('EditForm','doorType',doorType.value));

  	}
	
	// 选择房间
	onchooseCorrespondingLocation=(roomId)=>{
		if(roomId == null){
			this.setState({
				doorCodeText : ''
			})
			Store.dispatch(change('EditForm','roomId',''));
			Store.dispatch(change('EditForm','doorCode',''));
			return;
		}
		
		Store.dispatch(change('EditForm','roomId',roomId.value));


		let {doorTypeState} = this.state;
		if(doorTypeState && doorTypeState == "OFFICE"){
			Store.dispatch(change('EditForm','doorCode',roomId.label));
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
			
			// Store.dispatch(change('EditForm', 'doorType', ""));
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
	
	
	// 判断智能硬件ID是否存在
	hardwareIdHasFun=(hardwareId)=>{
		let {detail} = this.props;
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
		let {floorsOptions,propertyOption,doorType,locationOptions,defaultChecked,
			noShowDoorCode} =this.state;
		
		const { error, handleSubmit, reset ,detail} = this.props;
		return(
			<div style={{padding:'20px 0 0 50px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div style={{margin:"0 0 20px 10px",fontSize: 14,color:'black'}}>
						<div><span>智能硬件ID：</span><span style={{color:"#ff6868"}}>{detail.deviceId}</span></div>
						<div style={{marginTop:15}}><span>标记：</span><span style={{color:"#ff6868"}}>{detail.name}</span></div>
					</div>
					
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
						label="空间名称"
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
					{!noShowDoorCode && <KrField grid={1/2} name="doorCode" 
						type="text" 
						label="屏幕显示编号" 
						style={{width:'252px'}}
						onBlur = {this.doorNumHasFun}
					/>}
					
					
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
		errors.roomId ='门类型为会议室或独立办公室，空间名称必选'
	}

	if(values.doorType && (values.doorType=='GATE' ||values.doorType=='SPECIAL_CONTROL')&& !values.doorCode){
		errors.doorCode ='门类型为大门或配置门时，屏幕显示编号必填'
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
