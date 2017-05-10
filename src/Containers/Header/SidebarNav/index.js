import React from 'react';
import { observer, inject } from 'mobx-react';


import './index.less';
@inject("NavModel")
@observer
export default class SidebarNav extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	/*{SidebarNavDate.map((item,index)=>{
					return(

						)
				})}*/
	render() {

		const {NavModel,SidebarNavDate} = this.props;
		console.log('sidebarNavs',SidebarNavDate)
		return (
			<div className="g-sidebar-nav">
				<div className="m-sidebar-nav">
					<div className="u-sidebar-nav-title">
						<span className="icon-user"></span>
						客户管理
					</div>
					<div className="u-sidebar-navlist">
						<a href="">客户线索</a>
						<a href="">合同列表</a>
						<a href="">客户公海</a>
					</div>
				</div>
			</div>
	   );
	}
}
