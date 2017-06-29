import React from 'react';

import {
	Mouse,

} from 'kr/Utils';
import {
	TextLabel
} from 'kr-ui';
export default class Canvas extends React.Component {

	constructor(props, context) {
		super(props, context);

	}





	componentDidMount() {
		// var canvas = document.getElementById("canvas");
		// var context = canvas.getContext("2d");
	}

	render() {


		return (
			<div >

				<TextLabel value = '创业大街'/>
			</div>
		);

	}
}
