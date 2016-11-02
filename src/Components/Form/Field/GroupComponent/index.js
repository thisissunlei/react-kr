import React from 'react';

import './index.less';
import WrapComponent from '../WrapComponent';

export default class  GroupComponent extends React.Component {

	static PropTypes = {
		inline:React.PropTypes.bool
	}

	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children,style,inline} = this.props;

			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
					{children}
				</WrapComponent>
				);
	}
}
