import React from 'react';
export default class Grandson extends React.Component {

	static contextTypes = {
	  color: React.PropTypes.string,
	  fun: React.PropTypes.func
	};

	constructor(props, context) {
		super(props, context);
	}



	componentDidMount() {}

	render() {
		return (
			<div>
					<h1>C</h1>
					<h1>{this.context.color}</h1>
					{this.context.fun()}
			</div>

		);
	}
}
