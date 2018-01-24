

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import IpAddressCheckBox from "./IpAddressCheckBox";
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

export default class IpAddressCheck  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			serialNo:'',
			fatherName : '',
		}
	}

	componentDidMount() {
		Baidu.trackEvent('智能硬件设备查询','访问');
	}

	

	

	render(){
		let {TabNum,fatherName,serialNo} = this.state;

		return(

			<div className="ip-adress-check">
				<Title value="查询重复IP"/>
				<Section title={`查询重复IP`} description="" bodyPadding="0 20px">
					<IpAddressCheckBox/>
				</Section>
				
			</div>

		);
	}
}

