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



export default class Distribution extends Component {
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
				message: '请选择分配人员',
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

			<Form name="jyayayoinForm"  initialValues={initialValues} onSubmit={this.onSubmit}>
				<KrField name="id" type="hidden"/>
				<KrField name="customerId" type="hidden"/>
				<KrField name="communityId" type="hidden"/>
				<div style={{textAlign:"center",marginTop:'45px',fontSize:'14px'}}>
					<div className="info" style={{paddingBottom:10,color:'#333333'}}>{detail.stationCode}分配为： </div>

					<KrField name="memberId"component="select" grid={2/3} inline={false}  options={optionValues.member}/>
				</div>
				<Grid style={{margin:'52px 0'}}>
					<Row >
					<Col md={2} align="right">  </Col>
					<Col md={2} align="right">  </Col> 
						<Col md={12} align="center"> 
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit"  onSubmit={this.onSubmit} width={90} height={34}/></div>
								<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={32} width={90} />
							</ButtonGroup>
						 </Col>
					</Row>
				</Grid>
			</Form>


		);



	}

}