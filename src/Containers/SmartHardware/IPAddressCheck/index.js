

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import IPAddressCheckBox from "./IPAddressCheckBox";
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

export default class IPAddressCheck  extends React.Component{

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
				<Title value="IP地址查询"/>
				<Section title={`   `} description="" bodyPadding="0 20px">
					<IPAddressCheckBox/>
				</Section>
				
			</div>

		);
	}
}

