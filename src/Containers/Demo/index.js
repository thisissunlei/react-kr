import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import {
	Checkbox,
	DatePicker,
	Form,
	KrField,
	Table,
 	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	FontIcon,
} from 'kr-ui';

import LocationMap from 'kr-ui/Global/LocationMap';

import {List, ListItem} from 'material-ui/List';


export default class Demo extends Component{

	constructor(props,context){
		super(props, context);

	}

	render(){

		return(
			<div>
					<Section title="demo" description="" >
							<Checkbox  label="ahah" checked={true} />
							<FontIcon className="icon-home"/>
					</Section>
			</div>

		);

	}

}
