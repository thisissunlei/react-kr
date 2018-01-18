

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
			serialNo:'',
			fatherName : '',
		}
	}

	componentDidMount() {
		Baidu.trackEvent('中央控制子设备管理','访问');
		this.getUrlParam();
	}

	getUrlParam=()=>{
		var hashStr = window.location.hash;
		var hashArr = hashStr.split("/");
		var param = hashArr[4]
		console.log(" hashArr[5]", hashArr[5]);
		this.setState({
			serialNo : hashArr[5],
			fatherName : hashArr[6]
		})
		return param
	}

	

	render(){
		let {TabNum,fatherName,serialNo} = this.state;
		console.log("fatherName",serialNo,fatherName,decodeURIComponent(fatherName));

		return(

			<div className="equipment-all">
				<Title value="中央控制子设备管理"/>
				<Section title={`   `} description="">
					<EquipmentManageBox />
				</Section>
				
			</div>

		);
	}
}

