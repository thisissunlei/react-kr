import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import './index.less';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
import {
    Dialog,
    KrField,
    Button
} from 'kr-ui';



export default class DoubleColumn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            leftData:[],
            rightData:[] 
        }
        this.allData = [
            {value:1},
            {value:2},
            {value:3},
            {value:4},
            {value:5},
            {value:6},
            {value:7}
        ]
        this.delLeft = [];
        this.delRight = [];
        this.keyCode = '';
        this.isMac = false;
        this.window
    }

    componentDidMount () {
        let {left} = this.state;
        document.addEventListener("keydown",this.onKeyDown);
        document.addEventListener("keyup",this.onKeyUp);
        this.isMac = function() {
            return /macintosh|mac os x/i.test(navigator.userAgent);
        }();
        
        /** * 是否为windows系统 * */
        this.isWindows = function() {
            return /windows|win32/i.test(navigator.userAgent);
        }(); 
        this.setState({
            leftData:this.allData,
        })
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keyup", this.onKeyUp);
    }    
    
    eveyNumClick = (event,data,index,type) =>{
        let {leftData,rightData} = this.state;
        if(this.isMac){
            
        }
        if(!data.isActive){
            data.isActive = true;
        }else{
            data.isActive = false;
        }
        if(this.keyCode == 17){
          
            if(type == "left"){
                this.delLeft.push(data);
            }
            if(type == "right"){
                this.delRight.push(data);
            }
        }else{
            if(type == "right"){
                this.delRight=[].concat([data]);
                var newRightData = rightData.map((item,num)=>{
                    if(index == num){
                        item.isActive = true
                    }else{
                        item.isActive = false;
                    }
                    return item;
                })  
                this.setState({
                    rightData:newRightData,
                })
            }
            if(type == "left"){
            
                this.delLeft=[].concat([data]);
                var newLeftData = leftData.map((item,num)=>{
                    if(index == num){
                        item.isActive = true
                    }else{
                        item.isActive = false;
                    }
                    return item;
                })  
                this.setState({
                    leftData:newLeftData,
                })
            }
           
        }

    }
    
    everyNum = (data,index,type)=>{
        let bgColor = "#fff";
        if(data.isActive){
            bgColor="red";
        }
        return (
            <div 
                className = "every-num" 
                onClick = {
                    (event)=>{
                        this.eveyNumClick(event,data,index,type)
                    }
                    
                }
                style = {{background:bgColor}}>
                {data.value}
            </div>
        )
    }
    renderLeft = () =>{
        let {leftData} = this.state;
        var elems = leftData.map((item,index)=>{
            return this.everyNum(item,index,"left");
        })
        return elems; 
    }
    renderRight = () =>{
        let {rightData} = this.state;
        var elems = rightData.map((item,index)=>{
            return this.everyNum(item,index,"right");
        })
        return elems; 
    }
    onKeyDown = (event) =>{
        console.log(event,"LLLLLLL")
        this.keyCode = event.keyCode;
    }
    onKeyUp = (event) =>{
        this.keyCode = '';
    }

    render(){
        return(
            <div className='double-column clear' 
                 onKeyDown = {this.onKeyDown} 
                 onKeyUp = {this.onKeyUp}
                 ref = {
                     (ref)=>{
                        this.column = ref;
                     }
                 }
            >	
                <div className = "text-num">
                    {0}个
                </div> 
                <div className = "column-left">
                    {this.renderLeft()}
                </div>
                <div className = "column-bar">
                    <div>{">>"}</div>
                    <div>{">"}</div>
                    <div>{"<"}</div>
                    <div>{"<<"}</div>
                </div>
                <div className = "column-right">    
                    {this.renderRight()}
                </div>
			</div>
        )
        
        
       
    }


}

