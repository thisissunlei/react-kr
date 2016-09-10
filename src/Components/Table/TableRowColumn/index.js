import React from 'react';

export default class TableRowColumn extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	

	constructor(props){
		super(props);

	}


	render() {

		let {className,children,colSpan} = this.props;

			return(
				<td className={className} colSpan={colSpan}>
					{children}	
				</td>
			);


	}
}







