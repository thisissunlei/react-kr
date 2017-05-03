
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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

import ReservationDetail from './ReservationDetail';
import './index.less';

export default class Timeline extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
            startTime:8,
            endTime:30
		}
	}

    //生成刻度
    generateCalibration = () =>{
        let {startTime,endTime}=this.state;
        let elems = [];
        for(var i=startTime;i<endTime;i++){
            console.log("i",i);
         elems.push (
                <div style = {{width:84,float:"left",position:"relative",height:90}}>
                    <div className = "hours"><span>{i+"时"}</span></div>
                    <div className = "half-hours"></div>
                </div>
                  )
        }
     return elems;    
    }
    render(){
        let {startTime,endTime}=this.state;
        let len = endTime - startTime;
        return(
            <div className="metting-Timeline">
                <div className = "metting-Timeline-box">
                    <div className = "metting-Timeline-shaft" style = {{width:84*len}}>
                        {this.generateCalibration()}
                    </div>
                </div>
                <div className = "sticky-notes"></div>
            </div>
        );
    }


}
