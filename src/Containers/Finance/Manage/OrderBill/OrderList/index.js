import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
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
	ListGroup,
	ListGroupItem,
	Title,
	Tooltip
} from 'kr-ui';

import './index.less'
//高级查询
import SearchUpperForm from './SearchUpperForm';
//搜索
import SearchForm from './SearchForm';



export default class AttributeSetting extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			openSearch: false,
			itemDetail: {},
			list: {},
			searchParams: {
				page: 1,
				pageSize: 15
			}

		}
	}

	
   
   //导出
	onExport=(values)=> {
		var searchParams = this.state.searchParams;
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/finaccount/data/exportExcel?searchParams=${searchParams}&idList=${idList}`
		window.location.href = url;
	}

	//操作相关(查看)
	onOperation=(type, itemDetail)=>{

		this.setState({
			itemDetail
		});

		if (type == 'view') {
			let orderId = itemDetail.id
			window.open(`./#/finance/Manage/orderbill/${orderId}/detail`,orderId);
		}
	}


	//搜索
	onSearchSubmit=(searchParams)=>{
		let obj = {
			mainbillname: searchParams.content,
			pageSize:15
		}
		this.setState({
			searchParams: obj
		});
	}

	//高级查询
	openSearchUpperDialog=()=>{
		this.setState({
			openSearch: !this.state.openSearch,
			searchParams:{
				pageSize:'15'
			}
		});
	}
   
   //高级搜索提交
	onSearchUpperSubmit=(searchParams)=>{
		searchParams = Object.assign({}, this.state.searchParams, searchParams);
		this.setState({
			searchParams,
			openSearch: !this.state.openSearch
		});

	}

	
    //加载完将所有的table数据都获取过来了
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}



	render() {

		let {
			list
		} = this.state;

		if (!list.totalCount) {
			list.sumcome = 0;
		}
		if (!list.totalCount) {
			list.sumAmount = 0;
		}



		return (

			<div className='m-order-list'>
					<Title value="订单账单列表_财务管理"/>
					<Section title="订单账单列表" description="" style={{marginBottom:-5,minHeight:910}}>

					<div  className='ui-orderList'><Grid style={{marginTop:-5}}>
						<Row>
							<Col md={7} align="left">
								<ListGroup >
									<div className="list-name">
									<span className='ui-incomeMoney'>
									</span>
									<span className="font-width">收入总额:</span>
									<span className="font-width font-num">{list.sumcome}</span>
									</div>
									<div className="list-name">
									<span className='ui-receiveMoney'>
									</span>
									<span className="font-width">回款总额:</span>
									<span className="font-width font-num">{list.sumAmount}</span>
									</div>
									<div className="list-name">
									<span className='ui-selfMoney'></span>

									<span className="font-width">余额:</span>
									<span className="font-width font-num">{list.summount}</span>
									</div>


								</ListGroup>
							</Col>
							<Col md={5} align="right" style={{marginTop:7}}>
								<ListGroup>
									<ListGroupItem> <SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
									<ListGroupItem> <Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>
								</ListGroup>
							</Col>
						</Row>
					</Grid></div>



				<Table  style={{marginTop:10}}
						displayCheckbox={true}
						onLoaded={this.onLoaded}
						ajax={true}
						ajaxFieldListName="finaContractMainbillVOList"
						ajaxUrlName='getFinaDataByList'
						ajaxParams={this.state.searchParams}
						onOperation={this.onOperation}
						exportSwitch={true}
						onExport={this.onExport}
						  >

					<TableHeader>
					<TableHeaderColumn>订单名称</TableHeaderColumn>
					<TableHeaderColumn>订单类型</TableHeaderColumn>
					<TableHeaderColumn>所在社区</TableHeaderColumn>
					<TableHeaderColumn>工位</TableHeaderColumn>
					<TableHeaderColumn>起始日期</TableHeaderColumn>
					<TableHeaderColumn>结束日期</TableHeaderColumn>
					<TableHeaderColumn>收入总额</TableHeaderColumn>
					<TableHeaderColumn>回款总额</TableHeaderColumn>
					<TableHeaderColumn>余额</TableHeaderColumn>
					<TableHeaderColumn>定金/押金</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn style={{width:160,overflow:"visible"}} name="mainbillname" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
						<TableRowColumn name="mainBillTypeName" options={[{label:'工位入驻订单',value:'STATION'}]}></TableRowColumn>
						<TableRowColumn style={{width:160,overflow:"visible"}} name="community" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
											}} ></TableRowColumn>
						<TableRowColumn name="stationnum"></TableRowColumn>
						<TableRowColumn name="contractEntrydate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="contractLeavedate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="come"></TableRowColumn>
						<TableRowColumn name="backMount"></TableRowColumn>
						<TableRowColumn name="mount"></TableRowColumn>
						<TableRowColumn name="rentOrDeposit"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openSearch}
						onClose={this.openSearchUpperDialog}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:687}}
					>
						<SearchUpperForm onSubmit={this.onSearchUpperSubmit} onCancel={this.openSearchUpperDialog} />

				   </Dialog>
			</div>

		);

	}

}
