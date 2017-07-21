import React from 'react';


import SelectComponent from '../SelectComponent';

import temployees from './temployees.json';
import bloodType from './bloodType.json';
import degree from './degree.json';
import educationType from './educationType.json';
import entryResource from './entryResource.json';
import healthyStatus from './healthyStatus.json';
import householdType from './householdType.json';




export default class SelecTemployees extends React.Component {

render() {

		let {
			options,
			component,
			otherType,
			...other
		} = this.props;
		let data = ""
		switch(otherType){
			//星座
			case "temployees":
				data=temployees;
				break;
			//血型
			case "bloodType":
				data=temployees;
				break;
			//学士学位
			case "degree":
				data=degree;
				break;
			//学历
			case "educationType":
				data=educationType;
				break;
			//入职来源
			case "entryResource":
				data=entryResource;
				break;
			//健康状况
			case "healthyStatus":
				data=healthyStatus;
				break;
			//户口类型
			case "householdType":
				data=householdType;
				break;
			//离职类型
			case "leaveType":
				data=householdType;
				break;

			default:
				data=temployees;
		}
		return (

			<SelectComponent options = {data} {...other}/>

		);
	}
}
