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


class CustomerList extends Component {
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

	merchants = () => {
		let {
			tab
		} = this.state;
		tab = 'merchants';
		this.setState({
			tab
		});
	}

	personal = () => {
		let {
			tab
		} = this.state;

		tab = 'personal';
		this.setState({
			tab
		});
	}
	signedClient = () => {
		let {
			tab
		} = this.state;

		tab = 'signedClient';
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
			fontSize:'16px'
		}
		const commenTab = {
			color: '#666',
			borderBottom: "1px solid #eee",
            fontSize:'16px'
		}
		let merchantsStyle = (tab == 'merchants') ? activeTab : commenTab;
		let personalStyle = (tab == 'personal') ? activeTab : commenTab;
		let signedClientStyle=(tab == 'signedClient')? activeTab : commenTab;
		const inkBarStyle = {
			background: '-moz-linear-gradient(right, #03ec56, #499df1)',
			background: '-webkit-linear-gradient(right, #03ec56, #499df1)',
			background: '-ms-linear-gradient(right, #03ec56, #499df1)',
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>
			<Title value="客户列表"/>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
				<span className="line"></span>
				 <Tabs className="tabs"
				 	tabItemContainerStyle={{background:'#FFF'}}

			   		
			   		style={{
			   				background:'#fff',
			   				position:'relative',
			   				paddingLeft:'20',
			   				paddingRight:'20'
			   			}}
				 >
					<Tab label="招商线索" onActive={this.merchants} style={merchantsStyle} >
						
							<h1>1</h1>
					</Tab>
					<Tab label="个人客户"  onActive={this.personal} style={personalStyle}>
						
							<h1>2</h1>
					</Tab>
					<Tab label="签约客户"  onActive={this.signedClient} style={signedClientStyle}>
						
							<h1>3</h1>
					</Tab>
			</Tabs>


		</div>
		);
	}
}
export default CustomerList;
