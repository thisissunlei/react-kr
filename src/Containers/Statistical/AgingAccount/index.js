

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
			isLeft:true
		}
	}


	componentDidMount() {
		var _this = this;
		
	}

	leftActive=()=>{
		this.setState({
			isLeft:true
		})
	}

	rightActive=()=>{
		
		this.setState({
			isLeft:false
		})
	}

	render(){
		let {isLeft}=this.state;
		return(
			<div className="aging-account">
				<Tabs>
					<Tab label="社区汇总" onActive={this.leftActive}>
						<CommunityCollect isLeftProps={isLeft}/>
					</Tab>
					<Tab label="社区明细" onActive={this.rightActive}>
						<CommunityDetail isLeftProps={isLeft}/>
					</Tab>

				</Tabs>
			</div>

		);
	}
}
