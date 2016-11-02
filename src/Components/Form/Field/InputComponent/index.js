import React from 'react';

import WrapComponent from '../WrapComponent';


export default class InputComponent extends React.Component{

	static PropTypes = {
		inline:React.PropTypes.bool
	}
	
	constructor(props){
		super(props)
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,inline} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<input {...input} placeholder={placeholder|| label} type="hidden"/>
					</div>
				);
			}

			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
					<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}  />
					<p>	{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }</p>
				</WrapComponent>
		);
	}
}
