import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';


import Section from 'kr-ui/Section';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

import ActionStars from 'material-ui/svg-icons/action/stars';

import {indigo500} from 'material-ui/styles/colors';

import {
	Menu,
	MenuItem,
	Avatar,
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class SNSActivityManage extends React.Component{

	constructor(props,context){

		super(props, context);


	}

	componentDidMount() {

	}

	render(){

		return(
					<Section title="社群活动" description=""

							leftIcon= {
								<Avatar icon={<ActionStars />} backgroundColor={indigo500}size={25}/>
							}
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="更多" />
									  <MenuItem primaryText="其他" />
								</Menu>
							} >

							<List>
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							</List>

					</Section>


		);

	}

}







function mapStateToProps(state){

	return {
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(SNSActivityManage);
