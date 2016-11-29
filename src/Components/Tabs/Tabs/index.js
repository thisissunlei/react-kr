import React, {
	Component
} from 'react';
import {
	Tabs
} from 'material-ui';
import TabItem from '../TabItem'

export default class TabsComponent extends Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	constructor(props){
		super(props);

	}

	renderTabs=()=> {

		let {
			className,
			children,
			style
		} = this.props;

		let tabs;
		console.log(children);


		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			tabs = this.createTab(child);
		});

		return tabs;
	}
	createTab=(base)=>{
		console.log('base',base.props);
		let {label,child}= base.props;
		return (
			<TabItem label={label}>
				{child}
			</TabItem>
			)
	}

	render() {


		const {children}  = this.props;
		this.renderTabs();
		// 
		// 
		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee"
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}

		return(
			<div>
				<Tabs className="tabs" tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative'}}>
				{this.renderTabs()}
				</Tabs>
			</div>
		);
	}
}










