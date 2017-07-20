import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import {Http} from 'kr/Utils'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		// this.getTreeData();
		this.state = {
			searchKey:''
		}
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
	change = (event) =>{
		this.setState({
			searchKey:event.target.value,
		})
	}

	render(){
       
		return (
            <div>
				<input type="text" onChange = {this.change}/>
			 
             	<SliderTree 
					onSelect = {this.onSelect}  
					ajaxUrlName = {"org-list"}
					params = {{id:1}} 
					type = "department-radio"
					searchKey = {this.state.searchKey}
				/>
			  
			  
            </div>
        )
	 }
 }
