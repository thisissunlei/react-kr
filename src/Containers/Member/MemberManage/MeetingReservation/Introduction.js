
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
			periodTime:2,
			startTime:9,
			endTime:13,
			allStartTime:this.props.allStartTime,
			allEndTime:this.props.allEndTime,

		}
		
	}
	// detailClick = (event) =>{
		
	// 	let {onClick,data} = this.props;
	// 	onClick && onClick(data)
	// }
	componentDidMount() {
		const {onClick,data,onScroll} = this.props;
		let {periodTime} = this.state;
		let wWidth = $(window).width();
		
		document.onscroll = function(){
			let scollTop = $("body").scrollTop();
			onScroll && onScroll(scollTop);
		}
		$(".reservation-introduction-mask").click(function(event){
			let scollTop = $("body").scrollTop();
			let pagex = event.pageX;
			let pagey = event.pageY;
			let offsetx = event.offsetX; 
			let offsety = event.offsetY; 
			let width = 84*(periodTime+1);
			let coordinates = {
				x:pagex+(width-offsetx)-5,
				y:pagey+(30 - offsety)-scollTop
			};
			
			let location = "right";
			if(pagex+(width-offsetx)+254>=wWidth){
				coordinates = {
					x:pagex-offsetx-254-15,
					y:pagey+(30 - offsety)
				}; 
				location = "left";
			}
			
			
			onClick && onClick(coordinates,location);

		})
	}
	

    render(){
		const {periodTime,startTime,allStartTime} = this.state;
		let width = 84*(periodTime+1)+1;
		let left = (startTime-allStartTime)*84;
        return(
            <div className="reservation-introduction" style = {{width:width,left:left}} > 
				
				<div>姓名</div>
				<div>客户</div>
				<div className = "reservation-introduction-mask"></div>
				
            </div>
        );
    }


}
