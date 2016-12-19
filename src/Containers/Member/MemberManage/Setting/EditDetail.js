import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize
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
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


class EditDetail extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			detail:{},
			mainbilltypeList: []
		}
		const detail=props.detail;
		Store.dispatch(initialize('EditDetail',detail));
	}

	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
				<KrField  right={27} style={{}} left={42} right={42} name="foreign_code" type="text" label="会员卡号"/>
				<KrField  right={27} style={{}} left={42} right={42} name="inter_code" type="text" label="会员卡内码" />
				<Grid style={{marginTop:10,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
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
	var foreign_code=values.foreign_code;
	console.log( "foreign_code",foreign_code,Object.prototype.toString.call(foreign_code));
	const errors = {}

	if(!values.foreign_code){
		errors.foreign_code = '请输入会员卡号';
	}
	if(foreign_code&&foreign_code.length!=10){
		errors.foreign_code = '请输入10位会员卡号';
	}
	if (isNaN(+foreign_code) ) {
		errors.foreign_code = '卡号由十位数字的卡号组成';

	}
	if (!values.inter_code) {
		errors.inter_code = '请输入会员卡内码';
	}
	return errors

}
const selector = formValueSelector('EditDetail');



export default reduxForm({
	form: 'EditDetail',validate
})(EditDetail);
