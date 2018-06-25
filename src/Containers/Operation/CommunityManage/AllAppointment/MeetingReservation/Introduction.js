
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import $ from 'jquery';
import {
	SnackTip

} from 'kr-ui';


import './index.less';

export default class Introduction extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
			startTime:9,
			endTime:13,
			// allStartTime:this.props.allStartTime,
			// allEndTime:this.props.allEndTime,
			all:[],
			inData:'',

		}
		
	}
	
	componentDidMount() {
		const {onClick,data,width,index} = this.props;
		let wWidth = $(window).width();
		let _this = this;
		
		
		
		// $(".reservation-introduction .reservation-introduction-mask").click(function(event){
		// 	let {inData} = _this.state; 
			
		// 	if($(this).attr("data-id") == data.id){
		// 		console.log(event.target, "pppppp")
		// 		let scollTop = $("body").scrollTop();
		// 		let num = $(this).index();
		// 		let pagex = event.pageX;
		// 		let pagey = event.pageY;
		// 		let offsetx = event.offsetX; 
		// 		let offsety = event.offsetY; 
		// 		let periodTime = data.endTime.h-data.beginTime.h;
		// 		let detailWidth = width*(periodTime);
		// 		if(data.beginTime.m){
		// 			detailWidth = detailWidth -width/2;
		// 		}
		// 		if(data.endTime.m<=30){
		// 			detailWidth = detailWidth +width/2;
		// 		}
		// 		if(data.endTime.m>30){
		// 			detailWidth = detailWidth +width;
		// 		}
		// 		let eventDetail = event.target.getBoundingClientRect();
		// 		let coordinates = {
		// 			// x:pagex+(detailWidth-offsetx)-5,
		// 			x: eventDetail.left+eventDetail.width-5,
		// 			y: eventDetail.top + Math.ceil(eventDetail.height/2),
		// 		};
				
		// 		let location = "right";
		// 		if (eventDetail.left + eventDetail.width+254>=wWidth){
					
		// 			coordinates = {
		// 				x: eventDetail.left - 254 - 10,
		// 				y: eventDetail.top + Math.ceil(eventDetail.height / 2),
		// 			}; 
		// 			location = "left";
		// 		}
		// 		onClick && onClick(coordinates,location,data.id);
			
		// 	}
			
			
		// })
		this.setState({
			inData:data,
			
		})
		
		
	}
    render(){
		const {startTime} = this.state;
		const {data,width,allStartTime} = this.props;
		//let periodTime = data.endTime.h-data.beginTime.h;
		if(!data){
			return null;
		}
		let detailWidth = width*(periodTime)+1;
		// let left = (data.beginTime.h-allStartTime.h)*width;
		// if(data.beginTime.m){
		// 	detailWidth = detailWidth - width/2;
		// 	left = left + width/2;
		// }
		// if(data.endTime.m){
		// 	detailWidth = detailWidth + width/2;
		// }
		
		
        return(
            <div className="reservation-introduction" style = {{width:detailWidth,left:left}} onClick = {this.onClick}> 
				
				<div>{data.memberName}</div>
				<div>{data.customerName}</div>
				<div data-id = {data.id}  className = "reservation-introduction-mask"></div>
				
            </div>
        );
    }


}
