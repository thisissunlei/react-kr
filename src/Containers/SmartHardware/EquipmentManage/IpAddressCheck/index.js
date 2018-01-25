

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
		Baidu.trackEvent('IP冲突检测','访问');
	}

	

	

	render(){
		let {TabNum,fatherName,serialNo} = this.state;

		return(

			<div className="ip-adress-check">
				<Title value="IP冲突检测"/>
				<Section title={`IP冲突检测`} description="" bodyPadding="0 20px">
					<IpAddressCheckBox/>
				</Section>
				
			</div>

		);
	}
}

