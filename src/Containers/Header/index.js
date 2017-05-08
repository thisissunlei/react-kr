import React from 'react';
import { observer, inject } from 'mobx-react';


import {ListGroup,ListGroupItem,Drawer} from 'kr-ui';


import SidebarNav from './SidebarNav';


const Nav = ({...props}) =>{
	return <ul {...props}></ul>
}
const NavItem = ({...props})=>{
	const {label,path} = props;
	return <li {...props}><a href={`./#/${path}`}>{label}</a></li>
};



const More = ({...props})=>{
	return <span></span>
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

	render() {


		const {NavModel} = this.props;

		const navs = NavModel.getNavs();

		return (
			<div>
				<div className="g-header-nav">
					<h3 onClick={this.openSidebar}>侧边栏</h3>
					<Nav> {navs.map((item,index)=>(<NavItem label={item.primaryText} path={item.router}/>))} </Nav>
					<More />
				</div>
				<Drawer open={NavModel.openSidebar} openSecondary={false} modal={false}>
					<SidebarNav/>
				</Drawer>
			</div>
	   );
	}
}
