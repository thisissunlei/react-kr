import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './index.less';

const renderField = ({ input, label, type, meta: { touched, error } }) => (


  <div className="form-item">
    <label className="form-label">{label}</label>
    <div className="form-input">
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>


)


export default class KrField extends React.Component {


	PropTypes = {
		name: React.PropTypes.string,
		label: React.PropTypes.string,
	};

	render() {

		let {className} = this.props;

		return (

			<div> 
				<Field {...this.props} component={renderField}/>
			</div>

		);

	}


}






