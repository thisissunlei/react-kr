import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
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
} from 'kr-ui';

export default class Initialize extends Component {

	static defaultProps = {
		data: []
	}

	static propTypes = {
		data: React.PropTypes.array
	}

	constructor(props, context) {
		super(props, context);

	}


	render() {

		return (

			<div>
					yayayayay
			</div>
		);
	}

}