import React, {Component, PropTypes} from 'react';

import CompanyListFilter from './Filter';
import CompanyListResult from './Result';

import './index.less';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';


export default class CompanyList extends Component {


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

			<div className="g-compnay-list">

			hahahahah

			<RaisedButton
			label="Toggle Drawer"
			onTouchTap={this.handleToggle}
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
				<CompanyListFilter/>
				<CompanyListResult companys={[]}/>

			   */





