import React from 'react';
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


    onClickOther = (event)=>{
    	  event = event || window.event;
			var target = event.target;

			while (target) {
				if (target && target.className && target.className.indexOf('ui-time-select-all') !== -1) {
					return;
				}
				target = target.parentNode;
			}
          	this.setState({
          		allOpen:false
          	});
    }

    componentDidMount() {
		document.body.addEventListener("click",this.onClickOther); 		

	}

	componentWillUnmount(){
		document.body.removeEventListener("click",this.onClickOther); 	
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
    	var {allOpen}=this.state;
    	allOpen=!allOpen;
    	this.setState({
    		allOpen ,
       		minuteNum : minute,
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
		onChange && onChange(value); 

    }



	renderHour=()=>{

		let {hourNum}=this.state;
        var hour=[];
        
        for(var i=0;i<=24;i++){
           if(i<10){
             i='0'+i;
           }
          hour.push(i); 
        }
		return hour.map((item,index)=>{
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

	renderMinute=()=>{
		let {hourNum}=this.state;
		var minute=['00','30'];
		return minute.map((item,index)=>{
         	return <p key={index} onClick={this.minuteClick.bind(this,hourNum,item)} >{item}</p>
      	})
	}

	render() {

		let {allOpen,minuteOpen,hourNum,minuteNum,timeNum}=this.state;
		let {label,style,requireLabel,inline,search,inputStyle}=this.props;
		var inputDetailStyle = {inputStyle};
		inputDetailStyle.border = '0 none';
		inputDetailStyle.height = '34px';
		inputDetailStyle.outline = 'none';

		var inputProps={
			type:"text",
			onClick:this.inputClick,
			value:timeNum||this.props.timeNum,
			onChange:this.inputChange.bind(this,hourNum,minuteNum),
			style:inputDetailStyle
		}
        
		return (
		<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} search={search}>
				<div className="ui-select-time">
	               	<input {...inputProps} />	
	              	
	              	<div className="ui-time-select-all" style={{display:allOpen?'block':'none'}}>
		                <div  className="ui-hour-style">
			                 {this.renderHour()}
		                </div>
		               
		                <div className="ui-minute-style" style={{display:minuteOpen?'inline-block':'none'}}>
			                 {this.renderMinute()}
		                </div>
	                             
	               </div>
	              
				</div>
			</WrapComponent>


		);
	}
}
