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
			searchEquipmentList:[]
		}
	}

	componentDidMount(){

		
		this.getUnusedEquipmentFun({});
	}

	getUnusedEquipmentFun =(param)=>{
		let _this = this;
		let {serialNo} = this.props;
		let paramOld = {serialNo : serialNo,forceRefresh : false};
		let newParam = Object.assign(paramOld,param);
		Http.request('findNewSonEquipment', newParam).then(function(response) {
			_this.setState({
				searchEquipmentList : response.items
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
			var param = {date:new Date()}
			_this.getUnusedEquipmentFun(param);
			

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

			var param = {date:new Date()}
			_this.getUnusedEquipmentFun(param);

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
	freshPage=()=>{
		var param = {date: new Date()}
		this.getUnusedEquipmentFun(param)
	}

	freshPageForce=()=>{
		var param = {date: new Date(),forceRefresh:true}
		this.getUnusedEquipmentFun(param)
	}

	render(){
		let {searchEquipmentList} = this.state;
		return (
			<div>
				<div style={{padding:"30px 0 0 50px"}}>
					<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				</div>
				<div className="son-equipment-btn-box-find">
					<div className="btn" onClick={this.freshPage}>刷新</div>
					<div className="btn" onClick={this.freshPageForce}>强制刷新</div>
				</div>

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
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











