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
import './index.less'

import ClientOrders from './ClientOrders'

class LookPersonal extends Component {
	static childContextTypes = {
		onSetCommunity: React.PropTypes.func.isRequired,
		communityId: React.PropTypes.string.isRequired,

    //clientProduct 客户订单
    //clientDetails 客户详情
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
			tab: 'clientOrders',
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


	clientDetails = () => {
		let {
			tab
		} = this.state;

		tab = 'clientDetails';
		this.setState({
			tab
		});
	}
	clientOrders = () => {
		let {
			tab
		} = this.state;

		tab = 'clientOrders';
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
      borderBottom: "1px solid #eee",
			borderTop: "1px solid #eee",
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee",
      borderTop: "1px solid #eee",
		}
		let clientDetailsStyle = (tab == 'clientDetails') ? activeTab : commenTab;
		let clientOrdersStyle = (tab == 'clientOrders') ? activeTab : commenTab;
		const inkBarStyle = {
			background: '-moz-linear-gradient(right, #03ec56, #499df1)',
			background: '-webkit-linear-gradient(right, #03ec56, #499df1)',
			background: '-ms-linear-gradient(right, #03ec56, #499df1)',
			position: 'absolute',
			top: 0,
		}

		return (
      <div className="m-LookPersonal">
          <h1>壹加众达网络科技北京有限公司</h1>
    			<div className="tab-container" style={{minHeight:910,marginTop:2}}>
    			<Title value="客户列表"/>
    				<span className="line"></span>
    				 <Tabs className="tabs">
    					<Tab label="客户订单" onActive={this.clientOrders} style={clientOrdersStyle}>
    							<ClientOrders />
    					</Tab>
    					<Tab label="客户详情" onActive={this.clientDetails} style={clientDetailsStyle}>
                  <h1>456</h1>
    					</Tab>
    			</Tabs>
    		</div>
    </div>
		);
	}
}
export default LookPersonal;
