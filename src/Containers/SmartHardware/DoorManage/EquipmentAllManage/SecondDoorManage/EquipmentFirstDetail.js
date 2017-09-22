import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Message} from 'kr-ui';
import './index.less';
import $ from 'jquery';
import {Http,DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
		}
	}

	componentDidMount(){
		let {detail} = this.props;
		let _this =this;
		
	}

	closeDialog=()=>{
		State.openFirstHardwareDetail= false;
	}



	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		return (
			<div className="seconde-dialog">
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1 style={{marginTop:"-10px"}}>设备信息</h1>
				<div className="detail-list-equipment">
					<div>
						<div className="tr-line"><div className="td-left">硬件ID:</div><div className="td-right">{detail.deviceId || "无"}</div></div>
					</div>
					<div>
						<div className="tr-line"><div className="td-left">锁已连接:</div><div className="td-right">{detail.lockConnected?"是":"否"}</div></div>
						<div className="tr-line"><div className="td-left">屏幕已连接:</div><div className="td-right">{detail.screenConnected?"是":"否"}</div></div>
					</div>
					<div>
						<div className="tr-line"><div className="td-left">社区名称:</div><div className="td-right">{detail.communityName || "无"}</div></div>
						<div className="tr-line"><div className="td-left">楼层:</div><div className="td-right">{detail.floor || "无"}</div></div>
						<div className="tr-line"><div className="td-left">房间:</div><div className="td-right">{detail.roomName || "无"}</div></div>
						<div className="tr-line"><div className="td-left">门类型:</div><div className="td-right">{detail.doorTypeName || "无"}</div></div>
						<div className="tr-line"><div className="td-left">屏幕展示标题:</div><div className="td-right">{detail.title || "无"}</div></div>
						<div className="tr-line"><div className="td-left">屏幕展示编号:</div><div className="td-right">{detail.doorCode || "无"}</div></div>
						
						<div className="tr-line"><div className="td-left">厂家:</div><div className="td-right">{detail.makerName || "无"}</div></div>
						<div className="tr-line"><div className="td-left">二维码有效期:</div><div className="td-right">{DateFormat(detail.qrExpireAt, "yyyy-mm-dd HH:mm:ss") || "无"}</div></div>
						<div className="tr-line"><div className="td-left">二维码:</div><div className="td-right" style={{paddingLeft:5}}>{detail.qrImgUrl?<img src={detail.qrImgUrl} style={{width:100,height:100}}/>:<span>无</span>}</div></div>
						<div className="tr-line"><div className="td-left">二维码地址:</div><div className="td-right">{detail.qrImgUrl || "无"}</div></div>
						<div className="tr-line-last" style={{display:"block"}}><div className="td-left">备注:</div><div className="td-right">{detail.memo || "无"}</div></div>

					</div>
				</div>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











