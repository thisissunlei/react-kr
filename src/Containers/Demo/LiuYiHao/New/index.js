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
import Child from "./Child.js";

export default class New extends Component {
	static childContextTypes = {
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
	getChildContext() {
	    return {color: "purple",fun:this.nn};
	}
	nn = () =>{
		  this.refs.cc.ff();
	}

	

	componentDidMount() {}

	render() {
		return (
			<div>
					<h1  onClick={this.nn}>A</h1>
					<Child ref="cc"/>
			</div>

		);
	}
}
