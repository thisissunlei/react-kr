
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

import {AddPostPeople} from 'kr/PureComponents';

import SearchForm from './SearchForm';
import CreateDialog from './Createdialog';
import EditDialog from './Editdialog';
import Viewdialog from './Viewdialog';
import CancelDialog from './CancelDialog';
import UnCancelDialog from './UnCancelDialog';
import HighSearchForm from './HighSearchForm';
import Leave from './Leave';
import Remove from './Remove';
import Transfer from './Transfer';
import OpenCard from './OpenCard';
import OpenAccount from './OpenAccount';
import IsSure from './IsSure';
import './index.less';

@inject("NavModel")
@observer
export default class Labour extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
				dimId: this.props.params.dimId,
			},
			openAddPerson:false,
			data: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
				dimId: this.props.params.dimId,
			},
			itemDetail: {},
			openCreateDialog: false,
			openEditDialog: false,
			openViewDialog: false,
			tabSelect: 1,
			openCancelDialog: false,
			newPage: 1,
			treeData: [],
			openUnCancelDialog: false,
			dimData: [],
			searchKey: '',
			dimId: this.props.params.dimId,
			dimName: '',
			styleBool: false,
			dataName:{
				orgName:'36Kr',
				orgId:'1',
				status:'0',
				treeType: "ROOT",
			},
			selectStyle: {
				'display': 'none'
			},
			dimIdStatus:'0',
			openHighSearch:false,
			orgId:'',
			//操作
			openLeave:false,
			openRemove:false,
			openTransfer:false,
			openCard:false,
			openAccount:false,
			openSure:false,
			employees:{
				name:'',
				phone:'',
			},
			//离职id
			leaveId:'',
			//调动数据
			transferDetail:{},
			resourceId:'',
			//绑定的数据
			cardParam:'',
			//权限
			isLeave:false,
			isRemove:false,
			istranfer:false,
			isCard:false,
			isOpen:false
		}
	}
	checkTab = (item) => {
		this.setState({
			tabSelect: item,
		})
	}
	fnTree = (data) =>{
		let key = 0;
		var arr = data.map((item,index)=>{
			var obj = Object.assign({},item);
			if(obj.children.length!=0){
				obj.children = this.fnTree(obj.children);
			}
			obj.isClick = true;
			obj.key = key++;
			return obj;
		})
		return arr;
	}

	componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		//console.log("进入~··");
		var dimId = this.props.params.dimId;
		var _this = this;
		var {checkOperate} = this.props.NavModel;
		Http.request('extra-list', {
			dimId: dimId
		}).then(function (response) {
			_this.setState({ dimData: response.items })
		}).catch(function (err) { });

		this.getDimensionalityDetail();

		this.initSelect();

		this.getTreeData();
		this.getMainDimId();
		// setTimeout(function() {
		//    _this.setState({
		// 	 isLeave :checkOperate("hrm_resource_dimission"),
		//      isRemove : checkOperate("hrm_resource_account"),
		//      istranfer : checkOperate("hrm_resource_move"),
		// 	 isCard : checkOperate("hrm_resource_card"),
		//      isOpen : checkOperate("hrm_resource_account")
		//    })
		// },500);
	}
	getExaList=()=>{
		var _this = this;

		Http.request('extra-list', {
			dimId: _this.state.searchParams.dimId
		}).then(function (response) {
			_this.setState({ dimData: response.items })
		}).catch(function (err) { });
	}
	getMainDimId=()=>{
		const that = this;
		const { searchParams } = this.state;
		const dimId = searchParams.dimId;
		Http.request('is-main-dim', {dimId:dimId}).then(function (response) {
			that.setState({dimIdStatus: response.isMain})
		}).catch(function (err) { });
	}
	//获取维度信息
	getDimensionalityDetail = () => {

		const that = this;
		const { searchParams } = this.state;
		const id = searchParams.dimId;

		Http.request('dim-detail', { id }).then(function (response) {
			that.setState({ dimName: response.name })
		}).catch(function (err) { });

	}

	componentWillUnmount() {
		window.removeEventListener("click", this.controlSelect, false);
	}
	initSelect = (e) => {
		window.addEventListener("click", this.controlSelect);
	}
	controlSelect = () => {
		this.setState({
			selectStyle: {
				'display': 'none'
			},
			styleBool: false,
		})
	}
	//新建用户提交
   addPersonSubmit=(param)=>{
    var data = Object.assign({},param);
	var _this = this;
	if(data.depId.orgId){
	  data.depId=data.depId.orgId;
	}
	Http.request("submit-new-personnel",{},data).then(function (response) {
		_this.openAddPerson();
		_this.changeP();
		Message.success("新建成功");
		_this.changeP();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'cancle') {
			this.openCancelDialog();
		} else if (type == 'unCancle') {
			this.openUnCancelDialog();
		}
	}
	openCancelDialog = (detail) => {

		this.setState({
			openCancelDialog: !this.state.openCancelDialog,
			itemDetail: detail,
		})
	}
	openUnCancelDialog = (detail) => {
		this.setState({
			openUnCancelDialog: !this.state.openUnCancelDialog,
			itemDetail: detail,
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

	getOrganizationDetail = ()=>{

		var searchParams = Object.assign({},this.state.searchParams);
		const that = this;
		Http.request('org-detail', searchParams).then(function (response) {
			const dataName = {};
			dataName.orgName = response.orgName;
			dataName.status = response.status || '0';
			dataName.orgId = response.orgId || '1';
			dataName.treeType = response.orgType || 'ROOT';
			that.setState({
				dataName,
				// searchParams: {
				// 	page: 1,
				// 	pageSize: 15,
				// 	orgId: '1',
				// 	orgType: "ROOT",
				// 	dimId: this.props.params.dimId,
				// },
			});


		}).catch(function (err) {

		});

	}
	onCreatSubmit = (params) => {
		var _this = this;
		Http.request('save-junior', {}, params).then(function (response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			_this.changeP();
			_this.getTreeData();
			_this.getOrganizationDetail();
		}).catch(function (err) {
			Message.error(err.message)
		});
	}
	onEditSubmit = (params) => {
		var _this = this;
		Http.request('org-update', {}, params).then(function (response) {
			_this.openEditDialog();
			Message.success('修改成功');
			_this.changeP();
			_this.getTreeData();
			_this.getOrganizationDetail();

		}).catch(function (err) {
			Message.error(err.message)
		});

	}
	onCancelSubmit = () => {
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('org-cancel', {}, {
			orgId: itemDetail.juniorId,
			orgType: itemDetail.juniorType == "分部" ? 'SUBCOMPANY' : 'DEPARTMENT',
			status: '0'
		}).then(function (response) {
			_this.openCancelDialog();
			Message.success('封存成功');
			_this.changeP();
			_this.getTreeData();
		}).catch(function (err) {
			_this.openCancelDialog();
			Message.error(err.message)
		});
	}
	onUnCancelSubmit = () => {
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('org-cancel', {}, {
			orgId: itemDetail.juniorId,
			orgType: itemDetail.juniorType == "分部" ? 'SUBCOMPANY' : 'DEPARTMENT',
			status: '1'
		}).then(function (response) {
			_this.openUnCancelDialog();
			Message.success('解封成功');
			_this.getTreeData();
			_this.changeP();
		}).catch(function (err) {
			_this.openUnCancelDialog();
			Message.error(err.message);
		});
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.timer=timer;
		// console.log("changeP",searchParams);
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
	onSearchSubmit = (form) => {
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.nameAndEmail = form.content;
		this.setState({
			searchParams
		})
	}
	onSelect = (data) => {
		var _this = this;
		this.setState({
			data:{
				orgId: data.orgId,
				orgType: data.treeType,
				dimId:this.props.params.dimId
			},
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: data.orgId,
				orgType: data.treeType,
				dimId:this.props.params.dimId
			}
		},function(){
			_this.getOrganizationDetail();
		});

	}

	toOtherDim = (item) => {
		var dimId = item.id;
		var _this= this;
		this.setState({
			selectStyle: {
				'display': 'none'
			},
			styleBool: false,
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
				dimId: dimId,
			},
		}, function () {
			_this.getExaList();
			window.location.href = `./#/oa/organization/${dimId}/labour`;
			_this.reloadDim();
			_this.getTreeData();
			_this.getMainDimId();
		})

	}
	reloadDim=()=>{
			var that = this;
			// window.setTimeout(function(){
			// 	console.log(that.props.params.dimId);
			// },200)
			that.getOrganizationDetail();
			that.getTreeData();
			that.getDimensionalityDetail();
	}
	renderDimList = (item, index) => {
		return (
			<span onClick={(event)=>{
					event.stopPropagation();
					this.toOtherDim(item)
					}
				}
				key={index} className="item">
				{item.name}
			</span>
		)
	}

	//========****************=========
	change = (event) => {

		this.setState({
			searchKey: event.target.value || ' ',
		},function(){
			// console.log(this.state.searchKey);
			//this.refs.searchKey.click();
			//this.refs.searchKey.focus();
		})
	}
	clickSelect = () => {
		if(this.state.dimData.length==0){
			return;
		}
		if(this.state.selectStyle.display=='none'){
			this.setState({
				selectStyle: {
					'display': 'inline-block'
				},
				styleBool: true,
			})
		}else{
			this.setState({
				selectStyle: {
					'display': 'none'
				},
				styleBool: false,
			})
		}

	}

	allClose = () => {
		this.setState({
			openAddPerson: false
		})
	}

	openAddPerson = () => {
		this.setState({
			openAddPerson: !this.state.openAddPerson,
		})
	}

	getTreeData = () => {
		const params = { id: this.state.searchParams.dimId }

		const _this = this;

		Http.request("org-list", params).then(function (response) {
			
			_this.setState({
				treeData: _this.fnTree([response]),
			});
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		console.log(this.state.searchParams);
		var type = this.state.searchParams.orgType;
		var id = this.state.searchParams.orgId;
		var dimId = this.state.searchParams.dimId;
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.juniorId)
			});
		}
		var url = `/api/krspace-erp-web/dim/export-hrm-org-excel?orgIds=${ids}&dimId=${dimId}&superOrgId=${id}&orgType=${type}`
		window.location.href = url;
	}

	onExportHrm=(values)=>{
		let ids = [];
		var type = this.state.searchParams.orgType;
		var id = this.state.searchParams.orgId;
		var dimId = this.state.searchParams.dimId;
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.hrmId)
			});
		}
		var url = `/api/krspace-erp-web/dim/export-hrm-resource-excel?hrmResourceIds=${ids}&dimId=${dimId}&orgId=${id}&orgType=${type}`
		window.location.href = url;
	}
	//高级查询
	openHighSearch = () => {
		this.setState({
		openHighSearch: !this.state.openHighSearch
		})
	}

	onHighSearchSubmit = (form) => {
		console.log("HighSearch",form);
		this.setState({
			searchParams:form
		})
		this.openHighSearch();
	}




   //跳转详情页
   goDetail = (data) =>{
	    let personId=data.hrmId;
		window.open(`./#/oa/${personId}/peopleDetail`,'123');
   }

   //操作开关
   //编辑打开
   operationEdit=(itemDetail)=>{
        this.goDetail(itemDetail);
   }
   //离职打开
   operationLeave=(itemDetail)=>{
       this.setState({
			openLeave:true,
			leaveId:itemDetail.hrmId
		})
   }
   //解除账号打开
   operationRemove=(itemDetail)=>{
	    this.setState({
			  openRemove:true,
			  resourceId:itemDetail.hrmId
		})
   }

   //调动打开
   operationTransfer=(itemDetail)=>{
		 this.setState({
			  openTransfer:true,
			  transferDetail:itemDetail
		  })
   }

   //绑定门禁卡打开
   operationCard=(itemDetail)=>{
		this.setState({
			  openCard:true,
			  employees:itemDetail
		})
   }

   //开通账号打开
   operationAccount=(itemDetail)=>{
       this.setState({
			  openAccount:true,
			  resourceId:itemDetail.hrmId
		})
   }



   //离职关闭
   cancelLeave=()=>{
     this.setState({
		openLeave:!this.state.openLeave
	 })
   }
   //离职提交
   addLeaveSubmit=(data)=>{
	let {leaveId}=this.state;
	var param = Object.assign({},data);
	param.resourceId=leaveId;
	var searchParams={
		time:+new Date()
	}
	var _this = this;
	Http.request("leaveOnSubmit",{},param).then(function (response) {
		_this.setState({
			searchParams:Object.assign({},_this.state.searchParams,searchParams),
		})
		_this.cancelLeave();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }

  //解除关闭
   cancelRemove=()=>{
	 this.setState({
		openRemove:!this.state.openRemove
	 })
   }

   //解除提交
   addRemoveSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("remove-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelRemove();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }

   //开通关闭
    cancelAccount=()=>{
	 this.setState({
		openAccount:!this.state.openAccount
	 })
   }

    //开通提交
   addOpenSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("open-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelAccount();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }


   //调动取消
   cancelTransfer=()=>{
	 this.setState({
		openTransfer:!this.state.openTransfer
	 })
   }

   //调动提交
   addTransferSubmit=(data)=>{
		var param = Object.assign({},data);
		var _this = this;
		var searchParams={
		  time:+new Date()
	    }
		Http.request("service-switch",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelTransfer()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }


   //开通门禁取消
   cancelCard=()=>{
	  this.setState({
		openCard:!this.state.openCard
	 })
   }
   //开通门禁提交
   addCardSubmit=(param)=>{
	   if(param.isBound){
		 this.setState({
			 cardParam:param,
			 openSure:true
		 })
	   }else {
		   var _this = this;
			Http.request("bindingCard",{},param).then(function (response) {
				_this.cancelCard();
				Message.success("绑定成功");
			}).catch(function (err) {
				Message.error(err.message);
			});
	   }
   }

   //是否确定
   cancelSure=()=>{
	  this.setState({
		openSure:!this.state.openSure
	 })
   }

   //是否确定
   addSureSubmit=()=>{
	   let {cardParam}=this.state;
       var _this = this;
		Http.request("bindingCard",{},cardParam).then(function (response) {
			_this.cancelCard();
			Message.success("绑定成功");
		}).catch(function (err) {
			Message.error(err.message);
		});
		this.cancelSure();
   }
	render() {
		let { itemDetail, data, dimId, styleBool,dataName,transferDetail,employees,isLeave,isRemove,istranfer,isCard,isOpen} = this.state;
		var logFlag = '';
		var orgtype = this.state.searchParams.orgType;
		var style = {};
		var index = 0;
		// console.log(this.state.searchParams.orgType);
		return (
			<div className="g-oa-labour">
				<div className="left">
					<div className="header">
						<span className="title" style={{ 'backgroundColor': `${styleBool?'#fff':''}` }} onClick={(event) => {
							event.stopPropagation();
							this.clickSelect();
						}}>
							<span className="title-text">{this.state.dimName}</span>
							<span className="title-list" style={this.state.selectStyle}>
								{this.state.dimData.map((item, index) => { return this.renderDimList(item, index) })}
							</span>
							{this.state.dimData.length>0
								&&
								<span className="square">

								</span>
							}
							
						</span>

					</div>
					<div className="search">
						<input type="text" onChange={this.change} placeholder="输入机构名称" ref="searchKey"/>
						<span className="searching">

						</span>
					</div>
					<div className="oa-tree">
						<SliderTree
							onSelectTree={this.onSelect}
							onCheck={this.onCheck}
							type="department-radio"
							treeData={this.state.treeData}
							searchKey={this.state.searchKey}
							TreeTheme = "institutionsTheme"
						/>
					</div>
				</div>
				<div className="right">
					<div className="center-row">
						<div className="department">
							<div className={`department-logo ${orgtype}`}>

							</div>
							<div className="department-name">
								{this.state.dataName.orgName || '36Kr'}
							</div>
							<div className="department-tab-list">
								<div className={`department-tab ${this.state.tabSelect == 1 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 1)}>
									下级机构
									</div>
								<div className={`department-tab ${this.state.tabSelect == 2 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 2)}>
									人员信息
									</div>
							</div>

						</div>

						{this.state.searchParams.orgType != 'ROOT' &&
							<div className="button-group">
								<div className="btn-center">
									<Button
										label="编辑"
										type="button"
										onTouchTap={this.openEditDialog}
										height={30}
										width={80}
										labelStyle={{fontWeight:0}}
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
									labelStyle={{fontWeight:0}}
									width={80}
									backgroundColor='#fcfcfc'
									labelColor='#666'
									shadow="no"
								/>
							</div>
						}




					</div>
					{this.state.tabSelect == 1 &&
						<div>
							<Grid style={{ marginBottom: 20, marginTop: 20 }}>
								<Row>
									<Col md={4} align="left" >
										<Button label="新建下级" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}  labelStyle={{fontWeight:400,padding:0}}/>
									</Col>
									<Col md={8} align="right">

									</Col>
								</Row>
							</Grid>
							<Table
								style={{marginTop:10,position:'inherit'}}
								displayCheckbox={true}
								onLoaded={this.onLoaded}
								ajax={true}
								ajaxUrlName='next-org-list'
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
								onPageChange={this.onPageChange}
								onExport={this.onExport}
								exportSwitch={true}
							>
								<TableHeader>
									<TableHeaderColumn>编号</TableHeaderColumn>
									<TableHeaderColumn>下级名称</TableHeaderColumn>
									<TableHeaderColumn>下级类型</TableHeaderColumn>
									<TableHeaderColumn>账号是否开通</TableHeaderColumn>
									<TableHeaderColumn>操作人</TableHeaderColumn>
									<TableHeaderColumn>创建日期</TableHeaderColumn>
									<TableHeaderColumn>操作</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow>
										<TableRowColumn name="identifier" ></TableRowColumn>

										<TableRowColumn name="juniorName"></TableRowColumn>
										<TableRowColumn name="juniorType"></TableRowColumn>
										<TableRowColumn name="status"
											component={(value, oldValue) => {

												if (value == '已封存') {
													logFlag = true;
													return (
														<div style={{ color: '#FF5B52' }}>{value}</div>
													)
												} else {
													logFlag = false;
													return (
														<div>{value}</div>
													)
												}
											}}
										></TableRowColumn>
										<TableRowColumn name="updateName"></TableRowColumn>
										<TableRowColumn type="date" name="createTime" component={(value) => {
											return (
												<KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
											)
										}}> </TableRowColumn>

										<TableRowColumn type="operation" name="status"
											component={(value, oldValue, itemDetail) => {
												if (logFlag) {

													return (
														<Button onClick={this.openUnCancelDialog.bind(this, itemDetail)} label="解封" type="operation" operation="unCancle" />
													)
												} else {
													return (
														<Button label="封存" onClick={this.openCancelDialog.bind(this, itemDetail)} type="operation" operation="cancle" />
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
						this.state.tabSelect == 2 &&
						<div>
							<Grid style={{ marginBottom: 20, marginTop: 20 }}>
								<Row>
									<Col md={4} align="left" >
										{(this.state.dimIdStatus==0&&dataName.status==0)&&<Button label="新增员工" type="button" onClick={this.openAddPerson} width={80} height={30} fontSize={14} labelStyle={{fontWeight:400,padding:0}} />}
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
											<SearchForm onSubmit={this.onSearchSubmit}  openSearch={this.openHighSearch}/>
										</div>
									</Col>
								</Row>
							</Grid>
							<Table
								style={{ marginTop: 10 }}
								displayCheckbox={true}
								onLoaded={this.onLoaded}
								ajax={true}
								ajaxUrlName='hrm-list'
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
								onPageChange={this.onPageChange}
								onExport={this.onExportHrm}
								exportSwitch={true}
							>
								<TableHeader>
									<TableHeaderColumn>编号</TableHeaderColumn>
									<TableHeaderColumn>部门名称</TableHeaderColumn>
									<TableHeaderColumn>员工类别</TableHeaderColumn>
									<TableHeaderColumn>人员名称</TableHeaderColumn>
									<TableHeaderColumn>员工属性</TableHeaderColumn>
									<TableHeaderColumn>邮箱</TableHeaderColumn>
									<TableHeaderColumn>入职日期</TableHeaderColumn>
									<TableHeaderColumn>状态</TableHeaderColumn>
									<TableHeaderColumn>操作</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow>
										<TableRowColumn name="identifier"></TableRowColumn>
										<TableRowColumn name="departName"></TableRowColumn>
										<TableRowColumn name="hrmResourceType"></TableRowColumn>
										<TableRowColumn name="userName"
											component={(value,oldValue,detail)=>{
												return (<div onClick = {() =>{
														this.goDetail(detail)
														}} style={{color:'#499df1',cursor:'pointer'}}>{value}</div>)
											}}
										></TableRowColumn>
										<TableRowColumn name="hrmResourceAttributes"></TableRowColumn>
										<TableRowColumn name="email"
											component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
										<TableRowColumn type="date" name="entryTime" component={(value) => {
											return (
												<KrDate value={value} format="yyyy-mm-dd" />
											)
										}}> </TableRowColumn>
										<TableRowColumn name="status"
											component={(value, oldValue) => {
												if (value == '未开通') {
													style = { 'color': '#FF5B52' }
												}else{
													style = {}
												}
												return (
													<div style={style}>{value}</div>
												)
											}}
										></TableRowColumn>
										<TableRowColumn type="operation" style={{width:'240px'}} component={(value,oldValue,detail)=>{
										return <span>
											    <span onClick={this.operationEdit.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>编辑</span>
												<span onClick={this.operationLeave.bind(this,value)}style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>离职</span>
												<span onClick={this.operationTransfer.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>调动</span>
												{value.hasAccount&&<span onClick={this.operationRemove.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>解除账号</span>}
												{!value.hasAccount&&<span onClick={this.operationAccount.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>开通账号</span>}
												{value.hasAccount&&<span onClick={this.operationCard.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>绑定门禁卡</span>}
											</span>
										}}>
										</TableRowColumn>
									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						</div>
					}
				</div>
				<Dialog
					title={dataName.orgName?dataName.orgName:'36Kr'}
					modal={true}
					open={this.state.openViewDialog}
					onClose={this.openViewDialog}
					contentStyle={{
						width: 685
					}}
				>
					<Viewdialog detail={this.state.searchParams} onCancel={this.openViewDialog} />
				</Dialog>
				<Dialog
					title={`编辑${dataName.orgName ? dataName.orgName : '36Kr'}`}
					modal={true}
					open={this.state.openEditDialog}
					onClose={this.openEditDialog}
					contentStyle={{
						width: 685
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
						width: 685
					}}
				>
					<CreateDialog params={this.props.params} detail={this.state.searchParams} onSubmit={this.onCreatSubmit} onCancel={this.openCreateDialog} />
				</Dialog>
				{/*高级查询*/}
				<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openHighSearch}
						onClose={this.openHighSearch}
						contentStyle={{width:685}}
					>
						<HighSearchForm
									onSubmit={this.onHighSearchSubmit}
									onCancel={this.openHighSearch}
									detail={this.state.searchParams}
						/>
					</Dialog>
				{/*新建用户*/}
				<AddPostPeople
					onCancel={this.openAddPerson}
					onSubmit={this.addPersonSubmit}
					open={this.state.openAddPerson}
					onClose={this.allClose}
					orgDetail={this.state.dataName}
				/>
				{/*离职*/}
					<Dialog
						title="离职"
						onClose={this.cancelLeave}
						open={this.state.openLeave}
						contentStyle ={{ width: '630px',height:'auto'}}
					>
					<Leave
					   onCancel={this.cancelLeave}
					   onSubmit={this.addLeaveSubmit}
					/>
					</Dialog>

					{/*解除帐号*/}
					<Dialog
						title="解除帐号"
						onClose={this.cancelRemove}
						open={this.state.openRemove}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<Remove
						onCancel={this.cancelRemove}
						onSubmit={this.addRemoveSubmit}
					/>
					</Dialog>

					{/*是否更换门禁卡*/}
					<Dialog
						title="提示"
						onClose={this.cancelSure}
						open={this.state.openSure}
						contentStyle ={{ width: '444px',height:'190px'}}
						stylesCard={true}
					>
					<IsSure
						onCancel={this.cancelSure}
						onSubmit={this.addSureSubmit}
					/>
					</Dialog>

					{/*开通帐号*/}
					<Dialog
						title="提示"
						onClose={this.cancelAccount}
						open={this.state.openAccount}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<OpenAccount
						onCancel={this.cancelAccount}
						onSubmit={this.addOpenSubmit}
					/>
					</Dialog>

					{/*人员调动*/}
					<Dialog
						title="人员调动"
						onClose={this.cancelTransfer}
						open={this.state.openTransfer}
						contentStyle ={{ width: '444px',overflow:'inherit'}}
					>
					<Transfer
						onCancel={this.cancelTransfer}
						onSubmit={this.addTransferSubmit}
						department = {transferDetail}
					/>
					</Dialog>

					{/*开通门禁*/}
					<Dialog
						title="绑定门禁卡"
						onClose={this.cancelCard}
						open={this.state.openCard}
						contentStyle ={{ width: '444px'}}
					>
					<OpenCard
						onCancel={this.cancelCard}
						onSubmit={this.addCardSubmit}
						employees = {employees}
					/>
					</Dialog>
			</div>
		);
	}
}
