import React from 'react';
import { Field, reduxForm } from 'redux-form';

import dateFormat from 'dateformat';


export default class Format extends React.Component {


	static PropTypes = {
		value:React.PropTypes.string,
		format:React.PropTypes.string
	};

	render() {

		let {className,value,format="yyyy-mm-dd"} = this.props;

		const result =  dateFormat(value,format);

		return (
			<span>{result}</span>
		);


	}


}







