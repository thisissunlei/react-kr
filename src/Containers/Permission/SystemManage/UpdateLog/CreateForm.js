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





class UpdateLogCreateForm extends React.Component {

	constructor(props, context) {
		super(props, context);

	}

	onSubmit = (values) => {
		const { onSubmit } = this.props;
		onSubmit && onSubmit(values);

		console.log('values:', values);

	}

	onCancel = () => {
		const { onCancel } = this.props;
		onCancel && onCancel();
	}


	render() {


		const { handleSubmit } = this.props;
		return (
			<div >

				<form onSubmit={handleSubmit(this.onSubmit)} style={{ marginTop: 30 }}>

					<KrField name="version" label="id" component="input" type="hidden" />


					<KrField grid={1} left={42} right={18} name="version" style={{ marginTop: 4 }} label="系统版本" placeholder="比如:1.0.0" component="input" />


					<KrField left={42} right={18} name="content" style={{ marginTop: 4 }} label="新增具体功能" placeholder={"每条更新的内容以中文句号\"。\"分割"} component="textarea" maxSize={500}/>

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

const validate = values => {

	const errors = {}

	if (!values.version) {
		errors.version = '请填写版本号';
	} else {

		const reg = /\d+\.\d+\.\d+/ig

		if (!reg.test(values.version)) {
			errors.version = '请输入正确的版本号';
		}

	}

	if (!values.content) {
		errors.content = '请填写更新内容';
	}

	return errors
}

export default reduxForm({
	form: 'UpdateLogCreateForm',
	validate,
})(UpdateLogCreateForm);

