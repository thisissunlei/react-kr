import React,{Component,PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';

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

class MemoManage extends Component{

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

	constructor(props,context){

		super(props, context);

		this.toMore = this.toMore.bind(this);


	}

	componentDidMount() {

	}

	toMore(){
		this.context.router.push('/notify');
	}
	render(){

		return(
						<Section title="我的备忘" description="" 
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="更多" onTouchTap={this.toMore}/>
								</Menu>
							} >

							<List>
								{this.props.items.map((item,index)=>{
									return <ListItem primaryText={item.title} key={index} leftIcon={<ContentInbox />} />
								})}
							</List>
						</Section>

		);

	}

}



function mapStateToProps(state){

	return {
		items:state.plan.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(MemoManage);










