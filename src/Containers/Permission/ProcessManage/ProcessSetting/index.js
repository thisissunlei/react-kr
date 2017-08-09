
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
	getTreeData = () => {

		const _this = this;
		Http.request("process-typetree", {name:_this.state.searchKey}).then(function (response) {
			_this.setState({
				typeTree: response.items,
			},function(){
				console.log(_this.state.searchKey);
				if(_this.state.searchKey && response.items.length){
					console.log("进入",_this.state.searchKey);
					_this.selectType(response.items[0]);
				}else{
					_this.selectType(-1);
				}
			});
			
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
    renderTree=(item,index)=>{
        return(
            <div key={index} onClick={this.selectType.bind(this,item)} className={`process-tree ${item.active?'active':''}`}>
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
    selectType=(item)=>{
        if(item!=-1){
            this.state.typeTree.map((itemAll,index)=>{
                itemAll.active=false;
                return itemAll;
            })
            item.active=true;
			this.processName = item.name;
			this.typeId = item.id;
            this.setState({
                treeActive:false,
                // processName:item.name,
				// typeId:item.id,
            })
        }else{
            this.setState({
                treeActive:true,
                // processName:"全部类型",
				// typeId:'0',
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

	render() {
		let { itemDetail, data, styleBool,dataName,treeActive} = this.state;
		var logFlag = '';
		var style = {};
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
                            :<SingleType onSubmit={this.updateData} processName={this.processName} typeId={this.typeId}/>
                    }
					
				</div>
			</div>
		);
	}
}
