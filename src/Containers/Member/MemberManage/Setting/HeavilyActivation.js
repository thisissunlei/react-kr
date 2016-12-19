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
		// const detail=props.detail;
		// console.log(detail,"H");
		//
		// Store.dispatch(initialize('HeavilyActivation',detail));
	}

	 onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }


	 handleBlur=()=>{

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
				<KrField style={{marginTop:20}} left={71} right={71} name="startNum" type="text" label="起始号码" onBlur={this.handleBlur} />
				<KrField style={{}} left={71} right={71} name="endNum" type="text" label="终止号码"/>
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
			errors.startNum = '请输入起始号码';
		}
		if(!isNaN(+values.startNum)&&values.startNum&&values.startNum.length!=10){
			errors.startNum='请输入10位会员卡号'
		}
		if(values.startNum&&isNaN(+values.startNum)){

			errors.startNum = '卡号由十位数字的卡号组成';
		}
		if (!values.endNum) {
			errors.endNum = '请输入终止号码';
		}
		if(!isNaN(+values.endNum)&&values.endNum&&values.endNum.length!=10){
			errors.endNum='请输入10位会员卡号'
		}
		if(values.endNum&&isNaN(+values.endNum)){
			errors.endNum = '卡号由十位数字的卡号组成';
		}



		return errors
	}
const selector = formValueSelector('HeavilyActivation');



export default reduxForm({ form: 'HeavilyActivation', validate})(HeavilyActivation);
