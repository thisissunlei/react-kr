import React, { PropTypes } from 'react'; 
import { connect } from 'kr/Redux';

import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { observer } from 'mobx-react';

import {
	Actions,
	Store
} from 'kr/Redux';

import {Http} from 'kr/Utils';

import {
	Tabs,
	Tab,
	Form,
	Title,
	Message
} from 'kr-ui';
import './index.less';
//招商线索
import MeetingReservation from './MeetingReservation';
import StationReservation from './StationReservation';



class AllAppointment extends React.Component {
	

	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			initSearch:''
		}
	
	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));
	}
  
	merchants = () =>{
		let {
			tab,
			initSearch
		} = this.state;
		tab = 'merchants';
		initSearch='m';
		this.setState({
			tab,
			initSearch
		});
	}
	
	personal = () => {
		let {
			tab,
			initSearch
		} = this.state;
		tab = 'personal';
		initSearch='p';
		this.setState({
			tab,
			initSearch
		});
	}
	
	render() {
		let {
			tab,
			initSearch
		} = this.state;


		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee",
			fontSize:'16px'
		}
		const commenTab = {
			color: '#666',
			borderBottom: "1px solid #eee",
            fontSize:'16px'
		}


		let merchantsStyle = (tab == 'merchants'||tab=='table') ? activeTab : commenTab;
		let personalStyle = (tab == 'personal') ? activeTab : commenTab;
		

		const inkBarStyle = {
			background: '＃499df1',
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>
			<Title value="空间预定"/>

			<Tabs className="tabs">
					<Tab label="预约会议室" onActive={this.merchants} style={merchantsStyle}>

							<MeetingReservation/>
					</Tab>
					<Tab label="预约工位" onActive={this.personal}  style={personalStyle}>

							<StationReservation />
					</Tab>
					
			</Tabs>


		</div>
		);
	}
}
export default AllAppointment;
