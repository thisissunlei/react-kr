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
		})
	}

	closeDialog=()=>{
		State.openSonEquipmentDetail= false;
	}


	renderSpaceType=()=>{
		let spaceType = this.props.detail.spaceType;

		var spaceTypeOption =State.SpaceType;
		var spaceTypeLabel = '无';
		for(var i =0;i<spaceTypeOption.length;i++){
			if(spaceType==spaceTypeOption[i].value){
				spaceTypeLabel=spaceTypeOption[i].label;
				console.log("i",i);
				return spaceTypeLabel;
			}
		}
		return spaceTypeLabel;
	}


	
	returnDeviceType=()=>{

		var deviceType = this.props.detail.deviceType;
		var deviceTypeOption =State.sonEquipmentTypeOptions;
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

	renderAirConditionMode=(param)=>{
		if(param == "HEATING"){
			return "制热"			
		}else if(param == "REFRIGERATION"){
			return "制冷"			
		}
	}

	renderAirConditionWindSpeed=(param)=>{
		if(param == "HIGH"){
			return "高速"			
		}else if(param == "LOW"){
			return "低速"			
		}else{
			return "自动"
		}
	}




	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		var deviceType = this.props.detail.deviceType;
		console.log("deviceType",deviceType);
		let _this =this;
		return (
			<div style={{padding :"40px 0 0 20px"}}>
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				
				<div className="detail-list-equipment">
					<div>
						<div className="tr-line"><div className="td-left">硬件ID:</div><div className="td-right">{detail.serialNo || "无"}</div></div>
						<div className="tr-line"><div className="td-left">设备类型:</div><div className="td-right">{_this.returnDeviceType()}</div></div>
						<div className="tr-line"><div className="td-left">屏幕展示标题:</div><div className="td-right">{detail.name || "无"}</div></div>
						<div className="tr-line"><div className="td-left">是否连接:</div><div className="td-right">{_this.returnConnectStatus()}</div></div>
						<div className="tr-line"><div className="td-left">最后一次连接时间:</div><div className="td-right">{DateFormat(detail.connectTime, "yyyy-mm-dd HH:MM:ss") || "无"}</div></div>
						<div className="tr-line"><div className="td-left">最后一次更新时间:</div><div className="td-right">{DateFormat(detail.utime, "yyyy-mm-dd HH:MM:ss") || "无"}</div></div>
						<div className="tr-line"><div className="td-left">社区名称:</div><div className="td-right">{detail.communityName || "无"}</div></div>
						<div className="tr-line"><div className="td-left">楼层:</div><div className="td-right">{detail.floor || "无"}</div></div>
						<div className="tr-line"><div className="td-left">空间类型:</div><div className="td-right">{_this.renderSpaceType()}</div></div>
						<div className="tr-line"><div className="td-left">房间:</div><div className="td-right">{detail.spaceName || "无"}</div></div>
						
						{(deviceType=="LAMP"||deviceType=="ATOMIZATION_MEMBRANE"||deviceType=="AIR_CONDITION") &&<div className="tr-line"><div className="td-left">开关状态</div><div className="td-right">{detail.extra && detail.extra.on?"开启":"关闭"}</div></div>}
						{deviceType=="AIR_CONDITION" &&<div className="tr-line"><div className="td-left">空调模式</div><div className="td-right">{
							this.renderAirConditionMode(detail.extra.mode)
						}</div></div>}
						{deviceType=="AIR_CONDITION" &&<div className="tr-line"><div className="td-left">空调风速</div><div className="td-right">{
							this.renderAirConditionWindSpeed(detail.extra.speed)
						}</div></div>}
						{deviceType=="AIR_CONDITION" &&<div className="tr-line"><div className="td-left">空调设置温度</div><div className="td-right">{detail.extra && detail.extra.temp+"℃"}</div></div>}
						{deviceType=="HUMITURE_SENSOR" &&<div className="tr-line"><div className="td-left">温度</div><div className="td-right">{detail.extra && detail.extra.temp+"℃"}</div></div>}
						{deviceType=="HUMITURE_SENSOR" &&<div className="tr-line"><div className="td-left">湿度</div><div className="td-right">{detail.extra && detail.extra.humidity}</div></div>}
						{deviceType=="AIR_SENSOR" &&<div className="tr-line"><div className="td-left">PM2.5</div><div className="td-right">{detail.extra && detail.extra.pm25}</div></div>}
						{deviceType=="AIR_SENSOR" &&<div className="tr-line"><div className="td-left">PM10</div><div className="td-right">{detail.extra && detail.extra.pm10}</div></div>}
						{deviceType=="AIR_SENSOR"  &&<div className="tr-line"><div className="td-left">PM2510</div><div className="td-right">{detail.extra && detail.extra.pm2510}</div></div>}
						{deviceType=="BODY_SENSOR"  &&<div className="tr-line"><div className="td-left">是否有人</div><div className="td-right">{detail.extra && detail.extra.hasBody?"有人":"无人"}</div></div>}
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











