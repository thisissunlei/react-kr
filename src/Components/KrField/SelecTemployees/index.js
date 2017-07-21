import React from 'react';


import SelectComponent from '../SelectComponent';

import temployees from './temployees.json'
import bloodType from './bloodType.json'

export default class SelecTemployees extends React.Component {

render() {

		let {
			options,
			component,
			otherType,
			...other
		} = this.props;
		let data = ""
		switch(otherType)
		{
			case "temployees":
				data=temployees;
				break;
			case "bloodType":
				data=temployees;
				break;
			default:
				data=temployees;
		}
		return (

			<SelectComponent options = {data} {...other}/>

		);
	}
}
