import React from 'react';

import {
	getOffset,
	getCurrent
} from './utils';
export default class Canvas extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			theBox:{
				left:0,
				top:0,
			}
		}

	}





	componentDidMount() {}

	canvasClick = (event) =>{
		//event.pageX获取鼠标相对页面的位置
		// console.log(event);
		// console.log(event.pageX,event.clientX,event.screenX,event.target.offsetLeft,">>>>>")
		//当前的元素
		let mouse = getCurrent(event);
		console.log(mouse.x,mouse.y,);

	}


	render() {

		return (
			<div>
				<canvas width = "1000" height = "1000" style = {{background:"#ccc",position:"relative"}} onMouseDown= {this.canvasClick} />
				<div style = {{width:300,height:300,display:'inline-block',background:"red",position:'absolute',top:30,left:1050}}>

				</div>
				<div style = {{position:'absolute',left:}}>
				</div>
			</div>
		);
	}
}
