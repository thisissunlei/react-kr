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
import dateFormat from 'dateformat';
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
	ButtonGroup
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
			mainBillId: this.props.detail.billId
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
		return (

			<form onSubmit={handleSubmit(this.onSubmit)}> 
			<div style={{textAlign:"center",marginBottom:'14px',paddingTop:'20px',color:'#333333'}}>{detail.companyName}合同到期时间为:</div>
			<div style={{textAlign:"center",marginBottom:'14px',color:'#333333',fontSize:'14px'}}>{dateFormat(detail.endTime,"yyyy.mm.dd")}</div>
			<KrField name="actualLeaveDate"component="date"  label="实际的撤场时间为" value="" inline={true}/>
			<Grid>
				<Row style={{marginTop:30,marginBottom:15}}>
				<Col md={12} align="center"> 
					<ButtonGroup>
						<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm height={34} width={90}/></div>
						<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
					</ButtonGroup>
					
				 </Col>
				 </Row>
			</Grid>
		</form>


		);
	}
}

export default reduxForm({
	form: 'DismantlingForm'
})(DismantlingForm);