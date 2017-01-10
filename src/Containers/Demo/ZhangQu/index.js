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
	PlanMap
} from 'kr-ui';

export default class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);


	}


	componentDidMount() {}



	render() {
		return (
			<div>
				<Section title="haha">
						<PlanMap />
				</Section>
			</div>

		);
	}
}
