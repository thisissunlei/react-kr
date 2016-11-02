import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
	DatePicker,
	Form,
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


} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {
	List,
	ListItem
} from 'material-ui/List';

import './index.less';

export default class Date extends Component {



	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);

	}

	componentDidMount() {

	}


	render() {

		let {
			style
		} = this.props;

		return (

			<div className="date" style={style}>
				<p  className="dateInput">2016-10-08</p>
				<span  className="icon"></span>
			</div>

		);

	}

}