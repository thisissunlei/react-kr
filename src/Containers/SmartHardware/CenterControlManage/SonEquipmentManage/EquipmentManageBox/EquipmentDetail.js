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
				
				<div className="detail-list-equipment">
					<div>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="硬件ID："
							value={detail.serialNo}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="设备类型："
							value={_this.returnDeviceType()}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="屏幕展示标题："
							value={detail.name}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="是否连接："
							value={_this.returnConnectStatus()}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="最后一次连接时间："
							value={DateFormat(detail.connectTime, "yyyy-mm-dd HH:MM:ss") || "无"}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="最后一次更新时间："
							value={DateFormat(detail.utime, "yyyy-mm-dd HH:MM:ss") || "无"}
						/>

						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="社区名称："
							value={detail.communityName || "无"}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="楼层："
							value={detail.floor  || "无"}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="空间类型："
							value={_this.renderSpaceType()}
						/>
						<KrField
							style={{width:300}}
							name="customerId"
							inline={true}
							component="labelText"
							label="房间："
							value={detail.spaceName}
						/>
						{
							(deviceType=="LAMP"||deviceType=="ATOMIZATION_MEMBRANE"||deviceType=="AIR_CONDITION") &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="开关状态："
								value={(detail.extra && detail.extra.on && detail.extra.on?"开启":"关闭")||"无数据"}
							/>
						}
						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="空调模式："
								value={this.renderAirConditionMode(detail.extra.mode)}
							/>
						}

						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="空调风速："
								value={this.renderAirConditionWindSpeed(detail.extra.speed)}
							/>
						}

						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="空调风速："
								value={detail.extra && detail.extra.temp+"℃"}
							/>
						}



						{
							deviceType=="HUMITURE_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="温度："
								value={detail.extra && detail.extra.temp+"℃"}
							/>
						}

						{
							deviceType=="HUMITURE_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="湿度："
								value={detail.extra && detail.extra.humidity}
							/>
						}

						{
							deviceType=="AIR_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="PM2.5："
								value={detail.extra && detail.extra.pm25}
							/>
						}


						{
							deviceType=="AIR_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="PM10："
								value={detail.extra && detail.extra.pm10}
							/>
						}	

						{
							deviceType=="AIR_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="PM2510："
								value={detail.extra && detail.extra.pm2510}
							/>
						}

						{
							deviceType=="BODY_SENSOR" &&
							<KrField
								style={{width:300}}
								name="customerId"
								inline={true}
								component="labelText"
								label="PM2510："
								value={detail.extra && detail.extra.hasBody?"有人":"无人"}
							/>
						}
		
		
						
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











