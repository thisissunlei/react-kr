import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class RangeComponent extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
        this.startValue = '';
        this.endValue = '';
        
	}
    startChange = (event) =>{
        let {input,onChange} = this.props;
        if(event.target.value!= ''){
            this.startValue = event.target.value;
        }else{
            this.startValue = '' 
        }
        input.onChange({startValue:this.startValue,endValue:this.endValue});
        onChange && onChange({startValue:this.startValue,endValue:this.endValue});

    }
    endChange = (event) =>{
        let {input,onChange} = this.props;
        if(event.target.value!= ''){
            this.endValue = event.target.value;
        }else{
            this.endValue = '' 
        }
        input.onChange({startValue:this.startValue,endValue:this.endValue});
        onChange && onChange({startValue:this.startValue,endValue:this.endValue});
    }
	

	
	render(){

		let {
			input,
            inputStyle,
			prompt, 
			label,
			notifys, 
			type, 
			meta: {touched, error } ,
			requireLabel,
			onChange,
			onBlur,
			onFocus,
			disabled,
			placeholder,
			style,inline,
			simple,
			heightStyle,
			autoFocus,
			...other
		} = this.props;

			

			var wrapProps = {
				label,
				requireLabel,
				inline,
				simple,
				notifys,
				wrapStyle:style,
			};
            inputStyle = Object.assign({},inputStyle);
       

		 return (
             <div className = "ui-range-field">
                <WrapComponent {...wrapProps}>

                    <input onChange = {this.startChange} value = {input.value.startValue||''} style = {inputStyle} /> -- <input onChange = {this.endChange} value = {input.value.endValue||''} style = {inputStyle} />

                    {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
                    
                </WrapComponent>
             </div>
		 );
	 }
 }
