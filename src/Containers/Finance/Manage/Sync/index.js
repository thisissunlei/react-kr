import React from 'react';
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
	ListGroup,
	ListGroupItem,
	Title,
	Tooltip,
	Drawer
} from 'kr-ui';
import {
	observer
} from 'mobx-react';

import './index.less'
import State from './State';
// import BindCommunity from './BindCommunity';
import Create from './Create';


@observer
export default class AttributeSetting extends React.Component {

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
		State.getBasicData()
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
			console.log('====view===')
			let orderId = itemDetail.id
		}
		if (type == 'edit') {
			let orderId = itemDetail.id
			console.log('====edit===')
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
	create=()=>{
		State.openCreate = true;
		console.log('-----',State.openCreate)
	}
	onCancel=()=>{
		State.openCreate = false;
		State.openView = false;
		State.openEdit = false;
	}
	CreateSubmit=()=>{
		State.openCreate = false;
	}



	render() {

		return (

			<div className='m-order-list'>
					<Title value="同步中心"/>
					<Section title="同步中心" description="" style={{marginBottom:-5,minHeight:910}}>
					<div>
						<span className="create" onClick={this.create}>创建</span>
					</div>
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
					<TableHeaderColumn>同步月份</TableHeaderColumn>
					<TableHeaderColumn>同步系统</TableHeaderColumn>
					<TableHeaderColumn>同步主体</TableHeaderColumn>
					<TableHeaderColumn>同步社区</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>
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
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>


				</Table>

					</Section>
			    <Drawer
						title="新建"
						open={State.openCreate}
						width={750}
						onClose = {this.onCancel}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<Create onSubmit={this.CreateSubmit} onCancel={this.onCancel}/>
				  </Drawer>
				<Drawer
						title="查看"
						open={State.openView}
						width={750}
						onClose = {this.onClose}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<Create />
				  </Drawer>
				<Drawer
						title="编辑"
						open={State.openEdit}
						width={750}
						onClose = {this.onClose}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<Create />
				  </Drawer>

			</div>

		);

	}

}
