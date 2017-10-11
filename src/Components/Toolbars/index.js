import React from 'react';
export default class Toolbars extends React.Component{

	static displayName = 'Toolbars';

	static propTypes = {
		children: React.PropTypes.node,
	}

	constructor(props){
		super(props);
	}

	render(){

		let {children} = this.props;

		return (
			<div>
				{children}
			</div>
		);
	}
}
