
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
		}
	}
	componentWillReceiveProps(){
	}
	componentDidMount(){

		let _this = this;
		Store.dispatch(change('EquipmentAdvancedQueryForm','type',this.props.filter));
		Store.dispatch(change('EquipmentAdvancedQueryForm','value',this.props.content));
	}
	

	// 提交
	onSubmit=(values)=>{
		//console.log("values",values);
	}


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

			floorReal = State.equipmentSearchParams.floor

			let CommunityId = {
				communityId : community.id
			}
	    	Http.request('getFloorByComunity',CommunityId).then(function(response){
	    		var arrNew = []
	    		for (var i=0;i<response.floors.length;i++){
	    			arrNew[i] = {label:response.floors[i],value:response.floors[i]}
	    		}
	    		console.log("arrNew",arrNew);
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
		State.equipmentSearchParams = Object.assign({},State.equipmentSearchParams,newObj);

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
		State.equipmentSearchParams = Object.assign({},State.equipmentSearchParams,newObj);
	}

	onchangeControlEquipmentType=(controlEquipmentType)=>{
		var controlEquipmentTypeReal
		if(controlEquipmentType){
			controlEquipmentTypeReal = controlEquipmentType.value;
		}else{
			controlEquipmentTypeReal = '';
		}
		State.realPage =1;
		var newData = {
			deviceType : controlEquipmentTypeReal,
			date: new Date(),
			page : 1
		}
		State.equipmentSearchParams = Object.assign({},State.equipmentSearchParams,newData);
		
	}



	onSearchSubmit=(value)=>{
		console.log("value",value);
		var newObj;
		if(value.filter == "deviceId"){

			
		    newObj ={
				    	localNo: value.content,
				    	name: '',
				    	page:1
				    }

		}else if(value.filter == "name"){

			
		     newObj ={
				    	name: value.content,
				    	localNo: '',
				    	page:1
				    }

		}

	    var objNewT = Object.assign({},State.equipmentSearchParams);
	    State.realPage =1; 
	    State.equipmentSearchParams = Object.assign({},objNewT,newObj);

	}

	onchangeConnect=(connectStatus)=>{
		
		var TimeObj={logined:connectStatus.value||''};
		var objNewT = Object.assign({},State.equipmentSearchParams);
	    State.equipmentSearchParams = Object.assign({},objNewT,TimeObj);

	}

	render(){
		let {floorsOptions,propertyOption}=this.state;
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{label:"设备ID",value:"deviceId"},
						{label:"名称",value:"name"}]
		let connectOptions=[{label:"已连接",value:"true"},
							{label:"未连接",value:"false"}]
		let controlEquipmentOption=[{label:"灯",value:"LAMP"},
							  		{label:"雾化膜",value:"ATOMIZATION_MEMBRANE"},
							  		{label:"空调",value:"AIR_CONDITION"},
							  		{label:"空气质量仪",value:"AIR_SENSOR"},
							  		{label:"温湿度计",value:"HUMITURE_SENSOR"},
							  		{label:"人体感应器",value:"BODY_SENSOR"}]
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{width:"100%",marginTop:20,position:"relative"}} className="second-equipment-search">
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
						label="控制器类型: "
						onChange = {this.onchangeControlEquipmentType}
						options={controlEquipmentOption}
						style={{width:'200px'}}
						inline={true}
					/>
				</span>
				
				<KrField name="connectStatus"
						component="select"
						label="连接状态："
						onChange = {this.onchangeConnect}
						options={connectOptions}
						style={{width:'185px'}}
						inline={true}
					/>
				
				<div style={{position:"absolute",top:"-50px",right:0,width:300,height:50}}>
					<SearchForms onSubmit={this.onSearchSubmit}  ref = "inputFilter"
						style={{zIndex:10000,marginLeft:10}}
						content={this.state.content}
						searchFilter={options}
					/>
				</div>
				
				
				
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
