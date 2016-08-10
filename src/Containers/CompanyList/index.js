import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';



import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Loading from '../../Components/Loading';

class CompanyList extends Component{


	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		}


	}

	componentDidMout(){

		this.props.dispatch({type:'SET_COMPANYS_FILTER_ALL'});
	}

	handleToggle(){
		console.log('----');
		this.setState({open: !this.state.open});
	}

	render() {

		if(this.props.companys_fetch.status == 'loading'){
			return( <Loading/>); 
		}

		return (

			<div className="g-compnay-list">




    <List>
      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
      <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
      <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
      <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
      <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
    </List>
    <Divider />
    <List>
      <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
      <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
    </List>
			</div>

		);
	}
}





function mapStateToProps(state){

	return {
		companys:state.companys,
		companys_fetch:state.companys_fetch
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators(Object.assign({},actionCreators),dispatch);
}

export default connect(mapStateToProps)(CompanyList);

