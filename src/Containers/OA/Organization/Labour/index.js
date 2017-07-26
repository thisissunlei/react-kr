
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
				status:'0'
			},
			selectStyle: {
				'display': 'none'
			},
			dimIdStatus:'0',
		}
	}
	checkTab = (item) => {
		this.setState({
			tabSelect: item,
		})
	}
	componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		console.log("进入~··");
		var dimId = this.props.params.dimId;
		var _this = this;
		
		Http.request('extra-list', {
			dimId: dimId
		}).then(function (response) {
			_this.setState({ dimData: response.items })
		}).catch(function (err) { });

		this.getDimensionalityDetail();

		this.initSelect();

		this.getTreeData();
		this.getMainDimId();
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
	data.depId=data.depId.orgId;
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
	onSerchSubmit = (form) => {
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
				dimId: this.props.params.dimId,
				nameAndEmail: form.content,
			}
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
		console.log(this.state.styleBool);
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
			console.log(this.state.searchKey);
			//this.refs.searchKey.click();
			//this.refs.searchKey.focus();
		})
	}
	clickSelect = () => {
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
				treeData: [response],
			});
		}).catch(function (err) {
			Message.error(err.message);
		});
	}

	render() {
		let { itemDetail, data, dimId, styleBool,dataName} = this.state;
		var logFlag = '';
		var style = {};
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
							<span className="square">

							</span>
						</span>

					</div>
					<div className="search">
						<input type="text" onChange={this.change} placeholder="输入机构名称" ref="searchKey"/>
						<span className="searching">

						</span>
					</div>
					<div className="oa-tree">
						<SliderTree
							onSelect={this.onSelect}
							onCheck={this.onCheck}
							type="department-radio"
							treeData={this.state.treeData}
							searchKey={this.state.searchKey}
						/>
					</div>
				</div>
				<div className="right">
					<div className="center-row">
						<div className="department">
							<div className="department-logo">

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
								style={{ marginTop: 10 }}
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
											<SearchForm onSubmit={this.onSerchSubmit} />
										</div>
									</Col>
								</Row>
							</Grid>
							<Table
								style={{ marginTop: 10 }}
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
										<TableRowColumn name="email"></TableRowColumn>
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

				{/*新建用户*/}
				<AddPostPeople 
					onCancel={this.openAddPerson}
					onSubmit={this.addPersonSubmit}
					open={this.state.openAddPerson} 
					onClose={this.allClose}  
					departMent={this.state.dataName.orgName}
				/>
			</div>
		);
	}
}
