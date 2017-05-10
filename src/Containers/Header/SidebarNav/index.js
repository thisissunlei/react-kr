import React from 'react';
import { observer, inject } from 'mobx-react';


import './index.less';
@inject("NavModel")
@observer
export default class SidebarNav extends React.Component {
    static PropTypes = {
        SidebarNavDate: React.PropTypes.array
       
    };
	constructor(props,context){
		super(props, context);
		this.state={
			SidebarNavDate:[],
		}
	}
	componentWillReceiveProps(nextProps) {
        this.setState({
        	SidebarNavDate: nextProps.SidebarNavDate
        });
    }
	renderMenuItems=(menuItems)=>{

		return menuItems.map((item,index)=>{
			var path=item.originUrl?item.originUrl:`.#${item.router}`;
			return(
					<a href={path}  className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.primaryText}</a>
				)
		})
	}
	
	render() {

		const {NavModel} = this.props;
		let {SidebarNavDate}=this.state;
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
