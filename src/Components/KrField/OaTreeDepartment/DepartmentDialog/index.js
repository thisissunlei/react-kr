import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import Message from '../../../Message'
import {Http} from 'kr/Utils'
export default class DepartmentDialog extends React.Component{
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
		const {onSelect,treeType} = this.props;
		const that = this;
		if(treeType == "personnel" && data.treeType == "NONE"){
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
		if(treeType == "department" && data.treeType == "DEPARTMENT"){
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

		let { ajaxUrlName} = this.props;
		const _this = this;
		Http.request(ajaxUrlName).then(function (response) {
			
			_this.setState({
				treeData:response.items
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
		this.setState({
			searchKey:event.target.value,
		})
	}
	render(){
       let {detail,isList} = this.state;
		return (
            <div className = "tree-department" style = {{position:"relative",textAlign:"center"}}>
				<div className = "department-title"><span className = "department-title-icon"></span><span className = "department-title-text">部门</span></div>

				<div className = "tree-content">
					<div className = "content-left clear">
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" onChange = {this.treeChange}/>
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">

							<SliderTree 
								onSelect = {this.onSelect}  
								type = "department-radio"
								searchKey = {this.state.searchKey}
								treeData = {this.state.treeData||[]}
								checkable = {false}
							/>
						</div>
					</div>
					<div className = "content-right clear" >
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
			  		<span className = "botton"  onClick = {this.onSumit}>确定</span>
					<span className = "botton" onClick = {this.onCancel} >取消</span>	
			  </div>
        </div>
        )
	 }
 }
