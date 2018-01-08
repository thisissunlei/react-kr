import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,Message} from 'kr-ui';
import {
	Toggle
}from 'material-ui';
import './index.less';
import {Http} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			switch :false,
			searchEquipmentList:[]
		}
	}

	changeSearchEquipment=(event,isInputChecked)=>{
		this.setState({
			switch : isInputChecked
		})
		State.changeSwitchStatusAction({onOff:isInputChecked})
	}

	componentWillReceiveProps(nextProps){
	}

	componentDidMount(){
		this.getWitchFind()
		this.getUnusedEquipmentFun();
	}

	getUnusedEquipmentFun =()=>{
		let _this = this;
		let {serialNo} = this.props;
		var param = {serialNo : serialNo}
		Http.request('findNewSonEquipment', param).then(function(response) {
			_this.setState({
				searchEquipmentList : response.items
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	


	getWitchFind =(callBack)=>{
		let _this = this;
		Http.request('getSwitchStatusUrl',{}).then(function(response) {
			_this.setState({
				switch:response.onOff
			})
		}).catch(function(err) {
			Message.error(err.message);
		});

	}


	closeDialog=()=>{
		State.openSearchEquipment= false;
	}


	addEquipmentFun=(thisParams,item)=>{
		let {registEquipment} = this.props;
		registEquipment && registEquipment(thisParams.deviceId);
	}


	//发现设备列表强制删除
	deleteEquipmentFun=(thisP)=>{

		let {serialNo} =this.props;
		let _this =this;
		var urlParams = {localNo:thisP.localNo,serialNo : serialNo,deviceType:thisP.deviceType}
		Http.request('deleteFindSonEquipment',{},urlParams).then(function(response) {
			
			Message.success("强制删除设备成功");
			_this.getUnusedEquipmentFun();
			

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	//注册设备
	registEquipmentFun=(thisP)=>{

		let {serialNo} =this.props;
		let _this =this;
		var urlParams = {localNo:thisP.localNo,serialNo : serialNo,deviceType:thisP.deviceType}
		Http.request('regesterSonEquipment',{},urlParams).then(function(response) {

			Message.success("注册设备成功");
			_this.getUnusedEquipmentFun();
			State.freshPageReturn();
			_this.setState({
				itemDetail : response
			},function(){
				State.openEditDialog = true;
				let {registeEquipment} = _this.props;
				registeEquipment && registeEquipment(response);
			})

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	renderTableBody=(searchEquipmentList)=>{
		let _this = this;
		var search_equipment_list = searchEquipmentList;
		var DOM_list = search_equipment_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index">{item.localNo}</div>
					<div  className="table-item-index">{item.deviceType}</div>
					<div className="table-item-index"> 
						<div  className="table-item-last" onClick={_this.registEquipmentFun.bind(this,item)}>注册设备</div>
						<div  className="table-item-last" onClick={_this.deleteEquipmentFun.bind(this,item)}>强制删除</div>
					</div>
				</div>
			)
		});
		return DOM_list;
	}
	
	render(){
		let {searchEquipmentList} = this.state;
		return (
			<div className="seconde-dialog ">
				<div style={{paddingLeft:20}}>
					<span style={{display:"inline-block",width:40,height:30}}>
					<Toggle 
						toggled={this.state.switch} 
						label="是否自动发现设备" 
						labelPosition="right"
						labelStyle={{fontSize:14,width:120,marginTop:5}} 
						onToggle={this.changeSearchEquipment}
						trackStyle={{height:25,lineHeight:25}}
						thumbStyle={{marginTop:5}}
					/>
					</span>
					
					
				</div>
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备发现</h1>

				<div className="detail-list-equipment  find-son-equipment">
					
				
			        <div className="table-box">
			        	<div className="table-header-find-son">
			        		<div className="header-item">局部编号</div>
			        		<div className="header-item">设备类型</div>
			        		<div className="header-item">操作</div>
			        	</div>
			        	<div className="table-body">
			        		{
			        			this.renderTableBody(searchEquipmentList)
			        		}
			        	</div>
			        </div>
				</div>
				<img src={require("./images/selectOne.svg")} className="end-img"/>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











