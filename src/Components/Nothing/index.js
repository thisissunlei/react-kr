import React from 'react';
import './index.less';
export default class TableHeaderColumn extends React.Component {


	
	constructor(props){
		super(props);
	}

	
	

	render() {
        const {style} = this.props;
		return (
			<div  className="ui-nothing" style = {style}>
				<div className="icon"></div>
				<p className="tip">暂时还没有数据呦~</p>
			</div>
		);

	}
}
