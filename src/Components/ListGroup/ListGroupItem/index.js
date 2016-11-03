import React, {
	Component
} from 'react';


import './index.less';

export default class ListGroupItem extends Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style: React.PropTypes.object,
	}


	constructor(props) {
		super(props);

	}


	render() {

		let {children,style} = this.props;

		return (
			<div className="ui-list-group-item" style={style}>
				{children}	
			</div>
		);
	}
}