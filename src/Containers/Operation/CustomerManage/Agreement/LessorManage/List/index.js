import React, {
	Component
} from 'react';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	reduxForm,
  initialize,
  change
} from 'redux-form';
import './index.less';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Http} from 'kr/Utils';
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
	Drawer,
	Tooltip,
	KrDate,
	Notify
} from 'kr-ui';


import NewCreateForm from './NewCreateForm/index.js';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail/index.js';
import EditDetailForm from './EditDetailForm/index.js';


export default class LessorManageList extends Component {

	constructor(props, context) {
		super(props, context);


		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			itemDetail: {},
			params: {
				cmtId:'',
				corporationName:'',
				page: 1,
				pageSize: 15,
				other:false,
			},
			pageSize: 15,
			page: 1,
			totalCount: 1,

		}

	}

	componentDidMount() {

	}

	onExport = (values) => {
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-sso-web/dict/corpora/export?corporationIdList=${idList}`
		window.location.href = url;
	}


	//操作相关
	onOperation = (type, itemDetail) => {
		if (type == 'view') {
			this.openViewDialog();
			this.getDetailData(itemDetail.id,"view")
		} else if (type == 'edit') {

			this.openEditDetailDialog();
			this.getDetailData(itemDetail.id,"edit")
		}
	}


	//编辑
	openEditDetailDialog = () => {
		this.setState({
			openEditDetail: !this.state.openEditDetail,
			itemDetail:{}
		});

	}

	NewAndEditSubmit = () => {
		let params = Object.assign({},this.state.params);
		params.other = new Date();
		params.pageSize = 15;
		this.setState({
			params
		})

	}

	onClose = () =>{
		this.setState({
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
		})
	}
	//查看
	openViewDialog = () => {
		this.setState({
			openView: !this.state.openView
		});
	}
	//获取详情页信息
	getDetailData = (id,type) =>{
		let values = {id:id}
		const self = this;
		Http.request('getFnaCorporation',values).then(function(response) {
			self.setState({
				itemDetail:response,
			})
			if(type == "edit"){
				Store.dispatch(change('editDetailForm','bankAccount',response.bankAccount.length?response.bankAccount:[{}]));
				Store.dispatch(initialize('editDetailForm',response));
			}
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	//搜索
	onSearchSubmit = (values) => {
		const {params} = this.state;
		let newParams = Object.assign({},params);
		newParams.corporationName = values.corporationName;
		newParams.page = 1;
		this.setState({
			params : newParams
		})
	}

	//新建
	openNewCreateDialog = () => {
		this.setState({
			openNewCreate: !this.state.openNewCreate
		});
	}



	componentWillUnmount(){


	}

	onNewCreateCancel = () => {
		this.openNewCreateDialog();
	}

	onChange = (values) =>{
		const {params} = this.state;
		let newParams = Object.assign({},params);
		newParams.cmtId = values.value || '';
		newParams.page = 1;
		this.setState({
			params : newParams
		})
	}
	pageChange = (page) =>{
		var searchParams = Object.assign({}, this.state.params);
		searchParams.page = page;
		this.setState({
			params : searchParams
		})
	}

	render() {
		const {bindCmtData,editReadyData} = this.state;

		return (

			<div className="hireFn">
						<Title value="我方合同主体-氪空间后台管理系统"/>
					<BreadCrumbs children={['系统运营','合同信息','出租方管理']}/>
					<Section title="出租方管理" description="" style={{marginBottom:-5,minHeight:910}}>

					<Grid style={{marginBottom:20}}>
						<Row>
							<Col md={4}  align="left">

								<Button width="100" label="新建出租方" joinEditForm onTouchTap={this.openNewCreateDialog} operateCode="lessor_management_edit"/>

							</Col>
							<Col md={8} align="right">
									<SearchForm onChange = {this.onChange} onSubmit={this.onSearchSubmit} />
							</Col>
						</Row>
					</Grid>
				<Table  ajaxFieldListName="items"
						style={{marginTop:10}}
						displayCheckbox={true}
						ajax={true}
						ajaxUrlName='fnaCorporationList'
						ajaxParams={this.state.params}
						onOperation={this.onOperation}
						exportSwitch={true}
						onExport={this.onExport}
						onPageChange = {this.pageChange}
				>
						<TableHeader>
							<TableHeaderColumn>ID</TableHeaderColumn>
							<TableHeaderColumn>出租方名称</TableHeaderColumn>
							<TableHeaderColumn>绑定社区</TableHeaderColumn>



							<TableHeaderColumn>地址</TableHeaderColumn>
							<TableHeaderColumn>创建人</TableHeaderColumn>
							<TableHeaderColumn>创建时间</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>

						<TableBody >
							 <TableRow displayCheckbox={true}>
							<TableRowColumn  name="id"></TableRowColumn>
							<TableRowColumn name="corName" component={
								(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="inline-block";
									}
										return (<div
													style={{display:TooltipStyle,paddingTop:5}}
													className='financeDetail-hover'
												>
													<span
														className='tableOver'
														style={{
																maxWidth:130,
																display:"inline-block",
																overflowX:"hidden",
																textOverflow:"ellipsis",
																whiteSpace:"nowrap"
															}}
													>{value}</span>
													<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												</div>)
								}
							}></TableRowColumn>


							<TableRowColumn name="community" component={
								(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="inline-block";
									}
										return (<div
													style={{display:TooltipStyle,paddingTop:5}}
													className='financeDetail-hover'
												>
													<span
														className='tableOver'
														style={{
																maxWidth:130,
																display:"inline-block",
																overflowX:"hidden",
																textOverflow:"ellipsis",
																whiteSpace:"nowrap"
															}}
													>{value}</span>
													<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												</div>)
								}
							}></TableRowColumn>


							<TableRowColumn name="corAddress" component={
								(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="inline-block";
									}
										return (<div
													style={{display:TooltipStyle,paddingTop:5}}
													className='financeDetail-hover'
												>
													<span
														className='tableOver'
														style={{
																maxWidth:130,
																display:"inline-block",
																overflowX:"hidden",
																textOverflow:"ellipsis",
																whiteSpace:"nowrap"
															}}
													>{value}</span>
													<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												</div>)
								}
							}></TableRowColumn>
							<TableRowColumn name="createName"></TableRowColumn>
							<TableRowColumn name="createdate" component={
								(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="inline-block";
									}
										return (<div
													style={{display:TooltipStyle,paddingTop:5}}
													className='financeDetail-hover'
												>
													<span
														className='tableOver'
														style={{
																maxWidth:130,
																display:"inline-block",
																overflowX:"hidden",
																textOverflow:"ellipsis",
																whiteSpace:"nowrap"
															}}
													>
														<KrDate value={value} format="yyyy-mm-dd"/>
													</span>
													<Tooltip offsetTop={5} place='top'>
														<KrDate value={value} format="yyyy-mm-dd"/>
													</Tooltip>
												</div>)
								}
							} ></TableRowColumn>
							<TableRowColumn>
								   <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit" operateCode="lessor_management_edit"/>

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
						onClose = {this.onClose}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}

					>
						<NewCreateForm bindCmtData = {bindCmtData} onSubmit={this.NewAndEditSubmit} onCancel={this.openNewCreateDialog} />

				  </Drawer>


					<Drawer
						title="编辑出租方"
						open={this.state.openEditDetail}
						width={750}
						onClose = {this.onClose}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}

					>

						<EditDetailForm  detail={this.state.itemDetail} onSubmit={this.NewAndEditSubmit} onCancel={this.openEditDetailDialog} />

				  </Drawer>

					<Drawer
						title="查看出租方"
						open={this.state.openView}
						width={750}
						onClose = {this.onClose}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<ItemDetail detail={this.state.itemDetail} onCancel={this.openViewDialog} />
				  </Drawer>


			</div>

		);

	}

}
