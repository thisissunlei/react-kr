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
	const {label,path,isActive,originUrl,isPermission} = props;

	var url=path;
	if(originUrl){
		url=originUrl;
	}else{
		url='./#/'+path;
	}

	return <li className={isActive?'u-header-active':''} {...props}><a href={url}>{label}</a></li>
};



const More = ({...props})=>{
	let {NavModel}=props;
	var navs=NavModel.slice(8);
	return (
		<div className="u-header-more">
			<span className="u-header-more-title">更多<span className="icon-return"></span></span>
			<div className="u-header-more-box">
				<ul className="u-header-more-list">
					{navs.map((item,index)=>{
						return(
							<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router} />
						)
					})}
				</ul>
			</div>
		</div>
	)
	
}


const MorePerson = ({...props})=>{
	let {person,personShow,open}=props;
	return (
		<div className="u-header-more-person" onClick={personShow}>
			<span className="u-header-more-icon"></span>
			<div className={open?'u-header-person u-person-show':' u-person-hide'}>
				<div className="u-person-name"><a href=".#/permission/personalCenter">{person.nickname}</a></div>
				<div className="u-person-operation"><a href="./login.html">退出</a></div>
			</div>
		</div>
		)
	
}



@inject("NavModel")
@observer
export default class Header extends React.Component {

	constructor(props,context){
		super(props, context);
		this.state={
			sidebarNavs:[],
			Isperson:false,
			
		}
		const {NavModel} = this.props;
		NavModel.getUser(1);
	}

	componentDidMount(){
		const {NavModel} = this.props;
		NavModel.loadNavData();	
		var  navs = NavModel.getNavs();
		window.addEventListener("click", this.personHide, false);
	}
	componentWillUnmount(){
		window.removeEventListener("click", this.personHide, false);
	}
	
	openSidebar = ()=>{
		const {NavModel} = this.props;
		NavModel.toggleSidebar();
	}
	clickLogo=()=> {
		window.open('http://krspace.cn') 
	}
	personShow=()=>{
		this.setState({
			Isperson:true
		})
	}
	personHide=(e)=>{
		var target=e.target.className;
		if(target=="u-header-more-icon"){
			return;
		}
		let {Isperson}=this.state;
		if(Isperson){
			this.setState({
				Isperson:false
			})
		}
		
	}

	renderNav = (navs)=>{
		return 	<Nav> {navs.map((item,index)=>(<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router} isPermission={item.isPermission}/>))} </Nav>;
	}

	render() {

		const {NavModel} = this.props;
		let {Isperson}=this.state;

		var  navs = NavModel.getNavs();
		var	 person=NavModel.getUser();
		var  sidebarNavs=NavModel.getSidebarNavs();
		console.log('navs---',navs)
		
		return (
			<div className="no-print">
				<div className="g-header-nav u-clearfix">
					<div className="u-header-sidebar" onClick={this.openSidebar}>
						<span className={NavModel.openSidebar?'u-header-sidebar-icon u-header-icon-heng':'u-header-sidebar-icon u-header-icon-shu'} ></span>
					</div>
					<div className="u-header-logo" onClick={this.clickLogo}></div>
					{this.renderNav(navs)}
					{navs.length>8?<More NavModel={navs}/>:''}
					<TheBell />
					<MorePerson person={NavModel.userInfo} personShow={this.personShow} open={Isperson} />
				</div>
				<Drawer 
						open={NavModel.openSidebar} 
						openSecondary={false} 
						modal={false} 
						width={180} 
						drawerStyle={{zIndex:-1,width:180}} 
						contentStyle={{width:"100%",background:'rgb(57, 68, 87)',padding:0}}
					>
					<SidebarNav SidebarNavDate={sidebarNavs} />
				</Drawer>
			</div>
	   );
	}
}
