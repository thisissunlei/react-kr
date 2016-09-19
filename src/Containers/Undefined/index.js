import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Divider,
	FontIcon,
	DatePicker
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {List, ListItem} from 'material-ui/List';

import './index.less';


import { Field, reduxForm,formValueSelector} from 'redux-form';



const validate = values => {
	console.log('-----<<<<');
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)


class Undefined extends Component{

	constructor(props,context){
		super(props, context);
    this.confirmSubmit =this.confirmSubmit.bind(this);
	}

	componentDidMount() {

	}

  confirmSubmit(values){
    console.log('---',values);
  }

	render(){


const { handleSubmit, pristine, reset, submitting } = this.props;

		return(

			<div>
					<Section title="出错了" description="" >

 <form onSubmit={handleSubmit(this.confirmSubmit)}>
      <Field name="username" type="text" component={renderField} label="Username"/>
      <Field name="email" type="email" component={renderField} label="Email"/>
      <Field name="age" type="number" component={renderField} label="Age"/>
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>


					</Section>
			</div>		

		);

	}

}


Undefined= reduxForm({
  form: 'syncValidation',
validate
})(Undefined);


const selector = formValueSelector('simple')


function mapStateToProps(state){

  const favoriteColorValue = selector(state, 'favoriteColor');

	return {
		items:state.notify.items,
    favoriteColorValue:favoriteColorValue,
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Undefined);


