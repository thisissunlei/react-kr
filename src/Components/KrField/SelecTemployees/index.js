import React from 'react';


import SelectComponent from '../SelectComponent';

import temployees from './temployees.json';
import bloodType from './bloodType.json';
import degree from './degree.json';
import educationType from './educationType.json';
import entryResource from './entryResource.json';


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

			default:
				data=temployees;
		}
		return (

			<SelectComponent options = {data} {...other}/>

		);
	}
}
