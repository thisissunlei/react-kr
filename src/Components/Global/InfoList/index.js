import {
	Link
} from 'react-router';

import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'react-redux';
import {
	Actions,
	Store
} from 'kr/Redux';

import Pagination from '../../Pagination';

import './index.less';

export default class InfoList extends Component {

	PropTypes = {
		items: React.PropTypes.isArray,
		current_parent: React.PropTypes.string,
		current_child: React.PropTypes.string,
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			infoTab: this.props.infoTab,
			url: '',
			readedUrl: '',
			params: {
				page: 1,
				pageSize: 20
			}
		}
	}
	onPageChange = () => {
		let {
			url,
			params
		} = this.state;
		console.log('params', params);
		let page = ++params.page;
		let pageSize = params.pageSize;
		this.getDataList(url, params);

		console.log('onPageChange', params);
		this.setState({
			params: {
				page: page,
				pageSize: pageSize
			}
		})
	}
	onClose = () => {
		let {
			onClose
		} = this.props;
		onClose && onClose();
	}
	componentWillMount() {
		this.getInfoData();
		console.log('pppppp', this.props.infoTab);

	}
	componentWillReceiveProps(next, state) {
		console.log('componentWillReceiveProps', next.infoTab, this.props.infoTab);
		if (next.infoTab != this.props.infoTab) {
			this.setState({
				infoTab: next.infoTab
			}, function() {
				console.log('next.infoTab', next.infoTab, this.state.infoTab);
				this.getInfoData();
			})

		}
		// console.log('pppppp');

	}

	getInfoData = () => {
		let {
			infoTab
		} = this.state;
		console.log('getInfoData', infoTab);
		if (!infoTab) {
			return;
		}
		if (infoTab == 'community') {
			this.getDataList('getInfoList', {
				page: 1,
				pageSize: 20
			});
			this.setState({
					url: 'getInfoList',
					readedUrl: 'setInfoReaded'
				})
				// alert('community');
			console.log('community');

		}
		// if(infoTab == 'member'){
		// 	this.setState({
		// 		url:'2222',
		// 		readedUrl:'2222'
		// 	})
		// 	// alert('member');
		// }
		this.setState({
			url: '',
			readedUrl: ''
		})
	}
	getDataList = (url, params) => {
		Store.dispatch(Actions.callAPI(url, params)).then(function(response) {
			console.log('ddd');
		}).catch(function(err) {
			console.log(err);
		});
	}
	readed(item) {
		console.log('item', item);
		let {
			readedUrl
		} = this.state;
		Store.dispatch(Actions.callAPI(readedUrl, {
			id: item.id
		})).then(function(response) {
			console.log('ddd');
		}).catch(function(err) {
			console.log(err);
		});
	}

	render() {
		let pagination = 10;
		let totalCount = 100;
		let pageSize = 10;
		let page = 1;
		let infoList = [{
			info: '123',
			date: '20124616',
			id: 1
		}, {
			info: '123',
			date: '20124616',
			id: 9
		}, {
			info: '123',
			date: '20124616',
			id: 8
		}, {
			info: '123',
			date: '20124616',
			id: 6
		}, ]
		let {
			infoTab
		} = this.props;
		let height = document.body.clientHeight - 180;
		if (!pagination) {
			return null;
		}
		return (
			<div className="ui-info-list">
				<div style={{
        			padding: '36px 30px',
       				minHeight: height
      			}}>
					<span className="close-info icon-close" onClick={this.onClose}></span>
					<p style={{
        				marginBottom: 30
      				}}>
					<span className="icon-info ui-m-info-logo"></span>
					<span className="ui-m-info-title">合同到期信息提醒 :</span>
					</p>
					{infoList.map((item, index) => {
        return (
          	<p className="ui-m-info-content" key={index}>
				<span className="ui-m-info-contents" onClick={this.readed.bind(this, item)}>{item.info}</span>
				<span className="ui-m-info-date">{item.date}</span>
			</p>
        )
      })}
				</div> < div style = {
				{
					paddingRight: '15px'
				}
			} >
			<Pagination totalCount={totalCount} page={page} pageSize={pageSize} onPageChange={this.onPageChange} pageJump={3}/> < /div> < /div >
		);
	}

}