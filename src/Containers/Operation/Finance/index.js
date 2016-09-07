import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import TitleList from 'kr-ui/TitleList';

import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';


import Section from 'kr-ui/Section';

import {
	AppBar,
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Drawer,
	Divider,
	FontIcon,
	GridList,
	GridTile,
	DatePicker
} from 'material-ui';

export default  class Finance extends Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		};

		this.title = ['系统运营','财务管理'];

	}


	componentDidMount() {


	}

	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}


	render() {

		return (

		<div>


			<div className="main">
				<div className="l-sidebar">
				<TitleList children={this.title}></TitleList>
				</div>
				

			</div>


			
			
		</div> 

		);
	}
}








