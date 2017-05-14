

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Message,
	// Tabs,
	// Tab
	KrField,
} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

import SearchDetailForm from "./SearchDetailForm";

export default class CommunityCollect extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
				
		}
	}


	componentDidMount() {
		var _this = this;
		

		
	}

	onChangeTime=()=>{

	}

	render(){

		return(
			<div className="community-collect">
				<div className="community-collect-box">
					<div className="search-form">
						
							<SearchDetailForm/>
						
					</div>
					<div></div>
				</div>
			</div>

		);
	}
}
