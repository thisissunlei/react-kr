
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

import {
	SnackTip

} from 'kr-ui';


import './index.less';

export default class MeetingReservation extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			openDetail :false

		}
	}
	detailClick = () =>{
		let {openDetail} = this.state;
		this.setState({
			openDetail:!openDetail
		})
	}


    render(){
		let {openDetail} = this.state;
        return(
            <div className="reservation-detail" onClick = {this.detailClick}> 
				
				<div>姓名</div>
				<div>客户</div>
				{openDetail && <div className = "detail"  
									onClick={(event) => {
									event.stopPropagation();
									
								}}>
					<div className = "close"><span onClick = {this.detailClick}></span></div>
					<div className = "time">
						<span>时间:</span>
						<div>
							<p>4月26日（周三）</p>
							<p>17:00-17:15</p>
						</div>

					</div>
					<div className = "place">
						<span>地点:</span>
						<div>
							<p>火星会议室</p>
						</div>

					</div>
					<div className = "reservation-people">
						<span>预约人:</span>
						<div>
							<p>张三</p>
							<p>撒大声地所大大多</p>
						</div>

					</div>
					<botton className = "delete-btn">删除会议室</botton>
				</div>}
				{openDetail &&<div className = "mask"></div>}
            </div>
        );
    }


}
