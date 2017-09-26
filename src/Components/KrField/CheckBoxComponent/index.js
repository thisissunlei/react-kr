import React from 'react';

import WrapComponent from '../WrapComponent';
import Checkbox from '../../Checkbox';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class CheckBoxComponent extends React.Component{


	constructor(props,context){
		super(props,context)
		this.state={
			checked:props.checked||false,
		}
	}

	componentDidMount() {
		let {input,onCheck,marking} = this.props;
		if(marking === "tab-field"){
			input.onChange(false);
		}
		
	}
	onCheck = (checked) =>{
		let {input,onCheck} = this.props;
		input.onChange(checked);
		onCheck && onCheck(checked)
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

		 return (
			 <div className = "checkBox-componet">
			 <WrapComponent {...wrapProps}>
				 <Checkbox checked = {input.value}  onCheck = {this.onCheck} {...other}/>
				
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 
			 </WrapComponent>
			 </div>
		 );
	 }
 }
