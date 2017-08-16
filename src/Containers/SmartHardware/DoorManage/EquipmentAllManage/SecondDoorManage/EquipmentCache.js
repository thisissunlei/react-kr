import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {Button} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
import {DateFormat } from 'kr/Utils';
@ observer

export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}

	componentDidMount(){
		State.getEquipmentCache();
	}
	closeDialog=()=>{
		State.openEquipmentCache= false;
	}

	renderTableBody=()=>{
		let _this = this;
		console.log("State.equipmentCacheitems",State.equipmentCacheitems);
		var equipment_cach_list = State.equipmentCacheitems;
		var DOM_list = equipment_cach_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index-cache">{item.cardNo}</div>
					<div  className="table-item-index-cache">{item.holder}</div>
					<div  className="table-item-index-cache">{DateFormat(item.startAt,"yyyy-mm-dd HH:MM:ss")}</div>
					<div  className="table-item-index-cache">{DateFormat(item.expireAt,"yyyy-mm-dd HH:MM:ss")}</div>
				</div>
			)
		});
		return DOM_list;
	}
	
	render(){
		
		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备缓存</h1>
				<div className="detail-list-equipment search-equipment">
					
				
			        <div className="table-box">
			        	<div className="table-header">
			        		<div className="header-item-cache">卡号</div>
			        		<div className="header-item-cache">持卡人</div>
			        		<div className="header-item-cache">开始时间</div>
			        		<div className="header-item-cache">结束时间</div>
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











