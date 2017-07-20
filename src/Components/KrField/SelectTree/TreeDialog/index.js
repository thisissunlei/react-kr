import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import {Http} from 'kr/Utils'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		// this.getTreeData();
	}
	onSelect = (data) =>{
		const {onSelect} = this.props;
		if(!data.children.length){
			onSelect && onSelect(data);
		}
		
	}
	// getTreeData = () =>{
	// 	Http.request()
	// }

	render(){
       
		return (
            <div>
			 
             	<SliderTree 
					onSelect = {this.onSelect}  
					ajaxUrlName = {"org-list"}
					params = {{id:1}} 
				/>
			  
			  
            </div>
        )
	 }
 }
