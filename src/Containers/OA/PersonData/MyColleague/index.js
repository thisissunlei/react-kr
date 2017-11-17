
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
	KrDate,
	Message,
	SliderTree,
	Dictionary
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
				telephoneKey:'',
				emailKey:'',
				nameKey:'',
				jobDescrKey:''
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
		searchParams.telephoneKey = "";
		searchParams.emailKey = "";
		searchParams.nameKey = "";
		searchParams.jobDescrKey = "";
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
		// const { NavModel } = this.props;
		// NavModel.setSidebar();

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
		searchParams.telephoneKey = form.content;
		searchParams.emailKey = form.content;
		searchParams.nameKey = form.content;
		searchParams.jobDescrKey=form.content;
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
		Http.request("colla-list").then(function (response) {
		//Http.request("role-dep-tree").then(function (response) {

			_this.setState({
				//treeData: _this.fnTree([response]),
				treeData:_this.fnTree([response.items])
			});
		}).catch(function (err) {
			Message.error(err.message);
		});
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
							<div className={`department-logo ${orgtype}`} style={{backgroundSize:'cover'}}>

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
						<div className='colleague-report'>
							<Table
								style={{marginTop:10,position:'inherit'}}
								displayCheckbox={false}
								ajax={true}
								ajaxUrlName='myColleague'
								ajaxFieldListName="items"
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
							>
								<TableHeader className='detail-header'>
									<TableHeaderColumn className='header-row'>姓名</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>分部</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>部门</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>直接上级</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>职务</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>邮箱</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>座机</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>职务描述</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>员工状态</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow className='detail-row'>
										{/*我的同事的表格*/}
										<TableRowColumn  style={{borderRight:'solid 1px #E1E6EB'}} name='name'></TableRowColumn>
										<TableRowColumn  style={{borderRight:'solid 1px #E1E6EB'}} name='subName'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='depName' component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaderName'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='jobName' component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='email' component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='telephone'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='jobDescr' component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											if(!oldValue){
												oldValue='无';
												value='无';
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='status' component={(value,oldValue,detail)=>{
											 return <Dictionary type='ERP_ResourceStatus' value={value}/>
										}}></TableRowColumn>
									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						 </div>
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
						<div className='colleague-report'>
							<Table
								style={{ marginTop: 10 }}
								displayCheckbox={false}
								ajax={true}
								ajaxUrlName='myLower'
								ajaxFieldListName="items"
								ajaxParams={this.state.searchParams}
								onOperation={this.onOperation}
							>
								<TableHeader className='detail-header'>
									<TableHeaderColumn className='header-row'>姓名</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>分部</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>部门</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>直接上级</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>职务</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>邮箱</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>座机</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>职务描述</TableHeaderColumn>
									<TableHeaderColumn className='header-row'>员工状态</TableHeaderColumn>
								</TableHeader>

								<TableBody>
									<TableRow className='detail-row'>
										{/*我的下属的表格*/}
										<TableRowColumn  style={{borderRight:'solid 1px #E1E6EB'}} name='name'></TableRowColumn>
										<TableRowColumn  style={{borderRight:'solid 1px #E1E6EB'}} name='subName'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='depName'  component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaderName'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='jobName'  component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='email'  component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='telephone'></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='jobDescr'  component={(value,oldValue)=>{
											var maxWidth=10;
											if(value.length>maxWidth){
											 value = value.substring(0,10)+"...";
											}
											if(!oldValue){
												oldValue='无';
												value='无';
											}
											return (<div  className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
									 }}></TableRowColumn>
										<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='status' component={(value,oldValue,detail)=>{
											 return <Dictionary type='ERP_ResourceStatus' value={value}/>
										}}></TableRowColumn>
									</TableRow>
								</TableBody>
								<TableFooter></TableFooter>
							</Table>
						 </div>
						</div>
					}
				</div>
			</div>
		);
	}
}
