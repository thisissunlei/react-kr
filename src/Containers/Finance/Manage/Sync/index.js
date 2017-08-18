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
	Drawer,
	SearchForms
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {
	Http,DateFormat
} from "kr/Utils";

import './index.less'
import State from './State';
// import BindCommunity from './BindCommunity';
import Create from './Create';
import Edit from './Edit';
import View from './View';


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
		if (type == 'view') {
			let orderId = itemDetail.id;
			State.showView(itemDetail)
		}
		if (type == 'edit') {
			console.log('=======',State.openEdit)
			let orderId = itemDetail.id
			State.showEdit(itemDetail);
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
	onSearchSubmit=(value)=>{
		console.log('value',value)
		let search = {
			page:1,
			pageSize:2,
			content:value.content
		}
		State.search = search;
	}
	communityList=(list)=>{
		let str = list.map((item)=>{
			return item.name+','
		})
		return str
	}



	render() {

		return (

			<div className='m-order-list'>
					<Title value="同步中心"/>
					<Section title="同步中心" description="" style={{marginBottom:-5,minHeight:910}}>
					<div>
						<span className="create" onClick={this.create}>创建</span>
						<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}} className="activity-serach"/>
					</div>
				<Table  style={{marginTop:10}}
						displayCheckbox={true}
						onLoaded={this.onLoaded}
						ajax={true}
						ajaxUrlName='get-tongbu-basic-list'
						ajaxParams={State.search}
						onOperation={this.onOperation}
						exportSwitch={false}
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
						<TableRowColumn name="mainbillname" component={(value,oldValue,itemData)=>{
														 return (<div style={{paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{DateFormat(itemData.operateTime,'yyyy/mm')}</span></div>)
													 }} ></TableRowColumn>
						<TableRowColumn name="syncSystemName"></TableRowColumn>
						<TableRowColumn name="syncMainPartName" ></TableRowColumn>
						<TableRowColumn name="stationnum"  component={(value,oldValue,itemData)=>{
							let str = this.communityList(itemData.cmts);
							console.log(str)
							var TooltipStyle=""
							if(str.length==""){
								TooltipStyle="none"

							}else{
								TooltipStyle="block";
							}
							 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{str}</span>
							 	<Tooltip offsetTop={5} place='top'><div style={{width:250}}>{str}</div></Tooltip></div>)
						}} ></TableRowColumn>
						<TableRowColumn name="name" ></TableRowColumn>
						<TableRowColumn name="operateTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
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
						onClose = {this.onCancel}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<View onSubmit={this.CreateSubmit} onCancel={this.onCancel} />
				  </Drawer>
				<Drawer
						title="编辑"
						open={State.openEdit}
						width={750}
						onClose = {this.onCancel}
						openSecondary={true}
						className='m-finance-drawer'
						containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					>
						<Edit onSubmit={this.CreateSubmit} onCancel={this.onCancel}/>
				  </Drawer>

			</div>

		);

	}

}
