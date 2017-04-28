import React from 'react';

export default class New extends React.Component {

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




	componentDidMount() {}

	render() {
		return (
			<div>
					fff
			</div>

		);
	}
}
