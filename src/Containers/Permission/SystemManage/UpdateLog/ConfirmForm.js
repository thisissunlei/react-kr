import React from 'react';

import { connect } from 'react-redux';

import { reduxForm } from 'redux-form';


import {
	KrField,
	Table,
	Drawer,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	KrDate,
	Message,
	ButtonGroup,
} from 'kr-ui';


import './index.less';

class UpdateLogCreateForm extends React.Component {

	constructor(props, context) {
		super(props, context);

	}

	onSubmit = (values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);

		console.log('values:',values);

	}

	onCancel = ()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}


	render() {


		const { handleSubmit } = this.props; 
		return (
			<div >

	    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>

				<KrField name="version" label="id" component="input" type="hidden" />

                <h3 className="notify-content-h3" >确定发布？</h3>

				<Grid style={{ marginTop: 15, marginBottom: 5 }}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<Button label="确定" type="submit" />
								<span style={{ display: 'inline-block', width: 40, height: 20 }}></span>
								<Button label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		    </form >

			</div>
		);
	}

}

export default reduxForm({
	form: 'UpdateLogConfirmForm'
})(UpdateLogCreateForm);

