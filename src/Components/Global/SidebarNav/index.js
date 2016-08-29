
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


import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';

let SelectableList = MakeSelectable(List);

function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

SelectableList = wrapState(SelectableList);

export default class SidebarNav extends Component {

	constructor(props,context){
		super(props, context);
	}


	renderMenuItem(item,index,parentIndex){

		if(item.menuItems && item.menuItems.length){
			return (
				<ListItem 
					key={index}
					value={index}
					primaryText={item.primaryText} 
					nestedItems={ item.menuItems.map((it,ind)=>this.renderMenuItem(it,ind,index))} />
			);
		}
		return (
				<ListItem 
					primaryText={item.primaryText} 
					key={index} 
					value={parentIndex+'-'+index}
					href={"/#/"+item.router}
				/>
		);

	}


	render(){

		const style = {
	      margin:'20px 0 0 0 ',
		  display: 'inline-block',
		  boxShadow:' 0 0 0 0',
		width:120,
		};


		return(

			<div>
						<SelectableList defaultValue={0}>
				{/*
				
						  <ListItem
							value={1}
							primaryText="Brendan Lim"
							nestedItems={[
							  <ListItem
								value={2}
								primaryText="Grace Ng"
							  />,
							]}
						  />
				*/}

					{SidebarNavMenuItems.map((item,index)=>this.renderMenuItem(item,index))}
						</SelectableList>
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
