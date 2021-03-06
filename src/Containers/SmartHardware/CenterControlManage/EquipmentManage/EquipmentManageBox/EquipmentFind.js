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


	componentDidMount(){
		this.getWitchFind()
		this.getUnusedEquipmentFun();
	}

	getUnusedEquipmentFun =()=>{
		let _this = this;
		Http.request('findFatherCenterControlEquipment', {}).then(function(response) {
			_this.setState({
				searchEquipmentList : response.items
			})
		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
		});
	}
	




	getWitchFind =(callBack)=>{
		let _this = this;
		Http.request('getSwitchStatusUrl',{}).then(function(response) {
			_this.setState({
				switch:response.onOff
			})
		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
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
		let _this =this;
		var urlParams = {serialNo:thisP.deviceId}
		Http.request('deleteCenterControlEquipment',{},urlParams).then(function(response) {
			
			Message.warntimeout("强制删除设备成功",'success');
			_this.getUnusedEquipmentFun();
			

		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
		});
	}


	//注册设备
	registEquipmentFun=(thisP)=>{
		let _this =this;
		var urlParams = {serialNo:thisP.deviceId}
		Http.request('startCenterControlEquipment',{},urlParams).then(function(response) {

			Message.warntimeout("注册设备成功",'success');
			
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
			Message.warntimeout(err.message,'error');
		});
	}


	renderTableBody=(searchEquipmentList)=>{
		let _this = this;
		var search_equipment_list = searchEquipmentList;
		var DOM_list = search_equipment_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index">{item.deviceId}</div>
					<div  className="table-item-index">{item.driverV}</div>
					<div  className="table-item-index">{item.v}</div>
					<div  className="table-item-index">{item.ip}</div>
					<div  className="table-item-index">{item.name}</div>
					<div className="table-item-index"> 
						<div  className="table-item-last" onClick={_this.registEquipmentFun.bind(this,item)}>添加设备</div>
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
			<div className="seconde-dialog">
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

				<div className="detail-list-equipment search-equipment">
					
				
			        <div className="table-box">
			        	<div className="table-header">
			        		<div className="header-item">硬件ID</div>
			        		<div className="header-item">固件版本</div>
			        		<div className="header-item">APP版本</div>
			        		<div className="header-item">IP地址</div>
			        		<div className="header-item">标记</div>
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











