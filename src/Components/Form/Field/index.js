import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './index.less';

const renderFieldInput = ({ input, label, type, meta: { touched, error } ,requireLabel}) => (


  <div className="form-item">
    <label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<input {...input} placeholder={label} type={type}/>
			</div>
		</div>

      {touched && error && <span>{error}</span>}
    </div>
  </div>


);


const renderFieldSelect = ({ input, label, type, meta: { touched, error },children}) => (


  <div className="form-item">
    <label className="form-label">{label}</label>
    <div className="form-input">
		<select {...input}  >
		{children}
		</select>
		{touched && error && <span>{error}</span>}
    </div>
  </div>


)


export default class KrField extends React.Component {


	PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
	};

	render() {

		let {className,children,component,type,requireLabel} = this.props;


		if(!component || component == 'input'){

			return (
				<Field {...this.props} component={renderFieldInput}  />
			);

		}

		if(component == 'select'){

			return (
				<Field {...this.props} component={renderFieldSelect}>
				{children}
				</Field>
			);

		}


		return null;



	}


}






