import React from 'react';

import {
	Mouse
} from 'kr/Utils';
export default class Canvas extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			theBox:{
				left:0,
				top:0,
			},
			isBox:false,
			dram:{
				x:0,
				y:0
			}

		}

	}





	componentDidMount() {
		// var canvas = document.getElementById("canvas");
		// var context = canvas.getContext("2d");
	}
	draw = () =>{

	}

	canvasClick = (event) =>{

		let mouse = Mouse.getCurrent(event);
		this.setState({
			isBox:false,
			dram:{
				x:mouse.x,
				y:mouse.y

			}
		})
		

	}
	mouseDown = (event) =>{
		this.setState({
			theBox:{
				left:event.clientX - 25,
				top:event.clientY - 25
			},
			isBox:true,
			
		})
		
	}
	allClick = (event) =>{
	}


	render() {
		const {theBox,isBox} = this.state;

		return (
			<div onClick = {this.allClick}>
				<canvas width = "1000" height = "1000" style = {{background:"#ccc",position:"relative"}} onMouseUp= {this.canvasClick} />
				<div 
					style = {{width:300,height:300,display:'inline-block',background:"red",position:'absolute',top:30,left:1050}} 
					onMouseDown = {this.mouseDown}
				>

				</div>
				{isBox && <div style = {{position:'fixed',left:theBox.left,top:theBox.top,width:50,height:50,background:"blue"}}>
				</div>}
			</div>
		);
	}
}
