import React from 'react';
import { Field, reduxForm } from 'redux-form';

import './index.less';


export default class KrField extends React.Component {


	PropTypes = {
		text: React.PropTypes.string,
		label: React.PropTypes.string,
	};

	render() {

		let {className,type,text,label} = this.props;


		return (

			 <div className="label-item">
    <label className="form-label">{label}:</label>
    <div className="form-main">
		<div className="form-input-main">
			<div className="form-input">
				<span className="text">{text}</span>
			</div>
		</div>
    </div>
  </div>

		);


	}


}
















