import React, {
	Component
} from 'react';


import './index.less';


export default class FontIcon extends React.Component {

	static displayName = 'FontIcon';
	
	static PropTypes = {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		color:React.PropTypes.string,
		hoverColor:React.PropTypes.string
	}

	constructor(props) {
		super(props)
	}

	render() {
		let {className,style,color} = this.props;

		style = Object.assign({},style);

		if(color){
			style.color = color
		}
	
		return (
			<span className={className} style={style}></span>
		);

	}
}