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
			detail:'',
			isList:false,
		}
	}
	onSelect = (data) =>{
		const {onSelect} = this.props;
		const that = this;
		if(!data.children.length){
			this.setState({
				isList:true,
				detail:{
					orgId:data.orgId,
					pId:data.pId,
					treeType:data.treeType,
					orgName:data.orgName,
					
				}
			})
			
		}

		
	}
	getTreeData = () => {

		let { ajaxUrlName, params } = this.props;

		params = params || {};
		this.params = Object.assign({},params);
		const _this = this;
		Http.request("org-list", {id:1}).then(function (response) {


		}).catch(function (err) {
			Message.error(err.message);
		});

	}

	
	onSumit = () =>{
		const {detail} = this.state;
		let {onSubmit} = this.props;
		onSubmit && onSubmit(detail)
		
	}
	onCancel = () =>{
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	}
	deletList = () => {
		this.setState({
			isList:false,
		})
	}
	listRender = () =>{
		const {detail} = this.state;
		return <div className = "everyHave">
					{detail && detail.orgName}
					<span className="ui-oa-del" onClick = {this.deletList}></span>
			  </div>
	
	}
	render(){
       let {detail,isList} = this.state;
		return (
            <div className = "tree-dialog" style = {{position:"relative",textAlign:"center"}}>

				<div className = "tree-content">
					<div className = "content-left">
						<div>
							<SliderTree 
								onSelect = {this.onSelect}  
								type = "department-radio"
								searchKey = {this.state.searchKey}
								
							/>
						</div>
					</div>
					<div className = "content-right" >
						<div>
							{isList && this.listRender()}
						</div>
					</div>
				</div>
			  <div className = "tree-dialog-bottom" style = {{textAline:"center"}}>
			  		<span className = "botton" style = {{color:'#499DF1'}} onClick = {this.onSumit}>确定</span>
					<span className = "botton" onClick = {this.onCancel} >取消</span>	
			  </div>
        </div>
        )
	 }
 }
