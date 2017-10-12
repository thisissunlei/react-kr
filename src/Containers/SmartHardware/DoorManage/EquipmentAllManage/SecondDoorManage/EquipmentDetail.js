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
			itemDetail:{},
			showReported : true,
			showDesired :true
		}
	}

	componentDidMount(){
		let {detail} = this.props;
		let _this =this;
		_this.setState({
			itemDetail :detail
		},function(){
			$("#json-str-report").html(_this.syntaxHighlight(detail.deviceVO.reported));
			$("#json-str-desired").html(_this.syntaxHighlight(detail.deviceVO.desired));
		})
		if(!detail.deviceVO.reported||JSON.stringify(detail.deviceVO.reported).length<1){
			_this.setState({
				showReported : false
			})
		}
		if(!detail.deviceVO.desired||JSON.stringify(detail.deviceVO.desired).length<1){
			_this.setState({
				showDesired : false
			})
		}
			
		
	}
	closeDialog=()=>{
		State.openHardwareDetail= false;
	}

	freshEquipmentReporter=()=>{
		let {detail} = this.props;
		let _this = this;
		State.freshPageReturn();
		var urlParams = {deviceId:detail.deviceVO.deviceId}
		Http.request('freshReporteInfoUrl',urlParams).then(function(response) {
			
			$("#json-str-report").html(_this.syntaxHighlight(response.reported));
			Message.success("刷新成功");
			if(!response.reported||JSON.stringify(response.reported).length<1){
				_this.setState({
					showReported : false
				})
			}else{
				_this.setState({
					showReported : true
				})
			}
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	
	syntaxHighlight=(json)=>{
		if(!json){
			return;
		}
		json = JSON.parse(json);
	    if (typeof json != 'string') {
	        json = JSON.stringify(json, undefined, 2);
	    }
	    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
	        var cls = 'number';
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            } else {
	                cls = 'string';
	            }
	        } else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        } else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
	    });
	}


	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		var params = detail.deviceVO;
		console.log("params",params);
		return (
			<div className="seconde-dialog">
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1 style={{marginTop:"-10px"}}>设备信息</h1>
				<div className="detail-list-equipment">
					<Button label="刷新设备上报信息" onTouchTap={this.freshEquipmentReporter} style={{width:130,margin:"0 0 20px 30px"}}/>
					<div>
						<div className="tr-line"><div className="td-left">硬件ID:</div><div className="td-right">{params.deviceId || "无"}</div></div>
						<div className="tr-line"><div className="td-left">标记:</div><div className="td-right">{params.name || "无"}</div></div>
						<div className="tr-line"><div className="td-left">底层固件版本:</div><div className="td-right">{params.driverV || "无"}</div></div>
						<div className="tr-line"><div className="td-left">APP版本:</div><div className="td-right">{params.v || "无"}</div></div>
						<div className="tr-line"><div className="td-left">IP地址:</div><div className="td-right">{params.ip || "无"}</div></div>
						<div className="tr-line"><div className="td-left">当前连接服务器:</div><div className="td-right">{params.loginedServer || "无"}</div></div>
						
						<div>
							<div className="tr-line-bottom"><div className="td-left">设备上报信息:</div><div className="td-right" style={{display:showReported?"block":"none"}}><pre id="json-str-report"></pre></div></div>
							<div className="tr-line-bottom"><div className="td-left">设备影子信息:</div><div className="td-right" style={{display:showDesired?"block":"none"}}><pre id="json-str-desired"></pre></div></div>
						</div>
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











