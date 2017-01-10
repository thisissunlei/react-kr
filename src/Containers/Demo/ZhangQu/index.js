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
					<Dialog
						title="平面图"
						contentStyle={{width:1000}}
						actions={<Button label="确定" onTouchTap={this.confirm}/>}
						onClose={this.close}
						bodyStyle={{paddingLeft:0,paddingRight:0}}
						open={this.state.open} >
								<PlanMap onCheckedStation={this.onCheckedStation} />
				</Dialog>
			</div>

		);
	}
}
