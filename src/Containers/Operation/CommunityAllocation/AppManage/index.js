import React, { PropTypes } from 'react';
import {Http} from 'kr/Utils';
import {
	Tabs,
	Tab,
	Title,
} from 'kr-ui';
import { observer, inject } from 'mobx-react';
import './index.less';
import PostVoucher from './PostVoucher';
import DarkHouse from './DarkHouse';
@inject("NavModel")
@observer
export default class AppManage extends React.Component {


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
		var _this=this;
		const {NavModel} = this.props;
		var _this=this;
		setTimeout(function(){
			var Ifpost=NavModel.checkOperate('cluster_topic_list');
			_this.setState({
				Ifpost
			})
		},1000);
		setTimeout(function(){
			var Ifdark=NavModel.checkOperate('cluster_punish_list');
			_this.setState({
				Ifdark
			})
		},1000);
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
			<Title value="会员App禁言-氪空间后台管理系统"/>

			<Tabs className="tabs">
					
					{
					Ifpost&&(
								<Tab label="举报列表" onActive={this.personal}  style={personalStyle}>
									<PostVoucher timer={this.state.timer}/>
								</Tab>
							)
					
					}
					{
					Ifdark&&(
								<Tab label="小黑屋" onActive={this.home} style={homeStyle}>
									<DarkHouse timer={this.state.timer}/>
								</Tab>
							)
					
					}
			</Tabs>


		</div>
		);
	}
}
