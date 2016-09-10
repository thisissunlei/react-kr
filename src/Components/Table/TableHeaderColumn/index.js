import React from 'react';

export default class TableHeaderRow extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.string,
	}

	constructor(props){
		super(props);

	}

	render() {

		let {className,children} = this.props;


		return (
			<th className={className}>
				{children}	
			</th>
		);

	}
}







