
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	SearchForm,
	SearchForms,
	Message,
} from 'kr-ui';

import State from './State';
import {
	observer
} from 'mobx-react';
@observer


class EquipmentAdvancedQueryForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchForm: false,
			floorsOptions:[{label:"",value:""}],
			propertyOption:[],
			makerOptions : []
		}
	}
	componentWillReceiveProps(){
	}
	componentDidMount(){

		let _this = this;
		_this.getDicList();
		Store.dispatch(change('EquipmentAdvancedQueryForm','type',this.props.filter));
		Store.dispatch(change('EquipmentAdvancedQueryForm','value',this.props.content));
	}

	// 获取通用字典
	getDicList =()=>{
		let _this =this;
		Http.request('getWarningType', {}).then(function(response) {
				
			var arrNewDoorType = [],arrMakerOptions=[]
			for(var i=0;i<response.DoorType.length;i++){
				arrNewDoorType[i] = {
					label:response.DoorType[i].desc,
					value:response.DoorType[i].value,
					code : response.DoorType[i].code
				}
				
			}
			for(var i=0;i<response.Maker.length;i++){
				
				arrMakerOptions[i]={
					label:response.Maker[i].desc,
					value:response.Maker[i].value,
					code : response.Maker[i].code
				}
			}

			_this.setState({
				propertyOption :arrNewDoorType,
				makerOptions : arrMakerOptions
			})
			

		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	

	// 提交
	onSubmit=(values)=>{
		//console.log("values",values);
	}
	// 关闭窗口
	onCancle=()=>{
		State.openSearchDialog = false;
	}
	
	// 查询楼层
	onChangeCommunity=(community)=>{

		let _this = this;
		var communityIdReal,floorReal;
		if(!community){

			communityIdReal = '';
			floorReal = '';
			Store.dispatch(change('EquipmentAdvancedQueryForm','floor',''));
			_this.setState({
    			floorsOptions : []
    		})

		}else{
			communityIdReal = community.id;
			floorReal = State.equipmentSecondParams.floor

			let CommunityId = {
				communityId : community.id
			}
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

		var newObj = {
			communityId: communityIdReal,
			floor : floorReal,
			page:1
		}
		State.realPage =1;
		State.equipmentSecondParams = Object.assign({},State.equipmentSecondParams,newObj);

	}

	onchangeFloor=(floor)=>{
		var floorReal
		if(floor){
			floorReal = floor.label;
		}else{
			floorReal = '';
		}

		var newObj = {
			floor : floorReal,
			page :1
		}
		State.realPage = 1;
		State.equipmentSecondParams = Object.assign({},State.equipmentSecondParams,newObj);
	}

	onchangeDoorType=(doorType)=>{
		var doorTypeReal
		if(doorType){
			doorTypeReal = doorType.value;
		}else{
			doorTypeReal = '';
		}
		State.realPage =1;
		State.equipmentSecondParams =  {
			communityId: State.equipmentSecondParams.communityId,
	        deviceId : State.equipmentSecondParams.deviceId || '',
	        doorCode : State.equipmentSecondParams.doorCode || '',
	        doorType : doorTypeReal,
	        floor : State.equipmentSecondParams.floor,
	        page : 1,
	        pageSize: 15,
	        date: new Date()
		}
		
	}

	onchangeMaker=(makerItem)=>{
		console.log("makerItem",makerItem);
		var makerItemReal
		if(makerItem){
			makerItemReal = makerItem.value;
		}else{
			makerItemReal = '';
		}
		State.realPage =1;
		State.equipmentSecondParams =  {
			communityId: State.equipmentSecondParams.communityId,
	        deviceId : State.equipmentSecondParams.deviceId || '',
	        doorCode : State.equipmentSecondParams.doorCode || '',
	        doorType : State.equipmentSecondParams.doorType || '',
	        floor : State.equipmentSecondParams.floor,
	        maker : makerItemReal,
	        page : 1,
	        pageSize: 15,
	        date: new Date()
		}
		
	}


	onSearchSubmit=(value)=>{
		
		var newObj;
		if(value.filter == "doorCode"){

			
		    newObj ={
				    	doorCode: value.content,
				    	deviceId: '',
				    	page:1
				    }

		}else if(value.filter == "title"){

			
		    newObj ={
				    	title: value.content,
				    	deviceId: '',
				    	page:1
				    }

		}else{
		    
		    
		    newObj ={
				    	deviceId: value.content,
				    	doorCode: '',
				    	page:1
				    }
	    }

	    var objNewT = Object.assign({},State.equipmentSecondParams);
	    State.realPage =1;
	    State.equipmentSecondParams = Object.assign({},objNewT,newObj);

	}

	render(){
		let {floorsOptions,propertyOption,makerOptions}=this.state;
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{
		      label:"屏幕显示编号",
		      value:"doorCode"
		    },{
		      label:"屏幕显示标题",
		      value:"title"
		    },{
		      label:"智能硬件ID",
		      value:"deviceId"
		    }]
		var itemsDrop=["重启APP","重启系统","断开重连","刷新屏幕"]
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{float:"left",marginTop:20}} className="second-equipment-search">
				<span className="fir-span">
					<KrField name="communityId"
						component="searchCommunityAll"
						label="社区名称: "
						style={{width:'235px'}}
						onChange = {this.onChangeCommunity}
						inline={true}
					/>
				</span>
				<span className="sec-span">
					<KrField name="floor"
						component="select"
						label="楼层: "
						options = {floorsOptions}
						style={{width:110}}
						inline={true}
						onChange = {this.onchangeFloor}
					/>
				</span>
				<span className="thir-span">
					<KrField name="propertyId"
						component="select"
						label="类型: "
						onChange = {this.onchangeDoorType}
						options={propertyOption}
						style={{width:'150px'}}
						inline={true}
					/>
				</span>
				<span className="fouth-span">
					<KrField name="maker"
						component="select"
						label="厂商: "
						onChange = {this.onchangeMaker}
						options={makerOptions}
						style={{width:'150px'}}
						inline={true}
					/>
				</span>
				<SearchForms onSubmit={this.onSearchSubmit}  ref = "inputFilter"
                    style={{marginTop:3,zIndex:10000,marginLeft:10}}
                    content={this.state.content}
                    searchFilter={options}
              	/>
				
				
		  </form>
		);
	}
}
export default EquipmentAdvancedQueryForm = reduxForm({
	form: 'EquipmentAdvancedQueryForm',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(EquipmentAdvancedQueryForm);
