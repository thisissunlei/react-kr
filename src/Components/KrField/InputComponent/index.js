import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class InputComponent extends React.Component{



	static contextTypes =  {
	    _reduxForm: React.PropTypes.object.isRequired,
	}
	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		//自动获取焦点
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
	}

	componentDidMount(){
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

	render(){

		let {input, label, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,disabled,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
					</div>
				);
			}

			let className = '';

			if(touched && error){
				className = 'error-input';
			}
			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple} notifys={this.props.notifys}>
					<Input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} className={className} style={heightStyle} onChange={this.onChange}   {...other} autoFocus={autoFocus}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}
