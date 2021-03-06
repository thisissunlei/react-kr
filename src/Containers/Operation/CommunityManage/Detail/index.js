import React, {
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
	Waiting
} from 'kr/PureComponents';
import {
	Tabs,
	Tab,
	Form,
	BreadCrumbs,
	Section,
	Title,
	Message
} from 'kr-ui';

import Baidu from 'kr/Utils/Baidu';

import Schedule from './Schedule';
import FloorPlan from './FloorPlan';
import $ from 'jquery';
import './index.less';


export default class CommunityManage extends React.Component {
	static childContextTypes = {
		onSetCommunity: React.PropTypes.func.isRequired,
		communityId: React.PropTypes.string.isRequired,
	}

	getChildContext() {
		return {
			onSetCommunity: this.onSetCommunity,
			communityId: this.state.communityId
		};
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
		}

	}

	componentDidMount() {
		Baidu.trackEvent('计划表页面','访问');
	}

	onSetCommunity = (communityId) => {
		this.setState({
			communityId
		});
	}

	Floorplan =()=> {
		this.setState({
			tab:'floorplan',
		});
	}

	planTable=()=> {
		this.setState({
			tab:'table',
		});
	}



	render() {
		let {
			tab,
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
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="plan-tab-container" style={{minHeight:910}}>
			<Title value="库存平面图"/>
			<Waiting />
		 	<BreadCrumbs children={['系统运营','社区管理','销控表']}/>
				<span className="line"></span>
				<Section title="库存平面图" >
					<FloorPlan tab={tab} />
				</Section>



		</div>
		);
	}
}
