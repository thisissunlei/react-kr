

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import Baidu from 'kr/Utils/Baidu';
import {Http} from 'kr/Utils';
import PrinterManage from "./PrinterManage";

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
		Baidu.trackEvent('打印机设备管理','访问');
	}

	

	render(){
		let {TabNum} = this.state;
		return(

			<div className="equipment-all">
				<Title value="打印机管理-氪空间后台管理系统"/>
				<Section title={`打印机管理`} description="" >
					<PrinterManage />
				</Section>
				
			</div>

		);
	}
}

