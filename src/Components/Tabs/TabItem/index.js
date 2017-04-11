import React from 'react';
import {
	Tab
} from 'material-ui';

export default class TabItem extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		label:React.PropTypes.string,
	}

	constructor(props){
		super(props);

	}


	render() {
		const {children,label,icon} = this.props;
		return(
				<Tab label={label} icon = {icon}>
				{children}
				</Tab>
		);
	}

}
