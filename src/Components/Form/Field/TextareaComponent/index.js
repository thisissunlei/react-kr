import React from 'react';

export default class TextareaComponent extends React.Component{

	constructor(props){
		super(props)
	}

	render(){

         let { input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,col,row,style} = this.props;

		return (
		
		<div className="form-item-wrap" style={style}>
	  <div className="form-item">
		<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
		<div className="form-main">
			<div className="form-input-main">
				<div className="form-input">
					<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}></textarea>
				</div>
			</div>

			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</div>
	  </div>
			</div>
		);

	}

}

