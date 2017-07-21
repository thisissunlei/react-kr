import React from 'react';
import './index.less';
import {
	Message
} from 'kr-ui';
import { Http } from 'kr/Utils';
import mockData from './Data.json'

import { Tree, TreeNode } from '../Tree';
export default class SliderTree extends React.Component {

	/**type类型司由连个字符串拼接成的 类似 department-left
	 * ----  第一个值   ------   第二个值   -----       最终值       ---
	 * ---- department ------   radio    ----- department-radio  ---
	 * ---- department ------   select   ----- department-select ---
	 * ----    role    ------   radio    -----     role-radio    ---
	 * ----    role    ------   select   -----     role-select   ---
	 * ----  personnel ------   radio    -----  personnel-radio  ---
	 * ----  personnel ------   select   ----- personnel-select  ---
	 */
	constructor(props, context) {
		super(props, context)

		this.state = {
			treeData: [],
			inputValue: '',
			expandedKeys: ['0-36kr'],
			autoExpandParent: true,
			visible: false,
			update:this.props.update
		}

		this.getTreeData();

		this.params = {};
		this.onlyKey = 0;

	}
	//点击选择事件
	onSelect = (item) => {
		let { onSelect } = this.props;
		onSelect && onSelect(item);
	}
	getTreeData = () => {

		let { ajaxUrlName, params } = this.props;

		params = params || {};
		this.params = Object.assign({},params);
		const _this = this;
		Http.request(ajaxUrlName, params).then(function (response) {

			_this.setState({
				treeData: [response],
			});
			_this.filterKeys = [];

		}).catch(function (err) {
			Message.error(err.message);
		});

	}

	filterTreeNode = (treeNode) => {
		return this.filterFn(treeNode.props.title);
	}

	onChange = (event) => {

		this.filterKeys = [];
		this.setState({
			inputValue: event.target.value
		});

	}

	filterFn = (key) => {

		key = key.toString();

		if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
			return true;
		}

		return false;
	}
	onExpand = (expandedKeys) => {
		 this.filterKeys = undefined;

		 this.setState({
		 	expandedKeys,
		 	autoExpandParent: false,
		 });
	}
	componentWillReceiveProps(nextProps){
		let {inputValue} = this.state;
		if(nextProps.searchKey && inputValue!=nextProps.searchKey){
			this.setState({
				inputValue: nextProps.searchKey
			});
		}
		
		let paramsChange = false;
		for(let i in nextProps.params){
			if(nextProps.params[i] != this.params[i]){
				paramsChange = true;
				break;
			}
		}
		if(this.state.update!=nextProps.update){
			this.setState({
				update:nextProps.update
			})
			console.log("打印个东西");
			paramsChange=true;
		}
		if(paramsChange){
			this.getTreeData();
		}
	}


	render() {

		const { title, type } = this.props;
		const { treeData } = this.state;
		var that = this;

		const loop = (data,parentIndex=0) => {

			return data.map((item,index) => {


				var key = parentIndex+'-'+item.orgName;

				if (that.filterKeys && that.filterFn(key)) {
					that.filterKeys.push(key);
				}

				if (item.children) {
					return (<TreeNode key={key} title={item.orgName} type={type} itemData={item}>
						{loop(item.children,key)}
					</TreeNode>);
				}
				return <TreeNode key={key} title={item.orgName} type={type} itemData={item} />;
			});

		};


		let expandedKeys = this.state.expandedKeys;
		let autoExpandParent = this.state.autoExpandParent;

		var filterKeys = this.filterKeys;

		if (filterKeys && filterKeys.length) {
			expandedKeys = this.filterKeys;
			autoExpandParent = true;
		}

		let treeNodes = loop(treeData);

		return (
			<div>

				{/*<input placeholder="请筛选" value={this.state.inputValue} onChange={this.onChange} />*/}

				<Tree
					onCheck={this.onCheck}
					onExpand={this.onExpand}
					onSelect={this.onSelect}
					defaultExpandAll={false}
					defaultExpandedKeys={['0-36kr']}
					expandedKeys={expandedKeys}
					autoExpandParent={true}
					filterTreeNode={this.filterTreeNode}
				>
					{treeNodes}
				</Tree>

			</div>
		)
	}
}