
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,inline} = this.props;

		let className = 'ui-form-label';
		
		if(inline){
			className+= ' inline';
		}

			return (
					<div className={className}>
						<label> {requireLabel?<span className="require-label">*</span>:null} {label}</label>		
					</div>
				);
	}
}





