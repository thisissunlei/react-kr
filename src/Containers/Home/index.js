
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../Redux/Actions';


import {List, ListItem} from 'material-ui/List';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';


import Section from 'kr-ui/Section';
import Calendar from 'kr-ui/Calendar';

import './index.less';

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
	GridList,
	GridTile,
	DatePicker
} from 'material-ui';

import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import Loading from '../../Components/Loading';

class Home extends Component{


	constructor(props,context){
		super(props, context);

		this.calendarChange = this.calendarChange.bind(this);
		this.state = {
			open:false
		}

		var {actions} = this.props;
		actions.setNowDate('2015-10-01');
	}


	componentDidMount() {

	}

	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}

	calendarChange(value){
		var {actions} = this.props;
		actions.setNowDate(value);
	}

	render() {

		const styles = {
			root: {
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'space-around',
			},
			gridList: {
				overflowY: 'auto',
				marginBottom: 24,
				paddingLeft:30,
				paddingRight:30,
				marginLeft:'auto',
				marginRight:'auto'
			},
		};

		if(this.props.companys_fetch.status == 'loading'){
			return( <Loading/>); 
		}

		return (

			<div>


			<div className="main">
				<div className="l-sidebar">

					<Section title="日程管理" description="" 
							rightMenu = {
								<Menu>
									  <MenuItem primaryText="写备忘" />
									  <MenuItem primaryText="备忘列表" />
									  <MenuItem primaryText="其他" />
								</Menu>
							} >

							<Calendar value={this.props.now_date} onChange={this.calendarChange} active={true} />

							<List>

								{this.props.calendar.now_trip.map((item,index)=>{
									return <ListItem primaryText={item.title} key={index} leftIcon={<ContentInbox />} />
								})}
							</List>

					</Section>

					<Section title="通知公告" description="" >
						 <DatePicker
							  hintText="en-US locale"
							  locale="en-US"
							  firstDayOfWeek={0}
							  container="inline"
							/>
					</Section>

				</div>

				<div className="r-sidebar">

					<Section title="我的常用" description="" >
						<List>
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						</List>
					</Section>

					<div className="r-sidebar-body">

						<Section title="我的备忘" description="" >
							<List>
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							</List>
						</Section>

						<Section title="待办事项" description="" >
							<List>
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
							<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
							</List>
						</Section>

					</div>

					<div className="r-sidebar-body">

					<Section title="社群活动" description="" >
						<List>
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						</List>
					</Section>

					<Section title="公司制度" description="" >
						<List>
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						<ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
						<ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
						</List>
					</Section>


					</div>


					

					

				</div>
			</div>


			

			

			
	</div> 

		);
	}
}





function mapStateToProps(state){

	return {
		companys:state.companys,
		companys_fetch:state.companys_fetch,
		sidebar_nav:state.sidebar_nav,
		calendar:state.calendar,
		now_date:state.calendar.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);



