import React from 'react';
import './index.less';
import imgSrc from './images/nothings.png';
export default class TableHeaderColumn extends React.Component {


	
	constructor(props){
		super(props);
	}

	
	

	render() {
        const {style,iconStyle} = this.props;

		return (
			<div  className="ui-nothing" style = {style||{}}>
				<img className="img-icon" src={imgSrc} style = {iconStyle||{}} alt=""/>
				<p className="tip">暂时还没有数据呦~</p>
			</div>
		);

	}
}
