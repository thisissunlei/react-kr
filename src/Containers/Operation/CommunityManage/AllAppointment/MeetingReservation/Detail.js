
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';

import {
	SnackTip

} from 'kr-ui';


import './index.less';

export default class Detail extends React.Component {

	constructor(props, context) {
		super(props, context);
		
	}
	close = (event) =>{

        let {close} = this.props;
		close && close();
	}
	mtDelete = () =>{
		const {mtDelete,detailData} = this.props;
		mtDelete && mtDelete(detailData);
	}

    render(){
        let {open,coordinates,offset,detailData,metting} = this.props;
		let showDelete = true;
		
		
		// let startTime = DateFormat(detailData.beginTime,"dddd,mm,dd,hh:MM").split(",");
		
		// let endTime = DateFormat(detailData.endTime,"dddd,mm,dd,hh:MM").split(",");
		
		//let week = {Monday:'一',Tuesday:'二',Wednesday:'三',Thursday:'四',Friday:'五',Saturday:'六',Sunday:'日'}
		// DateFormat(detailData.beginTime,"dddd,mm,dd,hh:MM")
		let DeStartTime = '',
			DeEndTime ='';
		// if (detailData.beginTime || detailData.beginTime === 0){
		// 	DeStartTime = DateFormat(detailData.beginTime, 24).split(" ")[4].split(":");
		// }
		// if (detailData.endTime || detailData.endTime === 0) {
		// 	DeEndTime = DateFormat(detailData.endTime, 24).split(" ")[4].split(":");
		// }
		let sourceType={
			'APP_MEETING':'App预定',
			'KRM_MEETING':'krmeeting预定'
		}
		let orderSource=sourceType[detailData.orderSource];
		
        if(!open){
            return null;
		}
		let timeStr=detailData.useTime.split(')');

		console.log('timeStr',timeStr)
        let location = "detail-right"
        if(offset == 'left'){
            location = "detail-left";
        }
        return(
            <div className="reservation-detail"  onClick = {this.close}> 
				
				 <div className = {"detail "+location}  
									onClick={(event) => {
									    event.stopPropagation();
									
								    }}
                                    style = {{left:coordinates.x,top:coordinates.y}}
                                >
					<div className = "close"><span onClick = {this.close}></span></div>
					<div className = "place">
						<span style = {{display:"inline-block",width:80}}>订单来源:</span>
						<div>
							<p>{orderSource}</p>
						</div>

					</div>
					<div className = "time">
						<span style = {{display:"inline-block",width:80}}>时  间:</span>
						<div>
							<p>{`${timeStr[0]})`}</p>
							<p>{timeStr[1]}</p>
						</div>

					</div>
					
					<div className = "place">
						<span style = {{display:"inline-block",width:80}}>会议室名称:</span>
						<div>
							<p>{detailData.roomName}</p>
						</div>

					</div>
					<div className = "reservation-people">
						<span style = {{display:"inline-block",width:80}}>预约人:</span>
						<div>
							<p>{detailData.userName}</p>
						</div>
					</div>
					<div className = "place">
						<span style = {{display:"inline-block",width:80}}>所属公司:</span>
						<div>
							<p>{detailData.companyName}</p>
						</div>
					</div>
					<div className = "place">
						<span style = {{display:"inline-block",width:80}}>参会人:</span>
						<div>
							<p>{detailData.attendeeName}</p>
						</div>
					</div>
					{detailData.deletable && <botton className = "delete-btn" onClick = {this.mtDelete}>删除会议室</botton>}
				</div>
				<div className = "mask" onClick = {this.close}></div>
            </div>
        );
    }


}











