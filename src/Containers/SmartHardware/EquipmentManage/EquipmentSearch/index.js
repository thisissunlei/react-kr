

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import EquipmentSearchBox from "./EquipmentSearchBox";
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

export default class EquipmentSearch  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			serialNo:'',
			fatherName : '',
		}
	}

	componentDidMount() {
		Baidu.trackEvent('智能硬件IP地址检测','访问');
	}

	

	

	render(){
		let {TabNum,fatherName,serialNo} = this.state;

		return(

			<div className="ip-adress-check">
				<Title value="设备查询"/>
				<Section title={`设备查询`} description="" bodyPadding="0 20px">
					<EquipmentSearchBox/>
				</Section>
				
			</div>

		);
	}
}

