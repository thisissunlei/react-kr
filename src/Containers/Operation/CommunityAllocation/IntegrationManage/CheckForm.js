import React from 'react';
import {Http} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message
} from 'kr-ui';
import './index.less';
import { observer, inject } from 'mobx-react';
@inject("NavModel")
@observer
class CheckForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		
	}
	
	
   
	onSubmit=()=>{
		var _this=this;
		let {onSubmit,info} = this.props;
		var userPwd=this.refs.userPwd.value;
		var params={
			customerId:info.customerId,
			pointNum:info.pointNum,
			userPwd:userPwd
		}

		Http.request('save-add-point',{},params).then(function(response) {
			Message.success('充值成功')
			onSubmit && onSubmit();
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	onCancel=()=>{
		let {onCancel,info} = this.props;
		onCancel && onCancel(info);
	}
	
	
	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			let {userInfo}=this.props.NavModel
			
		return (
			<div className="g-checked">
				
				<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField
								style={{width:260,marginLeft:50,marginTop:20}}
								label="当前用户："
								inline={true} 
								component="labelText"
								value={userInfo.nickname}
						 	/>
						 	<div className="u-checked-label">
						 		<span className="u-require">*</span>
						 		<span className="u-txt">操作密码:</span>
						 	</div>
						 	<input
						 		className="u-password"
						 		type='password'
						 		name="userPwd"
						 		ref="userPwd"
						 		placeholder="操作密码"
						  	/>
						<Grid style={{marginTop:50,width:'96%'}}>
							<Row >
								 <Col md={12} align="center">
									<ButtonGroup>
										<Button  label="确定" type="submit"  />
										<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
						
				</form>
			</div>
		);
	}
}


export default reduxForm({
		form: 'checkForm',
		
	})(CheckForm);
