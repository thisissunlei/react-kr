import React from 'react';
import './index.less';
import imgSrc from './images/nothings.png';
export default class TableHeaderColumn extends React.Component {


	
	constructor(props){
		super(props);
	}

	
	

	render() {
        const {style,iconStyle,fontSize} = this.props;
		let textStyle = {};
		if(fontSize){
			textStyle.fontSize = fontSize;
		}
		

		return (
			<div  className="ui-nothing" style = {style||{}}>
				<img className="img-icon" src={imgSrc} style = {iconStyle||{}} alt=""/>
				<p className="tip" style = {textStyle}>暂时还没有数据呦~</p>
			</div>
		);

	}
}
