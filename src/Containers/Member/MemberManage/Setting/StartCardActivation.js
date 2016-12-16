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
    this.state={
				detail:props.detail
    }
	}
	//监听props是否发生变化
	componentWillReceiveProps(nextProps){
			this.setState({
				detail:nextProps.detail,

			});
	}

	 onSubmit=(values)=>{
		 var _this=this;
			this.setState({
				detail:{
					startNum:this.cardNumAdd(10)
				}
			},function(){
			})

	 }

	 //数字处理
	 numhandle=(num,start,end)=>{
		 	num=num.toString();
			num=num.substring(start,end);
			return num
	 }
	 //卡号增加
	 cardNumAdd=(len)=>{
		 var num=parseInt(this.state.detail.startNum);
		 		 num=num+1;

		 		 num=num.toString();

				 if (num.length<len) {
				 	for (var i = num.length; i < len; i++) {
							num='0'+num;
				 	}
				 }
				 return num;
	 }
	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
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
				<div className="activeImg" ></div>
				<div style={{textAlign:"right",width:340,margin:"auto",marginTop:10}}>
						<label >{"会员卡数量:"+((+this.state.detail.endNum)-(+this.state.detail.startNum))+"张"}</label>
						<div style={{height:'60px'}}>
								<span className="cardNum">{this.numhandle(this.state.detail.startNum,0,4)}</span>
								<span className="cardNum" style={{padding:"0 10px"}}>{this.numhandle(this.state.detail.startNum,4,6)}</span>
								<span className="cardNum normal">{this.numhandle(this.state.detail.startNum,6,10)}</span>
						</div>
						<label className="jump">跳过该号码</label>
				</div>
				<KrField style={{height:36}} left={71} right={71} name="interCode" type="text" label=""/>


				<Grid style={{marginTop:38,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="返回" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
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

		if(!values.foreignCode){
			errors.foreignCode = '请填写科目编码';
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
