import React from 'react';
import {mobx,toJS} from 'mobx';
import { observer, inject } from 'mobx-react';
import {ListGroup,ListGroupItem,Drawer} from 'kr-ui';

import SidebarNav from './SidebarNav';

import {Http} from "kr/Utils"

import './index.less';

const Nav = ({...props}) =>{
	return <ul className="u-header-nav" {...props}></ul>
}
//菜单组建
const NavItem = ({...props})=>{
	const {label,path,isActive,originUrl,isPermission,df} = props;

	var url=path;
	if(originUrl){
		url=originUrl;
	}else{
		url='./#/'+path;
	}
	if(location.href.indexOf('new/#') !==-1 && originUrl.indexOf('new/#') !==-1 ){
	//	if(originUrl.indexOf('new/#') !==-1){
			return <li className={isActive?'u-header-active':''} {...props}><a onClick ={()=>{location.hash=df}} >{label}</a></li>
	//	}else{
	//		return <li className={isActive?'u-header-active':''} {...props}><a href={url}>{label}</a></li>
	//	}
	}else{
	//	if(originUrl.indexOf('new/#') !==-1){
	//		return <li className={isActive?'u-header-active':''} {...props}><a href={url} >{label}</a></li>
	//	}else{
			return <li className={isActive?'u-header-active':''} {...props}><a href={url}>{label}</a></li>
//		}
	}
	
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
				<p className="u-single"></p>
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
			firstNav:[],
			secondBarNavs:[]
		}
		this.nav=[];
		const {NavModel} = this.props;
		NavModel.getUser(1);
	}
	
	componentDidMount(){
		this.getNavData();
		const {NavModel} = this.props;
		NavModel.loadNavData();	
		NavModel.getNavsData();	
	
		var  navs = NavModel.getNavs();
		window.addEventListener("click", this.personHide, false);
		NavModel.setSidebar(true);
        window.addEventListener('hashchange', this.refresh.bind(this), false);
	}
	getNavData(){
		const _this = this;
		Http.request('get-menu-catalog').then(function(res) {
			if (!res.length) return;
			let first=location.hash.split('#')[1];
			var nowData=_this.recursiveAssign(res,first);
			_this.setState({
				firstNav:nowData.allData
			})
			nowData.allData&&nowData.allData.map((item,index)=>{
				if(item.isActive){
					_this.setState({
						secondBarNavs:item
					})
				}
			})
		}).catch(function(err) {
		  console.log('err', err);
		});
	}
	//递归赋值
	recursiveAssign(data,url){
		var isOpen = false;
		var allData=data.map((item,index)=>{
			if(item.url==url){
				item.isActive=true;
				isOpen = true;  
			}else{
				item.isActive=false;
			}
			if(item.childList&&item.childList.length){
				let middle=this.recursiveAssign(item.childList,url);
				if(middle.isOpen){
					item.isActive=true;
					isOpen = true;
				}
				item.childList=middle.allData;
			}
			return item;
		})
		return  {allData:allData,isOpen:isOpen};
	}
	//route发生变化
    refresh(){
		let {firstNav}=this.state;
		let first=location.hash.split('#')[1];
		console.log('#',firstNav);
		var nowData=this.recursiveAssign(firstNav,first);
		nowData.allData&&nowData.allData.map((item,index)=>{
			if(item.isActive){
				this.setState({
					secondBarNavs:item
				})
			}
		})
	}
	componentWillUnmount(){
		window.removeEventListener("click", this.personHide, false);
	}
    
	setSidebar=(item)=>{
		this.setState({
			secondBarNavs:item
		})
		const {NavModel} = this.props;
		NavModel.setSidebar(true);
	}
	//打开侧边栏
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
	//logo点击
	clickLogo=()=> {
		window.location.href = '/#/home';
	}
	//登录信息
	personShow=()=>{
		this.setState({
			Isperson:true
		})
	}
	//退出
	logout = ()=>{
		let communityId = localStorage.getItem('OP_HOME_COMMUNITY');
		if(communityId){
			localStorage.removeItem('OP_HOME_COMMUNITY');
		}

		Http.request('user-logout').then(function(response) {
			window.location.href = "/new/login.html";
		}).catch(function(err) {
		
		});
	}
	//隐藏登录信息
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
	//清楚侧边栏
	clearSidebar=()=>{
		const {NavModel} = this.props;
		NavModel.clearSidebar();

	}
	//上边的菜单
	renderNav = (Navs)=>{
		let {firstNav}=this.state;
		// var navs=Navs.slice(0,7);
		// var navIsActive=navs.map((item,index)=>{
		// 	return item.isActive;
		// })
		// var isActive=navIsActive.indexOf(true)==-1?true:false;
        
		// navs = this.renderNavs(navs)
		// this.nav=navs;
	   
		return (
			<Nav> 
				<NavItem  label="首页" originUrl="./"    onClick={this.clearSidebar} />
				{firstNav.map((item,index)=>{
					let type='';
					if(item.childList[0].childList[0].projectType ==='admin' ){
						// if(location.href.indexOf('new') ===-1){
						 	type='/new/#'
						// }
						
					}
					
				return	(<NavItem key={index} label={item.name} df={item.childList[0].childList[0].url} originUrl={type+item.childList[0].childList[0].url}  isActive={item.isActive} path={item.router} isPermission={item.isPermission} 
						onClick={()=>{
						this.setSidebar(item)
					   }			
					}/>)
				}
				 
				
			 )} 
			</Nav>

			);
	}
	//处理数据
	renderNavs(navs){
		
		// navs = navs.map(item=>{
		// 	// item = mobx.toJS(item)
		// 	// let url = item.menuItems[0].menuItems[0].url || item.menuItems[0].menuItems[0].router || item.menuItems[0].menuItems[0].originUrl || '/./';
		// 	// item.router = url.substring(1);

		// 	return item;
		// })

		return navs
	}
	
	render() {

		const {NavModel} = this.props;
		let {Isperson,secondBarNavs}=this.state;
     
		var  navs = NavModel.items;
		var	 person=NavModel.getUser();
		console.log('nav--',secondBarNavs);
		return (
			<div className="no-print">
				<div className="g-header-nav u-clearfix">
					<div className="u-header-sidebar" onClick={this.openSidebar}>
						<span className={NavModel.openSidebar?'u-header-sidebar-icon u-header-icon-heng':'u-header-sidebar-icon u-header-icon-shu'} ></span>
					</div>
					<div className="u-header-logo" onClick={this.clickLogo}></div>
					{this.renderNav(navs)}
					{navs.length>7?<More Navs={navs} NavModel={NavModel}/>:''}
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
					<SidebarNav item={secondBarNavs}/>
				</Drawer>
			</div>
	   );
	}
}
