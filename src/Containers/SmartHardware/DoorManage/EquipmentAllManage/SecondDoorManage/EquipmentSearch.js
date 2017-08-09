import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}

	onOperation=()=>{

	}

	componentWillReceiveProps(nextProps){
	}

	componentDidMount(){
	}
	closeDialog=()=>{
		State.openSearchEquipment= false;
	}


	addEquipmentFun=(thisParams,item)=>{
		State.equipmentAddLocation(thisParams.deviceId);
	}
	renderTableBody=()=>{
		let _this = this;
		var search_equipment_list = State.searchEquipmentList;
		var DOM_list = search_equipment_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index">{item.deviceId}</div>
					<div  className="table-item-index">{item.driverV}</div>
					<div  className="table-item-index">{item.ip}</div>
					<div  className="table-item-index">{item.mem}</div>
					<div  className="table-item-index">{item.name}</div>
					<div  className="table-item-index">{item.rom}</div>
					<div  className="table-item-index">{item.sd}</div>
					<div  className="table-item-index">{item.v}</div>
					<div  className="table-item-index table-item-last" onClick={_this.addEquipmentFun.bind(this,item)}>添加</div>
				</div>
			)
		});
		return DOM_list;
	}
	
	render(){
		
		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备搜索</h1>
				<div className="detail-list-equipment search-equipment">
					
				
			        <div className="table-box">
			        	<div className="table-header">
			        		<div className="header-item">硬件ID</div>
			        		<div className="header-item">固件版本</div>
			        		<div className="header-item">IP地址</div>
			        		<div className="header-item">内存</div>
			        		<div className="header-item">标记</div>
			        		<div className="header-item">存储容量</div>
			        		<div className="header-item">sd容量</div>
			        		<div className="header-item">app版本</div>
			        		<div className="header-item">操作</div>
			        	</div>
			        	<div className="table-body">
			        		{
			        			this.renderTableBody()
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











