
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
	}

	constructor(props){
		super(props)
	}

	render(){

		let {children,style} = this.props;

			return (
					<div className="ui-form-controller" style={style}>
						{children}
					</div>
			);
	}
}





