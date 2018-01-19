
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import State from './State';
import {Button,	Message,KrField} from 'kr-ui';
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
			speedWindOptions : [{label:"高速",value:"HIGH"},{label:"中速",value:"MEDIUM"},{label:"低速",value:"LOW"}],
			airConditionCanControlOptions :[{value:'speed',label : "风速"},
											{value: 'mode',label :'模式'},
											{value:'on',label:'开关'}]
		}
	}

	componentDidMount(){
		let {detail} = this.props;
		
		this.setState({
			detail : detail,
			mode : detail.extReported && detail.extReported.mode || "",
			speed  : detail.extReported && detail.extReported.speed|| "",
			on  : detail.extReported && detail.extReported.on|| false,
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



	changeAirConditionMode=(event)=>{

		let {mainInfo} = this.props;
		let _this =this;
		var param = {serialNo:mainInfo.serialNo,mode:event.target.value};
		this.changePageStatus("mode",param);

	}

	changeAirConditionWind=(event)=>{
		let {mainInfo} = this.props;
		let _this = this;
		var param = {serialNo:mainInfo.serialNo,speed:event.target.value};
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
		this.getSetAirConditionReaponse(url,param,type);
		
	}


	getSetAirConditionReaponse=(url,param,type)=>{

		let {airConditionCanControlOptions} = this.state;
		let _this =this;
		Http.request(url,{},param).then(function(response) {
			var operationText = ''
			for(var i=0;i<airConditionCanControlOptions.length;i++){
				if(type == airConditionCanControlOptions[i].value){
					operationText = "控制空调"+airConditionCanControlOptions[i].label+"成功";
					Message.success(operationText);
				}
			}
			var oldObj = Object.assign({},_this.state);
			var newObj =  Object.assign(oldObj,param);
			_this.setState({
				mode : newObj.mode ,
				speed : newObj.speed,
				on : newObj.on,
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
		var param = {serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		this.changePageStatus("on",newParam);
	}

	
	switchOnAiCondition=()=>{
		let {on} = this.state;
		var onParam = {on:!on}
		this.SwitchOpenAirConditionFun(onParam);
	}

	freshAirconditionStatus=()=>{
		let {detail} = this.props;
		let _this = this;
		Http.request('getSonEquipmentDetailInfo',{id:detail.id}).then(function(response) {
			
			_this.setState({
				detail : response,
				mode : response.extReported && response.extReported.mode,
				speed  : response.extReported && response.extReported.speed,
				on  : response.extReported && response.extReported.on,
			})
			Message.success("刷新成功");
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	closeControlAirCondition=()=>{
		State.controlAirConditionDialog = false;
	}



	render(){
		
		const { error, handleSubmit, reset,mainInfo} = this.props;
		let {chooseHeating,modelOptions,speedWindOptions,on,speed,mode} =this.state;
		return(
			<div  className="air-condition-form">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div className="control-air-condition">
						<KrField
							style={{width:300,display:"inline-block"}}
							inline={true}
							component="labelText"
							label="设备ID："
							value={mainInfo.localNo}
						/>
						<KrField
							style={{width:300,display:"inline-block"}}
							inline={true}
							component="labelText"
							label="名称："
							value={mainInfo.name}
						/>
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
							<span  className="title"  style={{color :"#333333"}}>空调模式：</span>
							<span>
								{
									this.renderAirConditionModeBox(mode)
								}
							</span>
							
							
						</div>
						<div className="air-condition-line">
							<span className="title"  style={{color :"#333333"}}>风速：</span>
							<span>
								{
									this.renderWindSpeedRadio(speed)
								}
							</span>
						</div>
						<div className="tip-text">注意：只有空调是开启状态时才能更改风速和模式。</div>
						<div className="btn-box">
							<div className="btn" onClick={this.closeControlAirCondition}>关闭</div>
							<div className="btn" onClick={this.freshAirconditionStatus}>刷新</div>
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
