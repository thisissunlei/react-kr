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
			treeData:[]
		}
		// this.getTreeData();
		
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
		const {ajaxUrlName,params} = this.props;
		params = params||{};
		Http.request(ajaxUrlName,params).then(function(response) {
			// this.setState({
			// 	t
			// })
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render(){
        const {title,type} = this.props;
		const {treeData} = this.state;
		
		const loop = data => {
			if(data.length!=0){
				return data.map((item) => {
					if (item.children.length !=0) {
					return (<TreeNode key={item.id} title={item.codeName} type = {type} itemData={item}>
								{loop(item.children)}
							</TreeNode>);
					}
					return <TreeNode key={item.id} title={item.codeName} type = {type} itemData={item} />;
				});
			}
		};
		let treeNodes = loop(mockData);
		return (
            <div>
             
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
