import {
	Link
} from 'react-router';

import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';

import {
	AppBar,
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Paper,
	IconButton,
	RaisedButton,
	Drawer,
	Divider,
	FontIcon,
	FloatingActionButton,
} from 'material-ui';

import {
	List,
	ListItem
} from 'kr-ui';
import Pagination from '../../Pagination';

import './index.less';



import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';


import {
	MakeSelectable
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

export default class InfoList extends Component {

	PropTypes = {
		items: React.PropTypes.isArray,
		current_parent: React.PropTypes.string,
		current_child: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);
	}
	onPageChange=()=>{
		console.log('onPageChange');
	}
	onClose=()=>{
		let {onClose} = this.props;
		onClose && onClose();
	}
	render(){
		let pagination = 10;
		let totalCount = 100;
		let pageSize = 10;
		let page = 2;
		let infoList = [
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
			{
				info:'123',
				date:'20124616'
			},
		]

		if (!pagination) {
			return null;
		}
		return (
			<div className="ui-info-list">
				<div style={{padding:'36px 30px'}}>
					<span className="close-info icon-close" onClick={this.onClose}></span>
					<p style={{marginBottom:30}}>
					<span className="icon-info ui-m-info-logo"></span>
					<span className="ui-m-info-title">合同到期信息提醒 :</span>
					</p>
					{infoList.map((item)=>{
						return(
							<p className="ui-m-info-content">
								<span className="ui-m-info-contents">{item.info}</span>
								<span className="ui-m-info-date">{item.date}</span>
							</p>
						)
					})}
				</div>
				<div style={{paddingRight:'15px'}}>
				<Pagination totalCount={totalCount} page={page} pageSize={pageSize} onPageChange={this.onPageChange} pageJump={3}/>
				</div>
			</div>
		);
	}

}
