import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {
	Checkbox,
	DatePicker,
	Form,
	KrField,
	Table,
	Tabs,
	Tab,
 	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	FontIcon,
	SearchForms,
	Title,
	Input,
	CheckboxGroup,
	RadioGroup,
	Message,
	DemoComponent,
	InputDate,
} from 'kr-ui';
import {
	FlatButton,
} from 'material-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';

import { hashHistory ,History} from 'react-router';

export default class Demo extends Component{

	 static contextTypes = {
	  	router: React.PropTypes.object.isRequired
    }

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);

		console.log('---',this.context.router);

	}

	onSubmit(value){
		console.log('----',value)
		// window.location.hash = 'demo';
		// //this.context.router.replace(location.href);;
	 //    history.replace(location)
		//hashHistory.refresh();
	}


	show = ()=>{

		console.log('click');


		Message.error('hahah');
	}



	render(){
		const list = [{a:1},{b:2},{c:3},{d:5}];


		return(
			<div>

				<Title value="haah "/>
					<InputDate />
			</div>

		);

	}

}
