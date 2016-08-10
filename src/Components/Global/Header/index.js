import {Link} from 'react-router';

import React, {Component, PropTypes} from 'react';

import {
	AppBar,
	MenuItem,
	IconMenu,
	IconButton,
	RaisedButton,
	Drawer
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import './index.less';


export default class Header extends Component {


	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		}

	}

	handleToggle(){
		console.log('----');
		this.setState({open: !this.state.open});
	}

	render() {



		return (
			<div>

			<AppBar
			title="36氪"
			iconElementLeft={<IconButton onClick={this.handleToggle.bind(this)}><NavigationClose  /></IconButton>}
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
			/>



			<Drawer open={this.state.open}>
			<MenuItem>Menu Item</MenuItem>
			<MenuItem>Menu Item 2</MenuItem>
			</Drawer>

			</div>
		);
	}

}

/*
   <div className="c-header">
   <div className="container">
   <ul className="navs">
   <li><Link to="/"><img src="https://sta.36krcnd.com/common-module/common-header/images/logo.png" width="60" height="40"/></Link></li>

   <li><Link to="/company/list">创投资讯</Link></li>
   <li><Link to="/company/list">7*24h资讯</Link></li>
   <li><Link to="/company/list">股权投资</Link></li>
   <li><Link to="/company/list">融资</Link></li>
   <li><Link to="/company/list">我是创业者</Link></li>
   <li><Link to="/company/list">我是投资人</Link></li>
   <li><Link to="/company/list">发现</Link></li>
   </ul>

   </div>
   </div>


*/




