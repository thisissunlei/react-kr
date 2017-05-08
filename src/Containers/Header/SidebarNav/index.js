import React from 'react';
import { observer, inject } from 'mobx-react';

import SidebarNav from './SidebarNav';


@inject("NavModel")
@observer
export default class Header extends React.Component {

	constructor(props,context){
		super(props, context);
	}


	render() {

		const {NavModel} = this.props;

		return (
			<div>
				侧边栏
			</div>
	   );
	}
}
