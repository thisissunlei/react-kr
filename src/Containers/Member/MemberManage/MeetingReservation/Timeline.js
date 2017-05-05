
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import $ from 'jquery';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Message,
	Title,
	SnackTip

} from 'kr-ui';

import Introduction from './Introduction';
import Detail from './Detail';
import './index.less';

export default class Timeline extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
            startTime:8,
            endTime:30,
            openDetail:false,
            coordinates:{},
            location:"right",
            isScoll:false
		}
	}

    //生成刻度
    generateCalibration = () =>{
        let {startTime,endTime}=this.state;
        let elems = [];
        for(var i=startTime;i<endTime;i++){
         elems.push (
                <div style = {{width:84,float:"left",position:"relative",height:90}}>
                    <div className = "hours"><span>{i+"时"}</span></div>
                    <div className = "half-hours"></div>
                </div>
                  )
        }
     return elems;    
    }
    //滚动条滚动
   
    openDetail = (coordinates,location) =>{    
        $("body").css("overflow","hidden");
        console.log(">>>>>>")
        this.setState({
            coordinates,
            openDetail:true,
            location,
        })
    }
    closeDetail = () =>{
         $("body").css("overflow","scroll");
        this.setState({
            openDetail:false,
        })
    }
    delete = (data){
        const {delete} = this.props;
        delete && delete(data);
    }
    render(){
        const {startTime,endTime,coordinates,openDetail,location}=this.state;
        let len = endTime - startTime;
        return(
            <div className="metting-Timeline">
               
                <div className = "metting-Timeline-box">
                    <div className = "metting-Timeline-shaft" style = {{width:84*len}}>
                        {this.generateCalibration()}
                         <Introduction  
                            onClick = {this.openDetail}
                            allStartTime = {startTime}
                            allEndTime = {endTime}
                            onScroll = {this.onScroll}
                           
                         />
                    </div>
                </div>
                <div className = "sticky-notes">
                    <span>H01</span>
                    <span>2楼</span>
                    <span>4座位</span>
                    <span style={{float:"right"}}>ddddddddddd</span>
                </div>
                <Detail 
                    open = {openDetail} 
                    coordinates = {coordinates}
                    close = {this.closeDetail}
                    offset = {location}
                    delete = {this.delete}
                />
            </div>
        );
    }


}
