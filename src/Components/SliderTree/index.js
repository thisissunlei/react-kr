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
			inputValue: '',
			expandedKeys: ['0-36kr0'],
			treeData : props.treeData,
		}

		this.allKeys = [];

		this.searchExpandedKeys = [];
		this.onlyKey = 0;
		this.CheckedKeys = [];
		this.selectData = props.treeDefaultSelectedKeys||[];
		this.selectName = [];

	}

	onRightClick = (keys,treeNode) =>{
		

	}

	onCheck = (keys,treeNode)=>{
	
		// let  checkDatas = treeNode.checkedNodes.map((item,index)=>{
		// 	let detailData =Object.assign({},item.props.itemData);
		// 	delete detailData.children;
		// 	return detailData;
		// })

		// let {getCheckData} = this.props;
		// getCheckData && getCheckData(checkDatas);
	

	}

	//点击选择事件
	onSelect = (TreeNode) => {
		
		
		let { onSelectTree } = this.props;
		let isHave = false;
		let itemIndex;
		
		this.selectData.map((item,index)=>{
			if(item.orgId == TreeNode.orgId && item.treeType == TreeNode.treeType ){
				itemIndex = index;
				isHave = true;
			}
		});
		if(isHave){
			this.selectData.splice(itemIndex,1);
		}else{
			this.selectData.push(TreeNode);
		}
		let datas = this.selectData
		onSelectTree && onSelectTree(datas);
	}


	filterTreeNode = (treeNode) => {

		var {eventKey} = treeNode.props;

		var {searchKey} = this.props;

		const  key = eventKey.toString();

		if(!searchKey){
			return false;
		}

		const keyArray = key.split('-');
		const str = keyArray.pop();

		if (str.indexOf(searchKey) !== -1) {
			return true;
		}

		return false;
	}

	allKeysHasKey = (key,nextSearchKey)=>{

		var {searchKey} = this.props;
		if(nextSearchKey){
			searchKey = nextSearchKey;
		};
		 key = key.toString();

		if(!searchKey){
			return false;
		}

		if (key.indexOf(searchKey) !== -1) {
			return true;
		}

		return false;

	}



	//打开事件
	onExpand = (keys,treeNode) => {

		 let {eventKey,expanded} = treeNode.node.props

		var {expandedKeys} = this.state;

		var index = expandedKeys.indexOf(eventKey);

		if( index === -1){
			expandedKeys.push(eventKey);
		}else{
			expandedKeys.splice(index,1);
		}

		const {searchKey} = this.props;


		const searchExpandedKeys = this.searchExpandedKeys;


		if(this.props.searchKey && !expanded && searchExpandedKeys.indexOf(eventKey) !== -1){
			this.setSearchExpandedKeys(this.props.searchKey);
			return ;
		}

		expandedKeys = expandedKeys.filter(function(key){
			return key.indexOf(eventKey+'-') === -1;
		});


		this.setState({
				expandedKeys,
				});
	}


	registerAllKeys = (key)=>{

		var allKeys = this.allKeys;

		if(allKeys.indexOf(key) === -1){
			allKeys.push(key);
		}

		this.allKeys = allKeys;
	}


	setSearchExpandedKeys = (nextSearchKey)=>{



		var expandedKeys = [];

		const allKeys = this.allKeys;
		const that = this;
		const filterKeys = allKeys.filter((key) =>{
			return  this.allKeysHasKey(key,nextSearchKey);
		});


		filterKeys.map(function(item){

			const  index = item.indexOf(nextSearchKey);

			if(index === -1){
				return ;
			};

			const prevStr = item.substr(0,index);
			const  keyArray = prevStr.split('-');
			const nextStr = keyArray.pop() + item.substr(index);
			var nextKeyArray = nextStr.split('-');


			nextKeyArray = nextKeyArray.filter(function(key){
				return key.indexOf(nextSearchKey) !== -1;
			});

			//const nextKeyReduceStr  = nextKeyArray.join('-');

			const nextKey = keyArray.concat(nextKeyArray).join('-');


			expandedKeys.push(nextKey);


			keyArray.reduce(function(prev,next){
				var key = prev+'-'+next;
				expandedKeys.push(key);
				return key;
			});


		});

		expandedKeys = this.uniqueArray(expandedKeys);
		this.searchExpandedKeys = [].concat(expandedKeys);


		this.setState({
			expandedKeys
		});

	}

	uniqueArray = (arr) =>{
		var tmpArr = [];
		for(var i=0; i<arr.length; i++){
			if(arr.indexOf(arr[i]) == i){
				tmpArr.push(arr[i]);
			}
		}
		return tmpArr;
	}

	componentDidMount(){
		//this.setSearchExpandedKeys(this.props.searchKey);
	}

	componentWillReceiveProps(nextProps){

		if(nextProps.searchKey !== this.props.searchKey){
			this.setSearchExpandedKeys(nextProps.searchKey);
		};
		this.selectData = nextProps.treeDefaultSelectedKeys||[];
		

	}

	fnTree = (data) =>{
			let _this = this;
			let key = 0;
			var arr = data.map((item,index)=>{
				var obj = Object.assign({},item);
				if(!obj.isSelect){
					obj.isSelect = false;
				}
				for(let i=0;i<this.selectData.length;i++){
					
					if(_this.selectData[i].treeType == obj.treeType && _this.selectData[i].orgId == obj.orgId ){
						
						obj.isSelect = true;
					}
				}
				if(obj.children.length){
					obj.children = this.fnTree(obj.children);
				}
				return obj;

			})
			return arr;
		}

	render() {

		const {
			title,
			type,
			treeData,
			TreeTheme,
			...other
		} = this.props;
		let {checkedKeys} = this.state;

		var that = this;

		this.allKeys = [];

		const loop = (data,parentIndex=0) => {

			return data.map((item,index) => {


				var key = parentIndex+'-'+item.orgName+item.key;

				that.registerAllKeys(key);

				if (item.children) {
					return (
						<TreeNode key={key} parentKey={parentIndex} title={item.orgName} type={type} itemData={item}>
							{loop(item.children,key)}
						</TreeNode>
					);
				}

				return <TreeNode key={key}  parentKey={parentIndex} title={item.orgName} type={type} itemData={item} />;

			});


		};
	


		let treeNodes = loop(this.fnTree(treeData));

		const {expandedKeys} = this.state;
		return (
			<div>
			<Tree
					onCheck={this.onCheck}
					onExpand={this.onExpand}
					onSelect={this.onSelect}
					defaultExpandAll={true}
					expandedKeys={expandedKeys}
					autoExpandParent={true}
					filterTreeNode={this.filterTreeNode}
					onRightClick = {this.onRightClick}
					theme = {TreeTheme || ""}
					
					{...other}
				>
					{treeNodes}
				</Tree>


			</div>
		)
	}
}
