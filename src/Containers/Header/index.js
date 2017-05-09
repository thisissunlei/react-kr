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
	const {label,path} = props;
	return <li {...props}><a href={`./#${path}`}>{label}</a></li>
};



const More = ({...props})=>{
	return <span className="u-header-more">更多</span>
}


const MorePerson = ({...props})=>{
	return <span className="u-header-more-person"></span>
}


@inject("NavModel")
@observer
export default class Header extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	openSidebar = ()=>{
		const {NavModel} = this.props;
		NavModel.toggleSidebar();
	}
	clickLogo() {
		window.location.href = 'http://krspace.cn';
	}

	render() {


		const {NavModel} = this.props;

		var  navs = NavModel.getNavs();
		
		return (
			<div>
				<div className="g-header-nav">
					<div className="u-header-sidebar" onClick={this.openSidebar}>
						<span className={NavModel.openSidebar?'u-header-sidebar-icon u-header-icon-heng':'u-header-sidebar-icon u-header-icon-shu'} ></span>
					</div>
					<div className="u-header-logo" onClick={this.clickLogo}></div>
					<Nav> {navs.map((item,index)=>(<NavItem label={item.primaryText} path={item.router}/>))} </Nav>
					<More />
					<TheBell />
					<MorePerson />
				</div>
				<Drawer 
						open={NavModel.openSidebar} 
						openSecondary={false} 
						modal={false}
						width={200}
				>
					<SidebarNav/>
				</Drawer>
			</div>
	   );
	}
}
