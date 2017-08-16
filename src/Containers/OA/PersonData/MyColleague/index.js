
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
	Grid,
	Row,
	Col,
	Message,
	SliderTree,
} from 'kr-ui';

import SearchForm from './SearchForm';
import './index.less';
@inject("NavModel")
@observer
export default class MyColleague extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				orgId: '1',
				orgType: "ROOT",
				searchKey:'',
			},
			clickTreeData:{
				orgId:'1',
				orgName:'36kr',
				treeType: "ROOT",
			},
			tabSelect: 1,
			treeData: [],
			dimData: [],
			searchKey: '',
			styleBool: false,

			selectStyle: {
				'display': 'none'
			},
		}
	}

	//切换被点击
	checkTab = (item) => {
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=1;
		searchParams.searchKey = "";
		this.setState({
			  searchParams,
				tabSelect:item
		})
	}

	//树的处理方案判断什么类型可以点击
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
		//侧栏默认关闭
		/*const { NavModel } = this.props;
		NavModel.setSidebar();*/

		//获取树的数据
		this.getTreeData();

	}

	//改变页码暂不需要
	// onPageChange=(page)=>{
	// 	var searchParams = Object.assign({},this.state.searchParams);
	// 	searchParams.page=page;
	//
	// 	this.setState({
  //       searchParams
  //   })
  // }

	//搜索设置
	onSearchSubmit = (form) => {
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.searchKey = form.content;
		this.setState({
			searchParams
		})
	}

	// 树点击
	onSelect = (data) => {
		var _this = this;
		var searchParams = Object.assign({},this.state.searchParams);
		var clickTreeData = Object.assign(this.state.clickTreeData,data[0]);
		searchParams.orgId = data[0].orgId;
		searchParams.orgType = data[0].treeType;

		this.setState({
			searchParams,
			clickTreeData
		});

	}


	//树状图搜索
	change = (event) => {
		this.setState({
			searchKey: event.target.value || '',
		})
	}


	//获取树的数据
	getTreeData = () => {
		const _this = this;

		Http.request("role-dep-tree").then(function (response) {
			_this.setState({
				treeData: _this.fnTree(response.items),
			});
		}).catch(function (err) {
			Message.error(err.message);
		});
	}
	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		var type = this.state.searchParams.orgType;
		var id = this.state.searchParams.orgId;
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.juniorId)
			});
		}
		// var url = `/api/krspace-erp-web/dim/export-hrm-org-excel?orgIds=${ids}&dimId=${dimId}&superOrgId=${id}&orgType=${type}`
		// window.location.href = url;
	}
//导出第二个表单
	onExportHrm=(values)=>{
		let ids = [];
		var type = this.state.searchParams.orgType;
		var id = this.state.searchParams.orgId;

		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.hrmId)
			});
		}
		// var url = `/api/krspace-erp-web/dim/export-hrm-resource-excel?hrmResourceIds=${ids}&dimId=${dimId}&orgId=${id}&orgType=${type}`
		// window.location.href = url;
	}
	render() {
		let {data,styleBool,clickTreeData} = this.state;
		var logFlag = '';
		var orgtype = this.state.searchParams.orgType;
		var style = {};
		var index = 0;

		return (
			<div className="g-oa-labour">
				<div className="left">
					<div className="header">
					{/*颜色*/}
						<span className="title">
						{/*维度名称*/}
							<span className="title-text">{"我的同事"}</span>

							<span className="title-list" style={this.state.selectStyle}>
								{this.state.dimData.map((item, index) => { return this.renderDimList(item, index) })}
							</span>
							{this.state.dimData.length>0
								&&
								<span className="square"></span>
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
						{/*图标*/}
							<div className={`department-logo ${orgtype}`}>

							</div>
							<div className="department-name">
							{/*产品技术部*/}
								{ clickTreeData.orgName|| '无'}
							</div>
							<div className="department-tab-list">
								<div className={`department-tab ${this.state.tabSelect == 1 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 1)}>
									我的同事
									</div>
								<div className={`department-tab ${this.state.tabSelect == 2 ? 'department-tab-active' : ''}`} onClick={this.checkTab.bind(this, 2)}>
									我的下属
									</div>
							</div>

						</div>


					</div>

					{/*我的同事*/}
					{this.state.tabSelect == 1 &&
						<div>
							<Grid style={{ marginBottom: 20, marginTop: 20 }}>
								<Row>
									<Col md={12} align="right">
										<div className="u-search">
											<SearchForm onSubmit={this.onSearchSubmit}/>
										</div>
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
								onExport={this.onExport}
								exportSwitch={true}
							>
								<TableHeader>
									<TableHeaderColumn>姓名</TableHeaderColumn>
									<TableHeaderColumn>分部</TableHeaderColumn>
									<TableHeaderColumn>部门</TableHeaderColumn>
									<TableHeaderColumn>直接上级</TableHeaderColumn>
									<TableHeaderColumn>职务</TableHeaderColumn>
									<TableHeaderColumn>邮箱</TableHeaderColumn>
									<TableHeaderColumn>手机号</TableHeaderColumn>
									<TableHeaderColumn>入职时间</TableHeaderColumn>
									<TableHeaderColumn>员工状态</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow>
										{/*我的同事的表格*/}
										<TableRowColumn name="identifier"></TableRowColumn>

									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						</div>
					}

					{/*我的同事*/}
					{
						this.state.tabSelect == 2 &&
						<div>
							<Grid style={{ marginBottom: 20, marginTop: 20 }}>
								<Row>
									<Col md={12} align="right">
										<div className="u-search">
											<SearchForm onSubmit={this.onSearchSubmit}/>
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
								onExport={this.onExportHrm}
								exportSwitch={true}
							>
								<TableHeader>
									<TableHeaderColumn>姓名</TableHeaderColumn>
									<TableHeaderColumn>分部</TableHeaderColumn>
									<TableHeaderColumn>部门</TableHeaderColumn>
									<TableHeaderColumn>直接上级</TableHeaderColumn>
									<TableHeaderColumn>职务</TableHeaderColumn>
									<TableHeaderColumn>邮箱</TableHeaderColumn>
									<TableHeaderColumn>手机号</TableHeaderColumn>
									<TableHeaderColumn>入职时间</TableHeaderColumn>
									<TableHeaderColumn>员工状态</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow>
										{/*我的下属的表格*/}
										<TableRowColumn name="identifier"></TableRowColumn>
									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						</div>
					}
				</div>
			</div>
		);
	}
}
