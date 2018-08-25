import React from 'react'; 
import { observer, inject } from 'mobx-react';


import './index.less';

@inject("NavModel")
@observer
export default class Footer extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	render() {


		const {NavModel} = this.props;

		var containerStyles = {};
		if(NavModel.openSidebar){
			containerStyles = {
				marginLeft:180,
			}
		}

		return (
			<div className="g-footer no-print" style={containerStyles}>
				{/* | 京公网安备11010802012285号 */}
				<p> © 2011-2018 氪空间(北京)信息技术有限公司 | 京ICP备16012805号   </p>
			</div>
		);

	}



}