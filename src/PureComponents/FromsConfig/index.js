import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle,
	Tooltip,
	Message

} from 'kr-ui';
import {Http} from "kr/Utils";
class FromsConfig extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			
		}
	}
	
	render(){
	

		return (
			<div >
				表单解析
			</div>
			);
	}


}
export default reduxForm({
	form: 'FromsConfig'
})(FromsConfig);