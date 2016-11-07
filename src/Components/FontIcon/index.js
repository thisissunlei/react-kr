import React, {
	Component
} from 'react';


import './index.less';


export default class FontIcon extends React.Component {

	static PropTypes = {
		className: React.PropTypes.string,
		style: React.PropTypes.object,

	}

	constructor(props) {
		super(props)
	}

	render() {
		let {className,style} = this.props;
	
		return (
			<span className={className} style={style}></span>
		);

	}
}