
import React from 'react';

import $ from 'jquery';

export default  class Canvas extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			myCanvas:'',
			myContext:'',
			imgW:"",
			imgH:'',
			inputStart:this.props.inputStart,
			inputEnd:this.props.inputEnd,
			scrollX:0,
			scrollY:0,
			data:this.props.data,
			deleteArr:[]
		}
	}


	componentDidMount(){
		const {url,id} = this.props;
		const {data} = this.state;
		const _this = this;
		let img = new Image();
		img.src = "http://optest.krspace.cn"+url;
		img.onload = function () {
	  	var canvas = document.getElementById("canvas"+id);
		canvas.width = img.width || 1000;
    	canvas.height = img.height || 1000;
		var context = canvas.getContext("2d");
		$("#plan-map-content").scroll(function(){
			let scrollX = $("#plan-map-content").scrollLeft();
			let scrollY = $("#plan-map-content").scrollTop();
			_this.setState({
				scrollX:scrollX,
				scrollY:scrollY,

			})
		})

			_this.setState({
				myCanvas:canvas,
				myContext:context,
				imgW:img.width,
				imgH:img.height
			},function(){
				_this.draw("one");
			})
		}
	}
	componentWillReceiveProps(nextProps){
		let _this = this;
		let {inputStart,inputEnd} = this.state;

		if(nextProps.inputStart!=inputStart || nextProps.inputEnd != inputEnd ){
			this.setState({
				inputStart:nextProps.inputStart,
				inputEnd:nextProps.inputEnd,
			},function(){
				_this.draw(true);
			})

		}

	}
    draw = (flog) =>{

		let {myCanvas,myContext,inputStart,inputEnd,data,deleteArr} = this.state;
		const {dataChange,selectedObjs,newfloor} = this.props;

		let can = myCanvas,ctx = myContext;
		let start = Number(inputStart);
		let end = Number(inputEnd);
		let items =data;
		let allObj = [];
		let submitData = [];
		let num = 0;
		ctx.clearRect(0,0,can.width,can.height);

        allObj = items.map(function(item,index){
					if(item.belongType == "STATION" ){
						item.belongType=1;
					}
					if(item.belongType == "SPACE" ){
						item.belongType=2
					}
			

			let color = "";
			let fontColor = "";
			let width = Number(item.cellWidth);
			let height = Number(item.cellHeight);
			let x = Number(item.cellCoordX)-25;
			let y = Number(item.cellCoordY)-10;
			let cellName = Number(item.cellName);

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

			if(flog && flog != "one" && cellName >= start && cellName <= end && (!item.status)){
				color = "#28c288";
				item.status = 3;
			}


			if(num != selectedObjs.length){
				
				selectedObjs.map(function(eve,index){
					
					if(flog && flog == "one" && item.belongId == eve.id && item.belongType == eve.belongType){
						item.status = 3;
						num++;
						color = "#28c288";
						

					}
				})
			}
			if(item.status == 3){
				submitData.push(item);
			}

      		ctx.fillStyle = color;
     	 	ctx.fillRect(x,y,width,height);
			ctx.font="12px";
			ctx.fillStyle = color;
			ctx.strokeText(item.cellName,x+(width/2-(item.cellName.length*7/2)),y+(height-14)/2+12);
			return item;
        })

		dataChange && dataChange(newfloor,submitData,deleteArr);
		this.setState({
			data:allObj
		})
    }

	canvasClick = (event) =>{
		event.stopPropagation();

		const {url,selectedObjs} = this.props;
		const {data,myCanvas,myContext,scrollX,scrollY} = this.state;
		var mouse = myCanvas.getBoundingClientRect();
		let top = $("body").scrollTop();
		var x = event.pageX - mouse.left ;
		var y = event.pageY - mouse.top - top;
		let deleteArr = [];
		let allObj = data.map(function(item,index){
			const minX = Number(item.cellCoordX)-25;
			const minY = Number(item.cellCoordY)-10;
			const maxX = Number(item.cellCoordX)+Number(item.cellWidth)-25;
			const maxY = Number(item.cellCoordY)+Number(item.cellHeight)-10;

			if((x >= minX && x<= maxX ) && (y >= minY && y  <= maxY)){

				if(!item.status ){
					item.status = 3;
				}else if(item.status ==  3){
					item.status = 0;
					selectedObjs.map(function(ele,index){
						if(item.belongId == ele.id && item.belongType == ele.belongType){
							deleteArr.push(item);
							
						}
					})
					
				}

			}
			return item;
		})
		this.setState({
			data:allObj,
			deleteArr:deleteArr
		},function(){
			this.draw();
		})


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
