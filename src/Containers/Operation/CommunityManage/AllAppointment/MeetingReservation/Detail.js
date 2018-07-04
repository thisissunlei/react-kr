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
	renderPhoneOrCompany=(detailData)=>{
		if(detailData.orderSource=='APP_MEETING'){
			return(
				<div className = "place">
					<span style = {{display:"inline-block",width:80}}>所属公司:</span>
					<div>
						<p>{detailData.companyName}</p>
					</div>
				</div>
			)
		}else if(detailData.orderSource=='KRM_MEETING'){
			return(
				<div className = "place">
					<span style = {{display:"inline-block",width:80}}>联系电话:</span>
					<div>
						<p>{detailData.phone}</p>
					</div>
				</div>
			)
		}

	}

    render(){
        let {open,coordinates,offset,detailData,metting} = this.props;
		let showDelete = true;
		let sourceType={
			'APP_MEETING':'App预订',
			'KRM_MEETING':'krmeeting预订'
		}
		let orderSource=sourceType[detailData.orderSource];
		
        if(!open){
            return null;
		}
		let timeStr=detailData.useTime.split(')');
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
					{
						this.renderPhoneOrCompany(detailData)
					}
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











