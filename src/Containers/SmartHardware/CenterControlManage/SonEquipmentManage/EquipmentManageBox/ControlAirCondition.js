
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {Button,	Message,err} from 'kr-ui';
import Toggle from 'material-ui/Toggle';

class ControlAirConditionForm extends React.Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			detail:{},
			mode : '',
			speed  : '',
			on  : false,
			modeOptions :[{label:"制冷",value:"COOLING"},{label:"制热",value:"HEATING"}],
			speedWindOptions : [{label:"高速",value:"HIGHT"},{label:"中速",value:"MEDIUM"},{label:"低速",value:"LOW"}]

		}
	}

	componentDidMount(){
		let {detail} = this.props;
		
		this.setState({
			detail : detail,
			mode : detail.extra.mode,
			speed  :detail.extra.speed,
			on  : detail.extra.on,
		})	
    	
	}


	closeDialog=()=>{
		State.controlLampDialog= false;
	}
	

	onSubmit=()=>{

	}


	renderAirConditionModeBox=(mode)=>{
		

		let _this =this;
		let {detail} = this.props;
		let {on,modeOptions} = this.state;
		var dom = modeOptions.map(function(item,index){
			return (
				<span key={index}  className="wind-speed-checkbox">
					<span  className="speed-label">{item.label}</span>
					<input type="radio" name = "mode" 
						value={item.value} 
						checked={item.value==mode?true:false} 
						onChange={(event)=>{_this.changeAirConditionMode(event,item,index)}} 
						disabled={on?false:true}
					/>
				</span>
			)
		})
		return dom;
	}

	renderWindSpeedRadio=(speed)=>{
		
		let _this =this;
		let {detail} = this.props;
		let {on,speedWindOptions} = this.state;
		var dom = speedWindOptions.map(function(item,index){
			return (
				<span key={index} className="wind-speed-checkbox">
					<span className="speed-label">{item.label}</span>
					<input type="radio" name = "speed" 
						value={item.value} 
						checked={item.value==speed?true:false} 
						onChange={(event)=>{_this.changeAirConditionWind(event,item,index)}} 
						disabled={on?false:true}
					/>
				</span>
			)
		})
		return dom;
	}



	changeAirConditionMode=()=>{

		let {mainInfo} = this.props;
		let _this =this;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo,mode:this.state.mode};
		this.changePageStatus("mode",param);

	}

	changeAirConditionWind=(event)=>{
		let {mainInfo} = this.props;
		let _this = this;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo,speed:event.value};
		this.changePageStatus("speed",param);
	}

	changePageStatus = (type,param)=>{
		let _this = this;
		var url =''
		if(type=="speed"){
			url = "setAirConditionWindSpeed"
		}else if(type=="mode"){
			url = "setAirConditionMode"
		}else if(type=="on"){
			url = "SwitchOpenAirCondition"
		}
		Http.request(url,{},param).then(function(response) {
		
			Message.success("操作成功");
			_this.setState({
				mode : response.mode,
				speed : response.speed,
				on : response.on
			})
		
		}).catch(function(err) {
			Message.error(err.message);
			_this.setState({
				mode : _this.state.mode,
				speed : _this.state.speed,
				on : _this.state.on
			})
		});

	}

	SwitchOpenAirConditionFun=(obj)=>{

		
		let {mainInfo} = this.props;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		this.changePageStatus("on",newParam);
	}

	
	switchOnAiCondition=()=>{
		let {on} = this.state;
		var onParam = {on:!on}
		this.SwitchOpenAirConditionFun(onParam);
	}


	closeControlAirCondition=()=>{
		State.controlAirConditionDialog = false;
	}



	render(){
		
		const { error, handleSubmit, reset} = this.props;
		let {chooseHeating,modelOptions,speedWindOptions,on,speed,mode} =this.state;
		return(
			<div style={{paddingTop:20}} className="air-condition-form">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div className="control-air-condition">

						<div className="air-condition-line">
							<div className="air-condition-on" style={{width: 116}}>
								<Toggle
									toggled={on} 
									label={"空调开关："}
									style={{marginBottom: 16,}}
									labelStyle={{color :"rgba(0, 0, 0, 0.6)" }}
									onToggle = {this.switchOnAiCondition}
								/>
							</div>
						</div>
						<div  className="air-condition-line">
							<span  className="title">空调模式：</span>
							<span>
								{
									this.renderAirConditionModeBox(mode)
								}
							</span>
							
							
						</div>
						<div className="air-condition-line">
							<span className="title">风速：</span>
							<span>
								{
									this.renderWindSpeedRadio(speed)
								}
							</span>
						</div>
						<div className="tip-text">注意：只有有空调是开启状态时才能更改风速和模式。</div>
						<div className="btn" onClick={this.closeControlAirCondition}>关闭</div>
						
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
export default ControlAirConditionForm = reduxForm({
	form: 'ControlAirConditionForm',
	validate,
})(ControlAirConditionForm);
