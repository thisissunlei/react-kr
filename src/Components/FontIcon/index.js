import React, {
	Component
} from 'react';


import './index.less';


export default class FontIcon extends React.Component {

	static PropTypes = {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		color:React.PropTypes.string

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