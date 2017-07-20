import React from 'react';
import './index.less';

import mockData from './Data.json'

import {Tree,TreeNode }from '../Tree';

export default class SliderTree extends React.Component{
	constructor(props,context){
		super(props,context)
		
	}
	static propTypes = {
				//autoExpandParent: React.PropTypes.bool,
				//expandedKeys: React.PropTypes.array,
	}
	//勾选
	onCheck = (checkedKeys) =>{
		
	}
	//点击选择事件
	onSelect = (item) =>{
		let {onSelect} = this.props;

		onSelect && onSelect(item);
		//console.log(item);

	}
	// onExpand = () =>{
	// 	let {onExpand} = this.props;
	// 	onExpand && onExpand();
	// }
	// filterTreeNode = () =>{
	// 	let {filterTreeNode} = this.props;
	// 	filterTreeNode && filterTreeNode();
	// }
	
	animate = (node, show, done) => {
		let height = node.offsetHeight;
		return cssAnimation(node, 'collapse', {
			start() {
			if (!show) {
				node.style.height = `${node.offsetHeight}px`;
			} else {
				height = node.offsetHeight;
				node.style.height = 0;
			}
			},
			active() {
				node.style.height = `${show ? height : 0}px`;
			},
			end() {
				node.style.height = '';
			done();
			},
		});
	}


	render(){
        const {title} = this.props;
		const animation = {
			enter(node, done) {
				return this.animate(node, true, done);
			},
			leave(node, done) {
				return this.animate(node, false, done);
			},
			appear(node, done) {
				return this.animate(node, true, done);
			},
		};
		const loop = data => {
			return data.map((item) => {
				if (item.children.length !=0) {
				return (<TreeNode key={item.id} title={item.codeName} itemData={item}>
							{loop(item.children)}
						</TreeNode>);
				}
				return <TreeNode key={item.id} title={item.codeName} itemData={item} />;
			});
		};
		let treeNodes = loop(this.props.data || mockData);
		return (
            <div>
             	{/*<Tree
				 	filterTreeNode={this.filterTreeNode}
				 	autoExpandParent={this.props.autoExpandParent}
				 	expandedKeys={this.props.expandedKeys}
				    onExpand={this.onExpand}
					onCheck={this.onCheck}
					onSelect={this.onSelect}
					filterTreeNode={this.filterTreeNode}
				>
					{treeNodes}
				</Tree>*/}
				<Tree
					onCheck={this.onCheck}
					onSelect={this.onSelect}
				>
					{treeNodes}
				</Tree>
            </div>
        )
	 }
 }
