import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import {
	Tabs,
	Tab,
	Title,
} from 'kr-ui';
//vimport './index.less';
import Start from './Operations';
import BannerConfig from './OpCode';

export default class AdvertManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			tab: 'table',
			communityId: '',
			initSearch:'',
			Ifpost:false,
			Ifdark:false,
			timer:0
		}

	}

	componentDidMount() {
		
	}

	

	personal = () => {
		let {
			tab,
			initSearch
		} = this.state;
		var timer = new Date();
		tab = 'personal';
		initSearch='p';
		this.setState({
			tab,
			initSearch,
			timer:timer,
		});
	}
	home = () => {
		let {
			tab,
			initSearch
		} = this.state;
		var timer = new Date();
		tab = 'home';
		initSearch='h';
		this.setState({
			tab,
			initSearch,
			timer:timer,
		});
	}
	render() {
		let {
			tab,
			initSearch,
			Ifpost,
			Ifdark
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

		let personalStyle = (tab == 'personal') ? activeTab : commenTab;
		let homeStyle = (tab == 'home') ? activeTab : commenTab;

		const inkBarStyle = {
			background: '＃499df1',
			position: 'absolute',
			top: 0,
		}

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>
			<Title value="广告-氪空间后台管理系统"/>

			<Tabs className="tabs">
				<Tab label="操作项" onActive={this.personal}  style={personalStyle}>
					<Start timer={this.state.timer}/>
				</Tab>
	
				<Tab label="业务代码" onActive={this.home} style={homeStyle}>
					<BannerConfig timer={this.state.timer}/>
				</Tab>	
			</Tabs>


		</div>
		);
	}
}
