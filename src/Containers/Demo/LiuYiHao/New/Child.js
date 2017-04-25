import React from 'react';
import Grandson from "./Grandson.js";

export default class Child extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
					<h1>B</h1>
					<Grandson />
			</div>

		);
	}
}
