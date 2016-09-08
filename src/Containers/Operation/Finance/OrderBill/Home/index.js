import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import TitleList from 'kr-ui/TitleList';
import './index.less';

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

export default  class Home extends Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		};

		this.title = ['系统运营','财务管理'];
		this.tableHead = ['客户名称','订单类型','所在社区','计划入住日期','计划离开日期','收入总额','回款总额','余额','操作'];

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
				<TitleList children={this.title}></TitleList>
				<div className="order-table">
				<Table>
					<TableHeader>
						<TableRow>
							{this.tableHead.map((item)=>{
								return <TableHeaderColumn key={item}>{item}</TableHeaderColumn>
							})}
						</TableRow>
					</TableHeader>
					
					<TableBody>
						{this.tableHead.map( (row, index) => (
			              <TableRow key={index} selected={row.selected}>
				              {this.tableHead.map((item)=>{
									return <TableRowColumn key={item}>{item}</TableRowColumn>
								})}
			              </TableRow>
			              ))}

					</TableBody>
				</Table>
				</div>
				

			</div>


			
			
		</div> 

		);
	}
}








