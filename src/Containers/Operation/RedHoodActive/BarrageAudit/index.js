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

import Baidu from 'kr/Utils/Baidu';

import {Http} from 'kr/Utils';

import {
	Tabs,
	Tab,
	Form,
	Title,
	Message
} from 'kr-ui';
import './index.less'
//招商线索
import AllowAudit from './AllowAudit';
//个人客户
import NoAllowAudit from './NoAllowAudit';
//签约客户
import WaitAudit from './WaitAudit';
class BarrageAudit extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			initSearch:''
		}
		this.num = 0;
	}

	componentDidMount() {
		// Store.dispatch(Actions.switchSidebarNav(true));
		// Baidu.trackEvent('客户管理-客户线索','访问');
	}
   
 

	onSetCommunity = (communityId) => {
		this.setState({
			communityId
		});
	}

	merchants = (event,num) => {
		this.num = num;
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
	signedClient = () => {
		let {
			tab,
			initSearch
		} = this.state;
		tab = 'signedClient';
		initSearch='s';
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
		let signedClientStyle=(tab == 'signedClient')? activeTab : commenTab;

		const inkBarStyle = {
			background: '＃499df1',
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>

			<Title value="后台审核"/>

			<Tabs className="tabs">
					<Tab 
					label="待审核" 
					onActive={
						(event)=>{
							this.merchants(event,0)
						}
					} 
					style={merchantsStyle}
					>

						{this.num==0 && <WaitAudit />}
					</Tab>
					<Tab 
						label="审核已通过"  
						onActive={
							(event)=>{
								this.merchants(event,1)
							}
						}  
						style={personalStyle}
					>

							{this.num==1 &&<AllowAudit />}
					</Tab>
					<Tab 
						label="审核不通过"  
						onActive={
							(event)=>{
								this.merchants(event,2)
							}
						} 
						style={signedClientStyle}
					>
							{this.num==2 &&<NoAllowAudit />}

					</Tab>
			</Tabs>


		</div>
		);
	}
}
export default BarrageAudit;
