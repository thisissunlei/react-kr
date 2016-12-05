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
	}

	constructor(props){
		super(props);
		let node = ReactDOM.findDOMNode(this.tooltip);

	}

	render() {
		let {children} = this.props;

		return(
			<div className='ui-tooltip' ref={div=>{this.tooltip = div}}>
				{children}
			</div>
		);
	}
}
