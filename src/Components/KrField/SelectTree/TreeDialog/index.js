import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import {Http} from 'kr/Utils'
export default class TreeDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		// this.getTreeData();
		this.state = {
			detail:''
		}
	}
	onSelect = (data) =>{
		const {onSelect} = this.props;
		if(!data.children.length){
			this.setState({
				detail:{
					orgId:data.orgId,
					pId:data.pId,
					treeType:data.treeType,
					orgName:data.orgName,
					
				}
			})
			
		}
		
	}
	
	onSumit = () =>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit()

	}
	onCancel = () =>{

	}
	render(){
       let {detail} = this.state;
		return (
            <div className = "tree-dialog" style = {{position:"relative"}}>
			 	<div className = "content-left">
					<SliderTree 
						onSelect = {this.onSelect}  
						ajaxUrlName = {"org-list"}
						params = {{id:1}} 
						type = "department-radio"
						searchKey = {this.state.searchKey}
					/>
				</div>
				<div className = "content-right" >
					<div>{detail && detail.orgName}</div>
				</div>
			  <div style = {{textAline:"center"}}>
			  	<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" onTouchTap={this.onSumit}/></div>
            	<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
			</div>
            </div>
        )
	 }
 }
