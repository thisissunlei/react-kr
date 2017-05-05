
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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
    
    componentDidMount() {
        window.onscroll = function(){
                
            }
    }
	delete = () =>{
		const {delete,data} = this.props;
		delete && delete(data);
	}

    render(){
        let {open,coordinates,offset} = this.props;
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
					<botton className = "delete-btn" onClick = {this.delete}>删除会议室</botton>
				</div>
				<div className = "mask" onClick = {this.close}></div>
            </div>
        );
    }


}











