import React from 'react';
import { Field, reduxForm } from 'redux-form';


export default class Format extends React.Component {


	static PropTypes = {
		timestamp:React.PropTypes.string
	};

	render() {

		let {className,timestamp} = this.props;


		return (
			<span>{timestamp}</span>
		);


	}


}







