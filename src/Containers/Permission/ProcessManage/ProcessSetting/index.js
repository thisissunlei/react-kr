
import React from 'react';

import {
	Http,
	DateFormat,
} from "kr/Utils";
import { observer, inject } from 'mobx-react';
import {
	KrField,
	Table,
	Drawer,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	KrDate,
	Message,
	SliderTree,
} from 'kr-ui'; 

import SearchForm from './SearchForm';

import AllTypes from './AllTypes';
import SingleType from './SingleType';

// import EditDialog from './Editdialog';
// import Viewdialog from './Viewdialog';
// import CancelDialog from './CancelDialog';
// import UnCancelDialog from './UnCancelDialog';

import './index.less';

@inject("NavModel")
@observer
export default class ProcessSetting extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			itemDetail: {},
			openCreateDialog: false,
			newPage: 1,
			typeTree: [],
            //类型名称
            processName:"全部类型",
            selectColor:0,
			searchKey:'',
            treeActive:true,
			typeId:'0',
			timer:new Date(),
			treeIndex:{
				"index":'-1',
			},
		}
		this.processName="全部类型";
		this.typeId = '0';
	}

	componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		var _this = this;
		this.state.typeTree.map((item,index)=>{
            item.active=false;
            return item;
        })
		this.getTreeData();
	}

    //树相关
	getTreeData = (isEdit) => {
		const _this = this;
		var treeIndex = Object.assign({},_this.state.treeIndex);
		var index = treeIndex.index;
		console.log("getTree",index);
		Http.request("process-typetree", {name:_this.state.searchKey}).then(function (response) {
			_this.setState({
				typeTree: response.items,
			},function(){
				console.log(_this.state.searchKey);
				//搜索有结果的情况
				// if(_this.state.searchKey && response.items.length){
				// 	if(index>0){
				// 		_this.selectType(response.items[index],index);
				// 	}else if(!index){
				// 		_this.selectType(response.items[0],0);
				// 	}else if(index==-1){
				// 		_this.selectType(-1,-1);
				// 	}
					
				// }else if(!_this.state.searchKey && index!=-1){//没搜索且有index
				// 	_this.selectType(response.items[index],index);
				// }else{// if(_this.state.searchKey && !response.items.length){//有搜索没结果&&没搜索没index
				// 	_this.selectType(-1,-1);
				// }
				if(!_this.state.searchKey){//没搜索
					// _this.selectType(-1,-1);
					if(isEdit && isEdit=="isEdit"){
							_this.selectType(response.items[index],index);
						}else{
							_this.selectType(-1,-1);
					}
				}else{
					if(response.items.length){//有搜索值且搜到
						if(isEdit && isEdit=="isEdit"){//有搜索值且搜到且编辑之后
							_this.selectType(response.items[index],index);
						}else{//有搜索值且搜到且没编辑
							_this.selectType(response.items[0],0);
						}
						
					}else{//有搜索值且没搜到
						_this.selectType(-1,-1);
					}
				}
				
			});
			
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	//树相关
	getEditTreeData = () => {
		const _this = this;
		var treeIndex = Object.assign({},_this.state.treeIndex);
		var index = treeIndex.index;
		Http.request("process-typetree", {}).then(function (response) {
			_this.setState({
				typeTree: response.items,
			},function(){
				if(_this.state.searchKey && response.items.length){
					_this.selectType(response.items[index],index);
				}else{
					_this.selectType(response.items[index],index);
				}
			});
			// _this.treeIndex = treeIndex;
			
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
    renderTree=(item,index)=>{
        return(
            <div key={index} onClick={this.selectType.bind(this,item,index)} className={`process-tree ${item.active?'active':''}`}>
                - {item.name}
            </div>
        )
    }
    change = (event) => {
		this.setState({
			searchKey: event.target.value || '',
		},function(){
			this.getTreeData();			
		})
	}
    selectType=(item,index)=>{
        if(item!=-1){
            this.state.typeTree.map((itemAll,index)=>{
                itemAll.active=false;
                return itemAll;
            })
            item.active=true;
			this.processName = item.name;
			this.typeId = item.id;
			this.nodeData = item;


		console.log('--->>>',index)
            this.setState({
                treeActive:false,
                // processName:item.name,
				// typeId:item.id,
				treeIndex:{
					'index':index
				}
            })
        }else{
            this.setState({
                treeActive:true,
                // processName:"全部类型",
				// typeId:'0',
				treeIndex:{
					'index':-1
				}
            })
			this.processName = "全部类型";
			this.typeId = '0';
            this.state.typeTree.map((item,index)=>{
                item.active=false;
                return item;
            })
        }
    }
	getProcessDetail=()=>{
		var _this = this;
		Http.request('process-type-detail', {
                typeId:_this.typeId,
            }).then(function(response) {
                _this.processName=response.name;
				_this.setState({
					timer:new Date()
				})
            }).catch(function(err) {});
	}
    //更新数据
    updateData=()=>{
		this.getTreeData();
		this.getProcessDetail();
	}
	updateDetail=(isEdit)=>{
	
		this.getTreeData(isEdit);
		// this.getProcessDetail();
		// console.log(this.nodeData);
		
	}
	render() {
		let { itemDetail, data, styleBool,dataName,treeActive} = this.state;
		var logFlag = '';
		var style = {};
		console.log(this.state.treeIndex.index,"index");
		return (
			<div className="g-process-setting">
				<div className="left">
					<div className="search">
						<input type="text" onChange={this.change} placeholder="请输入类型名称" ref="searchKey"/>
						<span className="searching">

						</span>
					</div>
					<div className="oa-process-tree">
                        <div onClick={this.selectType.bind(this,-1)} className={`process-tree ${treeActive?'active':''}`}>
                            - 全部类型
                        </div>
                        {this.state.typeTree.map((item,index)=>{
                            return this.renderTree(item,index)
                        })}                        
					</div>
				</div>
				<div className="right">
                    {
                            this.processName=="全部类型" 
                            ?<AllTypes onSubmit={this.updateData} processName={this.processName} typeId={this.typeId}/>
                            :<SingleType updateDetail={this.updateDetail} onSubmit={this.updateData} processName={this.processName} typeId={this.typeId}/>
                    }
					
				</div>
			</div>
		);
	}
}
