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
		onChange && onChange(value);

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
	               	<input type="text" onClick={this.inputClick} value={timeNum} onChange={this.inputChange.bind(hourNum,minuteNum)} style={inputStyle}/>	
	              	{allOpen && 
	              	<div className="ui-time-select-all">
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
		                {minuteOpen && 
		                <div className="ui-minute-style">
			                 {
			                  minute.map((item,index)=>{
			                     return <p key={index} onClick={this.minuteClick.bind(this,hourNum,item)} >{item}</p>
			                  })	
			                 }
		                </div>}
	                             
	               </div>}
	              
				</div>
			</WrapComponent>


		);
	}
}
