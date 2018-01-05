
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
	CheckboxGroup,
} from 'kr-ui';
class ControlAirConditionForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			detail:{}
		}
	}

	componentDidMount(){
		let {detail} = this.props;
		this.setState({
			detail : detail
		})		
	}



	closeDialog=()=>{
		State.controlLampDialog= false;
	}
	
	// 编辑设备定义
	onSubmit=(values)=>{
		console.log("values",values);
		
	}
	render(){
		
		const { error, handleSubmit, reset ,detail} = this.props;
		console.log("detail",detail);
		let modelOptions = [{label:"制冷",value:"cold"},{label:"制热",value:"hot"}]
		let windSpeedOptions = [{label:"高速",value:"fast"},{label:"中速",value:"middle"},{label:"低速",value:"low"}]
		return(
			<div style={{paddingTop:20}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<div style={{textAlign:"center"}}>
							<span>空调开启状态：</span>
							<span>当前灯开关状态状态</span>
						</div>
						<div style={{textAlign:"center"}}>
							<span>空调模式：</span>
							<span>
								<CheckboxGroup options={modelOptions} name="model"/>
							</span>
						</div>
						<div style={{textAlign:"center"}}>
							<span>风速：</span>
							<CheckboxGroup options={windSpeedOptions} name="model"/>
						</div>
						<div className="btn-div">

							<div style={{display:"inline-block",marginRight:20}}><Button label="远程开启" onTouchTap={this.productQRCode}/></div>
							<div style={{display:"inline-block"}}><Button label="远程关闭" onTouchTap={this.closeDialog}/></div>

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
