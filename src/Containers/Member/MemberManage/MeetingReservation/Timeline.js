
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
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
         console.log(this.props.data.orderEndTime,"?????")
		this.state = {
            endTime:this.hourFormat(this.props.data.orderEndTime),
            startTime:this.hourFormat(this.props.data.orderStartTime),
            openDetail:false,
            coordinates:{},
            location:"right",
            isScoll:false,
            detailData:'',
            width:84,

		}
       
	}

    //生成刻度
    generateCalibration = () =>{
        let {endTime,startTime,width}=this.state;
        let elems = [];
        
        
        for(var i= startTime.h;i<endTime.h;i++){
            let border= "0px solid #ccc"
            if(i==endTime.h-1){
                border= "1px solid #ccc"
            }
         elems.push (
                <div key = {i} className = "metting-hours-box" style = {{width:width,float:"left",position:"relative",height:80,top:10,borderRight:border}}>
                    <div className = "hours" style = {{width:width/2}}><span>{i+"时"}</span></div>
                    <div className = "half-hours" style = {{width:width/2}}></div>
                </div>
                  )
        }
     return elems;    
    }
    //转化为时分
    hourFormat = (time) =>{
        let date = DateFormat(time,24).split(" ");
        let obj = {
            h:Number(date[date.length-1].split(":")[0]),
            m:Number(date[date.length-1].split(":")[1]),
        }
        return obj;
    }
    //生成时间段
    generateIntroduction = () =>{
        let _this = this;
        const {data} = this.props;
        const {startTime,endTime,coordinates,openDetail,location,width}=this.state;
        if(!data.appointments){
            return null;
        }
        let elems =  data.appointments.map(function(item,index){
            let inData = Object.assign({}, item);
            inData.beginTime = _this.hourFormat(item.beginTime);
            inData.endTime = _this.hourFormat(item.endTime);
           
            return  <Introduction
                        key = {index}  
                        onClick = {_this.openDetail}
                        allStartTime = {startTime}
                        allEndTime = {endTime}
                        data = {inData}
                        width = {width}
                        index = {index}
                    />
        })
        return elems;
    }
    // 生成设备
    equipment = () =>{
        
        let {data} = this.props;
        
        let elems = data.deviceList.map(function(item,index){
            return <span key = {index} style={{float:"right"}}>{item}</span>
        })
        return <div style={{float:"right"}}>{elems}</div>;
    }

    onScroll = (top,flog) =>{
        // let {coordinates} = this.state;
        // if(flog>0){
        //     //下滚
        //     this.setState({
        //         coordinates:{
        //             x:coordinates.x,
        //             y:coordinates.y
        //         }
        //     })

        // }else{

        // }
    }
   
    openDetail = (coordinates,location,id) =>{ 
        const {data} = this.props;   
        let detailData = '';
        $("body").css("overflow","hidden");
        if(!data){
            return null;
        }
        data.appointments.map(function(item,index){
            if(item.id == id){
                detailData = item;
            }
        })
        
        this.setState({
            coordinates,
            openDetail:true,
            location,
            detailData
        })
    }
    closeDetail = () =>{
         $("body").css("overflow","scroll");
        this.setState({
            openDetail:false,
        })
    }
    mtDelete = (data) =>{
        let {mtDelete} = this.props;
        mtDelete && mtDelete(data,this.closeDetail);
    }
    
    render(){
        const {startTime,endTime,coordinates,openDetail,location,detailData,width} = this.state;
        const {data} = this.props;
       
        let len = endTime.h - startTime.h;
        let inWidth = width*len+1;
       
        if(!data){
            return null;
        }

        return(
            <div className="metting-Timeline">
               
                <div className = "metting-Timeline-box">
                    <div className = "metting-Timeline-shaft" style = {{width:inWidth}}>
                        {this.generateCalibration()}
                        {this.generateIntroduction()}
                         
                    </div>
                </div>
                <div className = "sticky-notes">
                    <span>{data.name}</span>
                    <span>{data.floor+"楼"}</span>
                    <span>{data.capacity+"座位"}</span>
                    {this.equipment()}
                    
                </div>
                <Detail 
                    open = {openDetail} 
                    coordinates = {coordinates}
                    close = {this.closeDetail}
                    offset = {location}
                    mtDelete = {this.mtDelete}
                    detailData = {detailData}
                    metting = {data.name}
                    width = {width}
                />
            </div>
        );
    }


}
