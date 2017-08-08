
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
			typeTree: [{"label":"人事"},{"label":"财务"},{"label":"行政"}],
            //类型名称
            processName:"全部类型",
            selectColor:0,
            treeActive:true,
		}
	}

	componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		console.log("进入~··");
		var _this = this;
		this.state.typeTree.map((item,index)=>{
            item.active=false;
            return item;
        })
		this.getTreeData();
	}

    //树相关
	getTreeData = () => {
		// const params = { id: this.state.searchParams.dimId }

		// const _this = this;

		// Http.request("process-typetree", {name:_this.searchName}).then(function (response) {
		// 	_this.setState({
		// 		typeTree: [response.items],
		// 	});
		// }).catch(function (err) {
		// 	Message.error(err.message);
		// });
	}
    renderTree=(item,index)=>{
        return(
            <div key={index} onClick={this.selectType.bind(this,item)} className={`process-tree ${item.active?'active':''}`}>
                - {item.label}
            </div>
        )
    }
    change = (event) => {
		
		this.setState({
			searchKey: event.target.value || ' ',
		},function(){
			console.log(this.state.searchKey);
			//this.refs.searchKey.click();
			//this.refs.searchKey.focus();
		})
	}
    selectType=(item)=>{
        if(item!=-1){
            console.log("啦啦啦啦");
            
            this.state.typeTree.map((itemAll,index)=>{
                itemAll.active=false;
                return itemAll;
            })
            item.active=true;
            this.setState({
                treeActive:false,
                processName:item.label,
            })
        }else{
            this.setState({
                treeActive:true,
                processName:"全部类型",
            })
            this.state.typeTree.map((item,index)=>{
                item.active=false;
                return item;
            })
        }
    }
   
    //更新数据
    updateData=()=>{
		    var _this = this;
			// Http.request('process-common', {

      //       },{}).then(function(response) {
      //           _this.setState({thingsType: response.items},function(){
					
      //           })
      //       }).catch(function(err) {});
      // Http.request('process-new-request', {

    //       },{}).then(function(response) {
    //           _this.setState({newThings: response.items},function(){
        
    //           })
    //       }).catch(function(err) {});
    
	}
	render() {
		let { itemDetail, data, dimId, styleBool,dataName,treeActive} = this.state;
		var logFlag = '';
		var style = {};
        console.log(this.state.typeTree);
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
                            this.state.processName=="全部类型" 
                            ?<AllTypes onSubmit={this.updateData} processName={this.state.processName}/>
                            :<SingleType onSubmit={this.updateData} processName={this.state.processName}/>
                    }
					
				</div>
			</div>
		);
	}
}
