

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	// Tabs,
	// Tab
} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

export default class CommunityDetail  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
				
		}
	}


	componentDidMount() {
		var _this = this;
		

		
	}

	render(){

		return(
			<div className="community-collect">
				社区明细
			</div>

		);
	}
}
