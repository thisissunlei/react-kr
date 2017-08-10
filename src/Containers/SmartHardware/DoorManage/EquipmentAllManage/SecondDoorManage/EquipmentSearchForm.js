
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
	SearchForms
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
		console.log("values",values);
	}
	// 关闭窗口
	onCancle=()=>{
		State.openSearchDialog = false;
	}
	
	// 查询楼层
	onChangeCommunity=(community)=>{

		console.log("comunity",community);
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
			floor : floorReal
		}
		State.equipmentSecondParams = Object.assign({},State.equipmentSecondParams,newObj);

	}

	onchangeFloor=(floor)=>{
		console.log("floor",floor);
		var floorReal
		if(floor){
			floorReal = floor.label;
		}else{
			floorReal = '';
		}

		var newObj = {
			floor : floorReal,
		}
		State.equipmentSecondParams = Object.assign({},State.equipmentSecondParams,newObj);
	}

	onchangeDoorType=(doorType)=>{
		console.log("doorType",doorType);
		var doorTypeReal
		if(doorType){
			doorTypeReal = doorType.value;
		}else{
			doorTypeReal = '';
		}
		
		State.equipmentSecondParams =  {
			communityId: State.equipmentSecondParams.communityId,
	        deviceId : State.equipmentSecondParams.deviceId || '',
	        doorCode : State.equipmentSecondParams.doorCode || '',
	        doorType : doorTypeReal,
	        floor : State.equipmentSecondParams.floor,
	        page : State.realPage,
	        pageSize: 15,
	        date: new Date()
		}
		
	}

	onSearchSubmit=(value)=>{
		
		var newObj;
		if(value.filter == "doorCode"){

			
		    newObj ={
				    	doorCode: value.content,
				    	deviceId: ''
				    }

		}else{
		    
		    
		    newObj ={
				    	deviceId: value.content,
				    	doorCode: ''
				    }
	    }

	    var objNewT = Object.assign({},State.equipmentSecondParams);
	    State.equipmentSecondParams = Object.assign({},objNewT,newObj);

	}

	render(){
		let {floorsOptions}=this.state;
		const { error, handleSubmit,content,filter} = this.props;
		let options=[{
		      label:"门编号",
		      value:"doorCode"
		    },{
		      label:"硬件编号",
		      value:"deviceId"
		    }]
	   
		// 属性待选项
		let propertyOption=[{
			label: '大门',
			value: 1
		},{
			label: '会议室',
			value: 2
		}]
		
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
						style={{width:190}}
						inline={true}
						onChange = {this.onchangeFloor}
					/>
				</span>
				<span className="thir-span">
					<KrField name="propertyId"
						component="select"
						label="属性: "
						onChange = {this.onchangeDoorType}
						options={propertyOption}
						style={{width:'190px'}}
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
