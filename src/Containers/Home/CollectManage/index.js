import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Divider,
	FontIcon,
	DatePicker
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class PlanManage extends Component{

	constructor(props,context){

		super(props, context);


	}

	componentDidMount() {

		const {actions} = this.props;
		actions.createPlan().then(function(response){
			console.log('hahah<<<<');
		});
	}

	render(){

		return(
					<Section title="我的常用" description=""
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="新增" />
									  <MenuItem primaryText="其他" />
								</Menu>
							} >

						<List>
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						</List>
					</Section>

		);

	}

}



function mapStateToProps(state){

	return {
		calendar:state.plan,
		now_date:state.plan.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(PlanManage);







