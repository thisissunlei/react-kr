
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
		let startTime = DateFormat(detailData.beginTime,"dddd,mm,dd,hh:MM").split(",");
		let endTime = DateFormat(detailData.endTime,"dddd,mm,dd,hh:MM").split(",");
		let week = {Monday:'一',Tuesday:'二',Wednesday:'三',Thursday:'四',Friday:'五',Saturday:'六',Sunday:'日'}
		// DateFormat(detailData.beginTime,"dddd,mm,dd,hh:MM")
		let DeStartTime = DateFormat(detailData.beginTime,24).split(" ")[4].split(":");
		let DeEndTime = DateFormat(detailData.endTime,24).split(" ")[4].split(":");
        if(!open){
            return null;
        }
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
					<div className = "time">
						<span>时  间:</span>
						<div>
							<p>{startTime[1]+'月'+startTime[2]+'日（周'+week[startTime[0]]+'）'}</p>
							<p>{DeStartTime[0]+':'+DeStartTime[1]+'-'+endTime[0]+':'+endTime[1]}</p>
						</div>

					</div>
					<div className = "place">
						<span>地  点:</span>
						<div>
							<p>{metting}</p>
						</div>

					</div>
					<div className = "reservation-people">
						<span>预约人:</span>
						<div>
							<p>{detailData.memberName}</p>
							<p>{detailData.customerName}</p>
							
						</div>

					</div>
					<botton className = "delete-btn" onClick = {this.mtDelete}>删除会议室</botton>
				</div>
				<div className = "mask" onClick = {this.close}></div>
            </div>
        );
    }


}











