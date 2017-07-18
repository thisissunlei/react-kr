import React from 'react';
import './index.less';
import mockData from './Data.json'
import Tree, { TreeNode }from '../Tree'
export default class SliderTree extends React.Component{
	constructor(props,context){
		super(props,context)
	}
	//勾选
	onCheck = (checkedKeys) =>{
		console.log(checkedKeys,"??????")
	}
	//点击选择事件
	onSelect = (selectedKeys, info) =>{
		
		//var name = selectedKeys.selectedNodes[0]

		//console.log('onSelect', selectedKeys, info);

	}
	render(){
        const {title} = this.props;
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
		let treeNodes = loop(mockData);
		return (
            <div>
             	<Tree
				    checkable 
					onCheck={this.onCheck}
					onSelect={this.onSelect}
				>
					{treeNodes}
				</Tree>
            </div>
        )
	 }
 }
