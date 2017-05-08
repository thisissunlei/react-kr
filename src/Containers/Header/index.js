import React from 'react';
import { observer, inject } from 'mobx-react';


import {ListGroup,ListGroupItem} from 'kr-ui';


const Nav = ({...props}) =>{
	return <ul {...props}></ul>
}
const NavItem = ({...props})=>{
	const {label,path} = props;
	return <li {...props}><a href={`./#/${path}`}>{label}</a></li>
};


const SidebarNav = ({...props})=>{
	return <span></span>
}
const More = ({...props})=>{
	return <span></span>
}


@inject("NavModel")
@observer
export default class Header extends React.Component {

	constructor(props,context){
		super(props, context);
	}

	render() {


		const {NavModel} = this.props;

		const navs = NavModel.getNavs();

		return (
			<div>
				<SidebarNav/>
				<Nav> {navs.map((item,index)=>(<NavItem label={item.primaryText} path={item.router}/>))} </Nav>
				<More />
			</div>
	   );
	}
}
