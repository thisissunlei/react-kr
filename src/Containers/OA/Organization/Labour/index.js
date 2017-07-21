
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
import './index.less';
import SearchForm from './SearchForm';
import CreateDialog from './Createdialog';
import EditDialog from './Editdialog';
import Viewdialog from './Viewdialog';
import CancelDialog from './CancelDialog';
import UnCancelDialog from './UnCancelDialog';

@inject("NavModel")
@observer
export default class Labour extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId:'1',
				orgType:"ROOT",
			},
			data:{},
			itemDetail: '',
			openCreateDialog: false,
			openEditDialog: false,
			openViewDialog:false,
			tabSelect:1,
			openCancelDialog:false,
			newPage:1,
			treeData:[],
			renderTree:false,
			openUnCancelDialog:false,
			dimData:[],
			searchKey:'',
			dimId:this.props.params.dimId,
		}
	}
	checkTab=(item)=>{
			this.setState({
				tabSelect:item,
			})
	}
  componentDidMount(){
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
		var dimId = this.props.params.dimId;
		var _this = this;
		// Http.request('org-list', {
		// 	id:dimId
		// },{}).then(function(response) {
		// 	console.log(response);
		// 	_this.setState({
		// 		treeData:response.childList,
		// 		searchParams: {
		// 			page: 1,
		// 			pageSize: 15,
		// 			orgId:response.orgId,
		// 			orgType:response.orgType,
		// 		},
		// 	},function(){
		// 		_this.renderTree();
		// 	})
		// }).catch(function(err) {});
		Http.request('dim-list', {
              
          }).then(function(response) {
              _this.setState({dimData: response.items})
          }).catch(function(err) {});
	}
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'cancle') {
			this.openCancelDialog();
		}else if (type == 'unCancle') {
			this.openUnCancelDialog();
		}
	}
	renderTree=()=>{
		this.setState({
			renderTree:true,
		})
	}
	openCancelDialog=()=>{
		this.setState({
			openCancelDialog: !this.state.openCancelDialog
		})
	}
	openUnCancelDialog=()=>{
		this.setState({
			openUnCancelDialog: !this.state.openUnCancelDialog
		})
	}
	openViewDialog = () => {
		this.setState({
			openViewDialog: !this.state.openViewDialog
		})
	}
	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
	onCreatSubmit = (params) => {
		var _this = this;
		console.log(">>>>",params);
		// form.dimId = this.props.params.dimId;
		Http.request('save-junior', {}, params).then(function(response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});

	}
	onEditSubmit = (params) => {
		var _this = this;
		               //params.publishTime=DateFormat(params.publishTime,"yyyy-mm-dd hh:MM:ss")
		Http.request('org-update', {}, params).then(function(response) {
			_this.openEditDialog();
			Message.success('修改成功');
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	onCancelSubmit=()=>{
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('org-cancel',{},{
			orgId: itemDetail.juniorId,
			orgType:itemDetail.orgType,
			status: '0'
		}).then(function(response) {
			_this.openCancelDialog();
			Message.success('封存成功');
			_this.changeP();
		}).catch(function(err) {
			_this.openCancelDialog();
			Message.error(err.message)
		});
	}
	onUnCancelSubmit=()=>{
		let {
			searchParams
		} = this.state;
		var _this = this;
		Http.request('org-cancel', {},{
			orgId: searchParams.orgId,
			orgType:searchParams.orgType,
			status: '1'
		}).then(function(response) {
			_this.openUnCancelDialog();
			Message.success('解封成功');
			_this.changeP();
		}).catch(function(err) {
			_this.openUnCancelDialog();
			Message.error(err.message);
		});
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.timer=timer;
		this.setState({
            searchParams:searchParams,
        })
    }
	onPageChange=(page)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=page;
		this.setState({
            searchParams:searchParams,
        })
    }
	onSerchSubmit = (form) => {
		this.setState({
			searchParams:{
				page: 1,
				pageSize: 15,
				nameAndEmail:form.content,
			}
		})
	}
	onSelect=(data)=>{
		this.setState({
			searchParams:{
				page: 1,
				pageSize: 15,
				orgId:data.orgId,
				orgType:data.treeType,
			},
			data:data
		})
	}
	toOtherDim=(item)=>{
		var dimId = item.id;
		console.log(item);
		this.setState({
			dimId:dimId
		})
		//window.open(`./#/oa/organization/${dimId}/labour`, dimId);
	}
	renderDimList=(item,index)=>{
		return (
			<span onClick={this.toOtherDim.bind(this,item)} key={index} className="item">
					{item.name}
			</span>
		)
	}
	change = (event) =>{
		this.setState({
			searchKey:event.target.value,
		})
	}
	render() {
		console.log(this.state.searchParams);
		let {itemDetail,data,dimId} = this.state;
		var logFlag = '';
		return (
			<div className="g-oa-labour">
					<div className="left">
						<div className="search"> 
							<input type="text" onChange = {this.change} placeholder="输入机构名称" />
							<span className="searching">
								
							</span>
						</div>
						<div className="oa-tree">
							<SliderTree 
								onSelect = {this.onSelect}  
								ajaxUrlName = {"org-list"}
								params = {{id:this.state.dimId}}
								type = "department-radio"
								searchKey = {this.state.searchKey}
							/>
						</div>
					</div>
					<div className="right">
						<div className="header">
							<span className="title">
								人力维度
								<span className="title-list">
									<span className="top-square">

									</span>
									{this.state.dimData.map((item,index)=>{return this.renderDimList(item,index)})}
									<span className="item">
										下级机构
									</span>
									<span className="item">
										人员信息
									</span>
								</span>
							</span>
							
								<span className="square">

								</span>
							
						</div>
						<div className="center-row">
							<div className="department">
								<div className="department-logo">

								</div>
								<div className="department-name">
									{this.state.data.orgName || '36Kr'}
								</div>
								<div className="department-tab-list">
									<div className={`department-tab ${this.state.tabSelect==1?'department-tab-active':''}`} onClick={this.checkTab.bind(this,1)}> 
										下级机构
									</div>
									<div className={`department-tab ${this.state.tabSelect==2?'department-tab-active':''}`} onClick={this.checkTab.bind(this,2)}> 
										人员信息
									</div>
								</div>
								
							</div>
							
								{(this.state.searchParams.orgId!=0&&this.state.searchParams.orgId!=-1)&&
									<div className="button-group">
										<div className="btn-center">
											<Button
												label="编辑"
												type="button"
												onTouchTap={this.openEditDialog}
												height={30}
												width={80}
												backgroundColor='#fcfcfc'
												labelColor='#666'
												shadow="no"
											/>
										</div>
										<Button
											label="查看"
											type="button"
											onTouchTap={this.openViewDialog}
											height={30}
											width={80}
											backgroundColor='#F5F6FA'
											labelColor='#666'
											shadow="no"
      									/>
									</div>
								}
								
								
								
							
						</div>
					{this.state.tabSelect==1 &&
							<div>
								<Grid style={{marginBottom:14,marginTop:14}}>
									<Row>
									<Col md={4} align="left" >
											<Button label="新建下级" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}/>
									</Col>
									<Col md={8} align="right">
										
									</Col>
									</Row>
								</Grid>
							<Table
								style={{marginTop:10}}
								displayCheckbox={false}
								onLoaded={this.onLoaded}
								ajax={true}
								ajaxUrlName='next-org-list'
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
								onPageChange={this.onPageChange}
							>
							<TableHeader>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>下级名称</TableHeaderColumn>
							<TableHeaderColumn>下级类型</TableHeaderColumn>
							<TableHeaderColumn>状态</TableHeaderColumn>
							<TableHeaderColumn>创建日期</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableRowColumn name="juniorId" ></TableRowColumn>

								<TableRowColumn name="juniorName"></TableRowColumn>
					<TableRowColumn name="juniorType"></TableRowColumn>
					<TableRowColumn name="status" 
						component={(value, oldValue) => {
							
							if (value == '已封存') {
								logFlag = true;
								return (
									<div style={{color:'#FF5B52'}}>{value}</div>
								)
							}else{
								logFlag = false;
								return (
									<div>{value}</div>
								)
							}
                         }}
					></TableRowColumn>
					
					<TableRowColumn type="date" name="createTime" component={(value)=>{
									return (
										<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>
									)
								}}> </TableRowColumn>
							<TableRowColumn type="operation"
								component={(value, oldValue) => {
									if (logFlag) {
										
										return (
											<Button onClick={this.openUnCancelDialog} label="解封"  type="operation" operation="unCancle"/>
										)
									}else{
										return (
											<Button label="封存" onClick={this.openCancelDialog}  type="operation" operation="cancle"/>
										)
									}
								}}
							>
							</TableRowColumn>
							</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
				</div>
		}
		{
			this.state.tabSelect==2 &&
			<div>
					<Grid style={{marginBottom:14,marginTop:14}}>
									<Row>
									<Col md={4} align="left" >
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
												<SearchForm onSubmit={this.onSerchSubmit}/>
										</div>
									</Col>
									</Row>
								</Grid>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='hrm-list'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
						>
						<TableHeader>
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>部门名称</TableHeaderColumn>
						<TableHeaderColumn>人员名称</TableHeaderColumn>
						<TableHeaderColumn>邮箱</TableHeaderColumn>
						<TableHeaderColumn>入职日期</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="hrmId"></TableRowColumn>
							<TableRowColumn name="departName"></TableRowColumn>
							<TableRowColumn name="userName"></TableRowColumn>
							<TableRowColumn name="mail"></TableRowColumn>
							<TableRowColumn type="entryTime" name="createDate" component={(value)=>{
								return (
									<KrDate value={value} format = "yyyy-mm-dd HH:MM:ss" />
								)
							}}> </TableRowColumn>
							<TableHeaderColumn name="status"></TableHeaderColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
			</div>
		}
		</div>
        <Dialog 
            title={`查看${data.orgName?data.orgName:'36Kr'}`}
            modal={true} 
            open={this.state.openViewDialog} 
            onClose={this.openViewDialog} 
            contentStyle={{
                width: 374
            }}
        >
                <Viewdialog detail={this.state.searchParams} onCancel={this.openViewDialog} />
        </Dialog>
        <Dialog 
                title={`编辑${data.orgName?data.orgName:'36Kr'}`}
                modal={true} 
                open={this.state.openEditDialog} 
                onClose={this.openEditDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <EditDialog detail={this.state.searchParams} onSubmit={this.onEditSubmit} onCancel={this.openEditDialog} />
        </Dialog>
		<Dialog 
                title="提示" 
                modal={true} 
                open={this.state.openCancelDialog} 
                onClose={this.openCancelDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <CancelDialog detail={this.state.itemDetail} onSubmit={this.onCancelSubmit} onCancel={this.openCancelDialog} />
        </Dialog>
		<Dialog 
                title="提示" 
                modal={true} 
                open={this.state.openUnCancelDialog} 
                onClose={this.openUnCancelDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <UnCancelDialog detail={this.state.itemDetail} onSubmit={this.onUnCancelSubmit} onCancel={this.openUnCancelDialog} />
        </Dialog>
		<Dialog 
                title="新建下级" 
                modal={true} 
                open={this.state.openCreateDialog} 
                onClose={this.openCreateDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <CreateDialog params={this.props.params} detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDialog} />
        </Dialog>
</div>
		);
	}

}
