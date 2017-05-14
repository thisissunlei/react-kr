

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	Tabs,
	Tab
} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

import CommunityCollect from "./CommunityCollect";
import CommunityDetail from "./CommunityDetail";

export default class AgingAccount  extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
				
		}
	}


	componentDidMount() {
		var _this = this;
		// Http.request('get-my-groups').then(function(response) {
		   
		// }).catch(function(err) {
		// 	Message.error(err);
		// });

		
	}

	render(){

		



		return(
			<div className="aging-account">
				<Tabs>
					<Tab label="社区汇总">
						<CommunityCollect/>
					</Tab>
					<Tab label="社区明细">
						<CommunityDetail/>
					</Tab>

				</Tabs>
			</div>

		);
	}
}
