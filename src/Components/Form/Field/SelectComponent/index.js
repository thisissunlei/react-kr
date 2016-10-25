import React from 'react';

import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

export default class SelectComponent extends React.Component{

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
	}

	onChange(item){
		let {input} = this.props;
		var value = (item && item.value) || '';
		input.onChange(value);
	}

	render(){

		let { input, label, type, meta: { touched, error },children,disabled,style,requireLabel,options,...other} = this.props;

		if(options){
			return (
					<div className="form-item-wrap" style={style}>
					<div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
							<div className="form-main">
							<div className="form-input">
							<ReactSelect 
									name={input.name}
									searchable={false}
									value={input.value} 
									clearable={true}
									options={options}
									onChange={this.onChange} 
									placeholder="请选择..."
								/>
							</div>
							{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
						  </div>
					</div>
			</div>
			);

		}

		return (
			<div className="form-item-wrap" style={style}>
					<div className="form-item">
					<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
							<div className="form-main">

								<div className="form-input">
									<select {...input}  disabled={disabled}>
									{children}
									</select>
								</div>

								{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
						  </div>
					</div>
			</div>
		);

	}


}

