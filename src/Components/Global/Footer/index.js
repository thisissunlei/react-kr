import {Link} from 'react-router';
import React, {Component, PropTypes} from 'react';

import './index.less';


import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
} from 'material-ui';


import ActionInvertColors from 'material-ui/svg-icons/action/invert-colors';
import {blue500, yellow600,red500,pink500,purple500} from 'material-ui/styles/colors';

export default class Footer extends Component{


	render(){

		const style = {
			height: 90,
			width: 90,
			margin: 10,
			textAlign: 'center',
		};

		return (
			<div className="g-footer">
				<p>联合办公空间·创业服务平台</p>
			</div>
		);

	}



}






