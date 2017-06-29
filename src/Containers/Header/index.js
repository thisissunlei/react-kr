import React from 'react';
import { observer, inject } from 'mobx-react';
import {ListGroup,ListGroupItem,Drawer} from 'kr-ui';
import {
	TheBell
} from 'kr/PureComponents';

import SidebarNav from './SidebarNav';

import {Http} from "kr/Utils"

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
	let {Navs,NavModel}=props;
	var navs=Navs.slice(7);
	function setSidebar(){
		NavModel.setSidebar(true);
	}
	return (
		<div className="u-header-more">
			<span className="u-header-more-title">更多<span className="icon-return"></span></span>
			<div className="u-header-more-box">
				<ul className="u-header-more-list">
					{navs.map((item,index)=>{
						return(
							<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router} onClick={setSidebar} />
						)
					})}
				</ul>
			</div>
		</div>
	)
	
}


const MorePerson = ({...props})=>{
	let {person,personShow,open,logout}=props;
	return (
		<div className="u-header-more-person" onClick={personShow}>
			<span className="u-header-more-icon"></span>
			<div className={open?'u-header-person u-person-show':' u-person-hide'}>
				<div className="u-person-name"><a href=".#/permission/personalCenter">{person.nickname}</a></div>
				<div className="u-person-operation"><a  onClick={logout}>退出</a></div>
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
		NavModel.setSidebar(true);
		
	}

	componentWillUnmount(){
		window.removeEventListener("click", this.personHide, false);
	}
	setSidebar=()=>{
		const {NavModel} = this.props;
		NavModel.setSidebar(true);
	}
	openSidebar = ()=>{
		const {NavModel} = this.props;
		var navIsActive=NavModel.items.map((item,index)=>{
			return item.isActive;
		})
		var isActive=navIsActive.indexOf(true)==-1?true:false;
		if(isActive){
			NavModel.clearSidebar();
			return;
		}
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

	logout = ()=>{

		Http.request('user-logout').then(function(response) {
			window.location.href = "/new/login.html";
		}).catch(function(err) {
		
		});
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
	clearSidebar=()=>{
		const {NavModel} = this.props;
		NavModel.clearSidebar();

	}
	renderNav = (navs)=>{
		var navIsActive=navs.map((item,index)=>{
			return item.isActive;
		})
		var isActive=navIsActive.indexOf(true)==-1?true:false;
		
		return (
			<Nav> 
				<NavItem  label="首页" originUrl="./"  isActive={isActive}  onClick={this.clearSidebar} />
				{navs.map((item,index)=>(<NavItem key={index} label={item.primaryText} originUrl={item.originUrl}  isActive={item.isActive} path={item.router} isPermission={item.isPermission} onClick={this.setSidebar}/>))} 
			</Nav>

			);
	}
	
	render() {

		const {NavModel} = this.props;
		let {Isperson}=this.state;

		var  navs = NavModel.items;
		var	 person=NavModel.getUser();
		
		return (
			<div className="no-print">
				<div className="g-header-nav u-clearfix">
					<div className="u-header-sidebar" onClick={this.openSidebar}>
						<span className={NavModel.openSidebar?'u-header-sidebar-icon u-header-icon-heng':'u-header-sidebar-icon u-header-icon-shu'} ></span>
					</div>
					<div className="u-header-logo" onClick={this.clickLogo}></div>
					{this.renderNav(navs)}
					{navs.length>7?<More Navs={navs} NavModel={NavModel}/>:''}
					{NavModel.menusData.length>0?<TheBell  />:''}
					<MorePerson person={NavModel.userInfo} personShow={this.personShow} open={Isperson} logout={this.logout}/>
				</div>
				<Drawer 
						open={NavModel.openSidebar} 
						openSecondary={false} 
						openDirection="left"
						modal={false} 
						width={180} 
						drawerStyle={{zIndex:-1,width:180}} 
						contentStyle={{width:"100%",background:'rgb(57, 68, 87)',padding:0}}
					>
					<SidebarNav />
				</Drawer>
			</div>
	   );
	}
}
