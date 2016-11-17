import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Notify,
	Button,
	KrField,
	Form,
	BreadCrumbs,
} from 'kr-ui';

import Schedule from './Schedule';
import FloorPlan from './FloorPlan';
import $ from 'jquery';
import './index.less'
export default class CommunityManage extends Component {

	constructor(props, context) {
		super(props, context);
		this.planTable = this.planTable.bind(this);
		this.Floorplan = this.Floorplan.bind(this);
		this.state = {

			tab: 'table',
		}

	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
	}


	Floorplan() {
		let {
			tab
		} = this.state;
		tab = 'floorplan';
		this.setState({
			tab
		});
	}

	planTable() {
		let {
			tab
		} = this.state;

		tab = 'table';
		this.setState({
			tab
		});
	}



	render() {
		let {
			tab
		} = this.state;

		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee"
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}
		let tableStyle = (tab == 'table') ? activeTab : commenTab;
		let planStyle = (tab == 'floorplan') ? activeTab : commenTab;
		const inkBarStyle = {
			background: '-moz-linear-gradient(right, #03ec56, #499df1)',
			background: '-webkit-linear-gradient(right, #03ec56, #499df1)',
			background: '-ms-linear-gradient(right, #03ec56, #499df1)',
			position:'absolute',
			top:0,
		}

		return (

			<div className="tab-container">
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
				<span className="line"></span>
				 <Tabs className="tabs" tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative'}}>
					<Tab label="计划表" onActive={this.planTable} style={tableStyle}>
						<Schedule tab={tab}/>

					</Tab>
					<Tab label="平面图"  onActive={this.Floorplan} style={planStyle}>

					   <FloorPlan tab={tab} />


					</Tab>
			</Tabs>

			
			
		</div>
		);
	}
}