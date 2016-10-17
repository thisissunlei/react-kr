import React from 'react';

export default class TabItem extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props){
		super(props);

	}


	render() {
		const {children} = this.props;
		return(
			<div className="tab-item">
				{children}
			</div>
		);
	}

}








