import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	BreadCrumbs,
	Form,
	KrField,
	IframeContent,
	Notify,
	Message,
	ButtonGroup
} from 'kr-ui';
import CreateMemberForm from './CreateMemberForm';



//变更
export default class ChangeStation extends Component {
	static PropTypes = {
		detail: React.PropTypes.object,
	}
	constructor(props, context) {
		super(props, context);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}
	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	onSubmit(form) {

		if (form.memberId) {
			const {
				onSubmit
			} = this.props;
			onSubmit && onSubmit(form);
		} else {
			Notify.show([{
				message: '请选择要变更的人员',
				type: 'danger',
			}]);
		}


	}

	render() {
		let {
			optionValues,
			stationId,
			customerId,
			communityId,
			detail
		} = this.props;
		let initialValues = {};
		initialValues.stationId = stationId;
		initialValues.customerId = customerId;
		initialValues.communityId = communityId;

		return (

			<Form name="jyayayoin" className="change" initialValues={initialValues} onSubmit={this.onSubmit}>
			<KrField name="id" type="hidden"  />
			<KrField name="customerId" type="hidden"/>
			<KrField name="communityId" type="hidden"/>
			<div style={{textAlign:"center",marginTop:'45px'}}>
				<div className="info" style={{paddingBottom:10,color:'#333333'}}>{detail.stationCode}-{detail.memberName}变更为员工:</div>
				<KrField label='' name="memberId"  type="select" grid={2/3}  options={optionValues.members} inline={false} ></KrField>
			</div>
			<Grid style={{margin:'52px 0'}}>
				<Row >
				<Col md={12} align="center"> 
					<ButtonGroup>
						<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm width={90} height={34} onSubmit={this.onSubmit}/></div>
						<Button  label="取消" type="button"  onTouchTap={this.onCancel} width={90} height={32} cancle={true}/>
					</ButtonGroup>
				 </Col>
				</Row>
			</Grid>
		</Form>


		);

	}


}

