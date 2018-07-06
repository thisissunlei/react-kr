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
		
		
		
		$(".reservation-introduction .reservation-introduction-mask").click(function(event){
			let {inData} = _this.state; 
			
			if($(this).attr("data-id") == data.orderNo){
				let scollTop = $("body").scrollTop();
				let num = $(this).index();
				let pagex = event.pageX;
				let pagey = event.pageY;
				let offsetx = event.offsetX; 
				let offsety = event.offsetY; 
				let periodTime =data.orderTimes.length;
				let detailWidth = width*periodTime/2;
				
				let eventDetail = event.target.getBoundingClientRect();
				let coordinates = {
					x: eventDetail.left+eventDetail.width-15,
					y: eventDetail.top + Math.ceil(eventDetail.height/2),
				};
				
				let location = "right";
				if (eventDetail.left + eventDetail.width+254>=wWidth){
					
					coordinates = {
						x: eventDetail.left - 254 - 15,
						y: eventDetail.top + Math.ceil(eventDetail.height / 2),
					}; 
					location = "left";
				}


				onClick && onClick(coordinates,location,data);
			
			}
			
			
		})
		this.setState({
			inData:data,
			
		})
		
		
	}
	//时间转换
	hourFormat=(timeArr)=>{
		let timeType={
			'1':0,
			'2':0.5,
			'3':1,
			'4':1.5,
			'5':2,
			'6':2.5,
			'7':3,
			'8':3.5,
			'9':4,
			'10':4.5,
			'11':5,
			'12':5.5,
			'13':6,
			'14':6.5,
			'15':7,
			'16':7.5,
			'17':8,
			'18':8.5,
			'19':9,
			'20':9.5,
			'21':10,
			'22':10.5,
			'23':11,
			'24':11.5,
			'25':12,
			'26':12.5,
			'27':13,
			'28':13.5,
			'29':14,
			'30':14.5,
			'31':15,
			'32':15.5,
			'33':16,
			'34':16.5,
			'35':17,
			'36':17.5,
			'37':18,
			'38':18.5,
			'39':19,
			'40':19.5,
			'41':20,
			'42':20.5,
			'43':21,
			'44':21.5,
			'45':22,
			'46':22.5,
			'47':23,
			'48':23.5
		}
		let len=timeArr.length;
		let timeObj={
			start:timeType[timeArr[0]],
			end:timeType[timeArr[len-1]]
		}
		return timeObj;
	}
    render(){
		const {startTime} = this.state;
		const {data,width,allStartTime} = this.props;
		let periodTime = data.orderTimes.length;

		if(!data){
			return null;
		}
		let sourceType={
			'APP_MEETING':'App预订',
			'KRM_MEETING':'krmeeting预订'
		}
		let orderSource=sourceType[data.orderSource];
		let detailWidth = width*periodTime/2;
		let time=this.hourFormat(data.orderTimes);
		let left = (time.start-1)*width;
		
        return(
            <div className="reservation-introduction" style = {{width:detailWidth,left:left}} onClick = {this.onClick}> 
				
				<div>{data.userName}</div>
				{data.orderSource=='APP_MEETING'?<div>{data.companyName}</div>:''}
				{data.orderSource=='KRM_MEETING'?<div>{data.phone}</div>:''}
				<div>{orderSource}</div>
				<div data-id = {data.orderNo}  className = "reservation-introduction-mask"></div>
				
            </div>
        );
    }


}
