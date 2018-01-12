



import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {Button,Message,Loading,KrField} from 'kr-ui';
import './index.less';

import Toggle from 'material-ui/Toggle';
import {DateFormat,Http} from 'kr/Utils';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer

class ControlCenterControl extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageInfo : {},
			lampItems : [],
			airConditionSwitchOn : false,
			windSpeed : '',
			mode : '',
			airConditionSetTemp : 16,
			title : ''
		}
	}

	componentDidMount(){
		
		this.getNowInfo();
	}

	getNowInfo=()=>{
		let {detail} = this.props;
		let _this =this;
		Http.request('getControlAllInfo',{serialNo:detail.serialNo}).then(function(response) {
			console.log("response",response);
			
			_this.setState({
				pageInfo : response,
				title : response.title ,
				airConditionSetTemp :(response.airCondition && response.airCondition.temp) || "",
				lampItems : (response.allDevice &&response.allDevice.switchers)||[],
				airConditionSwitchOn : (response.airCondition && response.airCondition.on)||false,
				windSpeed :(response.airCondition && response.airCondition.speed)||"",
				mode :(response.airCondition && response.airCondition.mode) || ""
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}



	onSubmit=()=>{

	}

	renderRadioBox=(param)=>{
		let _this =this;
		var arrData =	[{label:"制冷",value:"COOLING"},{label:"制热",value:"HEATING"}];
		for(var i =0;i<arrData.length;i++){
			if(arrData[i].value == param){
				arrData[i].checked= true;
			}else{
				arrData[i].checked= false;
			}
		}	

		var dom = arrData.map(function(item,index){
			return (
				<span key={index}  className="wind-speed-checkbox">
					<span  className="speed-label">{item.label}</span>
					<input type="radio" name = "mode" value={item.value} checked={item.checked} onChange={(event)=>{_this.onChangeMode(event,item,index)}} />
				</span>
			)
		})
		return dom;
	}


	onCancel=()=>{
		State.ControlCenterControl= false;
	}

	renderWindSpeedRadio=(param)=>{
		console.log("param",param);
		let _this = this;
		var arrData =	[{label:"高速",value:"HIGH"},{label:"低速",value:"LOW"},{label:"中速",values : 'MEDIUM'}];
		for(var i =0;i<arrData.length;i++){
			if(arrData[i].value == param){
				arrData[i].checked= true;
			}else{
				arrData[i].checked= false;
			}
		}		
		var dom = arrData.map(function(item,index){

			return (
				<span key={index} className="wind-speed-checkbox">
					<span className="speed-label">{item.label}</span>
					<input type="radio" name = "speed" value={item.value} checked={item.checked} onChange={(event)=>{_this.onChangeSpeed(event,item,index)}} />
				</span>
			)
		})
		return dom;
	}


	onChangeSpeed=(e)=>{
		console.log("e",e.target.value);
		let {detail} = this.props;
		let _this=this;
		console.log("detail",detail);
		var urlParams = {serialNo:detail.serialNo,speed : e.target.value}
		Http.request('setAirConditionWindSpeedAll',{},urlParams).then(function(response) {
			Message.success("设置成功");
			_this.setState({
				windSpeed :  e.target.value
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	onChangeMode=(e)=>{
		console.log("e",e.target.value);
		let {detail} = this.props;
		let _this=this;
		console.log("detail",detail);
		var urlParams = {serialNo:detail.serialNo,mode : e.target.value}
		Http.request('setAirConditionModeAll',{},urlParams).then(function(response) {
			Message.success("设置成功");
			_this.setState({
				mode :  e.target.value
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	

	renderLamps=(param)=>{
	
		console.log("param",param);
		let _this = this;
		var dom = param.map(function(item,index){
			return(
				<div  className={"lamp-item"+index%3} key={index} >
					<Toggle
					label={item.name+"："}
					defaultToggled={item.on}
					style={{marginBottom: 16,}}
					onToggle={_this.onToggleSingleLamp.bind(this,item)}
					/>
				</div>
			)
		})
		return dom;
	}




	renderTemprature=(paramTemp)=>{

		let _this =this;
		let {pageInfo,airConditionSetTemp} = this.state;
		var arr = []
		for(var i =15;i<36;i++){
			var avtiveBool = paramTemp == i?true : false;
			var obj = {value: i, active :avtiveBool }
			arr.push(obj);
		}
		var dom ;
		dom = arr.map(function(item,index){
			return(
				<span key={index} className={item.active?"temprature-btn-active":"temprature-btn"} onClick={_this.changeTemperature.bind(_this,item)}>{item.value}</span>
			)

		})
		return dom;
	}

	changeTemperature=(item)=>{
		console.log("item",item);

		let _this = this;
		let {detail} = this.props;
		var urlParams = {serialNo : detail.serialNo,temp : item.value}
		Http.request('setAirConditionTemperatureAll',{},urlParams).then(function(response) {
			Message.success("设置成功");
			_this.setState({
				airConditionSetTemp : item.value
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	onToggleSingleLamp=(item)=>{
		console.log("item",item);
		
		let _this = this;
		let {detail} = this.props;
		var urlParams = {serialNo : detail.serialNo,temp : !item.on,localNo : item.localNo}
		Http.request('SwitchOpenLampFrost',{},urlParams).then(function(response) {
			Message.success("设置成功");
			_this.changeLampItems(item,response.on)
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	changeLampItems=(item,on)=>{
		console.log("item",item,"on",on);
		var {lampItems} = this.state;
		for(var i=0;i<lampItems.length;i++){
			if(lampItems[i].localNo == item.localNo){
				lampItems[i].on = on
				return;
			}
		}
	}


	changeAirConditionSwitchOn=(e)=>{

		let _this = this;
		let {detail} = this.props;
		var urlParams = {serialNo : detail.serialNo,on : !_this.state.airConditionSwitchOn}
		Http.request('setAirConditionSwitchOn',{},urlParams).then(function(response) {
			Message.success("设置成功");
			_this.setState({
				airConditionSwitchOn :  !_this.state.airConditionSwitchOn
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	closeAllLamps=()=>{
		let {detail} = this.props;
		var urlParams = {serialNo : detail.serialNo,on : false}
		this.controlAllLamps(urlParams);
	}

	openAllLamps=()=>{
		let {detail} = this.props;
		var urlParams = {serialNo : detail.serialNo,on : true}
		this.controlAllLamps(urlParams);
		
	}

	controlAllLamps=(param)=>{
		let _this =this;
		Http.request('setSwitchOnAllLamps',{},param).then(function(response) {
			Message.success("设置成功");
			_this.setState({
				lampItems : response.items
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	render(){
		const { error, handleSubmit, reset} = this.props;
		let {pageInfo,lampItems,airConditionSwitchOn,windSpeed,mode,airConditionSetTemp,title} = this.state;
		console.log("pageInfo",pageInfo);
		return (
			<div className="control-center-control">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="show-box">
						<KrField
							style={{width:600}}
							name="title"
							inline={true}
							component="labelText"
							label="屏幕显示标题："
							value={title}
						/>
					</div>
					<div className="show-box">
						<KrField
							style={{width:335}}
							name="customerId"
							inline={true}
							component="labelText"
							label="室内温度："
							value={(pageInfo.temp &&(pageInfo.temp+"℃")) || "无数据"}
						/>
						
						<KrField
							style={{width:335}}
							name="customerId"
							inline={true}
							component="labelText"
							label="室内湿度："
							value={(pageInfo.humidity && (pageInfo.humidity+"%") )|| "无数据"}
						/>

						<KrField
							style={{width:335}}
							name="customerId"
							inline={true}
							component="labelText"
							label="PM2.5："
							value={pageInfo.pm25||"无数据"}
						/>
					</div>
					<div className="center-control-temperature">
						<span className="center-control-line-title">设置温度：</span>
						<div className="temprature-box">
							<div className="temperature-line">
								
							</div>
							<div className="temperature-btn-box">
								{
									this.renderTemprature(airConditionSetTemp)
								}
							</div>

							
						</div>
					</div>
					<div className="air-condition-line">
						<div  className="center-control-line">
							<span  className="center-control-line-title">空调模式：</span>
							<span>
								{
									this.renderRadioBox(mode)
								}
							</span>
							
							
						</div>
						<div className="center-control-line">
							<span  className="center-control-line-title">风速：</span>
							<span>
								{
									this.renderWindSpeedRadio(windSpeed)
								}
							</span>
						</div>
					</div>

					<div className="air-condition-line center-control-line">
						<div className="switch-open">
							<div className="toggle-box">
								<Toggle
								label="空调开关："
								defaultToggled={airConditionSwitchOn}
								style={{marginBottom: 16,}}
								onToggle={this.changeAirConditionSwitchOn}
								/>
							</div>
						</div>
						<div className="switch-open">
							<span className="lamp-swirtch-all">灯光总开关:</span>
							<div className="btn" onClick={this.openAllLamps}>开启</div>
							<div className="btn"  onClick={this.closeAllLamps}>关闭</div>
						</div>
					</div>
					<div className="lamp-box">
						
						{
							this.renderLamps(lampItems)
						}
						
					</div>
					<div className="close-line">
						<Button  label="关闭" type="button"  cancle={true} onTouchTap={this.onCancel} />
					</div>
				</form>
		  	</div>
		);
	}
}

const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	
	return errors;
}
export default ControlCenterControl = reduxForm({
	form: 'ControlCenterControl',
	validate,
})(ControlCenterControl);











