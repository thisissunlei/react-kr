



import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {Button,Message,Loading,ChangeNumber,KrField} from 'kr-ui';
import './index.less';

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
		}
	}

	componentDidMount(){
		
	}

	changeTemperature=(value)=>{
		console.log("value",value);
	}

	onSubmit=()=>{

	}

	renderRadioBox=(param)=>{
		

		let _this =this;
		let {detail} = this.props;
		var dom = param.map(function(item,index){

			return (
				<span key={index}  className="wind-speed-checkbox">
					<span  className="speed-label">{item.label}</span>
					<input type="radio" name = "mode" value={item.value} checked={item.checked} onChange={(event)=>{_this.onChangeWind(event,item,index)}} disabled={detail.extra.on?false:true}/>
				</span>
			)
		})
		return dom;
	}

	renderWindSpeedRadio=(param)=>{
		
		let _this =this;
		let {detail} = this.props;

		var dom = param.map(function(item,index){

			return (
				<span key={index} className="wind-speed-checkbox">
					<span className="speed-label">{item.label}</span>
					<input type="radio" name = "speed" value={item.value} checked={item.checked} onChange={(event)=>{_this.onChangeSpeed(event,item,index)}} disabled={detail.extra.on?false:true}/>
				</span>
			)
		})
		return dom;
	}
	
	render(){
		const { error, handleSubmit, reset} = this.props;
		return (
			<div className="control-center-control">
				<form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField
						style={{width:260}}
						name="customerId"
						inline={true}
						component="labelText"
						label="室内温度"
					/>
					{/*	value={infoList.company}*/}
					<KrField
						style={{width:260}}
						name="customerId"
						inline={true}
						component="labelText"
						label="室内湿度"
					/>

					<KrField
						style={{width:260}}
						name="customerId"
						inline={true}
						component="labelText"
						label="PM2.5"
					/>
					<div className="center-control-line">
						<span className="center-control-line-title">设置温度：</span>
						<ChangeNumber changeNum={this.changeTemperature}/>
					</div>
					<div  className="air-condition-line center-control-line">
						<span  className="center-control-line-title">空调模式：</span>
						<span>
							{/*
								this.renderRadioBox(State.modelOptions)
							*/}
						</span>
						
						
					</div>
					<div className="air-condition-line center-control-line">
						<span  className="center-control-line-title">风速：</span>
						<span>
							{/*
								this.renderWindSpeedRadio(speedWindOptions)
							*/}
						</span>
					</div>

					<div className="air-condition-line center-control-line">
						<span  className="center-control-line-title">空调开关状态：</span>
						<span>
							{/*
								this.renderWindSpeedRadio(speedWindOptions)
							*/}
						</span>
					</div>
					<div className="center-control-line">
						<span>灯光总开关：</span>
						<span></span>
					</div>
					<div className="">
						<div>走廊灯（开）</div>
						<div>走廊灯（开）</div>
						<div>走廊灯（开）</div>
						<div>走廊灯（开）</div>
						<div>走廊灯（开）</div>
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











