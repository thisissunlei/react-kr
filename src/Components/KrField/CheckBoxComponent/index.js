import React from 'react';

import WrapComponent from '../WrapComponent';
import Checkbox from '../../Checkbox';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class CheckBoxComponent extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
		this.state={
			checked:props.checked||false,
		}
	}

	onCheck = (event) =>{
		let {input,onCheck} = this.props;
		input.onChange(event.target.checked);
		onCheck && onCheck(event.target.checked)
	}

	render(){

		let {input,prompt, label,notifys, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			
			let placeholderText=placeholder||label;
			let className = '';

			if(touched && error){
				className = 'error-input';
			}
			if(prompt){
				placeholderText="";
			}

			var wrapProps = {
				label,
				requireLabel,
				inline,
				simple,
				notifys,
				wrapStyle:style,
			};

			
		 console.log(other,">>>>>>")

		 return (
			 <div className = "checkBox-componet">
			 <WrapComponent {...wrapProps}>
				
				 <input type="checkbox" onChange={this.onCheck} checked={input.value} {...other}/>
				
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 
			 </WrapComponent>
			 </div>
		 );
	 }
 }
