import React from 'react';
import {Http} from 'kr/Utils';
import {
	Title,
} from 'kr-ui';
import { observer, inject } from 'mobx-react';
import './index.less';
// @inject("NavModel")
// @observer
export default class NoticeManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			timer:0
		}

	}

	componentDidMount() {
		var _this=this;
		
		
	}

	
	render() {
		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>
			<Title value="App后台"/>

			


		</div>
		);
	}
}
