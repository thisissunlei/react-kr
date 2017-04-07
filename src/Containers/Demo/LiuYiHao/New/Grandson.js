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

export default class New extends Component {
	static contextTypes = {
	  color: React.PropTypes.string,
	  fun: React.PropTypes.func
	};

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
					<h1>C</h1>
					<h1>{this.context.color}</h1>
					{this.context.fun()}
			</div>

		);
	}
}
