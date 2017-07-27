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
			detail:{
				orgName:''
			},
			isList:false,
			searchKey:'',
			treeData : [],
		}
		this.getTreeData();
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
					
				},
				
			})
			
		}

		
	}
	getTreeData = () => {

		let { ajaxUrlName, params } = this.props;

		params = params || {};
		this.params = Object.assign({},params);
		const _this = this;
		Http.request("org-list", {id:1}).then(function (response) {

			_this.setState({
				treeData:[response]
			})
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
		let detail = Object.assign({},this.state.detail);
		detail.orgName = "";
		this.setState({
			detail,
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
	treeChange = (event) =>{
		console.log(event.target.value);
		this.setState({
			searchKey:event.target.value,
		})
	}
	render(){
       let {detail,isList} = this.state;
		return (
            <div className = "tree-dialog" style = {{position:"relative",textAlign:"center"}}>

				<div className = "tree-content">
					<div className = "content-left">
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" onChange = {this.treeChange}/>
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">

							<SliderTree 
								onSelect = {this.onSelect}  
								type = "department-radio"
								searchKey = {this.state.searchKey}
								treeData = {this.state.treeData}
							/>
						</div>
					</div>
					<div className = "content-right" >
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" />
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">
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
