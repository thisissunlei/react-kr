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

		let {detail} = this.props;
		let connectStatus = detail.connected;
		
		if(connectStatus){
			return <span style={{color:"green"}}>是</span>
		}else{
			return <span style={{color:"red"}}>否</span>
		}
		
	}

	renderAirConditionMode=(param)=>{
		if(param.extra){
			var paramMode = param.extra.mode;
			if(paramMode == "HEATING"){
				return "制热"			
			}else if(paramMode == "COOLING"){
				return "制冷"			
			}
		}else{
			return "无"
		}
		
	
	}

	renderAirConditionWindSpeed=(param)=>{
		if(param.extra){
			var paramMode = param.extra.speed;
			if(paramMode == "HIGH"){
				return "高速"			
			}else if(paramMode == "LOW"){
				return "低速"			
			}else{
				return "中速"
			}
		}else{
			return "无"
		}
	
	}




	render(){
		let {detail} = this.props;
		let {showReported,showDesired} = this.state;
		var deviceType = this.props.detail.deviceType;
		let _this =this;
		return (
			<div style={{padding :"18px 0 0 20px"}}>
				
				<div className="detail-list-equipment">
					<div>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="硬件ID："
							value={detail.serialNo}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="设备类型："
							value={_this.returnDeviceType()}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="屏幕展示标题："
							value={detail.name || "无"}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="是否连接："
							value={_this.returnConnectStatus()}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="最后一次连接时间："
							value={DateFormat(detail.connectTime, "yyyy-mm-dd HH:MM:ss") || "无"}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="最后一次更新时间："
							value={DateFormat(detail.utime, "yyyy-mm-dd HH:MM:ss") || "无"}
						/>

						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="社区名称："
							value={detail.communityName || "无"}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="楼层："
							value={detail.floor  || "无"}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="空间类型："
							value={_this.renderSpaceType()}
						/>
						<KrField
							style={{width:300}}
							inline={true}
							component="labelText"
							label="房间："
							value={detail.spaceName || "无"}
						/>
						{
							(deviceType=="LAMP"||deviceType=="ATOMIZATION_MEMBRANE"||deviceType=="AIR_CONDITION") &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="开关状态："
								value={(detail.extra && (detail.extra.on?"开启":"关闭"))||"无"}
							/>
						}
						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="空调模式："
								value={this.renderAirConditionMode(detail)}
								
								/>
						}

						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="空调风速："
								value={this.renderAirConditionWindSpeed(detail)}
							/>
						}

						{
							deviceType=="AIR_CONDITION" &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="空调设置温度："
								value={(detail.extra && detail.extra.temp+"℃") || "无"}
							/>
						}



						{
							deviceType=="HUMITURE_SENSOR" &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="温度："
								value={(detail.extra && detail.extra.temp+"℃") || "无"}
							/>
						}

						{
							deviceType=="HUMITURE_SENSOR" &&
							<KrField
								style={{width:300}}
								inline={true}
								component="labelText"
								label="湿度："
								value={(detail.extra && detail.extra.humidity)|| "无"}
							/>
						}

						{
							deviceType=="AIR_SENSOR" &&
							<KrField
								style={{width:300}}
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
								inline={true}
								component="labelText"
								label="是否有人："
								value={(detail.extra && (detail.extra.hasBody?"有人":"无人"))||"无数据"}
							/>
						}
						<KrField
							style={{width:700}}
							inline={true}
							component="labelText"
							label="备注："
							value={detail.memo || "无"}
						/>
		

					</div>
				</div>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











