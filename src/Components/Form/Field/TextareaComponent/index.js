import React from 'react';

import WrapComponent from '../WrapComponent';

export default class TextareaComponent extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

         let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,col,row,style} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style}>
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}></textarea>
				<p>	{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }</p>
			</WrapComponent>
		);

	}

}

