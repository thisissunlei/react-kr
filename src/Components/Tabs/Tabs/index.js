import React from 'react';

import { Tabs, Tab } from 'material-ui';

import './index.less'
export default class TabsComponent extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		 * 若Tab有onActive参数值，tabName为必带参数
		 */
		tabName:React.PropTypes.string,
		onActive:React.PropTypes.func
	}

	constructor(props){
		super(props);
		this.state={
			tabName:this.props.tabName
		}

	}

	renderTabs=()=> {

		let {
			className,
			children,
			style,
			onActive
		} = this.props;

		let tabs=[];
		const commenTab = {
			color: '#333',
			borderBottom: "1px solid #eee"
		}


		React.Children.forEach(children, (child,index) => {
			if (!React.isValidElement(child)) return;
			tabs.push(this.createTab(child,index));
		});

		return tabs;
	}
	createTab=(base,i)=>{
		let _this = this;
		let  {tabName} = this.state;
		const commenTab = {
			color: '#333',
			borderBottom: "1px solid #eee",
		}
		const active = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee",
		}
		let {label,children,onActive,style}= base.props;
		if(!tabName && i===0){
			tabName = label;
		}
		if(!style){
			style =(label == tabName ? active:commenTab);
		}
		let onActives;

		if(!onActive){
			onActives = function(){
				_this.setState({tabName: label})
			}
		}else{
			onActives = function(){
				
				_this.setState({tabName: label})
				onActive && onActive();
			}

		}
			

			return (
				<Tab label={label} style={style} key={i} onActive={onActives} className={label}>
					<div className="ui-tabs-contents"> 
						{children}
					</div>
					
				</Tab>
				)
		
	}
	renderLines=()=>{
		let {children} = this.props;
		let lines = [];
		console.log('children=====>',children)
        children.map((item,index)=>{
			if(!item){
				children.splice(index,1);
			}
			return item;
		})
		let left = (1/children.length)*100;
		for(var i=0;i<=children.length;i++){
			if(i!=0){
				lines.push(left*i);
			}
		}
		lines = lines.map((item,index)=>{
			if(item != 100){
				return (
					<span className='tabs-lines' style={{marginLeft:`${item}%`}} key={index}></span>
				);
			}
			
		})
		return lines;
		
		
	}

	render() {

		let {inkBarStyle,tabItemContainerStyle,value}=this.props;
		const initInkBarStyle={background: '#499df1',position:'absolute',top:0,height:3}
		const initTabItemContainerStyle={background:'#fff',color:"#333"};

		const {children}  = this.props;
		const activeTab = {
			color: '#2b8dcd',
			borderBottom: "1px solid #eee"
		}

		const commenTab = {
			color: '#333',
			borderBottom: "1px solid #eee"
		}

		inkBarStyle=inkBarStyle?inkBarStyle:initInkBarStyle;

		tabItemContainerStyle=tabItemContainerStyle?tabItemContainerStyle:initTabItemContainerStyle;

		return(
			<div className='ui-tabs'>
				{this.renderLines()}
				<Tabs className="tabs" tabItemContainerStyle={tabItemContainerStyle} inkBarStyle={inkBarStyle} style={{background:'#fff',position:'relative',borderBottom:0}}>
				{this.renderTabs()}
				</Tabs>
			</div>
		);
	}
}
