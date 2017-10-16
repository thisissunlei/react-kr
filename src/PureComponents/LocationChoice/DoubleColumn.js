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
            rightData:[],
            other:''
        }
        this.allData = [
            {
                code:1,
                detailId:1
            },
            {
                code:2,
                detailId:2
            },
            {
                code:3,
                detailId:3
            },
            {
                code:4,
                detailId:4
            },
            {
                code:5,
                detailId:5
            },
            {
                code:6,
                detailId:6
            },
            {
                code:7,
                detailId:7
            }
        ]
        this.delLeft = [];
        this.delRight = [];
        this.isMac = false;
        this.keyCode = "";
        this.isWindows = false;
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
            leftData:this.allDataInit(this.allData),
        })
    }

    allDataInit = (data) =>{
       let newData = data.map((item,index)=>{
            item.isLeft = true;
            item.isRight = false;
            return item
        })
        return newData;
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keyup", this.onKeyUp);
    }    
    
    eveyNumClick = (event,data,index,type) =>{
        let {leftData,rightData} = this.state;
        for(let i=0;i<this.allData.length;i++){
            if(this.allData[i].detailId==data.detailId){
                if(!this.allData[i].isActive){
                    this.allData[i].isActive = true;
                }else{
                    this.allData[i].isActive = false;
                }
                if(this.allData[i].isActive && type == "left"){
                    this.allData[i].isLeft = false;
                    this.allData[i].isRight = true;

                }
                if(this.allData[i].isActive && type == "right"){
                    this.allData[i].isLeft = true;
                    this.allData[i].isRight = false;
                }
            }
        }
        this.setState({
            other:new Date()
        })
        // console.log(this.isWindows,this.keyCode,this.isMac,data,">>>>>>>>>")
        if(!data.isActive){
            data.isActive = true;
        }else{
            data.isActive = false;
        }
        if((this.isWindows && this.keyCode == 17)||(this.isMac && this.keyCode == 91)){
          
            if(type == "left"){
                this.delLeft.push(data);
            }
            if(type == "right"){
                this.delRight.push(data);
            }
            this.setState({
                other:new Date()
            })
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
    //全选点击
    allSelect = (type) =>{
        let {leftData,rightData} = this.state;
        // let allData = this.allData.map((item,index)=>{
        if(type=="left"){
            this.setState({
                leftData:[],
                rightData:this.allData,
            })
        }else if(type == "right"){
            this.setState({
                leftData:this.allData,
                rightData:[],
            }) 
        }
            //  return item;
        // })
        // this.allData = allData;
        // this.setState({
        //     other:new Date()
        // })
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
                {data.code}
            </div>
        )
    }
    renderLeft = () =>{
       let {leftData,rightData} = this.state;
        var elems = leftData.map((item,index)=>{
            // if(item.isLeft){
              return this.everyNum(item,index,"left");
            // }else{
            //     return null;
            // }
            
        })
        return elems; 
    }
    renderRight = () =>{
        let {leftData,rightData} = this.state;
        var elems = rightData.map((item,index)=>{
            // if(item.isRight){
            return this.everyNum(item,index,"right");
            // }else{
            //     return null;
            // }
            
        })
        return elems; 
    }
    onKeyDown = (event) =>{
        
        this.keyCode = event.keyCode;
    }
    onKeyUp = (event) =>{
        this.keyCode = '';
    }
    move = (type) =>{
        
        let {leftData,rightData} = this.state;
        if(type == "left"){
           var newData = this.selectSame(leftData,this.delLeft,'left');
          
           this.setState({
               leftData:newData.otherData,
               rightData:newData.haveData
            });
        }else{
           var newData = this.selectSame(rightData,this.delRight,'right');
           this.setState({
               rightData:newData.otherData,
               leftData:newData.haveData
            });
        }
         this.delLeft = [];
         this.delRight = [];
    }
    selectSame = (arr,data,type) =>{
        console.log(arr,data)
        let {leftData,rightData} = this.state;
        let allData = [].concat(arr);
        let theData = []
        if(type == "left"){
            theData = data.concat(rightData);
        }else{
            theData = data.concat(leftData);
        }
         
        let haveData = [];
        let otherData = []
        let object = {
            haveData:[],
            otherData:[],
        }
        for(let i=0;i<allData.length;i++){
            let isHave = false;
            allData[i].isActive = false;
            for(let j=0;j<theData.length;j++){
                if(allData[i].detailId == theData[j].detailId){
                   
                    haveData.push(allData[i]); 
                    isHave = true;
                }
                
            }
            if(!isHave){
                otherData.push(allData[i]);
            }
        }
        object.haveData = haveData;
        object.otherData = otherData; 
        return object;
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
                    <div 
                        onClick = {
                            ()=>{
                                this.allSelect("left")
                            }
                        }
                    >{">>"}</div>
                    <div 
                        onClick = {()=>{
                            this.move("left")
                        }}
                    >{">"}</div>
                    <div
                        onClick = {()=>{
                            this.move("right")
                        }}
                    >{"<"}</div>
                    <div
                        onClick = {
                            ()=>{
                                this.allSelect("right")
                            }
                        }
                    >{"<<"}</div>
                </div>
                <div className = "column-right">    
                    {this.renderRight()}
                </div>
			</div>
        )
        
        
       
    }


}

