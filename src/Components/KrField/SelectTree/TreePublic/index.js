import React from 'react';
import './index.less';
import mockData from '../Data.json'
import Tree, { TreeNode }from '../../../Tree'
export default class TreePublic extends React.Component{
	constructor(props,context){
		super(props,context)
		console.log(mockData,"LLLLL")
	}


	render(){
        const {title} = this.props;
		const loop = data => {
			return data.map((item) => {
				if (item.children.length !=0) {
				return (<TreeNode key={item.id} title={item.codeName}>
							{loop(item.children)}
						</TreeNode>);
				}
				return <TreeNode key={item.id} title={item.codeName}/>;
			});
		};
		let treeNodes = loop(mockData);
		return (
            <div>
             	<Tree
				    checkable 
					multiple={this.props.multiple}
				>
					{treeNodes}
				</Tree>
            </div>
        )
	 }
 }
