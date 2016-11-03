import React, {
	Component
} from 'react';

import './index.less';

export default class ListGroup extends Component {

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props) {
		super(props);

	}


	render() {

		let {children} = this.props;

		return (
			<div className="ui-list-group">
				{children}
			</div>
		);
	}
}