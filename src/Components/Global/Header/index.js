import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Actions, Store } from 'kr/Redux';
import * as actionCreators from '../../../Redux/Actions';

import { AppBar, Menu, MenuItem, DropDownMenu, IconMenu, IconButton, RaisedButton, Drawer, Divider, FontIcon, FlatButton, List, ListItem, FileFolder, Avatar, FloatingActionButton } from 'material-ui';


import ActionHome from 'material-ui/svg-icons/action/home';

import { Popover, PopoverAnimationVertical } from 'material-ui/Popover';

import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';


import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity';
import './index.less';


import SidebarNav from '../SidebarNav';
import InfoList from '../InfoList';


class Header extends Component {


	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props, context) {
		super(props, context);

		this.handleToggle = this.handleToggle.bind(this);
		this.showBottomNav = this.showBottomNav.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.touchTitle = this.touchTitle.bind(this);
		this.inforShowList = this.inforShowList.bind(this);
		this.state = {
			bottomNav: false,
			toggle: true,
			information:false,
			inforLogoShow:false,
			url:window.location.hash,
			infoTab:'',
			hasUnRead:0
		}
		this.hasInfoListTab = [
			{url:'community',code:'111'}
		]
		// this.inforShowList();

	}
	componentWillMount() {
		this.inforShowList();
  	}
  	componentWillReceiveProps(next,state){
  		this.inforShowList();
  	}

	inforShowList(){
		let url = window.location.hash;
		url = url.split('/')[1];
		let _this = this;
		let currentTab = false;
		// let hasInfoListTab = ['community'];
		this.hasInfoListTab.map((item)=>{
			// console.log('hasInfoListTab',item,url);
			if(item.url == url){
				currentTab = true;
			}
		})
		if(currentTab){
			_this.getUnReadInfo();
			_this.setState({
				inforLogoShow:true,
				infoTab:url,
				information:false
			})
		}else{
			_this.setState({
				inforLogoShow:false,
				information:false,
				infoTab:'local',
				information:false
			})
		}
	}
	//获取未读消息数
	getUnReadInfo=()=>{
		let _this = this;
		Store.dispatch(Actions.callAPI('getUnReadInfo', {
            startTime: '',endTime:''
        })).then(function(response) {
            if(response.msgCount){
            	_this.setState({
            		hasUnRead:response.msgCount
            	})
            }else{
            	_this.setState({
            		hasUnRead:0
            	})
            }
        }).catch(function(err) {
            console.log(err);
        });
	}


	handleToggle() {

		var {
			actions,
			sidebar_nav,
			flag
		} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}

	showBottomNav(event) {
		event.preventDefault();

		var {
			actions,
			bottom_nav
		} = this.props;
		actions.switchBottomNav({
			switch_value: !!!bottom_nav.switch_value,
			anchor_el: event.currentTarget
		});


	}

	handleRequestClose() {

		var {
			actions,
			bottom_nav
		} = this.props;
		actions.switchBottomNav({
			switch_value: !!!bottom_nav.switch_value,
			anchor_el: event.currentTarget
		});
	};

	touchTitle() {
		//this.context.router.push('/');
		window.location.href = 'http://krspace.cn';
	}

	renderHeaderNav(item, index) {

		let styles = {
			color: '#666666',
			width: 'auto',
			height: 60,
		}

		if(!item){
			return ;
		}

		if (item.active) {
			styles.color = '#394457';
			styles.fontWeight='600';
		}


		let jumpUrl = '';

		if (item.originUrl) {
			jumpUrl = item.originUrl;
		} else {
			jumpUrl = './#' + item.router;
		}


		return (
			<FlatButton label={item.primaryText} key={index} style={styles} href={jumpUrl} labelStyle={{lineHeight:'60px',fontSize:"16px",fontWeight:0}} />
		);

	}

	showInfo=()=>{
		this.setState({
			information:!this.state.information
		})
	}
	onClose=()=>{
		this.setState({
			information:!this.state.information
		})
	}
	changeCount=()=>{
		let hasUnRead = --this.state.hasUnRead;
		this.setState({
			hasUnRead:hasUnRead
		})
	}

	render() {

		var styles = {
			paddingLeft: 0,
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			backgroundColor: '#FFFFFF',
			height: "60px",
			zIndex: 10
		};
		let width = document.body.clientWidth * 0.4;
		if(width<570){
			width = 570;
		}

		var {
			switch_value
		} = this.props.sidebar_nav;

		if (switch_value) {
			//styles.paddingLeft = 50;
		}
		let {inforLogoShow,infoTab,hasUnRead} = this.state;
		console.log('header',infoTab,hasUnRead);
		let showInfoLogo = inforLogoShow?'inline-block':'none';


		const HeaderBar = (props) => {

			var iconClassName = '';
			let sidebarNavSwitch = this.props.sidebar_nav.switch_value;
			if (sidebarNavSwitch) {
				iconClassName = "hide-heng";
			} else {
				iconClassName = "hide-shu";

			}
			return ( < AppBar style = {
					styles
				}
				onLeftIconButtonTouchTap = {
					this.handleToggle
				}
				iconStyleLeft = {
					{
						marginTop: 0
					}
				}

				iconElementLeft = {

					<div className="main-navs" >
						 <FlatButton onTouchTap={this.handleToggle} icon={<FontIcon className={iconClassName} />} style={{color:'#fff',height:60,width:200}} />
						 <FlatButton onTouchTap={this.touchTitle}  icon={<FontIcon className="new-logo"/> } style={{height:"60px"}}/>
						{this.props.navs_items.map((item,index)=>this.renderHeaderNav(item,index))}
					</div>
				}

				iconElementRight = {
					<div style={{minWidth:70,textAlign:'right'}}>
					<div style={{display:showInfoLogo,position:'relative'}}>
						<span className="icon-info information-logo"  onClick={this.showInfo}></span>
						<span className="ui-un-read-count" style={{visibility:hasUnRead>0?'visible':'hidden'}}>{hasUnRead}</span>
					</div>
					< IconMenu
					iconStyle={{fill:'#394457'}}
					iconButtonElement = {
						<IconButton ><MoreVertIcon color="#fff"/></IconButton>
					}
					targetOrigin = {
						{
							horizontal: 'right',
							vertical: 'top'
						}
					}
					anchorOrigin = {
						{
							horizontal: 'right',
							vertical: 'top'
						}
					} >
					{this.props.user.nick && 	<MenuItem primaryText={this.props.user.nick} onTouchTap={(event)=>{
						window.location.hash = 'permission/personalCenter';
				}} />}

					 < MenuItem primaryText = "退出"
					onTouchTap = {
						(event) => {
							window.location.href = '/logout/logout';
						}
					}
					/>
					< /IconMenu ></div>
				}
				/>
			);
		}

		return (

			<div >
				{this.props.header_nav.switch_value && <HeaderBar/>}
				<Drawer open={this.props.sidebar_nav.switch_value} width={180} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
					<SidebarNav items={this.props.navs_current_items} current_router={this.props.current_router} current_parent={this.props.current_parent} current_child={this.props.current_child}/>
				</Drawer>
				<Drawer open={this.state.information} width={width} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
					<InfoList onClose={this.onClose} infoTab={infoTab} changeCount={this.changeCount}/>
				</Drawer>
			</div>
		);
	}

}



function mapStateToProps(state) {

	return {
		header_nav: state.header_nav,
		sidebar_nav: state.sidebar_nav,
		navs_items: state.navs.items,
		navs_current_items: state.navs.current_items,
		bottom_nav: state.bottom_nav,
		current_router: state.navs.current_router,
		current_parent: state.navs.current_parent,
		current_child: state.navs.current_child,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, actionCreators), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

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
/*<Popover>

	*/
