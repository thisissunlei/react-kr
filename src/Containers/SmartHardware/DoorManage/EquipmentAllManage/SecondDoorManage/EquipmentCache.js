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
		console.log("State.itemDetail",State.itemDetail);
		this.setState({
			itemDetail:State.itemDetail
		},function(){
			this.getEquipmentCache();
			this.scrollTable();
		})
		
	}

	scrollTable = ()=>{
		let _this =this;
		var DomOuter = document.getElementsByClassName("table-body")[0];
		DomOuter.onscroll = function(){
			console.log("this.scrollTop",this.scrollTop,"this.offsetHeight",this.offsetHeight,"this.scrollHeight",this.scrollHeight);
			if(this.scrollTop+this.offsetHeight+10>=this.scrollHeight){
				
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
			console.log("_this.state.itemDetail",_this.state.itemDetail);
			//首次请求 cachedeviceId=""
			if(_this.state.cachedeviceId !==_this.state.itemDetail.deviceId){
				_this.setState({
					cachedeviceId : _this.state.itemDetail.deviceId
				})
				var urlParams = {
								deviceId:_this.state.itemDetail.deviceId,
								lastCardNo:'',
								limit:50,
							}
			}else{
				var lastCardNoParams=null;
				if(_this.state.equipmentCacheitems.length>0){
					lastCardNoParams = _this.state.equipmentCacheitems[length-1].cardNo 
				}else{
					lastCardNoParams = null
				}
				
				var urlParams = {
								deviceId:_this.state.itemDetail.deviceId,
								lastCardNo:lastCardNoParams,
								limit:50,
							}
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


	renderTableBody=()=>{
		let _this = this;

		var equipment_cach_list = _this.state.equipmentCacheitems;
		var DOM_list = equipment_cach_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index-cache">{item.cardNo}</div>
					<div  className="table-item-index-cache">{item.holder}</div>
					<div  className="table-item-index-cache">{DateFormat(item.startAt,"yyyy-mm-dd HH:MM:ss")}</div>
					<div  className="table-item-index-cache">{DateFormat(item.expireAt,"yyyy-mm-dd HH:MM:ss")}</div>
					<div  className="table-item-index-cache">1111111</div>
				</div>
			)
		});
		return DOM_list;
	}
	
	render(){
		let {isAll,itemsZero,loading} = this.state;
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
			        		<div className="header-item-cache">结束时间</div>
			        	</div>
			        	<div className="table-body">
			        		<div className="table-body-box">
			        			
				        		{
				        			this.renderTableBody()
				        		}
			        		</div>
			        		{isAll && !itemsZero&& <div>以上是全部数据</div>}
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











