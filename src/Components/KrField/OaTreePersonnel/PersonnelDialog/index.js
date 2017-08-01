import React from 'react';
import './index.less';
import SliderTree from'../../../SliderTree'
import Button from '../../../Button'
import Message from '../../../Message'
import {Http} from 'kr/Utils'
export default class PersonnelDialog extends React.Component{
	constructor(props,context){
		super(props,context)
		// this.getTreeData();
		this.state = {
			detail:[{orgName:''}],
			isList:false,
			searchKey:'',
			treeData : [],
		}
		this.selectKeys = ["0-120"];
		this.getTreeData();
		this.onlyKey = 0;
	}
	componentDidMount(){
		let {echoList} = this.props;
		if(!echoList){
			return;
		}
		this.setState({
			detail:echoList
		})
		
	}
	onSelect = (data) =>{
		const {onSelect,treeType} = this.props;
		const that = this;
		
		if(treeType == "personnel" && data.treeType == "NONE"){
			this.setState({
				detail:[{
					orgId:data.orgId,
					pId:data.pId,
					treeType:data.treeType,
					orgName:data.orgName,
				}]	
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
			console.log(_this.fnTree(response.items),"PPPPPP")
			_this.setState({
				treeData:_this.fnTree(response.items)
			})
		}).catch(function (err) {
			Message.error(err.message);
		});

	}
	fnTree = (data) =>{
		let key = 0;
		var arr = data.map((item,index)=>{
			var obj = Object.assign({},item);
			if(obj.children.length!=0){
				obj.children = this.fnTree(obj.children);
			}
			if(obj.treeType === "NONE"){
				obj.isClick = true;
			}else{
				obj.isClick = false;
			}
			obj.key = key++;
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
		let {treeData} = this.state;
		let detail = [].concat(this.state.detail);
		detail.splice(index,1);
		if(!detail.length){
			detail.push({orgName:''});
		}
		this.selectKeys = [];
		this.getSelectKeys(treeData,detail,0);
		console.log(this.selectKeys,"KKKKK")
		this.setState({
			detail,
			isList:false,
		})
	}
	//获取选择的keys
	getSelectKeys = (data,detail,parentIndex) =>{
		
		var arr = data.map((item,index)=>{
			var key = parentIndex+'-'+item.orgName+item.key;
			for(let i=0;i<detail.length;i++){
				if(item.treeType == detail[i].treeType && item.orgId == detail[i].orgId ){
					this.selectKeys.push(key)
				}
			}
			
			if(item.children.length!=0){
				this.getSelectKeys(item.children,detail,parentIndex++)
			}
			
			
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
		   treeData
		} = this.state;
		let {
			 ...other
		} = this.props;
		return (
            <div className = "tree-personnel" style = {{position:"relative",textAlign:"center"}}>
				<div className = "personnel-title"><span className = "personnel-title-icon"></span><span className = "personnel-title-text">人员</span></div>
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
