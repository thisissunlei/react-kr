import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class InputComponent extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
	}

	onChange = (value)=>{

		let {input} = this.props;
		input.onChange(value);
		const {onChange} = this.props;
		onChange && onChange(value,input)
	}

	onBlur=(value)=>{
		let {input} = this.props;
		input.onBlur(value);
		const {onBlur} = this.props;
		onBlur && onBlur(value)
	}

	onFocus=(value)=>{
		let {input} = this.props;
		input.onFocus(value);
		const {onFocus} = this.props;
		onFocus && onFocus(value)
	}


	render(){

		let {input,prompt, label,notifys, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,disabled,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
					</div>
				);
			}
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

			var inputProps = {
				 ...input,
				 type,
				placeholder:placeholderText,
				disabled,
			 className,
			 style:heightStyle,
			 onChange:this.onChange,
			 onBlur:this.onBlur,
			 onFocus:this.onFocus,
			 ...other,
			 autoFocus,
		 }

		 return (
			 <WrapComponent {...wrapProps}>
				 <Input {...inputProps}/>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 
			 </WrapComponent>
		 );
	 }
 }
