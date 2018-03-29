import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {Button,Message,Loading} from 'kr-ui';
import './index.less';

import {DateFormat,Http} from 'kr/Utils';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer

export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			loading :false,
			itemDetail:{},
			cachedeviceId : '',
			equipmentCacheitems : [],
			isAll : false,
			itemsZero : false
		}
	}

	componentDidMount(){
		let {equipmentCachedItems} = this.props;
		this.setState({
			equipmentCacheitems :equipmentCachedItems,
			itemDetail:State.itemDetail
		})

		this.scrollTable();
	}

	scrollTable = ()=>{
		let _this =this;
		var DomOuter = document.getElementsByClassName("table-body")[0];
		var DomInner = document.getElementsByClassName("table-body-box")[0];
		console.log("DomOuter",DomOuter);
		DomOuter.onscroll = function(){
			console.log("DomInner.offsetHeight",DomInner.offsetHeight);
			console.log("this.scrollTop",this.scrollTop,"this.offsetHeight",this.offsetHeight)
			if(this.scrollTop+this.offsetHeight+20>=DomInner.offsetHeight){
				
				_this.getEquipmentCache();
			}
		}
	}
	closeDialog=()=>{
		State.openEquipmentCache= false;
	}

	//获取设备缓存列表
	getEquipmentCache=()=>{
		let _this = this;
		if(!_this.state.loading && !_this.state.isAll){
			_this.setState({
				loading : true
			})
			
			var lastCardNoParams=null;
			// console.log("lastCardNoParams",lastCardNoParams);
			let {equipmentCacheitems} = _this.state;
			if(equipmentCacheitems.length>0){
				// console.log("length-1",equipmentCacheitems.length-1,"equipmentCacheitems",equipmentCacheitems);
				lastCardNoParams = equipmentCacheitems[equipmentCacheitems.length-1].cardNo 
			}
			
			
			var urlParams = {
							deviceId:_this.state.itemDetail.deviceId,
							lastCardNo:lastCardNoParams,
							limit:50,
						}
			Http.request('getEquipmentCacheURL',urlParams).then(function(response) {
				var oldItems = _this.state.equipmentCacheitems;
				if(response.list.length <50){
					_this.setState({
						isAll : true
					})
				}
				if(!urlParams.lastCardNo){
					_this.setState({
						equipmentCacheitems : oldItems.concat(response.list)
					},function(){
						if(_this.state.equipmentCacheitems.length==0){
							_this.setState({
								itemsZero : true
							})
						}
					})
				}else{
					_this.setState({
						equipmentCacheitems : response.list
					},function(){
						if(_this.state.equipmentCacheitems.length==0){
							_this.setState({
								itemsZero : true
							})
						}
					})
				}
				_this.setState({
					loading : false
				})
			}).catch(function(err) {
				State.openEquipmentCache = false;
				Message.error(err.message);
				_this.setState({
					loading : false
				})
			});
		}
	}


	renderTableBody=(equipment_cach_list)=>{
		let _this = this;

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
		let {isAll,itemsZero,loading,equipmentCacheitems} = this.state;
		// console.log("equipmentCacheitems",equipmentCacheitems);
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
			        		<div className="table-body-box">
			        			
				        		{
				        			this.renderTableBody(equipmentCacheitems)
				        		}
			        		</div>
			        		{isAll && !itemsZero&& <div style={{textAlign:'center',margin:"10px 0"}}>以上是全部数据</div>}
			        		{loading && <Loading/>}
			        		{itemsZero &&  <div style={{marginTop:100}}>
				        						<img src={require("../images/nothings.png")} style={{display:"block",margin:"0 auto"}}/>
				        						<div style={{width:"100%",textAlign:"center",marginTop:10}}>暂时没有数据</div>
			        						</div>}
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











