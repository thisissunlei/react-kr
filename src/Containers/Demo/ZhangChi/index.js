import React from 'react';
import {
	PlanMap,
	Dialog,
	Button,
} from 'kr-ui';

export default class ZhangChi extends React.Component {

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
