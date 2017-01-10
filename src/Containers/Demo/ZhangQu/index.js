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

export default class ZhangQu extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true
		}

	}

	close = ()=>{
		this.setState({
			open:!this.state.open
		})
	}

	componentDidMount() {}

	render() {
		return (
			<div>
					<Dialog
						title="平面图"
						contentStyle={{width:1000}}
						onClose={this.close}
						open={this.state.open} >
								<PlanMap />

							<Button label="确定"/>
				</Dialog>
			</div>

		);
	}
}
