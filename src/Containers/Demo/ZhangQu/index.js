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

import {
	observer,
	inject
} from 'mobx-react';

@inject("CommonModel")
@observer
export default class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);

	}

	componentDidMount() {}

	render() {
		return (
			<div>

				{this.props.CommonModel.name}

			</div>

		);
	}
}
