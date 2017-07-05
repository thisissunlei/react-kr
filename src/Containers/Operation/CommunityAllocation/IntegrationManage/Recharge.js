import React from 'react';
import {Http} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
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


class Recharge extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			ifCity:false,
			infoList:[],
			
		}
		
	}
	
	
   
	onSubmit=(form)=>{
		let {onSubmit,detail} = this.props;
		form=Object.assign({}, form);
		form.customerId=detail.customerId;
		onSubmit && onSubmit(form);
		
	}

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			let {
				infoList,
				ifCity,
			}=this.state;
			
		return (
			<div className="g-recharge">
				
				<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField
								style={{width:260,marginLeft:30,marginTop:20}}
								label="客户名称："
								inline={true} 
								component="labelText"
								value="1111"
								
						 	/>
						 	<KrField
								style={{width:260,marginLeft:30,marginTop:16}}
								name="pointNum"
								type="text"
								inline={true} 
								component="input"
								label="充值："
								requireLabel={true}
						 	/><span className="u-txt">积分</span>
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
const validate = values => {

		const errors = {};
		if (!values.pointNum) {
			errors.pointNum = '请输入充值数';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'recharge',
		 validate,
	})(Recharge);
