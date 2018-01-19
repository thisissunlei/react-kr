

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import EquipmentManageBox from "./EquipmentManageBox";
import{
  Tabs,
  Tab,
  Section,
  Title,
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
			
		}
	}

	componentDidMount() {
		Baidu.trackEvent('中央控制管理','访问');
	}

	

	render(){
		let {TabNum} = this.state;
		return(

			<div className="equipment-all">
				<Title value="中央控制管理"/>
				<Section title={`网关管理`} description="" >
					<EquipmentManageBox />
				</Section>
				
			</div>

		);
	}
}

