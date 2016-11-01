
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label} = this.props;

			return (
					<div className="ui-form-label">
						<label> {requireLabel?<span className="require-label">*</span>:null} {label}</label>		
					</div>
				);
	}
}





