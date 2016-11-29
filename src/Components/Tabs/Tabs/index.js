import React, {
	Component
} from 'react';
import {
	Tabs,
	Tab
} from 'material-ui';

import './index.less'
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

		let tabs=[];
		// console.log(children);
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}


		React.Children.forEach(children, (child,index) => {
			if (!React.isValidElement(child)) return;
			tabs.push(this.createTab(child,index));
		});

		return tabs;
	}
	createTab=(base,i)=>{
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}
		let {label,children}= base.props;
		return (
			<Tab label={label} style={commenTab} key={i}>

				{children}
			</Tab>
			)
	}
	renderLines=()=>{
		let {children} = this.props;
		let lines = children;

		console.log('children',children,children.length);
		let left = (1/children.length)*100;
		lines.forEach((item,index)=>{
			return(
				<span className="tabs-lines"></span>
			)
		})
		
	}

	render() {


		const {children}  = this.props;
		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee"
		}
		const commenTab = {
			color: '#000',
			borderBottom: "1px solid #eee"
		}

		return(
			<div className='ui-tabs'>
				{this.renderLines()}
				<Tabs className="tabs" tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative'}}>
				{this.renderTabs()}
				</Tabs>
			</div>
		);
	}
}










