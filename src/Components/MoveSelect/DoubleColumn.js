import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import './index.less';
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';

import Button from "../Button";



export default class DoubleColumn extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            leftData:[],
            rightData:(props.data && props.data.codeList)|| [],
            other:'',
            titleData:{},
        }
        this.allData = [],
        this.delRight = [];
        this.delLeft = [];
        this.isMac = false;
        this.keyCode = "";
        this.isWindows = false;
        this.isLeft='';
        
    }
    
    componentDidMount () {
        let {type} = this.props;
        document.addEventListener("keydown",this.onKeyDown);
        document.addEventListener("keyup",this.onKeyUp);
        this.isMac = function() {
            return /macintosh|mac os x/i.test(navigator.userAgent);
        }();
        /** * 是否为windows系统 * */
        this.isWindows = function() {
            return /windows|win32/i.test(navigator.userAgent);
        }(); 
        this.getData();
        
        
    }
    //数据转换
    changeData = (arr) => {
        var newData = arr.map((item, index) => {
            return { value: item.id, label: item.name }
        })
        return newData;
    }
    getData = (url,obj) =>{
        let params = Object.assign({},obj);
        let that = this;
        Http.request("getTheCommunity").then(function(response) {
            that.allData = [].concat(that.changeData(response.items));
            
            that.setState({
                leftData: that.allDataInit(that.allData),
                titleData:Object.assign({},obj)
            })

		}).catch(function(err) {

		});
        
    }

    allDataInit = (data) =>{
        let {rightData} = this.state;
        let arr = [];
       
        for(let i=0;i<data.length;i++){
            let isPush = true;
            for(let j=0;j<rightData.length;j++){
                if(data[i].value == rightData[j].value){
                    isPush = false;
                    break;
                }
            }
            if(isPush){
                arr.push(data[i]);
            }
        }
        return arr;
    }
    componentWillUnmount() {
      document.removeEventListener("keydown", this.onKeyDown);
      document.removeEventListener("keyup", this.onKeyUp);
    } 

    clearActive=(data,type)=>{
      let {rightData,leftData}=this.state;
      var dataRender=[];
      var dataClear=[];
      var indexData=[];
      if(type=='left'){
        dataRender=leftData;
        dataClear=rightData;
        this.isLeft='ok';
      }else{
        dataRender=rightData;
        dataClear=leftData;
        this.isLeft='noOk';
      }  
          for(var j=0;j<dataRender.length;j++){
              dataRender[j].isActive=false;
              for(var i=0;i<data.length;i++){
                if(data[i].value==dataRender[j].value){
                    indexData.push(j);
                }
          }
      }
      
      indexData.map((item,index)=>{
         dataRender[item].isActive=true;
      })
      
    
      dataClear.map((item,index)=>{
         item.isActive=false;
      })
      this.setState({
          leftData:this.isLeft=='ok'?dataRender:dataClear,
          rightData:this.isLeft=='noOk'?dataRender:dataClear
      })
    }   
    
    eveyNumClick = (event,data,index,type) =>{
        let {leftData,rightData} = this.state;
        if(!data.isActive){
            data.isActive = true;
        }else{
            data.isActive = false;
        }
        if((this.isWindows && this.keyCode == 17)||(this.isMac && this.keyCode == 91)){
            
            if(type == "left"){
                this.delLeft = this.multipleChoice(this.delLeft,data);
                this.delRight = [];
                this.clearActive(this.delLeft,'left');
            }
            if(type == "right"){
                this.delRight = this.multipleChoice(this.delRight,data);
                this.delLeft = [];
                this.clearActive(this.delRight,'right');
            }
           
        }else{
            if(type == "right"){
                this.delRight=[].concat([data]);
                this.delLeft = [];
                this.clearActive(this.delRight,'right'); 
            }
            if(type == "left"){           
                this.delLeft=[].concat([data]);
                
                this.delRight = [];
                this.clearActive(this.delLeft,'left');
            }
           
        }

    }

    //多选
    multipleChoice = (arr,data) =>{
        let isDel = false;
        let newArr = [].concat(arr);
        let num = 0;
          
        for(let i=0;i<newArr.length;i++){
            isDel = false;
            if(data.value == newArr[i].value){
                isDel = true;
                num = i;
                break;
            }
        }
        if(isDel){
            newArr.splice(num,1);
           
        }else{
             newArr.push(data);
        }
        return newArr;
    }   
 

    //全选点击
    allSelect = (type) =>{
        let {leftData,rightData} = this.state;
        // let allData = this.allData.map((item,index)=>{
        if(type=="left"){
            this.delLeft = [];
            this.setState({
                leftData:[],
                rightData:this.allData,
            })
        }else if(type == "right"){
            this.delRight = [];
            this.setState({
                rightData:[],
                leftData:this.allData,     
            }) 
        }
    }
    
    everyNum = (data,index,type)=>{
        let bgColor = "#fff";
        let fontColor = "#666666"
        let activeStyle = {
            background:"#fff",
            color:"#666666",
        };
        if(data.isActive){
            
            activeStyle = {
                background:"#F6F6F6",
                color:"#499DF1",
                border:"1px solid #DFDFDF"
            };
        }
        return (
            <div 
                className = "every-num" 
                onClick = {
                    (event)=>{
                        this.eveyNumClick(event,data,index,type)
                    }
                    
                }
                style = {activeStyle}>
                {data.label}
            </div>
        )
    }
    renderLeft = () =>{
       let {leftData,rightData} = this.state;
        var elems = leftData.map((item,index)=>{
              return this.everyNum(item,index,"left");
        })
        return elems; 
    }
    renderRight = () =>{
        let {leftData,rightData} = this.state;
        var elems = rightData.map((item,index)=>{
            return this.everyNum(item,index,"right");
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
        let {leftData,rightData} = this.state;
        let theData = []
        if(type == "left"){
            theData = data.concat(rightData);
        }else{
            theData = data.concat(leftData);
        }
         
        let haveData = [];
        let otherData = [];
        let allData=[].concat(this.allData);
        let object = {
            haveData:[],
            otherData:[],
        }
        for(let i=0;i<allData.length;i++){
            let isHave = false;
            allData[i].isActive = false;
            for(let j=0;j<theData.length;j++){
                if(allData[i].value == theData[j].value){
                   
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
    onSubmit = () =>{
        let {onSubmit} = this.props;
        let {rightData,titleData} = this.state;
       
        let object = Object.assign(titleData,{codeList:[].concat(rightData)});
        onSubmit && onSubmit(object)

    }

    render(){
        let {rightData} = this.state;
        let {onClose} = this.props;
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
                <div className = "column-left">
                    <div className = "text-bar">待选列表</div> 
                    <div className="content">
                        {this.renderLeft()}
                    </div>
                </div>
                <div className = "column-bar">
                    <div className = "top">
                        <div>
                            <span 
                                className="leftAllSelect"
                                onClick = {
                                    ()=>{
                                        this.allSelect("left")
                                    }
                                }
                            >
                          
                            </span>
                            <span 
                                className="leftSelect"
                                onClick = {()=>{
                                    this.move("left")
                                }}
                            ></span>
                        </div>
                        
                    </div>
                    <div className = "down">
                        <div>
                            <span
                                className="rightSelect"
                                onClick = {()=>{
                                    this.move("right")
                                }}
                            >
                                
                            </span>

                            <span
                                className="rightAllSelect"
                                onClick = {
                                    ()=>{
                                        this.allSelect("right")
                                    }
                                }
                            ></span>
                        </div>
                        
                    </div>
                    
                </div>
                <div className = "column-right">   
                    <div className = "text-bar">已选列表<span style = {{color:"#999999"}}>{`（已选 ${rightData.length} 个）`}</span></div> 
                    <div className="content">
                        {this.renderRight()}
                    </div>
                    
                </div>
                <div className="bottom">

                    <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定"  onTouchTap={this.onSubmit}  /></div>
                    <Button  label="取消" type="button" cancle={true} onTouchTap={onClose} />
                    
                </div>
                    	
			</div>
        )
        
        
       
    }


}

