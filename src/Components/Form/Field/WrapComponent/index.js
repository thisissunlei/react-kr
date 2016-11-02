
import React from 'react';

import FormItem from './Item';
import FormLabel from './Label';
import FormController from './Controller';

export default class  WrapComponent extends React.Component {



	static defaultProps = {
		inline:false
	}


	static PropTypes = {
		label:React.PropTypes.string,
		requireLabel:React.PropTypes.bool,
		children:React.PropTypes.node,
		wrapStyle:React.PropTypes.object,
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children,wrapStyle,style,inline,requireBlue} = this.props;

		return (
				<FormItem style={wrapStyle}>
					<FormLabel label={label}  requireLabel={requireLabel} inline={inline} requireBlue={requireBlue}/>
					<FormController style={style} inline={inline}>
						{children}
					</FormController>
				</FormItem>
			);


	}
}










