import React from 'react';
import { observer, inject } from 'mobx-react';
import {Http} from "kr/Utils"

import './index.less';

@inject("NavModel")
@observer
export default class SidebarNav extends React.Component {


	constructor(props,context){
		super(props, context);
		this.state = {
      sidebarNavs: []
		}
	}

	renderMenuItems=(menuItems)=>{

		return menuItems.map((item,index)=>{
			// console.log(item.type,"kkkkkkkk")
      let path = item.url || item.originUrl || `.#${item.router}`;
			if(item.type=="member"){
					
				var hostname = location.hostname;
				var port = location.port || '';
				if (port) {
					port = ":" + port;
				}
				path =  location.protocol + "//" + "memberadmin.krspace.cn" + port  +"/"+ item.router;
			}
			if(!item.target){
				return <a href={path}  className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			}else{
				return <a href={path}  target={item.target} className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			}
		})
	}

  componentDidMount() {
    const _this = this;
    Http.request('get-menu-catalog').then(function(res) {
			if (!res.length) return;
      _this.setState({
				sidebarNavs: res
      });
    }).catch(function(err) {
      console.log('err', err);
    });
  }

	render() {

		const {NavModel} = this.props;

		const {sidebarNavs} = this.state;
		const sidebarNavs2 = NavModel.sidebarNavs;
		console.log('sideNavs2', sidebarNavs2);
			return (
				<div className="g-sidebar-nav">
					<div className="m-siderbar-list">
					{sidebarNavs.map((item,index)=>{
						if(item.childList.length>0){
							return(
									<div className="m-sidebar-nav" key={index}>
										<div className="u-sidebar-nav-title">
											<span className={item.iconName} style={{color:`${item.iconColor}`}}></span>
											<span style={{paddingLeft:40}}>{item.name}</span>
										</div>
										<div className="u-sidebar-navlist">
											{this.renderMenuItems(item.childList)}
										</div>
									</div>
								)
						}else{
							return null;
						}
					})}
					</div>
				</div>
		   );


	}
}
