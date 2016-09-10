import React from 'react';

export default class TableFooter extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}
	
	constructor(props){
		super(props);

	}

	render() {

		let {className,children} = this.props;



		return (
			<tfoot className={className}>
				{children}	
			</tfoot>

		);

	}
}







