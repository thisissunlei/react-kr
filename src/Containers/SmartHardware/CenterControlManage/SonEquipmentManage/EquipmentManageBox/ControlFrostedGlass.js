
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

	openFrostGlass=()=>{

		var onParam = {on:true}
		this.switchOpenFrostGlass(onParam);
		
	}

	closeFrostGlass=()=>{

		var onParam = {on:false}
		this.switchOpenFrostGlass(onParam);

	}

	switchOpenFrostGlass=(obj)=>{
		let _this = this;
		let {mainInfo} = this.props;
		var param = {localNo:mainInfo.localNo,serialNo:mainInfo.serialNo};
		var newParam = Object.assign(param,obj)
		Http.request('SwitchOpenLampFrost',{},newParam).then(function(response) {
			
			Message.success("已将命令发送给控制器");
			// _this.freshAidCondition();
		
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	render(){
		
		const { error, handleSubmit, reset ,detail} = this.props;
		console.log("detail",detail);

		return(
			<div style={{paddingTop:20}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<div>
						<div style={{textAlign:"center"}}>
							<span>当前雾化玻璃开关状态：</span>
							<span>{this.detail.extra.on?"开启":"关闭"}</span>
						</div>
						<div className="btn-div">

							<div style={{display:"inline-block",marginRight:20}}><Button label="远程开启" onTouchTap={this.openFrostGlass}/></div>
							<div style={{display:"inline-block"}}><Button label="远程关闭" onTouchTap={this.closeFrostGlass}/></div>

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
