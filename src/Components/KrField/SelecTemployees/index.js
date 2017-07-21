import React from 'react';


import SelectComponent from '../SelectComponent';

import temployees from './temployees.json';
import bloodType from './bloodType.json';
import degree from './degree.json';
import educationType from './educationType.json';
import entryResource from './entryResource.json';
import healthyStatus from './healthyStatus.json';
import householdType from './householdType.json';
<<<<<<< HEAD
import leaveType from './leaveType.json';
import maritalStatus from './maritalStatus.json';
import nation from './nation.json';
import politicsStatus from './politicsStatus.json';
import resourceRelation from './resourceRelation.json';
=======

import nation from './nation.json';
import leaveType from './leaveType.json';
import maritalStatus from './maritalStatus.json';
import politicsStatus from './politicsStatus.json';
import resourceRelation from './resourceRelation.json';
import resourceStatus from './resourceStatus.json';
import resourceType from './resourceType.json';




>>>>>>> b3fe1b45dc8dc6546fb7eaffd8b2c9f1bd03713c

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
<<<<<<< HEAD
=======
			//民族
			case "nation":
				data=nation;
				break;
>>>>>>> b3fe1b45dc8dc6546fb7eaffd8b2c9f1bd03713c
			//离职类型
			case "leaveType":
				data=leaveType;
				break;
			//婚姻状况
			case "maritalStatus":
				data=maritalStatus;
				break;
<<<<<<< HEAD
			//民族
			case "nation":
				data=nation;
				break;
=======
>>>>>>> b3fe1b45dc8dc6546fb7eaffd8b2c9f1bd03713c
			//政治面貌
			case "politicsStatus":
				data=politicsStatus;
				break;
<<<<<<< HEAD
			case "resourceRelation":
				data=resourceRelation;
				break;

=======
			//亲属关系
			case "resourceRelation":
				data=resourceRelation;
				break;
			//员工属性
			case "resourceStatus":
				data=resourceStatus;
				break;
			//员工类别
			case "resourceType":
				data=resourceType;
				break;
>>>>>>> b3fe1b45dc8dc6546fb7eaffd8b2c9f1bd03713c

			default:
				data=temployees;
		}
		return (

			<SelectComponent options = {data} {...other}/>

		);
	}
}
