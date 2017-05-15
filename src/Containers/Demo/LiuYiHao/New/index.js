import React from 'react';
import {
	PlanMap
} from 'kr-ui';
import Original from './Original';
export default class New extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state = {
		}

	}




	componentDidMount() {}

	render() {
		return (
			<div style = {{height:2000}}>
					<Original />
					<PlanMap />
			</div>

		);
	}
}
