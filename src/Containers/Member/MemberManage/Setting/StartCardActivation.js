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

 class StartCardActivation extends Component{

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
				accomplish:false,
				oldNum:props.detail.endNum-props.detail.startNum,
				closeMessageBar:{
					title:'',
					open:false,
					style:{},
					className:''
				}
    }
	}
	 onSubmit=(values)=>{
		 var _this=this;
		 var isErr=false;
		 const params={};
		 params.foreignCode=_this.state.detail.startNum;
		 params.interCode=values.interCode;
		 if(this.state.accomplish){
			 return;
		 }
		 Store.dispatch(Actions.callAPI('CardActivation', {}, params)).then(function(response) {
					//  Message.success("成功");
					 const detail={};
					 detail.interCode="";
					 Store.dispatch(initialize('StartCardActivation',detail));
					 _this.props.onFlush();
					_this.openMessageBar("sds","otk");

					 if (_this.state.detail.startNum<=_this.state.detail.endNum) {

							 _this.cardNumAdd(4);

					 }

		 }).catch(function(err) {
			 Message.error(err.message);
		 });
	 }

	 //数字处理
	 numhandle=(num,start,end)=>{
		 	num=num.toString();
			num=num.substring(start,end);
			return num
	 }
	 //卡号增加
	 cardNumAdd=(len)=>{
		 let detail = Object.assign({},this.props.detail);
		 var start=this.state.detail.startNum.substring(0,6).toString();
		 var num=parseInt(this.state.detail.startNum.substring(6,10));
		 		 num=num+1;
		 		 num=num.toString();
				 if (num.length<len) {
				 	for (var i = num.length; i < len; i++) {
							num='0'+num;
				 	}
				 }
				 if (this.state.detail.startNum==this.state.detail.endNum) {
					 	Message.success(this.state.detail.oldNum+"张会员卡激活成功!");
						this.setState({
		 				 accomplish:true,
		 			 })
					 return;

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
	 //打开弹跳
	 openMessageBar=(text,type)=>{
	 	var style={};
	 	var className="";
	 	if(type=="ok"){
	 		style={position:'fixed',top:-160,right:0,display:"inline-block",color:"#000",backgroundColor:"#edffe2"};
	 		className="messagesBarIconOk";
	 	}else{
	 		style={position:'fixed',top:-160,right:0,display:"inline-block",color:"#000",backgroundColor:"#ffe9e9"};
	 		className="messagesBarIconError";
	 	}

	 	this.setState({
	 		closeMessageBar:{
					title:text,
					open:true,
					style:style,
					className:className
				}
	 	})
	 }
	 //关闭弹跳
	 closeMessageBar=()=>{
		 this.setState({
			 openMessage:false
		 })
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
				<KrField  left={71} right={71} name="interCode" type="text" />


				<Grid style={{marginTop:18,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
							{this.state.accomplish&&<div  className='ui-btn-center' style={{marginLeft:27}}><Button  label="完成" type="submit" backgroundColor={this.state.accomplish?"#499df1":"#cccccc"} onTouchTap={this.onCancel} /></div>}
							{!this.state.accomplish&&<Button  label="返回" type="button" cancle={true} onTouchTap={throwBack} />}
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				<SnackTip style={this.state.closeMessageBar.style} open={this.state.closeMessageBar.open} title={<span style={{display:"inline-block"}}><span className={this.state.closeMessageBar.className}></span><span style={{float:"left",color:"#000"}}>{this.state.closeMessageBar.title}</span></span>}  />


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
const selector = formValueSelector('StartCardActivation');



export default reduxForm({ form: 'StartCardActivation', validate,enableReinitialize:true, keepDirtyOnReinitialize:true })(StartCardActivation);
