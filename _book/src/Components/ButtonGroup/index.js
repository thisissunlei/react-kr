import React from 'react';

import './index.less';
export default class ButtonGroup extends React.Component{

	static displayName = 'ButtonGroup';

	static propTypes = {
		children: React.PropTypes.node,
		style: React.PropTypes.number,
	}

	constructor(props){
		super(props);
	}

	render(){

		let {children,style} = this.props;

		return (
			<div className="ui-button-group" style={style}>
				{children}
			</div>
		);
	}
}
