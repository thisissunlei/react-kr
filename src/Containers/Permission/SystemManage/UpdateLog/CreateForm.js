import React from 'react';

import { connect } from 'react-redux';

import {reduxForm} from 'redux-form';


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


import {Http} from 'kr/Utils';


class UpdateLogCreateForm extends React.Component {

	constructor(props, context) {
		super(props, context);

	}

	render() {

		return (
			<div >

	<KrField name="version" label="id" component="input" type="hidden" />	


			<KrField grid={1} left={42} right={18} name="version" style={{marginTop:4}} label="系统版本" component="input" />	


                      	<KrField
						 left={42}
						 right={18}
	 					 name="version"
	 					 style={{marginTop:4}}
	 					 label="更新内容"
						 component="textarea"
	 			 		/>


                          	<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">

							<ButtonGroup>
									<Button  label="确定" type="submit" />
									<span style={{display:'inline-block',width:40,height:20}}></span>
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


			</div>
		);
	}

}

export default reduxForm({
	form: 'highSearchForm'
})(UpdateLogCreateForm);

