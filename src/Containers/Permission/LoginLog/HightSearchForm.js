import React from 'react';
import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';

class HightSearchForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			successful: [{
				label: '成功',
				value: '1'
			}, {
				label: '失败',
				value: '0'
			}],
			errorTip:false,
			
		}
		
	}

	onSubmit = (form) => {
		form = Object.assign({},form);
		if(form.loginId && !/^[0-9]*$/.test(form.loginId)){
			this.setState({
				errorTip:true
			})
			return;
		}else{
			this.setState({
				errorTip:false
			})
		}
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	
	


	render() {

		const {
			error,
			handleSubmit,
		} = this.props;
		let {
			successful,
			errorTip
		} = this.state;
		return (
			<div>
			    <form className="u-hight-form" onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
				    <KrField
				    		grid={1/2}
							left={45}
							right={10}
				    		name="loginAccount"
				    		component="input"
				    		style={{marginTop:4}}
				    		label="登录账号"
				  			
					/>
					<KrField
				    		grid={1/2}
				    		right={45}
				    		left={10}
				    		name="loginId"
				    		style={{marginTop:4}}
				    		label="登录ID"
				  			component="input"
					/>
					<KrField
				    		grid={1/2}
				    		left={45}
				    		right={10}
				    		name="successful"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="登录结果"
				  			options={successful}
					/>
					{errorTip?<div className="u-error-tip">登录ID只能为数字</div>:''}
				<Grid style={{marginTop:10,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="确定" type="submit" />
								</div>
								<Button
										label="取消"
										type="button"
										cancle={true}
										onTouchTap={this.onCancel}
								/>
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
	form: 'hightSearchForm'
})(HightSearchForm);
