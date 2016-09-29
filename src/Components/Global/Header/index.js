import React,{Component,PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router';

import * as actionCreators from '../../../Redux/Actions';

import SidebarNavMenuItems from '../../../Configs/sidebarNavs';

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
	FlatButton,
	FloatingActionButton
} from 'material-ui';

import ActionHome from 'material-ui/svg-icons/action/home';

import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';


import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
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

	renderHeaderNav(item,index){

		let styles = {
			color:'#fff',
			height:67,
		}

		if(item.active){
			styles.borderTop = '2px solid #fff';
			styles.borderLeft = '1px solid #3F93CA';
			styles.borderRight = '1px solid #3F93CA';
		}

		return (
			 <FlatButton label={item.primaryText} key={index} style={styles} href={'./#/'+item.router} labelStyle={{lineHeight:'67px'}} />
		);

	}

	render() {

		var styles = {paddingLeft:0,position:'fixed',top:0,left:0,right:0,zIndex:9,backgroundColor:'#328ECC'};

		var {switch_value} = this.props.sidebar_nav;

		if(switch_value){
			//styles.paddingLeft = 50;
		}


		const Header = (props) =>{
			return (
				<AppBar
				style={styles}
				onLeftIconButtonTouchTap={this.handleToggle}
				iconStyleLeft={{marginTop:0}}
		 iconElementLeft={

				<div className="main-navs" >
						 <FlatButton onTouchTap={this.touchTitle} label="氪空间" style={{color:'#fff',height:67,width:180}} labelStyle={{fontSize:25}} />
						 <FlatButton onTouchTap={this.handleToggle} icon={<NavigationMenu  />} style={{color:'#fff',height:67}} />
						{this.props.navs_items.map((item,index)=>this.renderHeaderNav(item,index))}
					</div>
		}

		iconElementRight={
			 <IconMenu
				iconButtonElement={
				  <IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			  >
				<MenuItem primaryText="返回" />
				<MenuItem primaryText="个人中心" />
				<MenuItem primaryText="退出" />
			  </IconMenu>
		}
				/>
			);
		}

		return (

			<div >

				{this.props.header_nav.switch_value && <Header/>}

			<Drawer open={this.props.sidebar_nav.switch_value} width={180}>

				<AppBar
				title="氪空间"
				style={{backgroundColor:'#328ECC'}}
				iconElementLeft={<IconButton onClick={this.handleToggle}><NavigationClose  /></IconButton>}
				/>

				<SidebarNav items={this.props.navs_current_items}/>

				</Drawer>



				</div>
		);
	}

}




function mapStateToProps(state){

	return {
		header_nav:state.header_nav,
		sidebar_nav:state.sidebar_nav,
		navs_items:state.navs.items,
		navs_current_items:state.navs.current_items,
		bottom_nav:state.bottom_nav
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);

	/*
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

*/
