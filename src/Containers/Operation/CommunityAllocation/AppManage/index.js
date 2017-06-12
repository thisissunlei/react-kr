import React, { PropTypes } from 'react';
import {
	Tabs,
	Tab,
	Title,
} from 'kr-ui';
import './index.less';
import GroupManages from './GroupManages';

export default class AppManage extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			initSearch:''
		}
	
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
	home = () => {
		let {
			tab,
			initSearch
		} = this.state;
		tab = 'home';
		initSearch='h';
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
		let homeStyle = (tab == 'home') ? activeTab : commenTab;

		const inkBarStyle = {
			background: '＃499df1',
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>
			<Title value="App后台"/>

			<Tabs className="tabs">
					<Tab label="群组管理" onActive={this.merchants} style={merchantsStyle}>
						<GroupManages />
					</Tab>
					<Tab label="帖子审核" onActive={this.personal}  style={personalStyle}>

							
					</Tab>
					<Tab label="小黑屋" onActive={this.home}  style={homeStyle}>

							
					</Tab>
			</Tabs>


		</div>
		);
	}
}

