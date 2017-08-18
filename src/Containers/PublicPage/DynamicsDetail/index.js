import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
} from 'kr-ui';
import React, { PropTypes } from 'react';
import { observer, inject } from 'mobx-react';
import './index.less';
@inject("NavModel")
@observer
export default class DynamicsDetail extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
		
		}

	}
	componentDidMount(){
		const { NavModel } = this.props;
		NavModel.setSidebar(false);

	}
	
	render() {
		
		return (
			<div title="demo">
				dfsdfds
			</div>

		);
	}
}
