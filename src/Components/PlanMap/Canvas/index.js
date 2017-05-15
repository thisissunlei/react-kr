
import React from 'react';


import {Mouse} from 'kr/Utils';

export default  class Canvas extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			myCanvas:'',
			myContext:'',
		}
	}

	
	componentDidMount(){
		const {data} = this.props; 
	    var canvas = document.getElementById("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        var context = canvas.getContext("2d");
		
		this.draw(data,canvas,context);
		this.setState({
			myCanvas:canvas,
			myContext:context,
		})
	}
    
    draw = (data,can,ctx) =>{
		ctx.clearRect(0,0,can.width,can.height); 
        data.map(function(item,index){
			let color = "";
			let width = Number(item.cellWidth);
			let height = Number(item.cellHeight);
			let x = Number(item.cellCoordX);
			let y = Number(item.cellCoordY);
			if(item.status==1){
				color = "#499df1"
			}else if(item.status==2){
				color = "#eee"
			}else if(item.status==3){
				color = "#28c288"
			}else if(item.status==4){
				color = "#fff"
			}
			if(!item.status){
				color = "#fff"
			}
			
            ctx.fillStyle = color;
            ctx.fillRect(item.cellCoordX,item.cellCoordY,item.cellWidth,item.cellHeight);
			ctx.font="12px Arial";
			ctx.strokeText(item.cellName,x+width/2-(item.cellName.length*10/2),y+height/2);
			
        })
    }

	canvasClick = (event) =>{
		const {getCurrent} = Mouse;
		const {data} = this.props;
		const {myCanvas,myContext} = this.state;

		let mouse = getCurrent(event);
		let allObj = data.map(function(item,index){
			const minX = Number(item.cellCoordX);
			const minY = Number(item.cellCoordY);
			const maxX = Number(item.cellCoordX)+Number(item.cellWidth);
			const maxY = Number(item.cellCoordY)+Number(item.cellHeight);

			if((mouse.x >= minX && mouse.x <= maxX ) && (mouse.y >= minY && mouse.y <= maxY)){
				if(!item.status ){
					item.status = 3;
				}else if(item.status ==  3){
					item.status = 0;
				}
				
			}
			return item;
		})
		this.draw(allObj,myCanvas,myContext);

	}

	render() {

		return (
			
			<div>
				<canvas id="canvas" width = "1000" height = "1000" style = {{background:"#ccc",position:"relative"}} onClick = {this.canvasClick}></canvas>
			</div>
		);
	}
}
