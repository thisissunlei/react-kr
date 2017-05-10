import React from 'react';
import { observer, inject } from 'mobx-react';


import './index.less';
@inject("NavModel")
@observer
export default class SidebarNav extends React.Component {

	constructor(props,context){
		super(props, context);
	}
	
	renderMenuItems=(menuItems)=>{

		return menuItems.map((item,index)=>{
			var path=item.originUrl?item.originUrl:`.#${item.router}`
			console.log('item------',item)
			return(
					<a href={path}  className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.primaryText}</a>
				)
		})
	}
	
	render() {

		const {NavModel,SidebarNavDate} = this.props;
		console.log('sidebarNavs',SidebarNavDate)
			return (
				<div className="g-sidebar-nav">
					{SidebarNavDate.map((item,index)=>{
						return(
								<div className="m-sidebar-nav" key={index}>
									<div className="u-sidebar-nav-title">
										<span className={item.iconName} style={{color:`${item.iconColor}`}}></span>
										{item.primaryText}
									</div>
									<div className="u-sidebar-navlist">
										{this.renderMenuItems(item.menuItems)}
									</div>
								</div>
							)
					})}
					
				</div>
		   );

		
	}
}
