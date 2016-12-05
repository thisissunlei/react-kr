import React, {
	Component
} from 'react';

import $ from 'jquery';
import {
	FontIcon,
} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
export default class Tooltip extends Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		place:React.PropTypes.string,
		tipName:React.PropTypes.string,
	}

	constructor(props){
		super(props);
		this.state={
			width:0,
			height:0
		}

	}
	componentDidMount() {
		this.renderHover();
	}
	renderHover=()=>{
		let {tipName} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		parent.style.position = "relative";
		parent.onmouseover = function(){
			node.style.visibility = 'visible';
		}
		parent.onmouseout = function(){
			node.style.visibility = 'hidden';
		}
		this.setState({
			width:node.offsetWidth,
			height:node.offsetHeight
		})
	}

	render() {
		let {children,place} = this.props;
		let {width,height} = this.state;
		let className = 'ui-tooltip';
		let arrowName = '';
		let style = {};
		if(place === 'top' || place==='bottom'){
			className+=' center';
		}
		if(place === 'right' || place==='left'){
			className+=' height';
		}
		if(place === 'right'){
			style.right = '-'+ (width-5)+'px';
			arrowName = 'right-arrow';
		}
		if(place === 'left'){
			style.left = '-'+ (width-5)+'px';
			arrowName = 'left-arrow';
		}
		if(place === 'top'){
			style.top = '-'+(height-5)+'px';
			arrowName = 'top-arrow';
		}
		if(place === 'bottom'){
			style.bottom = '-'+(height-5)+'px';
			arrowName = 'bottom-arrows';
		}
		
		

		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={style}>
				<span className={arrowName}></span>
				{children}
			</div>
		);
	}
}
