
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {ShallowEqual} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err,
	RadioGroup,
} from 'kr-ui';
class ControlAirConditionForm extends React.Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			detail:{},
			mode : '',
			windSpeed  : '',
			modelOptions :[{label:"制冷",value:"REFRIGERATION"},{label:"制热",value:"HEATING"}],
			speedWindOptions : [{label:"高速",value:"HIGHT"},{label:"中速",value:"MEDIUM"},{label:"低速",value:"LOW"}]

		}
	}

	componentDidMount(){
		let {detail} = this.props;
		this.setState({
			detail : detail
		})	
    	
    	this.changeModeOptions(detail.extra.mode);
    	this.changeSpeedOptions(detail.extra.speed);
    	
	}


	changeModeOptions= (valueParam,callBack)=>{
		this.setState({
			mode : valueParam
		})
		if(valueParam == "HEATING"){
    		this.setState({
    			modelOptions : [{label:"制冷",value:"REFRIGERATION",checked:false},{label:"制热",value:"HEATING",checked:true}]
    		},function(){
    			callBack && callBack()
    		})
    	}else{
    		this.setState({
    			modelOptions : [{label:"制冷",value:"REFRIGERATION",checked:true},{label:"制热",value:"HEATING",checked:false}]
    		},function(){
    			callBack && callBack()
    		})
    	}
	}

	changeSpeedOptions= (valueParam,callBack)=>{

		this.setState({
			windSpeed : valueParam
		})
		if(valueParam == "HIGHT"){
    		this.setState({
    			speedWindOptions : [{label:"高速",value:"HIGHT",checked:true},{label:"中速",value:"MEDIUM",checked:false},{label:"低速",value:"LOW",checked:false}]
    		},function(){
    			callBack && callBack()
    		})
    	}else if(valueParam == "LOW"){
    		this.setState({
    			speedWindOptions : [{label:"高速",value:"HIGHT",checked:false},{label:"中速",value:"MEDIUM",checked:false},{label:"低速",value:"LOW",checked:true}]
    		},function(){
    			callBack && callBack()
    		})
    	}else{
    		this.setState({
    			speedWindOptions : [{label:"高速",value:"HIGHT",checked:false},{label:"中速",value:"MEDIUM",checked:true},{label:"低速",value:"LOW",checked:false}]
    		},function(){
    			callBack && callBack()
    		})
    	}
	}



	closeDialog=()=>{
		State.controlLampDialog= false;
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


	onChangeWind=(event,item,index)=>{

		this.changeModeOptions(item.value,this.changeAirConditionMode);

	}

	onChangeSpeed=(event,item,index)=>{

		this.changeSpeedOptions(item.value,this.changeAirConditionWind);

	}


	changeAirConditionMode=()=>{

		let {mainInfo} = this.props;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo,mode:this.state.mode};
		Http.request('setAirConditionMode',{},urlParams).then(function(response) {
		
			Message.success("已将修空调模式发送给空调控制器");
			// this.freshAidCondition();
			
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	changeAirConditionWind=()=>{

		let {mainInfo} = this.props;

		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo,speed:this.state.windSpeed};
		Http.request('setAirConditionWindSpeed',{},param).then(function(response) {
		
			Message.success("已将修改风速命令发送给空调控制器");
			// this.freshAidCondition();
		
		}).catch(function(err) {
			Message.error(err.message);
		});
	}



	openAirCondition=()=>{

		var onParam = {on:true}
		this.SwitchOpenAirConditionFun(onParam);
		
	}

	closeAirCondition=()=>{

		var onParam = {on:false}
		this.SwitchOpenAirConditionFun(onParam);

	}

	SwitchOpenAirConditionFun=(obj)=>{

		let _this = this;
		let {mainInfo} = this.props;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		Http.request('SwitchOpenAirCondition',{},newParam).then(function(response) {
			
			Message.success("已将开启命令发送给空调控制器--------??????");
			// _this.freshAidCondition();
		
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	freshAidCondition = ()=>{

		let {mainInfo} = this.props;
		let _this = this;
		Http.request('getSonEquipmentDetailInfo',{id:mainInfo.id,date:new Date()}).then(function(response) {
			_this.setState({
				detail : response
			},function(){
				_this.changeModeOptions(response.extra.mode);
    			_this.changeSpeedOptions(response.extra.speed);
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	render(){
		
		const { error, handleSubmit, reset} = this.props;
		let {chooseHeating,modelOptions,speedWindOptions} =this.state;
		return(
			<div style={{paddingTop:20}} className="air-condition-form">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<div className="air-condition-line">
							<span>空调开启状态：</span>
							<span>{this.detail.extra.on?"开启":"关闭"}</span>
						</div>
						<div  className="air-condition-line">
							<span>空调模式：</span>
							<span>
								{
									this.renderRadioBox(modelOptions)
								}
							</span>
							
							
						</div>
						<div className="air-condition-line">
							<span>风速：</span>
							<span>
								{
									this.renderWindSpeedRadio(speedWindOptions)
								}
							</span>
						</div>
						<div className="tip-text">注意：还有空调是开启状态时才能更改风速和模式。</div>

						<div className="open-air-condition-div">

							<div style={{display:"inline-block",marginRight:20}}><Button label="远程开启" onTouchTap={this.openAirCondition}/></div>
							<div style={{display:"inline-block"}}><Button label="远程关闭" onTouchTap={this.closeAirCondition}/></div>

						</div>
						
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
