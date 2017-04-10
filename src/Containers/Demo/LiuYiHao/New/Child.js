import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import {
	Section,
	PlanMap,
	Dialog,
	Button,
} from 'kr-ui';
import Grandson from "./Grandson.js";

export default class New extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true,
			checkedStations:[],
		}

	}
	componentDidMount() {}

	render() {
		return (
			<div>
					<h1>B</h1>
					<Grandson />
			</div>

		);
	}
}
