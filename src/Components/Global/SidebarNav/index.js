
import {Link} from 'react-router';

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

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
	FloatingActionButton
} from 'material-ui';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import SidebarNavMenuItems from '../../../Configs/sidebarNavs';

export default class SidebarNav extends Component {

	constructor(props,context){
		super(props, context);

	}


	renderMenuItem(item,index){


		if(item.menuItems && item.menuItems.length){
			return (
				<MenuItem 
					key={index}
					primaryText={item.primaryText} 
					checked={item.checked} 
					menuItems={ item.menuItems.map((it,ind)=>this.renderMenuItem(it,ind))} />
			);
		}
		return (
				<MenuItem 
					primaryText={item.primaryText} 
					checked={item.checked} 
					key={index} 
					insetChildren={!!item.insetChildren}
				/>
		);

	}

	render(){

		const style = {
	      margin:'20px 0 0 0 ',
		  display: 'inline-block',
		  boxShadow:' 0 0 0 0',
		};


		return(

			<div>


			<Paper style={style}>
				<Menu>
					{SidebarNavMenuItems.map((item,index)=>this.renderMenuItem(item,index))}
				</Menu>
			</Paper>
				 
			</div>
		);

	}



}

/*

			<MenuItem
			rightIcon={<ArrowDropRight />}
			menuItems={[
				<MenuItem
				primaryText="Show"
				rightIcon={<ArrowDropRight />}
				menuItems={[
					<MenuItem primaryText="Show Level 2" />,
						<MenuItem primaryText="Grid lines" checked={true} />,
							<MenuItem primaryText="Page breaks" insetChildren={true} />,
								<MenuItem primaryText="Rules" checked={true} />,
				]}
				/>,
				<MenuItem primaryText="Grid lines" checked={true} />,
					<MenuItem primaryText="Page breaks" insetChildren={true} />,
						<MenuItem primaryText="Rules" checked={true} />,
			]}
			/>
			*/
