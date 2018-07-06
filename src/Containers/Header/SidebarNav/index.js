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
			let type = item.projectType;
			let path = item.url || item.originUrl || `.#${item.router}`;
			let label = item.name;
			if(item.type=="member"){
					
				var hostname = location.hostname;
				var port = location.port || '';
				if (port) {
					port = ":" + port;
				}
				path =  location.protocol + "//" + "memberadmintest03.krspace.cn" + port  +"/"+ item.router;
			}
			// 三级跳转
			if(location.href.indexOf('new/#') !==-1 ){
						if(type === 'admin'){
							return <a key ={index}  onClick ={()=>{location.hash = path}} >{label}</a>
						}else if(type === 'vue'){
							return <a key ={index}  href={path} >{label}</a>	
						}
				}else{
						if(type ==='admin'){
							path  = '/new/#' + path;
							return <a href={path}>{label}</a>
						}else if(type ==='vue'){
							return <a href={path}>{label}</a>
						}
				}
			// if(!item.target){
			// 	return <a href={path}  className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			// }else{
			// 	return <a href={path}  target={item.target} className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			// }
		})
	}

  componentDidMount() {
    const _this = this;
    // Http.request('get-menu-catalog').then(function(res) {
		// 	if (!res.length) return;
		// 	console.log(res,1111);
    //   _this.setState({
		// 		sidebarNavs: res
    //   });
    // }).catch(function(err) {
    //   console.log('err', err);
    // });
  }

	render() {

		const {NavModel,item} = this.props;

		const {sidebarNavs} = this.state;
		const sidebarNavs2 = NavModel.sidebarNavs;
		console.log('item--',item);
		
			return (
				<div className="g-sidebar-nav">
					<div className="m-siderbar-list">
					{item.childList&&item.childList.map((item,index)=>{
						if(item.childList&&item.childList.length>0){
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
