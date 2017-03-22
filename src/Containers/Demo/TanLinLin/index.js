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
	Editor
} from 'kr-ui';

export default class TAnLinLin extends Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			open:true,
			checkedStations:[],
		}

	}

	close = ()=>{
		this.setState({
			open:!this.state.open
		})
	}

	confirm = ()=>{
		this.close();
		console.log('resule:',this.state.checkedStations);
	}

	onCheckedStation =(clickStation,checkedStations)=>{
		this.setState({
			checkedStations
		});
	}

	componentDidMount() {}

	render() {
		return (
			<div>
				<Editor toolbars={[['fullscreen', 'source', 'undo', 'redo', 'bold']]}/>
			</div>

		);
	}
}