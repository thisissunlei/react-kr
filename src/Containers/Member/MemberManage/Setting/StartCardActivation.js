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
	SnackTip,
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
    this.state={
				detail:props.detail,
				accomplish:false
    }
	}
	 onSubmit=(values)=>{
		 if (this.state.detail.startNum<this.state.detail.endNum) {
			 this.cardNumAdd(4,values);
		 }
		 if(this.state.detail.startNum>=this.state.detail.endNum){
			 this.setState({
				 accomplish:true
			 })
		 }
	 }

	 //数字处理
	 numhandle=(num,start,end)=>{
		 	num=num.toString();
			num=num.substring(start,end);
			return num
	 }
	 //卡号增加
	 cardNumAdd=(len,values)=>{
		 var _this=this
		 const params={};
		 params.foreignCode=_this.state.detail.startNum;
		 params.interCode=values.interCode;
		 Store.dispatch(Actions.callAPI('CardActivation', {}, params)).then(function(response) {
		 }).catch(function(err) {
			 Message.error(err.message)
		 });
		 let detail = Object.assign({},_this.props.detail);
		 var start=this.state.detail.startNum.substring(0,6).toString();
		 var num=parseInt(this.state.detail.startNum.substring(6,10));
		 		 num=num+1;
		 		 num=num.toString();
				 if (num.length<len) {
				 	for (var i = num.length; i < len; i++) {
							num='0'+num;
				 	}
				 }
				 detail.startNum=start+num;
				 detail.endNum=this.state.detail.endNum;
				 this.setState({
	 				detail:detail
				})
	 }
	 //跳过号码
	 skipCard=()=>{
		 this.cardNumAdd(4);
	 }

	 //关闭窗口
	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	render(){
		const {
			error,
			handleSubmit,
			pristine,
			reset,
			throwBack
		} = this.props;
		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className="activeImg" ></div>
				<div style={{textAlign:"right",width:340,margin:"auto",marginTop:10}}>
						<label >{"会员卡数量:"+((+this.state.detail.endNum)-(+this.state.detail.startNum-1))+"张"}</label>
						<div style={{height:'60px'}}>
								<span className="cardNum">{this.numhandle(this.state.detail.startNum,0,4)}</span>
								<span className="cardNum" style={{padding:"0 10px"}}>{this.numhandle(this.state.detail.startNum,4,6)}</span>
								<span className="cardNum normal">{this.numhandle(this.state.detail.startNum,6,10)}</span>
						</div>
						<label className="jump" onClick={this.skipCard}>跳过该号码</label>
				</div>
				<KrField style={{height:36}} left={71} right={71} name="interCode" type="text" />


				<Grid style={{marginTop:38,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							{this.state.accomplish&&<div  className='ui-btn-center' style={{marginLeft:27}}><Button  label="完成" type="submit" backgroundColor={this.state.accomplish?"#499df1":"#cccccc"} onTouchTap={this.onCancel} /></div>}
							{!this.state.accomplish&&<Button  label="返回" type="button" cancle={true} onTouchTap={throwBack} />}
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				{/*<SnackTip style={{position:'fixed',top:-160,right:0,backgroundColor:"#000"}} open={true} title={"title"}  />*/}


			</form>
		);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.interCode){
			errors.interCode = '会员卡内码不能为空';
		}

		if (!values.accountname) {
			errors.accountname = '请填写科目名称';
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
