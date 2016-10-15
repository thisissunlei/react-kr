import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter,
	Button,
} from 'kr-ui';

import Section from 'kr-ui/Section';

import LocationMap from 'kr-ui/Global/LocationMap';




import {List, ListItem} from 'material-ui/List';

import './index.less';


export default class Undefined extends Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount() {

	}

	render(){

		return(

			<div>
					<Section title="出错了" description="" >
				aah
					</Section>
			</div>		

		);

	}

}


