import React from 'react';
import {
	Section,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    TableFooter,
	Tooltip,
	KrDate,
	SearchForms
} from 'kr-ui';
import './detail.less';
import State from './State.js';
import {
	observer
} from 'mobx-react';
@observer
export default class ReportDetail extends React.Component{

	constructor(props,context){
		super(props, context);
	}



	//导出
	onExportSign=(values)=>{
		var searchParams={
            cityId:State.detailCityId,
			communityId:State.detailCommunityId,
			sourceId:State.sourceId,
			searchStartDate:State.searchStartDate,
			searchEndDate:State.searchEndDate
		}
		var where=[];
		for(var item in searchParams){
			if(searchParams.hasOwnProperty(item)){
			where.push(`${item}=${searchParams[item]}`);
			}
		}
		var url = `http://op.krspace.cn/api/krspace-finance-web/csr/source/stat/export/type/sign?${where.join('&')}`
		window.location.href = url;
	}

	//导出
	onExportAdd=(values)=>{
		var searchParams={
            cityId:State.detailCityId,
			communityId:State.detailCommunityId,
			sourceId:State.sourceId,
			searchStartDate:State.searchStartDate,
			searchEndDate:State.searchEndDate
		}
		var where=[];
		for(var item in searchParams){
			if(searchParams.hasOwnProperty(item)){
			where.push(`${item}=${searchParams[item]}`);
			}
		}
		var url = `http://op.krspace.cn/api/krspace-finance-web/csr/source/stat/export/type/add?${where.join('&')}`
		window.location.href = url;
	}


	/*onSearchSubmit=(value)=>{
      console.log('value',value);
	}*/

	render(){

		return(
			<div className='detail-report'>
			 {/*<div className='report-search'><SearchForms placeholder='请输入关键字'  onSubmit={this.onSearchSubmit}/></div>*/}
	         <Table
                    ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={State.isAdd=='sign'?this.onExportSign:this.onExportAdd}
                    ajaxParams={{
						searchStartDate:State.searchStartDate,
						searchEndDate:State.searchEndDate,
						page:State.page,
						pageSize:State.pageSize,
						cityId:State.detailCityId,
						communityId:State.detailCommunityId,
						sourceId:State.sourceId,
					}}
                    ajaxUrlName={State.isAdd=='sign'?'report-sign-detail':'report-station-detail'}
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>社区名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>客户来源</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>客户名称</TableHeaderColumn>
		              {State.isAdd=='add'&&<TableHeaderColumn className='header-row'>意向工位</TableHeaderColumn>}
		              {State.isAdd=='add'&&<TableHeaderColumn className='header-row'>联系人</TableHeaderColumn>}
		              {State.isAdd=='add'&&<TableHeaderColumn className='header-row'>联系电话</TableHeaderColumn>}
		              <TableHeaderColumn className='header-row'>创建日期</TableHeaderColumn>
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>签约时间</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>签约用时</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>工位数</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>独立办公空间数</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>合同开始日期</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>合同结束日期</TableHeaderColumn>}
					  {State.isAdd=='sign'&&<TableHeaderColumn className='header-row'>销售员</TableHeaderColumn>}
		              {State.isAdd=='add'&&<TableHeaderColumn className='header-row'>领取人</TableHeaderColumn>}
		          	</TableHeader>

			        <TableBody >
			              <TableRow className='detail-row'>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='communityName' component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} ></TableRowColumn>
                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='sourceName' component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='company' component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}></TableRowColumn>
                            {State.isAdd=='add'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='stationNum'></TableRowColumn>}
			                {State.isAdd=='add'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='name'></TableRowColumn>}
			                {State.isAdd=='add'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='tel'></TableRowColumn>}
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='createDate' component={(value,oldValue)=>{
		 										return (<KrDate value={value} format="yyyy-mm-dd"/>)
		 					}}
							></TableRowColumn>
							{State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='signDate' component={(value,oldValue)=>{
		 										return (<KrDate value={value} format="yyyy-mm-dd"/>)
		 					}}></TableRowColumn>}
			                {State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='useTime'></TableRowColumn>}
			                {State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='stationNum'></TableRowColumn>}
							{State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='boardroomNum'></TableRowColumn>}
			                {State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseBeginDate' component={(value,oldValue)=>{
		 										return (<KrDate value={value} format="yyyy-mm-dd"/>)
		 					}}></TableRowColumn>}
			                {State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseEndDate' component={(value,oldValue)=>{
		 										return (<KrDate value={value} format="yyyy-mm-dd"/>)
		 					}}></TableRowColumn>}
		 					{State.isAdd=='sign'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='salesman' ></TableRowColumn>}
			                {State.isAdd=='add'&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}  name='receiveName' component={(value,oldValue)=>{
								                 var param='';
								                 if(value){
													param=value;
												 }else{
													param='-'
												 }
		 										return (<span>{param}</span>)
		 					}}></TableRowColumn>}
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
	 </div>
	 );
  }
}
