import React from 'react';
import { Field, reduxForm } from 'redux-form';

import dateFormat from 'dateformat';


export default class Format extends React.Component {

	static displayName = 'Format';
	
	static defaultProps = {
		format:'yyyy-mm-dd',
	}

	static PropTypes = {
		value:React.PropTypes.string,
		format:React.PropTypes.string
	};

	render() {

		let {className,value,format} = this.props;
		if(!value){
			return (<span>无</span>);
		}

		let result = '';

		try{
			result =  dateFormat(value,format);
		}catch(err){
			let time=new Date(value*1)
			result = dateFormat(time,"yyyy-mm-dd");
		}

		return (
			<span>{result}</span>
		);

	}
}







