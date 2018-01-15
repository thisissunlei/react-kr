
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
	err
} from 'kr-ui';
class ControlLampForm extends React.Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			detail:{},
			switchOn : ""
		}
	}

	componentDidMount(){
		let {detail} = this.props;

		console.log('detail.extReported.on?"开启":"关闭"',detail.extReported.on?"开启":"关闭");
		if(detail.extReported){
			this.setState({
				detail : detail,
				switchOn : detail.extReported.on?"开启":"关闭"
			})
		}else{
			this.setState({
				detail : detail,
				switchOn : "未知"
			})
		}
				
	}



	closeDialog=()=>{
		State.controlLampDialog= false;
	}
	
	// 编辑设备定义
	onSubmit=(values)=>{
		
	}

	openLamp=()=>{

		var onParam = {on:true}
		this.switchOpenLamp(onParam);
		
	}

	closeLamp=()=>{

		var onParam = {on:false}
		this.switchOpenLamp(onParam);

	}

	switchOpenLamp=(obj)=>{
		let _this = this;
		let {mainInfo} = this.props;
		
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		Http.request('SwitchOpenLampFrost',{},newParam).then(function(response) {
			
			Message.success("操作成功");
			_this.setState({
				switchOn : (response.on && response.on?"开启":"关闭") ||"未知"
			})
		
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render(){
		
		const { error, handleSubmit, reset ,detail,mainInfo} = this.props;
		let {switchOn} = this.state;
		
		return(
			<div style={{paddingTop:20}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<div style={{textAlign:"center"}}>
							<span>当前开关状态：</span>
							<span>{switchOn}</span>
						</div>
						<div style={{width:180,paddingTop : 20,margin:"0 auto"}}>
							<div style={{display:"inline-block",marginRight:20}}><Button label={mainInfo.deviceType=="LAMP"?"开灯":"开启雾化膜"} onTouchTap={this.openLamp}/></div>
							<div style={{display:"inline-block"}}><Button label={mainInfo.deviceType=="LAMP"?"关灯":"关闭雾化膜"} onTouchTap={this.closeLamp}/></div>
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
export default ControlLampForm = reduxForm({
	form: 'ControlLampForm',
	validate,
})(ControlLampForm);
