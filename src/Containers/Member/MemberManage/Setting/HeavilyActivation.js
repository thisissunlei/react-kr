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
	ButtonGroup,
	Message
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
		var detail= props.detail;
		var startNum = props.detail.startNum||'';
		var endNum = props.detail.endNum||'';
		var cardNum=0;
		if(startNum&&endNum){
			cardNum=endNum-startNum;
		}
		this.state={
			startNum:startNum,
			endNum:endNum,
			cardNum:cardNum
		}
	}
	// componentWillReceiveProps(nextProps){
	// 	//将外部数据赋值给一个变量
	// 	var {detail} = nextProps;
	// 	var startNum = '';
	// 	var endNum = '';
	// 	//detail必须为对象
	// 	if(typeof detail !== 'object'){
	// 		return ;
	// 	}
		
	// 	if( detail.hasOwnProperty('startNum') && detail.startNum){
	// 			startNum = detail.startNum;
	// 	}

	// 	if(detail.hasOwnProperty('endNum') && detail.endNum){
	// 		endNum = detail.endNum;
	// 	}

	// 	if(startNum && endNum){
	// 		return ;
	// 		this.setState({
	// 				startNum,
	// 				endNum,
	// 				cardNum:endNum-startNum
	// 			})
	// 	}


	// }

	 onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }


	 handleStartBlur=(event)=>{

		 var _this=this;
		 console.log(event,"event")

		
		 if(this.isCard(event)){

			 this.setState({
					startNum:event,
					 endNum:this.state.endNum,
					 cardNum:this.state.cardNum
				 },function(){
		 			console.log(this.state.startNum,this.state.endNum,"all")
					 _this.calCard();
				 })
		 }

	 }
	 handleEndBlur=(value)=>{

		 var _this=this;
		 console.log(value,"value")
		 console.log(this.isCard(value),"==")
		 if(this.isCard(value)){
			 this.setState({
					 startNum:this.state.startNum,
					 endNum:value,
					 cardNum:this.state.cardNum
				 },function(){

		 			console.log(this.state.startNum,"start",this.state.endNum,"end")

					 _this.calCard();
				 })
		 }
	 }
	 //计算卡的多少
	 calCard=()=>{

	 	var {startNum,endNum} = this.state;
	 	 
		 if(startNum&&endNum){
			

			 this.setState({
					 cardNum:endNum-startNum
				 })
		 }
	 }
	 isCard=(card)=>{
	 
		 if(!card){
		 	console.log("不存在")
			return false;
		 }
		 if(isNaN(card)){
		 	console.log("不是数字")

			 return false;
		 }
		 if(card.length!=10){
		 	console.log("长度")

			 return false;
		 }
		 
		 return true;
	 }

	render(){
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		var cardNum=this.state.cardNum+1;
		if(!this.state.startNum||!this.state.endNum){
			cardNum=0;
		}
		

		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="stageImg" ></div>
				<KrField style={{marginTop:20}} left={71} right={71} name="startNum" component="input" type="text" label="起始号码" onChange={this.handleStartBlur} />
				<KrField style={{marginTop:5}} left={71} right={71} name="endNum" component="input" type="text" label="终止号码" onChange={this.handleEndBlur} />
				<KrField style={{height:36,marginTop:-15}} left={71} right={71} component="labelText" label="会员卡数量:" value={cardNum+"张"}/>
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
