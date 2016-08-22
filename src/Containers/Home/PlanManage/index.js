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

		this.calendarChange = this.calendarChange.bind(this);

		var {actions} = this.props;
		actions.setNowDate('2015-10-01');

	}

	componentDidMount() {

	}

	calendarChange(value){
		var {actions} = this.props;
		actions.setNowDate(value);
	}


	render(){

		return(

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
		);

	}

}







function mapStateToProps(state){

	return {
		calendar:state.calendar,
		now_date:state.calendar.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(PlanManage);




