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
           sidebarNavs:props.item
		}
		this.sidebarRef = null;
		this.isDom = false;
	}

	renderMenuItems=(menuItems)=>{

		return menuItems.map((item,index)=>{
			let type = item.projectType;
			let path = item.url || item.originUrl || `.#${item.router}`;
			let label = item.name;
			if(path.indexOf('http://')!=-1 && path.indexOf('https://')!=-1){
				return  <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} href={path} >{label}</a>;
			}
			if(type=="member"){
					
				var hostname = location.hostname;
				var port = location.port || '';
				
				if (port) {
					port = ":" + port;
				}
				path =  location.protocol + "//" + "memberadmin.krspace.cn" + port  +"/"+ path;
				
			}
			// 三级跳转
			if(location.href.indexOf('new/#') !==-1 ){
						if(type === 'admin'){
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} onClick ={()=>{location.hash = path}} >{label}</a>
						}else if(type === 'vue'){
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} href={path} >{label}</a>	
						}else if(type === 'product'){
							path  = '/product/#' + path;
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} onClick ={()=>{location.hash = path}} >{label}</a>
						}else if(type==='project'){
							path  = '/project/#' + path;
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} href={path} >{label}</a>	
						}else{
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} href={path} >{label}</a>	
						}
				}else {
						if(type ==='admin'){
							path  = '/new/#' + path;
							return <a  href={path} className={item.isActive?'u-sidebar-nav-active':'curson'} >{label}</a>
						}else if(type === 'project'){
							path  = '/project/#' + path;
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} onClick ={()=>{location.hash = path}} >{label}</a>
						}else  if(type === 'product'){
							path  = '/product/#' + path;
							return <a key ={index} className={item.isActive?'u-sidebar-nav-active':'curson'} onClick ={()=>{location.hash = path}} >{label}</a>
						}else if(type ==='vue'){
							return <a href={path} className={item.isActive?'u-sidebar-nav-active':'curson'}>{label}</a>
						}else{
							return <a href={path} className={item.isActive?'u-sidebar-nav-active':'curson'}>{label}</a>
						}
				}
			// if(!item.target){
			// 	return <a href={path}  className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			// }else{
			// 	return <a href={path}  target={item.target} className={item.isActive?'u-sidebar-nav-active':''} key={index}>{item.name}</a>
			// }
		})
	}
	componentDidMount(){
		setTimeout(()=>{
			if(this.sidebarRef && !this.isDom){
				this.isDom = true;
				console.log(this.sidebarRef,"pppppp")
				this.sidebarRef.addEventListener('mousewheel',()=>{
					console.log(1111);
				})
			}
		},500)
	
	}
	componentWillUnmount(){

	}

    componentWillReceiveProps(nextProps){
		
		this.setState({
			sidebarNavs:nextProps.item
		})
	}

	render() {

		//const {NavModel,item} = this.props;
		let {sidebarNavs}=this.state;

		// const {sidebarNavs} = this.state;
		// const sidebarNavs2 = NavModel.sidebarNavs;
		// console.log(sidebarNavs,"pppppp")
		
			return (
				<div className="g-sidebar-nav">
					<div className="m-siderbar-list">
					{sidebarNavs.childList&&sidebarNavs.childList.map((item,index)=>{
						if(item.childList&&item.childList.length>0){
							return(
									<div className="m-sidebar-nav" key={index}>
										<div className="u-sidebar-nav-title">
											<span className={item.iconUrl} style={{color:`${item.iconColor}`}}></span>
											<span style={{paddingLeft:40}}>{item.name}</span>
										</div>
										<div  
											className="u-sidebar-navlist" 
											ref={(ref)=>{
												this.sidebarRef = ref;
											}}
										>
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
