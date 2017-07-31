import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import Message from '../../../Message'
import {Http} from 'kr/Utils'
import krData from '../kr.json'
export default class DivisionDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		// this.getTreeData();
		this.state = {
			detail:[{orgName:''}],
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
				detail:[{
					orgId:data.orgId,
					pId:data.pId,
					treeType:data.treeType,
					orgName:data.orgName,
					
				}],
				
			})
		}
		if(treeType == "department" && data.treeType == "DEPARTMENT"){
			this.setState({
				isList:true,
				detail:[{
					orgId:data.orgId,
					pId:data.pId,
					treeType:data.treeType,
					orgName:data.orgName,
					
				}],
				
			})
		}
	}
	getCheckData = (treeDatas) =>{
		let detailData = [].concat(treeDatas);
		
		let detail = [];
		
		for(let i=0;i<detailData.length;i++){
			if(detailData[i].isClick){
				detail.push(detailData[i]);
			}
		}
		if(!detail.length){
			detail.push({orgName:''});
		}
		
		this.setState({
			detail,
		})
	}
	//获取tree的数据
	getTreeData = () => {

		let { ajaxUrlName} = this.props;
		const _this = this;
		Http.request(ajaxUrlName).then(function (response) {
		
			_this.setState({
				treeData:_this.fnTree(response.items)
			})
		}).catch(function (err) {
			Message.error(err.message);
		});

	}
	fnTree = (data) =>{
		var arr = data.map((item,index)=>{
			var obj = Object.assign({},item);
			if(obj.children.length!=0){
				obj.children = this.fnTree(obj.children);
			}
			if(obj.treeType === "SUBCOMPANY"){
				obj.isClick = true;
			}else{
				obj.isClick = false;
			}
			
			return obj;
			
		})
		return arr;
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
	deletList = (event,index) => {
		let detail = [].concat(this.state.detail);
		detail.splice(index,1);
		if(!detail.length){
			detail.push({orgName:''});
		}
		this.setState({
			detail,
			isList:false,
		})
	}

	listRender = () =>{
		const {detail} = this.state;
		if(detail[0].orgName == ""){
			return ;
		}
		let lists = detail.map((item,index)=>{
			return <div className = "everyHave">
					{item.orgName || ''}
					<span className="ui-oa-del" onClick = {()=>{
							this.deletList(event,index)
						}}></span>
			  </div>
		})
		return lists;
	
	}
	treeChange = (event) =>{
		this.setState({
			searchKey:event.target.value,
		})
	}
	render(){
       let {
		   detail,
		   isList,
		   treeData,
		} = this.state;
		let {
			...other
		} = this.props;
		return (
            <div className = "tree-division" style = {{position:"relative",textAlign:"center"}}>
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
								treeData = {treeData||[]}
								getCheckData = {this.getCheckData} 
								{...other}
							/>
						</div>
					</div>
					<div className = "content-right clear" >
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" />
							<span className = "oa-search-icon search-icon"></span>
						</div>
						<div className = "tree-content-left-right">
							{this.listRender()}
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
