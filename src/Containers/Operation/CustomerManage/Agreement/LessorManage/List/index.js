import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import './index.less';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	BreadCrumbs,
	Title,
	Drawer
} from 'kr-ui';


import NewCreateForm from './NewCreateForm';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail';
import EditDetailForm from './EditDetailForm/index.js';


export default class LessorManageList extends Component {

	constructor(props, context) {
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openViewDialog = this.openViewDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onExport = this.onExport.bind(this);
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			itemDetail: {},
			params: {
				page: 1,
				pageSize: 15
			},
			pageSize: 15,
			page: 1,
			totalCount: 1,
		}
	}

	componentDidMount() {

	}


	onExport(values) {
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-finance-web/fnacorporationDataExport?corporationIdList=${idList}`
		window.location.href = url;
	}


	//操作相关
	onOperation(type, itemDetail) {

		this.setState({
			itemDetail
		});

		if (type == 'view') {
			this.openViewDialog();
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}

	//编辑
	openEditDetailDialog() {
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}

	onEditSubmit() {
		this.openEditDetailDialog();

		window.setTimeout(function() {
			window.location.reload();
		}, 0);

	}

	//查看
	openViewDialog() {
		this.setState({
			openView: !this.state.openView
		});
	}


	//搜索
	onSearchSubmit(params) {
		params = Object.assign({}, params);
		this.setState({
			params
		});
	}

	//新建
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate
		});
	}

	onNewCreateSubmit(form) {
		window.location.reload();
	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}

	render() {

		return (

			<div className="hireFn">
						<Title value="出租方管理_社区经营"/>
					<BreadCrumbs children={['系统运营','合同信息','出租方管理']}/>
					<Section title="出租方管理" description="" style={{marginBottom:-5,minHeight:910}}>

					<Grid style={{marginBottom:20}}>
						<Row>
							<Col md={4}  align="left"> <Button width="100" label="新建出租方" joinEditForm onTouchTap={this.openNewCreateDialog} /> </Col>
							<Col md={8} align="right">
									<SearchForm onSubmit={this.onSearchSubmit} />
							</Col>
						</Row>
					</Grid>
				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='fnaCorporationList' ajaxParams={this.state.params} onOperation={this.onOperation}  exportSwitch={true} onExport={this.onExport}>
						<TableHeader>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>出租方名称</TableHeaderColumn>

							<TableHeaderColumn>是否启用</TableHeaderColumn>
							<TableHeaderColumn>地址</TableHeaderColumn>
							<TableHeaderColumn>创建人</TableHeaderColumn>
							<TableHeaderColumn>创建时间</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>

						<TableBody >
							 <TableRow displayCheckbox={true}>
							<TableRowColumn  name="id"></TableRowColumn>
							<TableRowColumn name="corporationName"></TableRowColumn>
							<TableRowColumn name="enableflag" options={[{value:'ENABLE',label:'是'},{value:'DISENABLE',label:'否'}]}></TableRowColumn>
							<TableRowColumn name="corporationAddress"></TableRowColumn>
							<TableRowColumn name="createName"></TableRowColumn>
							<TableRowColumn name="createdate" type="date"></TableRowColumn>
							<TableRowColumn>
								   <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit"/>
							 </TableRowColumn>
						 </TableRow>
						</TableBody>

						<TableFooter></TableFooter>

					</Table>


					</Section>

					<Drawer
						title="新建出租方"
						open={this.state.openNewCreate}
						width={750}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}

					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Drawer>


					<Drawer
						title="编辑出租方"
						open={this.state.openEditDetail}
						width={750}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}

					>
						{/*<div>ijsdfsf</div>*/}

						<EditDetailForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />

				  </Drawer>

					<Drawer
						title="查看出租方"
						open={this.state.openView}
						width={750}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<ItemDetail  detail={this.state.itemDetail} onCancel={this.openViewDialog} />
				  </Drawer>


			</div>

		);

	}

}
