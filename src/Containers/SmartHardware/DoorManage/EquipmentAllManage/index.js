

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import FirstEquipment from "../../../Operation/BasicConfig/EquipmentDefinition";
import SecondDoorManage from "./SecondDoorManage";
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
		Baidu.trackEvent('门禁','访问');
	}

	

	render(){
		let {TabNum} = this.state;
		return(

			<div className="equipment-all">
				<Title value="门禁设备管理"/>
				<Section title={`门禁管理`} description="" >
					<SecondDoorManage />
				</Section>
				
			</div>

		);
	}
}

