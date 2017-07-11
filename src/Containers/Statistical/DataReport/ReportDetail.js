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
	Tooltip
} from 'kr-ui';
import './detail.less';
import State from './State.js';

export default class ReportDetail extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
		 searchParams:{}	
		}    
	}

	//导出
	onExport=(values)=>{
		let {searchParams}=this.state;
		let ids = [];
			if (values.length != 0) {
				values.map((item, value) => {
					ids.push(item.id)
				});
			}
		var where=[];
		for(var item in searchParams){
			if(searchParams.hasOwnProperty(item)){
			where.push(`${item}=${searchParams[item]}`);
			}
		}
		where.push(`ids=${ids}`);
		var url = `/api/krspace-finance-web/cmt/community/export?${where.join('&')}`
		window.location.href = url;
	}

	render(){

		let {searchParams}=this.state;
        
		return(
			<div className='detail-report'>
	         <Table
                    //ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={this.onExport}
                    //ajaxParams={searchParams}
                    //ajaxUrlName='station-list'
                    //ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>社区名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>客户来源</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>客户名称</TableHeaderColumn>
		              {State.isStation&&<TableHeaderColumn className='header-row'>意向工位</TableHeaderColumn>}
		              {State.isStation&&<TableHeaderColumn className='header-row'>联系人</TableHeaderColumn>}
		              {State.isStation&&<TableHeaderColumn className='header-row'>联系电话</TableHeaderColumn>}
		              <TableHeaderColumn className='header-row'>创建日期</TableHeaderColumn>
					  {!State.isStation&&<TableHeaderColumn className='header-row'>签约时间</TableHeaderColumn>}
					  {!State.isStation&&<TableHeaderColumn className='header-row'>签约用时</TableHeaderColumn>}
					  {!State.isStation&&<TableHeaderColumn className='header-row'>签约工位数</TableHeaderColumn>}
					  {!State.isStation&&<TableHeaderColumn className='header-row'>签约独立办公空间数</TableHeaderColumn>}
					  {!State.isStation&&<TableHeaderColumn className='header-row'>合同开始日期</TableHeaderColumn>}
					  {!State.isStation&&<TableHeaderColumn className='header-row'>合同结束日期</TableHeaderColumn>}
		              <TableHeaderColumn className='header-row'>领取人</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow className='detail-row'>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }} >12</TableRowColumn>
                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}>34</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} component={(value,oldValue)=>{
		 										var maxWidth=6;
		 										if(value.length>maxWidth){
		 										 value = value.substring(0,6)+"...";
		 										}
		 										return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 								 }}>34</TableRowColumn>
                            {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>dfg</TableRowColumn>
							{!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
							{!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>cv</TableRowColumn>
			               </TableRow>
                           <TableRow className='detail-row'>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>12</TableRowColumn>
                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>34</TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>34</TableRowColumn>
                            {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>dfg</TableRowColumn>
							{!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
							{!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>45</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>56</TableRowColumn>}
			                {!State.isStation&&<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>tu</TableRowColumn>}
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}}>cv</TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
	 </div>
	 );
  }
}
