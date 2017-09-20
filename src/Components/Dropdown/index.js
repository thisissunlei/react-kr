import React from 'react';

import ReactDOM from 'react-dom';

import './index.less';
export default class Tooltip extends React.Component {

	static defaultProps = {
		
	}

	static PropTypes = {
		// className: React.PropTypes.string,
		// children: React.PropTypes.node,
		// /**
		//  * place有四个参数值top,bottom,left,right
		//  */
		// place:React.PropTypes.string,
		// backgroundColor:React.PropTypes.string,
		// /**
		//  * tooltip内容的阴影，box-shadow的参数
		//  */
		// boxShadow:React.PropTypes.string,
		// /**
		//  * 与box-shadow的阴影色相同
		//  */


	}

	constructor(props){
		super(props);

		this.state={
			
		}

	}

	componentDidMount() {

	}


	render() {
		
		let {textTitle,className,wrapStyle} = this.props;
		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={wrapStyle}>
				<div>
					<span>{textTitle}</span>
					
				</div>
				<ul>
					<li>111</li>
					<li>222</li>
					<li>333</li>
					<li>444</li>
				</ul>
			</div>
		);
	}
}
