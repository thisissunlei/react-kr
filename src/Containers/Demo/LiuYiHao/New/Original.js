import React from 'react';
import {
	PlanMap
} from 'kr-ui';
import {
	Mouse
} from 'kr/Utils';
import './index.less';
export default class Original extends React.Component {


	constructor(props, context) {
		super(props, context);

		this.state = {
      mouseDown:false,
      zoomDown:false,
      box:{
        left:0,
        top:0,
        height:100,
        width:100,
      },
      mouseRelativeBox:{
        x:0,
        y:0
      },
      zomm:{
        x:0,
        y:0
      }

		}

	}

mouseDown =(event) =>{
  let mouse = {
    x:event.clientX- event.target.offsetLeft,
    y:event.clientY - event.target.offsetTop
  };
  this.setState({
    mouseDown:true,
    mouseRelativeBox:{
      x:mouse.x,
      y:mouse.y
    }
  })
}

mouseMove = (event) =>{

  const {mouseDown,box,mouseRelativeBox} = this.state;
  if(mouseDown){
    let left = event.clientX-mouseRelativeBox.x;
    let top = event.clientY-mouseRelativeBox.y;
    this.setState({
      box:{
          left:left,
          top:top,
          height:box.height,
          width:box.width,
      }
    })
  }


}
zoomMouseDown = (event) =>{
  event.stopPropagation();
  this.setState({
    zoomDown:true,
    zoom:{
      x:event.clientX,
      y:event.clientY
    }
  })
}

zoomMousemove = (bearing,event) =>{
  event.stopPropagation();
  const {zoom,box,zoomDown} = this.state;

  if(zoomDown){
    let diffx = zoom.x-event.clientX;
    let diffy =zoom.y-event.clientY;
    if(bearing == "topLeft"){
      diffx=diffx*2
      diffy=diffy*2
    }else if(bearing == "topRight"){
      diffx=-diffx*2
      diffy=diffy*2
    }else if(bearing == "bottomRight"){
      diffx=-diffx*2
      diffy=-diffy*2
    }else {
      diffx=diffx*2
      diffy=-diffy*2
    }
    this.setState({
      box:{
          left:box.left-diffx/2,
          top:box.top-diffy/2,
          height:box.height+diffy,
          width:box.width+diffx,
      },
      zoom:{
        x:event.clientX,
        y:event.clientY
      }
    })
  }
}

	componentDidMount() {
    let elem = document.getElementsByTagName('body')[0];
    const _this = this;
    elem.onmouseup = function(){

      const {box,mouseDown,zoomDown} = _this.state;
      const {mouseUp} = _this.props;
      if(mouseDown||zoomDown){
        mouseUp && mouseUp(box);
      }

      _this.setState({
        mouseDown:false,
        zoomDown:false,
      })
    }
  }

	render() {
    const {box} = this.state;
		return (
			<div className = "m-original"
           onMouseDown = {this.mouseDown}
           onMouseMove = {this.mouseMove}
           style = {{
             width:box.width,
             height:box.height,
             left:box.left,
             top:box.top,
           }}
      >
          <div className = "zoom-1"
               onMouseDown = {this.zoomMouseDown}
               onMouseMove = {this.zoomMousemove.bind(this,"topLeft")}
          >
          </div>
          <div className = "zoom-2"
               onMouseDown = {this.zoomMouseDown}
               onMouseMove = {this.zoomMousemove.bind(this,"topRight")}
          ></div>
          <div className = "zoom-3"
               onMouseDown = {this.zoomMouseDown}
               onMouseMove = {this.zoomMousemove.bind(this,"bottomRight")}
          ></div>
					<div className = "zoom-4"
               onMouseDown = {this.zoomMouseDown}
               onMouseMove = {this.zoomMousemove.bind(this,"bottomLeft")}
          ></div>
			</div>

		);
	}
}
