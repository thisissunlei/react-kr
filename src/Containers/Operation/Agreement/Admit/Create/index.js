import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';


import Section from 'kr-ui/Section';


import {Grid,Row,Col} from 'kr-ui/Grid';

import { Button } from 'kr-ui/Button';


import Form from 'mobx-react-form';

import validatorjs from 'validatorjs';
const plugins = { dvr: validatorjs };

const  fields = {
	username: {
		name:'username',
		label: 'username',
		value:'',
		rules: 'required|string|between:5,25',
		required:'hahahah'
	},
	/*
	email: {
		name:'email',
		label: 'email',
		value:'',
		rules: 'required|string|between:5,25',
	}
	*/
}

let formComponent =  new Form({fields,plugins});

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import {MyForm} from 'kr-ui/MyForm';



@observer
export default class AdmitCreate extends Component {

	constructor(props,context){
		super(props, context);
	}

  render() {

	  const options = {
	  }


		  formComponent.onSuccess = function(form){

				console.log("----",form.values());

		  }

	 formComponent.onError = function(form){
		 console.log("errors:",form.errors());
	 }

    return (

      <div>
			<Section title="创建入驻协议书" description=""> 
				<form>
					<input
					type="text"
					name={formComponent.$('username').name}
					value={formComponent.$('username').value}
					placeholder={formComponent.$('username').label}
					onChange={formComponent.$('username').sync}
					/>
					<button
						  type="submit"
						  onClick={formComponent.handleOnSubmit}
						  >Clear</button>
				</form>
			</Section>
	</div>

	);
  }
}


