import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {reduxForm } from 'redux-form'
import Section from 'kr-ui/Section';
import {KrField} from 'kr-ui/Form';




function submit(values){
	console.log('----',values);

}

var SubmitValidationForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting } = props
  return (

    <form onSubmit={handleSubmit(submit)}>

      <KrField name="username" type="text" label="用户名" />
      <KrField name="name" type="text" label="hahah" />
      <KrField name="ername" type="text" />

      {error && <strong>{error}</strong>}

      <div>
        <button type="submit" disabled={submitting}>确定</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>重置</button>
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
			<Section title="入驻协议书" description=""> 

				<SubmitValidationForm/>

			</Section>
      </div>
    );
  }
}

