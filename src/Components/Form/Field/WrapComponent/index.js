
import React from 'react';

import FormItem from './Item';
import FormLabel from './Label';
import FormController from './Controller';

export default class  WrapComponent extends React.Component {

	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children,wrapStyle,style} = this.props;

		return (
				<FormItem style={wrapStyle}>
					<FormLabel label={label}  requireLabel={requireLabel}/>
					<FormController style={style}>
						{children}
					</FormController>
				</FormItem>
			);


	}
}










