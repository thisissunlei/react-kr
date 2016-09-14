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


    const { handleSubmit, pristine, reset, submitting } =  this.props;

		return(

			<div>
					<Section title="出错了" description="" >

            <form onSubmit={handleSubmit(this.confirmSubmit)}>
      <div>
        <label>First Name</label>
        <div>
          <Field name="firstName" component="input" type="text" placeholder="First Name"/>
        </div>
      </div>

       <div>
        <label>First Name</label>
        <div>
          <Field name="firs" component="input" type="file" placeholder="First"/>
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field name="email" component="input" type="email" placeholder="Email"/>
        </div>
      </div>
      <div>
        <label>Sex</label>
        <div>
          <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
        </div>
      </div>
      <div>
        <label>Favorite Color</label>
        <div>
          <Field name="favoriteColor" component="select">
            {this.props.items.map((item,index)=>{
                return  <option value={item.author} key={index}>{item.content}</option>;
            })}
          </Field>
        </div>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component="input" type="checkbox"/>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>




    {this.props.favoriteColorValue}

					</Section>
			</div>		

		);

	}

}


Undefined= reduxForm({
  form: 'simple',
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


