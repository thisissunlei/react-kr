import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {reduxForm,formValueSelector,initialize,change,FieldArray} from 'redux-form';
import {
	bindActionCreators
} from 'redux';


import WrapComponent from '../WrapComponent';
import "./index.less";
export default class SelectTimeComponent extends React.Component{

	constructor(props, context) {
		super(props, context);
		this.state={
			allOpen:false,
			hourOpen:false,
			minuteOpen:false,
			hourNum:'',
			minuteNum:'',
			timeNum:'',
	    }
    }

	componentDidMount() {
		
	}

	//input框被点击
	 inputClick = (value) => {
    	this.setState({
    		allOpen:!this.state.allOpen,
    		minuteOpen:false

    	})
    }

    //input 框数值变化
    inputChange = (hour,minute) => {
          	
		let {
			input,
			onChange
		} = this.props;

		if(!hour || !minute){
			return;
		}

		let value=hour + ":" + minute;
		
		input.onChange(value);


	}

	//时针扫过
    hourMouseOver = (value) => {
    	this.setState({
       		hourNum:value,
       		minuteOpen:true	
       	})
    }


    //分针被点
    minuteClick = (hour,minute) => {
    	this.setState({
       		minuteNum : minute,
       		allOpen : !this.state.allOpen,
       		timeNum : hour + ":" + minute
       	})

		let {
			input,
			onChange
		} = this.props;

		if(!hour || !minute){
			return;
		}

		let value=hour + ":" + minute;
		input.onChange(value); 

    }


    componentDidMount() {
      
      let _this=this;
		let bodyElem=document.getElementsByTagName("body")[0];
		bodyElem.addEventListener("click",function(){
           event = event || window.event;
			var target = event.target;

			while (target) {
				if (target && target.className && target.className.indexOf('ui-time-select-all') !== -1) {
					return;
				}
				target = target.parentNode;
			}
              _this.setState({
              	allOpen:false
              })
		    }
		); 
		
			

	}

	render() {

		let {allOpen,widthState,minuteOpen,hourNum,minuteNum,timeNum}=this.state;
		let {label,style,requireLabel,inline,search,inputStyle}=this.props;
        
        var hour=[];
        var minute=['00','10','20','30','40','50'];
        for(var i=0;i<24;i++){
           if(i<10){
             i='0'+i;
           }
          hour.push(i); 
        }
		return (
		<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div className="ui-select-time">
	               	<input type="text" onClick={this.inputClick} value={timeNum||this.props.timeNum} onChange={this.inputChange.bind(this,hourNum,minuteNum)} style={inputStyle}/>	
	              	
	              	<div className="ui-time-select-all" style={{display:allOpen?'block':'none'}}>
		                <div  className="ui-hour-style">
			                 {
			                  hour.map((item,index)=>{
			                  	let everyhourStyle={};
								if(hourNum==item){

									everyhourStyle={
				                  		background: "rgb(245, 245, 245)",
										height: 30,
										fontSize: 20,
				                  	}
								}
			                    return <p key={index} style={everyhourStyle} onMouseOver={this.hourMouseOver.bind(this,item)}>{item}</p>
			                  })	
			                 }
		                </div>
		               
		                <div className="ui-minute-style" style={{display:minuteOpen?'inline-block':'none'}}>
			                 {
			                  minute.map((item,index)=>{
			                     return <p key={index} onClick={this.minuteClick.bind(this,hourNum,item)} >{item}</p>
			                  })	
			                 }
		                </div>
	                             
	               </div>
	              
				</div>
			</WrapComponent>


		);
	}
}
