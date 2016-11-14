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
	findDOMNode
} from 'react-dom'
import ReactTooltip from 'react-tooltip'
import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';


class DismantlingForm extends Component {
	static defaultProps = {
		mainBillId: 290,
	}


	constructor(props, context) {
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);



	}

	componentDidMount() {
		//const {detail}= this.props;

	}



	onSubmit(form) {
		const formValues = {
			actualLeaveDate: form.actualLeaveDate,
			mainBillId: this.props.mainBillId
		}

		Store.dispatch(Actions.callAPI('updateLeaveDate', {}, formValues)).then(function(response) {
			Notify.show([{
				message: '修改成功',
				type: 'success',
			}]);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		window.setTimeout(function() {
			window.location.reload();

		}, 2000);

		//const {onSubmit} = this.props;
		//onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			detail
		} = this.props;

		console.log('detail', detail)
		return (

			<form onSubmit={handleSubmit(this.onSubmit)}> 
			<div style={{textAlign:"center",marginBottom:'20px'}}>合同到期时间为2017.9.1</div>
			<KrField name="actualLeaveDate"component="date" grid={1} label="实际的撤场时间为" value=""/>
			<Grid>
				<Row style={{marginTop:30}}>
				<Col md={2} align="right"> <Button  label="确定" type="submit" joinEditForm /> </Col>
				<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
			</Grid>
		</form>


		);
	}
}

export default reduxForm({
	form: 'DismantlingForm'
})(DismantlingForm);