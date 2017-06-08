
import React from 'react';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	DotTitle,
	ListGroup,
	ListGroupItem,
	PlanMap,
	Loading
} from 'kr-ui';
export default class FloorMap extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
          
					<h1>平面图</h1>

					<Loading type = "on"/>
					
			</div>

		);
	}
}
