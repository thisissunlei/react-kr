
import React,{Component} from 'react';
import './index.less';

export default class Button extends Component{

	static PropTypes = {
		children: React.PropTypes.node,
	}

	constructor(props){
		super(props);

	}

	render(){


		let {children} = this.props;

		return (
			<div className="ui-button-group">
				{children}
			</div>
		);
	}
}






