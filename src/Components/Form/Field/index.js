import React from 'react';
import { Field, reduxForm } from 'redux-form';

import {LabelText} from 'kr-ui/Form';

import DatePicker from 'material-ui/DatePicker';

import './index.less';


const InputWrap = (props)=>{

	const {requireLabel,label,main,error} = props;

	return (
		<div className="form-item-wrap">
			<div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
			<div className="form-input-main">
			<div className="form-input">
				{main}
			</div>
			</div>
				{error}
			</div>
		</div>	
	</div>
	);
}


const renderFieldDate = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style}) => (

	<div className="form-item-wrap" style={style}>
	<div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				 <DatePicker hintText={placeholder} />
			</div>
		</div>
      {touched && error && <span>{error}</span>}
    </div>
  </div>	
		</div>
  
);

const renderFieldRadio = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style}) => (

	<div className="form-item-wrap" style={style}>
  <div className="form-item">
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}/>
			</div>
		</div>
      {touched && error && <span>{error}</span>}
    </div>
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>

  </div>
		</div>

);


const renderFieldInput = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,style}) =>{

	if(type === 'hidden'){
		return (
			<div>
				<input {...input} placeholder={placeholder|| label} type="hidden"/>
			</div>
		);
	}

	return (
			<div className="form-item-wrap" style={style}>
		  <div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
				<div className="form-input-main">
					<div className="form-input">
						<input {...input} placeholder={placeholder|| label} type={type} disabled={disabled}/>
					</div>
				</div>

			  {touched && error && <span>{error}</span>}
			</div>
		  </div>
		</div>
	);
}

const renderFieldTextarea = ({ input, label, type, meta: { touched, error } ,requireLabel,disabled,placeholder,col,row,style}) => (


	<div className="form-item-wrap" style={style}>
  <div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<textarea {...input} placeholder={placeholder|| label} disabled={disabled} col={col} row={row}></textarea>
			</div>
		</div>

      {touched && error && <span>{error}</span>}
    </div>
  </div>
		</div>


);


const renderFieldSelect = ({ input, label, type, meta: { touched, error },children,disabled,style}) => (
	<div className="form-item-wrap" style={style}>
<div className="form-item">
    <label className="form-label">{label}</label>
    <div className="form-input">
		<select {...input}  disabled={disabled}>
		{children}
		</select>
		{touched && error && <span>{error}</span>}
    </div>
  </div>
		</div>
)


export default class KrField extends React.Component {

	PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		grid:React.PropTypes.number,
		value:React.PropTypes.value
	};

	render() {

		let {grid=1,className,children,component,type,requireLabel,label,value} = this.props;

		let WrapStyles = {
			width:(grid*100)+'%'
		}


		if(component === 'text'){
			return (
				<Field {...this.props} component={renderFieldInput}  style={WrapStyles}/>
			);
		}

		if(component === 'labelText' || type=='labelText'){
			return (
					<div>
						 <div className="label-item">
							<label className="form-label">{label}:</label>
							<div className="form-main">
								<div className="form-input-main">
									<div className="form-input">
										<span className="text" >
											{value}
										</span>
									</div>
								</div>
							</div>
						  </div>
					</div>
				);
		}

		if(component === 'textarea' || type=='textarea'){
			return (
					<Field {...this.props} component={renderFieldTextarea} style={WrapStyles}/>
				);
		}


		if(component === 'select' || type=='select'){
			return (
				<Field {...this.props} component={renderFieldSelect} style={WrapStyles}>
				{children}
				</Field>
			);
		}



		if(component === 'radio' || type=='radio'){
			return (
				<Field {...this.props} component={renderFieldRadio}  style={WrapStyles}/>
			);
		}

		if(component === 'date' || type=='date'){

			return (
				<Field {...this.props} component={renderFieldDate}  style={WrapStyles}/>
			);

		}

		if(component === 'group' || type=='group'){

			return (
					<div className="form-item-wrap">
								<div className="form-item">
								<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
								<div className="form-main">
								<div className="form-input-main">
								<div className="form-input">
									{children}
								</div>
								</div>
								</div>
							</div>	
						</div>
				);


		}

		if(!component || component === 'input'){

			return (
				<Field {...this.props} component={renderFieldInput}  style={WrapStyles}/>
			);

		}

		return null;
	}


}






