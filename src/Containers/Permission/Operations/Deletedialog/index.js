import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	connect,
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
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
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms
} from 'kr-ui';
import './index.less';


export default class Deletedialog extends Component {
	constructor(props, context) {
		super(props, context);


	}



	render() {
		let {
			openDeleteDialog
		} = this.state;
		return (
			<div className="g-delete">
				
					
			</div>
		);
	}

}