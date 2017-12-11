
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
		alignRight:React.PropTypes.bool,
		search:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,inline, search,requireBlue, alignRight,className} = this.props;

		let classNames = 'ui-form-label';

		if(inline){
			classNames+= ' inline';
		}
		if(search){
			classNames+= ' search-content';
		}
		if(requireBlue){
			classNames+=' require-blue';
		}
		if(alignRight){
			classNames+=' alignRight';
		}
		if(className){
			classNames+=` ${className}`;

		}

			return (
					<div className={classNames}>
						<label> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
					</div>
				);
	}
}
