

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import './index.less';
import FirstEquipment from "./FirstDoorManage";
import SecondDoorManage from "./SecondDoorManage";
import{
  Tabs,
  Tab,
}from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class AgingAccount  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			TabNum:1
		}
	}

	componentDidMount() {
		Baidu.trackEvent('门禁','访问');
	}

	onActiveFir=()=>{
		
		this.setState({
			TabNum : 1
		})
	}
	onActiveSec=()=>{

		this.setState({
			TabNum : 2
		})
	}

	render(){
		let {TabNum} = this.state;
		console.log("State.TabNum",this.state.TabNum);
		return(

			<div className="equipment-all">
				<Tabs>
					<Tab label="一代门禁" onActive={this.onActiveFir}>
			            {TabNum==1 &&<FirstEquipment/>}
			        </Tab>
			        <Tab label="二代门禁" onActive={this.onActiveSec}>
			            {TabNum==2 &&<SecondDoorManage />}
			        </Tab>
				</Tabs>
			</div>

		);
	}
}

