import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { observer } from 'mobx-react';


import './index.less';

export default class FormControl extends React.Component {

	static PropTypes = {
		text: React.PropTypes.string,
		label: React.PropTypes.string,
		width:React.PropTypes.number,
		type:React.PropTypes.string,
		children:React.PropTypes.node,
		form:React.PropTypes.object,
		name:React.PropTypes.string,
		type:React.PropTypes.string,
		value:React.PropTypes.string,
		onChange:React.PropTypes.fun,
	}

	constructor(props,context){
		super(props, context);

		this.renderInputText = this.renderInputText.bind(this);
		this.renderSelect = this.renderSelect.bind(this);
		this.onChange = this.onChange.bind(this);

		this.state = {
			value:''
		}
	}

	onChange(event){
		const {onChange} = this.props;
		onChange && onChange(event);
	}

	renderInputText(name,type){

		return (
			<div>
				<input type={type} name={name} value={this.props.value} onChange={this.onChange} />
			</div>
		);
	}

	renderSelect(name,children){
		return (
			<div>
				<select name={name} onChange={this.onChange} >
					{children}
				</select>
			</div>
		);
	}

	render() {

		let {className,type,children,name,form,label,store} = this.props;
		let renderChild = null;

		if(type === 'text' || type === 'email' || type === 'password'){
			renderChild = this.renderInputText(name,type);
		}
		
		if(type === 'select'){
			renderChild = this.renderSelect(name,children);
		}

		return (
			<div>
				 <div className="form-controller">
					<label className="form-label">{label}:</label>
					<div className="form-main">
						<div className="form-input-main">
							<div className="form-input">
								{renderChild}
							</div>
						</div>
					</div>
				  </div>
			</div>
		);
	}
}




















