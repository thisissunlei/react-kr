import React from 'react';
import './index.less';
import {
	Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
import mockData from './Data.json'

import {Tree,TreeNode }from '../Tree';
var onlyKey = 0 ;
export default class SliderTree extends React.Component{

	/**type类型司由连个字符串拼接成的 类似 department-left
	 * ----  第一个值   ------   第二个值   -----       最终值       ---
	 * ---- department ------   radio    ----- department-radio  ---
	 * ---- department ------   select   ----- department-select ---
	 * ----    role    ------   radio    -----     role-radio    ---
	 * ----    role    ------   select   -----     role-select   ---
	 * ----  personnel ------   radio    -----  personnel-radio  ---
	 * ----  personnel ------   select   ----- personnel-select  ---
	 */
	constructor(props,context){
		super(props,context)
		this.state = {
			treeData:[],
			inputValue:'',
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
				inputValue:"大"
			})
			_this.filterKeys = [];
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	filterTreeNode = (treeNode) => {
		
		// 根据 key 进行搜索，可以根据其他数据，如 value
		return this.filterFn(treeNode.props.title);
	}

	filterFn = (key) => {
		if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
			return true;
		}
		return false;
	}
	 onExpand = (expandedKeys) => {
		// this.filterKeys = undefined;
		
		// this.setState({
		// 	expandedKeys,
		// 	autoExpandParent: false,
		// });
	}

	render(){
      const {title,type} = this.props;
		const {treeData} = this.state;

		const loop = data => {
			if(data.length!=0){
					return data.map((item) => {
						
						if (item.children.length !=0) {
							return (<TreeNode key={onlyKey++} title={item.orgName} type = {type} itemData={item}>
										{loop(item.children)}
									</TreeNode>);
						}
						return <TreeNode key={onlyKey++} title={item.orgName} type = {type} itemData={item} />;
					});
				// }
			}
		};
		
		let treeNodes = loop(treeData);

		
		let expandedKeys = this.state.expandedKeys;
		let autoExpandParent = this.state.autoExpandParent;
		if (this.filterKeys) {
			expandedKeys = this.filterKeys;
			autoExpandParent = true;
		}
		return (
            <div>

				<Tree
					onCheck={this.onCheck}
					onSelect={this.onSelect}
					
					
				>
					{treeNodes}
				</Tree>
					{/*<Tree
					onCheck={this.onCheck}
					onSelect={this.onSelect}
					
					>
					{treeNodes}
				</Tree>*/}
            </div>
        )
	 }
 }
