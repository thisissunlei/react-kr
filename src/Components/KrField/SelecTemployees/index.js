import React from 'react';


import SelectComponent from '../SelectComponent';

import temployees from './temployees.json';
import bloodType from './bloodType.json';
import degree from './degree.json';
import educationType from './educationType.json';
import entryResource from './entryResource.json';
import healthyStatus from './healthyStatus.json';
import householdType from './householdType.json';
import nation from './nation.json';
import leaveType from './leaveType.json';
import maritalStatus from './maritalStatus.json';
import politicsStatus from './politicsStatus.json';
import resourceRelation from './resourceRelation.json';
import resourceStatus from './resourceStatus.json';
import resourceType from './resourceType.json';
import resourceProperty from './resourceProperty.json'
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
				data=bloodType;
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
			//民族
			case "nation":
				data=nation;
				break;
			//离职类型
			case "leaveType":
				data=leaveType;
				break;
			//婚姻状况
			case "maritalStatus":
				data=maritalStatus;
				break;
			//政治面貌
			case "politicsStatus":
				data=politicsStatus;
				break;
			//亲属关系
			case "resourceRelation":
				data=resourceRelation;
				break;
			//员工状态
			case "resourceStatus":
				data=resourceStatus;
				break;
			//员工类别
			case "resourceType":
				data=resourceType;
				break;
			//员工属性
			case "resourceProperty":
				data=resourceProperty;
				break;

			default:
				data=temployees;
		}
		return (

			<SelectComponent options = {data} {...other}/>

		);
	}
}
