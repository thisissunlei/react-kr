import React,{PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import Section from 'kr-ui/Section';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionTimeLine from 'material-ui/svg-icons/action/timeline';

import {blue500} from 'material-ui/styles/colors';

import {
	Menu,
	MenuItem,
	Avatar,
} from 'material-ui';

import {List, ListItem} from 'material-ui/List';

import './index.less';

class TodoManage extends React.Component{


    static contextTypes = {
        router: PropTypes.object.isRequired
    };

	constructor(props,context){

		super(props, context);
		this.toNotifyPage = this.toNotifyPage.bind(this);


	}

	componentDidMount() {

		var {actions} = this.props;
		actions.loadNotify();

	}

	toNotifyPage(){
		this.context.router.push('/notify');
	}

	render(){

		return(
					<Section title="待办事项" description=""

							leftIcon= {
								<Avatar icon={<ActionTimeLine />} backgroundColor={blue500} size={25}/>
							}
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="排序" />
									  <MenuItem primaryText="更多" onTouchTap={this.toNotifyPage} />
								</Menu>
							} >
							<List>

								{this.props.items.map((item,index)=>{
									return <ListItem primaryText={item.content} key={index} leftIcon={<ContentInbox />} />
								})}

								<ListItem primaryText="查看更多" onTouchTap={this.toNotifyPage} />

							</List>
					</Section>

		);

	}

}







function mapStateToProps(state){

	return {
		notify:state.notify,
		items:state.notify.items
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoManage);
