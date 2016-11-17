import React from 'react';

import WrapComponent from '../WrapComponent';
import './index.less';

export default class InputComponent extends React.Component{

	static PropTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
	}
	
	constructor(props){
		super(props)
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style,inline,simple} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<input {...input} placeholder={placeholder|| label} type="hidden"/>
					</div>
				);
			}
			let className = '';

			if(touched && error){
				className = 'error-input';
			}


			return (

				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} simple={simple}>
					<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled} className={className}/>
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				</WrapComponent>
		);
	}
}