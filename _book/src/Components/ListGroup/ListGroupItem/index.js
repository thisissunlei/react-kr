import React from 'react';


export default class ListGroupItem extends React.Component {

	static displayName = 'ListGroupItem';

	static propTypes = {
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
			<div className="list-group-item" style={style}>
				{children}
			</div>
		);
	}
}
