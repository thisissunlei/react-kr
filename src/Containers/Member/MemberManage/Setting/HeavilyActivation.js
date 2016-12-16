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
			stage:"importNu",
			cardNumState:"normal",
    }
	}
	//监听props是否发生变化
	componentWillReceiveProps(nextProps){
			this.setState({
				stage:nextProps.stage,
			});
	}
	 componentDidMount(){

		const {detail}= this.props;

		let initialValues = {};
		 initialValues.id = detail.id;
		 initialValues.accountcode = detail.accountcode;
		 initialValues.accountname = detail.accountname;
		 initialValues.accounttype = detail.accounttype;
		 initialValues.enableflag  = detail.enableflag;
		 initialValues.ordernum = detail.ordernum;
		 initialValues.accountdesc = detail.accountdesc;


		Store.dispatch(initialize('newCreateForm',initialValues));
		Store.dispatch(change('newCreateForm','enableflag','ENABLE'));
	 }

	 onSubmit=(values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	render(){
		//是否处于输入卡号阶段
    const stageDetail=this.state.stage=="importNum"?true:false;
		//进度状态处于什么进度
		const stageImgCalss=stageDetail?"stageImg":"activeImg";
		const { error, handleSubmit, pristine, reset} = this.props;
		/**
		 * cardNumState表示卡号的状态，他有两种状态，normal||warn
		 * @type {[type]}
		 */
		const cardNumState=this.state.cardNumState=="normal"?true:false;
		const cardNumClass=cardNumState?"cardNum":"cardNum warn";
		const cardLastNumClass=cardNumState?"cardNum normal":"cardNum warn";
		var num=100;
		//卡号输入界面
		var importNum=(
			<div>
					<KrField style={{height:36,marginBottom:43,marginTop:20}} left={71} right={71} name="foreignCode" type="text" label="起始号码"/>
					<KrField style={{height:36,marginBottom:43}} left={71} right={71} name="interCode" type="text" label="终止号码"/>
					<KrField style={{height:36,marginTop:-15}} left={71} right={71} component="labelText" label="会员卡数量:" value={"100"+"张"}/>
					<Grid style={{marginTop:15,marginBottom:5}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div style={{marginLeft:"30"}}  className='ui-btn-center'><Button  label="开始激活" type="submit" joinEditForm /></div>
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>
			</div>
		)
		//会员卡激活界面
		const activeCard=(
			<div>
					<div style={{textAlign:"right",width:340,margin:"auto",marginTop:10}}>
							<label >{"会员卡数量:"+num+"张"}</label>
							<div style={{height:'60px'}}>
									<span className={cardNumClass}>0000</span>
									<span className={cardNumClass} style={{padding:"0 10px"}}>00</span>
									<span className={cardLastNumClass}>0000</span>
							</div>
							{!cardNumState&&<label style={{float:"left",color:"#ff6868",fontSize:14,marginLeft:"5px",marginTop:"2px"}}>请注意当前卡号与前一卡号不是连号</label>}
							<label style={{fontSize:14,color:"#499df1",marginTop:-10,cursor:"pointer"}}>跳过该号码</label>
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
			</div>
		)
		return (
			<form className="HeavilyActivation" onSubmit={handleSubmit(this.onSubmit)}>
				<div className={stageImgCalss} ></div>
				{stageDetail&&importNum}
				{!stageDetail&&activeCard}

			</form>
		);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.accountcode){
			errors.accountcode = '请填写科目编码';
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
