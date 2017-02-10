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
	Title
} from 'kr-ui';

import Schedule from './Schedule';
import FloorPlan from './FloorPlan';
import $ from 'jquery';
import './index.less'
class CommunityManage extends Component {
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
		this.planTable = this.planTable.bind(this);
		this.Floorplan = this.Floorplan.bind(this);
		this.state = {
			tab: 'table',
			communityId: ''
		}

	}

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(true));

	}

	onSetCommunity = (communityId) => {
		this.setState({
			communityId
		});
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
		// Store.dispatch(Actions.switchRightBar(false));
		let {
			tab
		} = this.state;

		tab = 'table';
		this.setState({
			tab
		});
	}
	hiddenRight=()=>{
		Store.dispatch(Actions.switchRightBar(false));
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
		console.log('=======>props',this.props);
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

			<div className="tab-container" style={{minHeight:910}}>
			{/*<div className="hidden-div"  onClick={this.hiddenRight}></div>*/}
			<Title value="销控表_社区经营"/>
		 	<BreadCrumbs children={['系统运营','社区管理','销控表']}/>
				<span className="line"></span>
				 <Tabs className="tabs">
					<Tab label="销控表" onActive={this.planTable} style={tableStyle}>
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
export default connect((state) => {

	let changeValues = {};

	// changeValues.lessorId = selector(state, 'tab');
	// changeValues.openRight = state.tab;
	changeValues.openRight = state.right_bar.switch_value || false;
	console.log('-------->state',state.right_bar);
	

	return {
		changeValues
	}

})(CommunityManage);