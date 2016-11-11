
import React from 'react';

import './index.less';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
		inline:React.PropTypes.bool,
		alignRight:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {children,style,inline,simple, alignRight} = this.props;

		let className = 'ui-form-controller';
		
		if(inline){
			className+= ' inline';
		}
		if(simple){
			className+=' simple';
		}
		if(alignRight){
			className+=' alignRight';
		}

			return (
					<div className={className} style={style}>
						{children}
					</div>
			);
	}
}





