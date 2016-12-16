import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup
} from 'kr-ui';
import './index.less';

 class HeavilyActivation extends Component{

	 static defaultProps = {
	 		stage:'importNum'
	 	}
	 //节点的暴露
	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
		 /**
		  * stage表示批量修改所处的阶段
		  * 允许填入的值为 importNum|| activeCard
		  */
		 stage:React.PropTypes.string,
	 }
	//数据的初始化设定
	constructor(props){
		super(props);
	}
	 onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }


	 handleBlur=(event)=>{

	 }

	render(){
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="stageImg" ></div>
				<KrField style={{height:36,marginBottom:43,marginTop:20}} left={71} right={71} name="startNum" type="text" label="起始号码" onBlur={this.handleBlur}/>
				<KrField style={{height:36,marginBottom:43}} left={71} right={71} name="endNum" type="text" label="终止号码"/>
				<KrField style={{height:36,marginTop:-15}} left={71} right={71} component="labelText" label="会员卡数量:" value={"100"+"张"}/>
				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div style={{marginLeft:"30"}} className='ui-btn-center'><Button  label="开始激活" type="submit" joinEditForm /></div>
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.startNum){
			errors.startNum = '请填写科目编码';
		}

		if (!values.endNum) {
			errors.endNum = '请填写科目名称';
		}

		if (!values.accounttype) {
			errors.accounttype = '请填写科目类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}
		if (!values.enableflag) {
			errors.enableflag = '请先选择是否启用';
		}


		return errors
	}
const selector = formValueSelector('HeavilyActivation');



export default reduxForm({ form: 'HeavilyActivation', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(HeavilyActivation);
