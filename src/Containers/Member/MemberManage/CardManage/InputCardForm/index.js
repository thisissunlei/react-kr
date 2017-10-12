import React, {
	PropTypes
} from 'react';


import './index.less';
import {
	Store
} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message
} from 'kr-ui';


class InputCardForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.continueOrClose = '';
		this.state = {
			
		}

	}
	onSubmit=(values)=>{
		
		Http.request('inputCardUrl',{},values).then(function(response) {
			
			
			// Message.success();
		}).catch(function(err) {
			Message.error(err.message);
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
		
	}


	submitClose=()=>{
		this.continueOrClose = "close"
	}

	submitContinue=()=>{
		this.continueOrClose = "continue"
	}
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:0}} className="input-card-form">
				<KrField 
					name="communityId"
					component="searchCommunityAll"
					label="社区名称: "
					style={{width:290}}
					onChange = {this.onChangeCommunity}
					inline={false}
					requireLabel={true}
				/>
				<KrField  
					name="memo" 
					type="text" 
					label="备注" 
					
				/>
				<KrField  
					style={{width:290,float:"left"}} 
					name="outerCode" 
					type="text" 
					label="会员卡外号" 
					onBlur={this.foreignCodeBlur}
					requireLabel={true}
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
				<div className="tip-box">
					<p>温馨提示：</p>
					<p>1.若要批量录入会员卡，建议从会员卡外码最小的开始</p>
					<p>1.用读卡器读卡内码前，请确保光标在卡内码的输入框内</p>
					
				</div>
				<Grid style={{}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="提交并关闭" type="submit" onTouchTap={this.submitClose} /></div>
								<Button  label="提交并继续" type="submit" cancle={true} onTouchTap={this.submitContinue} />
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
