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

export default class CommunityManage extends Component {

	constructor(props, context) {
		super(props, context);
		this.planTable = this.planTable.bind(this);
		this.Floorplan = this.Floorplan.bind(this);


		this.getCommunityFloors = this.getCommunityFloors.bind(this);


		this.state = {

			tab: 'table',
			communityInfoList: [],
			community: '',
		}

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



	getCommunityFloors(id) {
		console.log('floors', id);
		let communityid = {
			communityid: id
		};
		var communityInfoFloorList;
		var that = this;
		Store.dispatch(Actions.callAPI('getCommunityFloors', communityid)).then(function(response) {

			communityInfoFloorList = response.floors.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			that.setState({
				communityInfoFloorList
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}



	render() {
		let {
			tab
		} = this.state;
		var {
			communityInfoList,
			communityInfoFloorList,
			communityids,
			community
		} = this.state;

		const activeTab = {
			color: '#000',
			backgroundColor: '#ecf5fe',
			borderBottom: "1px solid #eee"
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}
		let tableStyle = (tab == 'table') ? activeTab : commenTab;
		let planStyle = (tab == 'floorplan') ? activeTab : commenTab;


		return (

			<div>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
			
			<Section title="计划表" description="">

				 <Tabs className="tabs" tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{backgroundColor:'#499df1'}}>
					<Tab label="计划表" onActive={this.planTable} style={tableStyle}>
						<Schedule />

					</Tab>
					<Tab label="平面图"  onActive={this.Floorplan} style={planStyle}>

					   <FloorPlan communityId={community} tab={tab} communityInfoFloorList={communityInfoFloorList}/>


					</Tab>
			</Tabs>

			</Section>
			
			
		</div>
		);
	}
}