

import React, {
	PropTypes
} from 'react';

import './index.less';
import {
	Store
} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message
} from 'kr-ui';

import State from '../State';
import {
	observer
} from 'mobx-react';
@observer


class InputCardForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.continueOrClose = '';
		this.state = {
			tipContent : '',
			showTip : false,
			submitSuc : false,
		}

	}
	onSubmit=(values)=>{

		let _this =this;
		var submitValues = Object.assign({},values);
		Http.request('inputCardUrl',{},values).then(function(response) {
			
			if(_this.continueOrClose=="close"){
				
				State.openInputCardDialog = false;
				Message.success(response.message);

			}else{
				

				Store.dispatch(change('InputCardForm','communityId',submitValues.communityId));
				Store.dispatch(change('InputCardForm','memo',submitValues.memo));
				Store.dispatch(change('InputCardForm','innerCode',''));
				Store.dispatch(change('InputCardForm','outerCode',response.suggestedOuterCode||''));
				

				var inputCardForm = document.getElementsByClassName("input-card-form")[0];
				inputCardForm.getElementsByClassName("ui-form-item")[1].getElementsByTagName("input")[0].blur();
				inputCardForm.getElementsByClassName("ui-form-item")[2].getElementsByTagName("input")[0].blur();
				inputCardForm.getElementsByClassName("ui-form-item")[3].getElementsByTagName("input")[0].focus();

				_this.setState({
					showTip : true,
					tipContent : response.message,
					submitSuc : true
				})


			}

			State.cardManageSearchParams={
				page:1,
				pageSize: 15,
				type:'',
				value:'',
				date : new Date(),
			}

		}).catch(function(err) {
			
			_this.setState({
				showTip : true,
				tipContent : err.message,
				submitSuc : false
			})
		});
	}

	onCancel=()=>{
		const {
			onCancel
		} = this.props;

		onCancel && onCancel();

	}

	
	cardChange=(value)=>{
		var cReg=new RegExp("[\\u4E00-\\u9FFF]+","g");

		if(cReg.test(value)){
			Message.error('卡内码内含有中文请切换英文输入法！');
			return;
		}
		this.submitContinue();
		
	}


	submitClose=()=>{
		this.continueOrClose = "close"
	}

	submitContinue=()=>{
		this.continueOrClose = "continue"
	}

	inputData=()=>{
		this.submitContinue();
	}
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {tipContent,showTip,submitSuc} = this.state;
		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:0}} className="input-card-form">
				
				<KrField 
					name="communityId"
					component="searchCommunityAll"
					label="社区名称: "
					style={{width:290,marginTop:20}}
					onChange = {this.inputData}
					inline={false}
					requireLabel={true}
				/>
				<KrField  
					name="memo" 
					type="text" 
					label="备注" 
					onCahnge={this.inputData}
				/>
				<KrField  
					style={{width:290,float:"left"}} 
					name="outerCode" 
					type="text" 
					label="会员卡外码" 
					onBlur={this.foreignCodeBlur}
					requireLabel={true}
					onChange={this.inputData}
				/>
				
				
				<KrField 
					style={{width:290,float:"right"}} 
					name="innerCode" 
					component="input" 
					type="text" 
					label="会员卡内码" 
					onChange={this.cardChange} 
					requireLabel={true}
				/>

				<div style={{width:"100%",height:0,clear:"both"}}></div>
				<div className={submitSuc?"submit-suc-style":"submit-fail-style"} style={{display:showTip?"block":"none"}}>
					<span className="tip-img tip-img-same"></span><span>{tipContent}</span>
				</div>
				<div className="tip-box">
					<p>温馨提示：</p>
					<p>1、若批量录入，建议从卡外码最小的开始，系统会自动预测下一卡外码</p>
					<p>2、用读卡器读卡内码前，<span className="yellow">请确保光标在卡内码的输入框内</span></p>
					
				</div>
				<Grid style={{}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="提交并关闭" type="submit" onTouchTap={this.submitClose} cancle={true}/>
								</div>
								<Button  label="提交并继续" type="submit" onTouchTap={this.submitContinue} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>

			</form>
		);
	}
}

const validate = values =>{
		var reg=/^[0-9a-fA-F]{8}$/;
		const errors = {}
		if(!values.communityId){
			errors.communityId = '请选择社区';
		}
		if(values.memo&&values.memo.length>50){
			errors.memo = '备注内容必须在50位以内';
		}
		if(!values.outerCode){
			errors.outerCode = '请输入会员卡外码';
		}
		if(values.outerCode&&values.outerCode.length>20){
			errors.outerCode = '请输入20位以内的会员卡外码';
		}
		
		if(!values.innerCode){
			errors.innerCode = '请输入会员卡内码';

		}else if (!reg.test(values.innerCode)) {

			errors.innerCode = '内码为8位16进制数';
		}
		return errors
	}
const selector = formValueSelector('InputCardForm');

export default reduxForm({
	form: 'InputCardForm',validate
})(InputCardForm);
