
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

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import Loading from '../../Components/Loading';

class Home extends Component{


	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		}

		var {actions} = this.props;
		actions.loadCompanys();

	}

	handleToggle(){
		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

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



 <DatePicker
      hintText="en-US locale"
      locale="en-US"
      firstDayOfWeek={0}
	  container="inline"
    />







			<GridList
			cols={2}
			cellHeight={250}
			padding={10}
			style={styles.gridList}
			>

					<GridTile
					actionPosition="left"
					titlePosition="top"
					>
							<Card style={{border:"1px solid #ddd"}}>
								<CardHeader
									  title="备忘录"
									  subtitle=""
									  actAsExpander={true}
									  showExpandableButton={true}
								/>

								<CardText >
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
										Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
											Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
								</CardText>
							</Card>

					</GridTile>
<GridTile
					actionPosition="left"
					titlePosition="top"
					>
							<Card style={{border:"1px solid #ddd"}}>
								<CardHeader
									  title="备忘录"
									  subtitle=""
									  actAsExpander={true}
									  showExpandableButton={true}
								/>
								<CardActions>
									<FlatButton label="所有" />
									<FlatButton label="过时" />
								</CardActions>
								<CardText expandable={true}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
										Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
											Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
								</CardText>
							</Card>

					</GridTile>
<GridTile
					actionPosition="left"
					titlePosition="top"
					>
							<Card style={{border:"1px solid #ddd"}}>
								<CardHeader
									  title="备忘录"
									  subtitle=""
									  actAsExpander={true}
									  showExpandableButton={true}
								/>
								<CardActions>
									<FlatButton label="所有" />
									<FlatButton label="过时" />
								</CardActions>
								<CardText expandable={true}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
										Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
											Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
								</CardText>
							</Card>

					</GridTile>

<GridTile
					actionPosition="left"
					titlePosition="top"
					>
							<Card style={{border:"1px solid #ddd"}}>
								<CardHeader
									  title="备忘录"
									  subtitle=""
									  actAsExpander={true}
									  showExpandableButton={true}
								/>
								<CardActions>
									<FlatButton label="所有" />
									<FlatButton label="过时" />
								</CardActions>
								<CardText expandable={true}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
										Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
											Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
								</CardText>
							</Card>

					</GridTile>





							<GridTile
							actionPosition="left"
							titlePosition="top"
							>

							<Card>
							<CardTitle title="Card title" subtitle="Card subtitle" />
							<CardText>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
									Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
										Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
											</CardText>
											<CardActions>
											<FlatButton label="Action1" />
											<FlatButton label="Action2" />
											</CardActions>
											</Card>


											</GridTile>

											</GridList>


											
															

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
		companys_fetch:state.companys_fetch,
		sidebar_nav:state.sidebar_nav
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);



