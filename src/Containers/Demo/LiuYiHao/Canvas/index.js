import React from 'react';
export default class Canvas extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			
		}

	} 




	componentDidMount() {}

	canvasClick = (event) =>{
		//event.pageX获取鼠标相对页面的位置
		console.log(event.clientX,event.screenX,event.target.offsetLeft,">>>>>")

	}


	render() {
		return (
			<div style = {{width:1000,height:1000,background:"#ccc",position:"relative"}} onMouseDown= {this.canvasClick}>

			</div>

		);
	}
}
