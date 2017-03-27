import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from 'kr-ui/../Redux/Actions';

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
	Notify,
	BreadCrumbs,
	ListGroup,
	Title,
} from 'kr-ui';

import './index.less';
export default class VoucherList extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			itemDetail: {},
		}

	}

	componentDidMount() {

	}


	render() {
		return (

			<div>
			</div>

		);

	}

}
