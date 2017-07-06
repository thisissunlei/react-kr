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
		
	}

	componentDidMount() {
		let {detail}=this.props;
		if(detail.info){
			Store.dispatch(change('recharge', 'pointNum', detail.info.pointNum));
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
				reset,
				detail,
			} = this.props;
		return (
			<div className="g-recharge">
				
				<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField
								style={{width:260,marginLeft:30,marginTop:20}}
								label="客户名称 "
								inline={true} 
								component="labelText"
								value={detail.customerName}
								
						 	/>
						 	<KrField
								style={{width:260,marginLeft:30,marginTop:16}}
								name="pointNum"
								type="text"
								inline={true} 
								component="input"
								label="积分"
								requireLabel={true}
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
const validate = values => {

		const errors = {};
		//正整数
		let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
		if (!values.pointNum && !numberNotZero.test(values.pointNum)) {
			errors.pointNum = '请输入正整数';
		}
		
		

		return errors
}

export default reduxForm({
		form: 'recharge',
		 validate,
	})(Recharge);
