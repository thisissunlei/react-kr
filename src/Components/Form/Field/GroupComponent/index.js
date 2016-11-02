import React from 'react';

import './index.less';
import WrapComponent from '../WrapComponent';

export default class  GroupComponent extends React.Component {


	constructor(props){
		super(props)
	}

	render(){

		let {requireLabel,label,children,style} = this.props;

			return (
				<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel}>
					{children}
				</WrapComponent>
				);
	}
}
