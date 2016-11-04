import React from 'react';
import { Field, reduxForm } from 'redux-form';

import dateFormat from 'dateformat';


export default class Format extends React.Component {


	static defaultProps = {
		format:'yyyy-mm-dd',
	}

	static PropTypes = {
		value:React.PropTypes.string,
		format:React.PropTypes.string
	};

	render() {

		let {className,value,format} = this.props;

		return (
			<span>{dateFormat(value,format)}</span>
		);
	}
}







