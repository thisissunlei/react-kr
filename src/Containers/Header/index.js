import React from 'react';
import { observer, inject } from 'mobx-react';
import {ListGroup,ListGroupItem,Drawer} from 'kr-ui';
import {
	TheBell
} from 'kr/PureComponents';

import SidebarNav from './SidebarNav';
import './index.less';

const Nav = ({...props}) =>{
	return <ul className="u-header-nav" {...props}></ul>
}
const NavItem = ({...props})=>{
	const {label,path,isActive,originUrl} = props;
	var url=path;
	var index=path.indexOf('/');
	if(index==0){
		url=path.substr(1,path.length-1);
	}
	if(originUrl){
		url=originUrl.substr(1,originUrl.length-1);
		if(/#/.test(originUrl)){
			url=originUrl.substr(2,originUrl.length-2);
		}
	}
	return <li className={isActive?'u-header-active':''} {...props}><a href={`.#/${url}`}>{label}</a></li>
};



const More = ({...props})=>{
	let {NavModel}=props;
	var navs=NavModel.slice(8);
	return (
		<div className="u-header-more">
			<span className="u-header-more-title">更多<span className="icon-return"></span></span>
			<ul className="u-header-more-list">
				{navs.map((item,index)=>{
					return(
						<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router}/>
					)
				})}
			</ul>
		</div>
	)
	
}


const MorePerson = ({...props})=>{
	return <span className="u-header-more-person"></span>
}


@inject("NavModel")
@observer
export default class Header extends React.Component {

	constructor(props,context){
		super(props, context);
		this.state={
			sidebarNavs:[],
		}
	}
	componentDidMount() {
		
	}

		
	openSidebar = ()=>{
		const {NavModel} = this.props;
		NavModel.toggleSidebar();
	}
	clickLogo() {
		window.open('http://krspace.cn') 
	}

	render() {
		const {NavModel} = this.props;
		var  navs = NavModel.getNavs();
		var  sidebarNavs=NavModel.getSidebarNavs();
		console.log('sidebarNavs---')
		return (
			<div className="no-print">
				<div className="g-header-nav">
					<div className="u-header-sidebar" onClick={this.openSidebar}>
						<span className={NavModel.openSidebar?'u-header-sidebar-icon u-header-icon-heng':'u-header-sidebar-icon u-header-icon-shu'} ></span>
					</div>
					<div className="u-header-logo" onClick={this.clickLogo}></div>
					<Nav> {NavModel.items.map((item,index)=>(<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router}/>))} </Nav>
					<More NavModel={NavModel.items}/>
					<TheBell />
					<MorePerson />
				</div>
				<Drawer 
						open={NavModel.openSidebar} 
						openSecondary={false} 
						modal={false} 
						width={180} 
						drawerStyle={{zIndex:-1}} 
						contentStyle={{width:"100%",background:'rgb(57, 68, 87)',padding:0}}
					>
					<SidebarNav SidebarNavDate={NavModel.sidebarNavs} />
				</Drawer>
			</div>
	   );
	}
}
