import React from 'react';
import { observer, inject } from 'mobx-react';





const Nav = ({...props}) =>{
	return <ul {...props}></ul>
}
const NavItem = ({...props})=>{
	const {label,path} = props;
	return <li {...props}><a href={`./#/${path}`}>{label}</a></li>
};

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
					<Nav>
					{navs.map((item,index)=>(<NavItem label={item.primaryText} path={item.router}/>))}
					</Nav>
				</div>
	   );
	}
}
