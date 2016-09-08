import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { Field, reduxForm } from 'redux-form'
import Section from 'kr-ui/Section';


const renderField = ({ input, label, type, meta: { touched, error } }) => (

  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>

)


function submit(){
	console.log('----');

}

var SubmitValidationForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting } = props
  return (

    <form>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="password" type="password" component={renderField} label="Password"/>
      {error && <strong>{error}</strong>}
      <div>
        <button type="submit" disabled={submitting}>Log In</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation'  
})(SubmitValidationForm);

export default class JoinEdit extends Component {

	constructor(props,context){
		super(props, context);
	}

  render() {


    return (

      <div>
			hhahaah

			<Section title="入驻协议书" description=""> 
				<SubmitValidationForm/>

			</Section>
      </div>
    );
  }
}

