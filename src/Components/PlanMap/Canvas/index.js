
import React from 'react';


import {Mouse} from 'kr/Utils';

export default  class Canvas extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			myCanvas:'',
			myContext:'',
			imgW:"",
			imgH:'',
		}
	}

	
	componentDidMount(){
		const {data,url,id} = this.props; 
		const _this = this;
		let img = new Image();
		img.src = "http://optest.krspace.cn"+url;
		img.onload = function () {  
	    	var canvas = document.getElementById("canvas"+id);
	
	
		
			
			// canvas.width =  1000;
        	// canvas.height =  1000;	
			canvas.width = img.width || 1000;
        	canvas.height = img.height || 1000;	
			var context = canvas.getContext("2d");
			
			_this.draw(data,canvas,context);
			_this.setState({
				myCanvas:canvas,
				myContext:context,
				imgW:img.width,
				imgH:img.height
			})
		}
	}
    
    draw = (data,can,ctx) =>{
		
		ctx.clearRect(0,0,can.width,can.height); 
		
        data.map(function(item,index){
			let color = "";
			let fontColor = "";
			let width = Number(item.cellWidth);
			let height = Number(item.cellHeight);
			let x = Number(item.cellCoordX)-25;
			let y = Number(item.cellCoordY)-10;
			if(item.status==1){
				color = "#499df1";
				fontColor ="#fff";				
			}else if(item.status==2){
				color = "#eee";
				fontColor ="#fff";				
			}else if(item.status==3){
				color = "#28c288";
				fontColor ="#fff";
			}else if(item.status==4){
				color = "#fff";
				fontColor = "#499df1";
			}
			if(!item.status){
				color = "#fff"
			}
            ctx.fillStyle = color;
            ctx.fillRect(x,y,width,height);
			ctx.font="12px";
			ctx.fillStyle = color;
			ctx.strokeText(item.cellName,x+(width/2-(item.cellName.length*7/2)),y+(height-14)/2+12);
			
        })
    }

	canvasClick = (event) =>{
		const {getCurrent} = Mouse;
		const {data,url} = this.props;
		const {myCanvas,myContext} = this.state;

		

		let mouse = getCurrent(event);
		let allObj = data.map(function(item,index){
			const minX = Number(item.cellCoordX)-25;
			const minY = Number(item.cellCoordY)-10;
			const maxX = Number(item.cellCoordX)+Number(item.cellWidth)-25;
			const maxY = Number(item.cellCoordY)+Number(item.cellHeight)-10;

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
		const {url,id} = this.props;
		const {imgW,imgH} = this.state;
		let src = "http://optest.krspace.cn"+url;
		return (
			
			<div style = {{background:"url("+src+")",width:imgW,height:imgH}}>
				<canvas id={"canvas"+id} style = {{background:"transparent",position:"relative"}} onClick = {this.canvasClick}></canvas>
			</div>
		);
	}
}
