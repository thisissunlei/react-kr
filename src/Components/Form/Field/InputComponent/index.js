import React from 'react';

import WrapComponent from '../WrapComponent';

import './index.less';

export default class InputComponent extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

		let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<input {...input} placeholder={placeholder|| label} type="hidden"/>
					</div>
				);
			}

			var changeValue = function(){

			}

			return (
					<div className="form-item-wrap" style={style}>
				  <div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
					<div className="form-main">
						<div className="form-input-main">
							<div className="form-input">
								<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}  />
							</div>
						</div>
						{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
					</div>
				  </div>
				</div>
		);
	}
}
