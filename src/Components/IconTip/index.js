import React from 'react';
import ReactDOM from 'react-dom';
import {
	Section,
} from 'kr-ui';
import './index.less';
export default class IconTip  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

  static PropTypes = {
    /**
    *提示框的背景色边框字体都可以设置新的class
    */
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		 * 箭头和icon的class
		 */
		arrowClass:React.PropTypes.string,
		iconClass:React.PropTypes.string,
	}

  componentDidMount(){
    var height=this.icon.getBoundingClientRect().height;
		this.tip.style.top=height+8+'px';
		this.renderHover();
	}

	renderHover=()=>{

		let node = ReactDOM.findDOMNode(this.tip);
		let parent = node.parentNode;

		parent.onmouseover = function(){
			node.style.visibility = 'visible';
		}
		parent.onmouseout = function(){
			node.style.visibility = 'hidden';
		}
	}

	render(){

		let {className,children,arrowClass,iconClass,label,tipStyle}=this.props;

		var  claName=className+' ui-iconTip';
		var arrowCla=arrowClass+' ui-iconArrow';
    var iconCla=iconClass+' little-icon';
		var style = Object.assign({},tipStyle);
		

		return(

			<div className='ui-icon-wrap'>
				<span className={iconCla} ref={div=>{this.icon = div}}>{label}</span>
				<div 
					className={claName} 
					style = {style}
					ref={div=>{this.tip = div}}
					
				>
				  <span className={arrowCla}></span>
				  {children}
				</div>
			</div>
		);
	}

}
