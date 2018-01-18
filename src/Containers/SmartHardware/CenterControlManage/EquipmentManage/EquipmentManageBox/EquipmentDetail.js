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
			if(detail.deviceVO){
				$("#center-control-report").html(_this.syntaxHighlight(detail.deviceVO.reported));
				$("#center-control-desired").html(_this.syntaxHighlight(detail.deviceVO.desired));
			}
		})
		if(detail.deviceVO){
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
		}else{
			_this.setState({
				showReported : false,
				showDesired :false
			})
		}
		
			
		
	}
	closeDialog=()=>{
		State.openCenterControlDetail= false;
	}

	freshEquipmentReporter=()=>{
		let {detail} = this.props;
		let _this = this;
		State.freshPageReturn();
		var urlParams = {deviceId:detail.deviceVO.deviceId}
		Http.request('freshReporteInfoUrl',urlParams).then(function(response) {
			$("#center-control-report").html(_this.syntaxHighlight(response.reported));
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

	renderSpaceType=()=>{
		let spaceType = this.props.detail.spaceType;

		var spaceTypeOption = [{label:"会议室",value:"MEETING"},
								{label:"大厅",value:"HALL"},
								{label:"独立办公室",value:"OFFICE"}]
		var spaceTypeLabel = '无';
		for(var i =0;i<spaceTypeOption.length;i++){
			if(spaceType==spaceTypeOption[i].value){
				spaceTypeLabel=spaceTypeOption[i].label;
				return spaceTypeLabel;
			}
		}
		return spaceTypeLabel;
	}


	
	returnDeviceType=()=>{

		var deviceType = this.props.detail.deviceType;
		var deviceTypeOption = [{label:"灯",value:"LAMP"},
								{label:"雾化膜",value:"ATOMIZATION_MEMBRANE"},
								{label:"空调",value:"AIR_CONDITION"},
								{label:"空气质量仪",value:"AIR_SENSOR"},
								{label:"温湿度计",value:"HUMITURE_SENSOR"},
								{label:"人体感应器",value:"BODY_SENSOR"},
								{label:"网关面板",value:"GATEWAY_PANEL"},
							]
		var deviceTypeLabel = '无';
		for(var i =0;i<deviceTypeOption.length;i++){
			if(deviceType==deviceTypeOption[i].value){

				deviceTypeLabel=deviceTypeOption[i].label;
				
				return deviceTypeLabel;
			}
		}
		return deviceTypeLabel;
	}

	returnConnectStatus=()=>{
		let connectStatus = this.props.detail.connected;
		if(connectStatus){
			return <span style={{color:"green"}}>是</span>
		}else{
			return <span style={{color:"red"}}>否</span>
		}
		
	}


	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		let _this =this;
		return (
			<div className="seconde-dialog">
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1 style={{marginTop:"-10px"}}>设备信息</h1>
				<div className="detail-list-equipment">
					<Button label="刷新设备上报信息" onTouchTap={this.freshEquipmentReporter} style={{width:130,margin:"0 0 20px 30px"}}/>
					<div>
						<div  style={{paddingLeft:25}}>
							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="硬件ID："
								value={detail.serialNo}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="底层固件版本："
								value={(detail.deviceVO && detail.deviceVO.driverV) || "无"}
							/>
							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="APP版本："
								value={(detail.deviceVO && detail.deviceVO.v) || "无"}
							/>
							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="IP地址："
								value={(detail.deviceVO && detail.deviceVO.ip) || "无"}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="当前连接服务器："
								value={(detail.deviceVO && detail.deviceVO.loginedServer) || "无"}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="设备类型："
								value={_this.returnDeviceType()}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="是否连接："
								value={_this.returnConnectStatus()}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="最后一次连接时间："
								value={DateFormat(detail.connectTime, "yyyy-mm-dd HH:MM:ss") || "无"}
							/>

							<KrField
								style={{width:400}}
								inline={true}
								component="labelText"
								label="最后一次更新时间："
								value={DateFormat(detail.utime, "yyyy-mm-dd HH:MM:ss") || "无"}
							/>
						</div>
						
						<div>
							<div className="tr-line-bottom"><div className="td-left" style={{fontSize:14,color:"#333",fontWeight:"normal"}}>设备上报信息:</div><div className="td-right" style={{display:showReported?"block":"none"}}><pre id="center-control-report"></pre></div></div>
							<div className="tr-line-bottom"><div className="td-left" style={{fontSize:14,color:"#333",fontWeight:"normal"}}>设备影子信息:</div><div className="td-right" style={{display:showDesired?"block":"none"}}><pre id="center-control-desired"></pre></div></div>
						</div>
					</div>
					<div style={{paddingLeft:25}}>
						<KrField
							style={{width:400}}
							inline={true}
							component="labelText"
							label="社区："
							value={detail.communityName || "无"}
						/>
						<KrField
							style={{width:400}}
							inline={true}
							component="labelText"
							label="楼层："
							value={detail.floor || "无"}
						/>
						<KrField
							style={{width:400}}
							inline={true}
							component="labelText"
							label="房间："
							value={detail.spaceName || "无"}
						/>
						<KrField
							style={{width:400}}
							inline={true}
							component="labelText"
							label="空间类型："
							value={_this.renderSpaceType()}
						/>
						<KrField
							style={{width:400}}
							inline={true}
							component="labelText"
							label="屏幕展示标题："
							value={detail.name || "无"}
						/>
						
						
						<div className="tr-line-last" style={{display:"block"}}><div className="td-left" style={{fontSize:14,color:"#333",fontWeight:"normal"}}>备注:</div><div className="td-right">{detail.memo || "无"}</div></div>

					</div>
				</div>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











