import React from 'react';

import WrapComponent from '../WrapComponent';

export default class TextareaComponent extends React.Component{

	static PropTypes = {
		onChange:React.PropTypes.func
	}
	
	constructor(props){
		super(props)
	}

	render(){

         let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,col,row,style,inline} = this.props;

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}></textarea>
				{touched && error && <p><div className="error-wrap"> <span>{error}</span> </div></p> }
			</WrapComponent>
		);

	}

}

