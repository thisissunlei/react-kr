import React,{Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import * as actionCreators from '../../../Redux/Actions';


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
	FloatingActionButton
} from 'material-ui';

import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import './index.less';


import SidebarNav from '../SidebarNav';


class Header extends Component {

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

	constructor(props,context){
		super(props, context);

		this.handleToggle = this.handleToggle.bind(this);
		this.showBottomNav = this.showBottomNav.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.touchTitle = this.touchTitle.bind(this);


		this.state = {
			bottomNav:false,
		}

	}

	handleToggle(){

		var {actions,sidebar_nav} = this.props;
		actions.switchSidebarNav(!!!sidebar_nav.switch_value);
	}

	showBottomNav(event){
		event.preventDefault();

		var {actions,bottom_nav} = this.props;
		actions.switchBottomNav({switch_value:!!!bottom_nav.switch_value,anchor_el:event.currentTarget});


	}

	handleRequestClose(){
		var {actions,bottom_nav} = this.props;
		actions.switchBottomNav({switch_value:!!!bottom_nav.switch_value,anchor_el:event.currentTarget});
	};

	touchTitle(){
		this.context.router.push('/');
	}

	render() {


		return (
			<div >
			<AppBar
			title="36氪"
			onTitleTouchTap={this.touchTitle}
			style={{paddingLeft:60,position:'fixed',top:0,left:0,right:0}}
			iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationMenu  /></IconButton>}
			iconElementRight={
				<IconMenu
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				>
				<MenuItem primaryText="Refresh" style={{backgroundColor:'red'}} />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
				</IconMenu>
			}
			children = {
				<div>

				<IconMenu
				iconButtonElement={
					<Menu>
					<MenuItem
					primaryText="菜单一"
					/>
					</Menu>
				}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Send feedback" />
				<MenuItem primaryText="Settings" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
				</IconMenu>
				<IconMenu
				iconButtonElement={
					<Menu>
					<MenuItem
					primaryText="菜单一"
					/>
					</Menu>
				}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Send feedback" />
				<MenuItem primaryText="Settings" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
				</IconMenu>
				<IconMenu
				iconButtonElement={
					<Menu>
					<MenuItem
					primaryText="菜单一"
					/>
					</Menu>
				}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Send feedback" />
				<MenuItem primaryText="Settings" />
				<MenuItem primaryText="Help" />
				<MenuItem primaryText="Sign out" />
				</IconMenu>

				</div>
			}
			/>

			<Drawer open={this.props.sidebar_nav.switch_value} width={85}>

				<AppBar
				iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose  /></IconButton>}
				/>

				<SidebarNav/>

			</Drawer>



			<FloatingActionButton onTouchTap={this.showBottomNav} style={{position:'fixed',bottom:20,right:10,zIndex:888}} secondary={true} >
			<ContentAdd />
			</FloatingActionButton>

			<Popover
			open={this.props.bottom_nav.switch_value}
			anchorEl={this.props.bottom_nav.anchor_el}
			anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
			targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
			onRequestClose={this.handleRequestClose}
			animation={PopoverAnimationVertical}
			>
			<Menu>
			<MenuItem primaryText="Refresh" />
			<MenuItem primaryText="Help &amp; feedback" />
			<MenuItem primaryText="Settings" />
			<MenuItem primaryText="Sign out" />
			</Menu>
			</Popover>

			</div>
		);
	}

}




function mapStateToProps(state){

	return {
		sidebar_nav:state.sidebar_nav,
		bottom_nav:state.bottom_nav
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);

