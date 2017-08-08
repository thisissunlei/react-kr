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
			listSearchKey:''
		}
		this.selectKeys = [];
		this.getTreeData();
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
		let detail = [];
		for(let i=0;i<data.length;i++){
			if(data[i].treeType == "NONE"){
				detail.push(data[i]);
			}
		}
		console.log(detail,"LLLLLLLLLLLL")
		if(!detail[0] || detail.length == 0){
			detail = [{orgName:''}]
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
	//对树进行处理
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
			if(!obj.children.length && obj.treeType === "SUBCOMPANY"){
				obj.noCheck = true;
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
	//删除选择
	deletList = (event,index) => {
		let {treeData} = this.state;
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

	//选中列表显示
	listRender = () =>{
		const {detail,listSearchKey} = this.state;

		if(detail[0].orgName == ""|| detail[0].orgName=="请选择"){
			return ;
		}
		let lists = detail.map((item,index)=>{
			if(listSearchKey ===''){
				return <div className = "everyHave">
						{item.orgName || ''}
						<span className="ui-oa-del" onClick = {()=>{
								this.deletList(event,index)
							}}></span>
				</div>
			}else{
				if(item.orgName.indexOf(listSearchKey)!=-1){
					return <div className = "everyHave">
								{item.orgName || ''}
								<span className="ui-oa-del" onClick = {()=>{
									this.deletList(event,index)
								}}></span>
							</div>
				}
			}
		})

		return lists;

	}
	//搜索框
	treeChange = (event) =>{

		this.setState({
			searchKey:event.target.value,
		})
	}
	listChange = (event) =>{
		this.setState({
			listSearchKey:event.target.value
		})
	}
	render(){
       let {
		   detail,
		   isList,
		   treeData
		} = this.state;
		let {
			 checkable,

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
						 {checkable && <SliderTree
								onSelectTree = {this.onSelect}
								type = "department-radio"
								searchKey = {this.state.searchKey}
								treeData = {treeData||[]}
								check = {true}
								treeDefaultSelectedKeys = {detail}
								multiple
							/>}
							{!checkable && <SliderTree
								onSelectTree = {this.onSelect}
								type = "department-radio"
								searchKey = {this.state.searchKey}
								treeData = {treeData||[]}


							/>}
						</div>
					</div>
					<div className = "content-right clear" >
						<div className = "serch">
							<input type="text" placeholder="请输入关键字搜索" onChange = {this.listChange} />
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
