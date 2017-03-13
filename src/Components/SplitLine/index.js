import React,{Component} from 'react';
import './index.less';

export default class SplitLine extends Component{

	render(){
		return (
			<div className="split-line">
				<span className="circle" style={this.props.style}></span>
				<span className="line"></span>
				<span className="circle" style={this.props.style}></span>

			</div>
		)
	}
}