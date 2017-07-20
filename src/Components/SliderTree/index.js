import React from 'react';
import './index.less';
import {
	Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
import mockData from './Data.json'

import {Tree,TreeNode }from '../Tree';

export default class SliderTree extends React.Component{
	constructor(props,context){
		super(props,context)
		this.state = {
			treeData:[],
			inputValue:'游戏',
			expandedKeys:[],
			autoExpandParent: true,
		}
		this.getTreeData();
		 this.filterKeys = undefined;

	}
	//勾选
	onCheck = (checkedKeys) =>{

	}
	//点击选择事件
	onSelect = (item) =>{
		let {onSelect} = this.props;
		onSelect && onSelect(item);
	}
	getTreeData = () =>{
		let {ajaxUrlName,params} = this.props;
		params = params||{};
		const _this = this;
		Http.request(ajaxUrlName,params).then(function(response) {
			console.log([response],">>>>>>>");
			_this.setState({
				treeData:[response],
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	// filterTreeNode = (treeNode) => {
	// 	console.log(treeNode.props.title);
	// 	// 根据 key 进行搜索，可以根据其他数据，如 value
	// 	return this.filterFn(treeNode.props.title);
	// }

	// filterFn = (key) => {
	// 	if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
	// 	return true;
	// 	}
	// 	return false;
	// }

	render(){
      const {title,type} = this.props;
		const {treeData} = this.state;

		const loop = data => {
			if(data.length!=0){
					return data.map((item) => {
						//  if (this.filterKeys && this.filterFn(item.key)) {
						// 		this.filterKeys.push(item.key);
						// 	}
						if (item.children.length !=0) {
							return (<TreeNode key={new Date().getTime()} title={item.orgName} type = {type} itemData={item}>
										{loop(item.children)}
									</TreeNode>);
						}
						return <TreeNode key={new Date().getTime()} title={item.orgName} type = {type} itemData={item} />;
					});
				// }
			}
		};
		
		let treeNodes = loop(treeData);

		
		// let expandedKeys = this.state.expandedKeys;
		// let autoExpandParent = this.state.autoExpandParent;
		// if (this.filterKeys) {
		// 	expandedKeys = this.filterKeys;
		// 	autoExpandParent = true;
		// }
		return (
            <div>

				{/*<Tree
					onCheck={this.onCheck}
					onSelect={this.onSelect}
					filterTreeNode={this.filterTreeNode}
					expandedKeys={expandedKeys}
					autoExpandParent={autoExpandParent}
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
