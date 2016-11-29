import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';

export default class InputComponent extends React.Component{



	static contextTypes =  {
	    _reduxForm: React.PropTypes.object.isRequired,
	}
	static PropTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number
	}

	constructor(props,context){
		super(props,context)

	}

	componentDidMount(){

			this.onError('ahah');
	}

	onError = (message)=>{



		let {meta,input} = this.props;
		const {onError} = this.props;
		const {_reduxForm} = this.context;
		let errors = {};
		errors[input.name] = message;
		meta.dispatch(stopAsyncValidation(_reduxForm.form,errors));

		_reduxForm.blur();

		onError && onError();

		console.log(_reduxForm)
	}

	render(){

		let {input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,inline,simple,heightStyle,...other} = this.props;

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
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple}>
					<Input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} className={className} style={heightStyle} {...other} onError={this.onError}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}
