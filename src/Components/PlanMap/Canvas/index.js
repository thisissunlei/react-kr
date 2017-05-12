
import React from 'react';


import {Http} from 'kr/Utils';

export default  class Canvas extends React.Component {

	constructor(props){
		super(props)
	}

	
	componentDidMount(){
	    var canvas = document.getElementById("canvas");
        canvas.width = 1000;
        canvas.height = 1000;
        var context = canvas.getContext("2d");
	}
    
    draw = (data,can,ctx) =>{
        data.map(function(){
            ctx.fillStyle="#FF0000";
            ctx.fillRect(0,0,150,75);
        })
    }


	render() {

		return (
			
			<div>
				<canvas id="canvas" width = "1000" height = "1000" style = {{background:"#ccc",position:"relative"}} ></canvas>
			</div>
		);
	}
}
