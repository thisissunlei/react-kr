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
	KrField,
	SearchForms
} from 'kr-ui';
import {reduxForm} from 'redux-form';
import State from '../State';
import '../detail.less';
import {
	observer
} from 'mobx-react';
@observer
class MonthPayment extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	

	//导出
	onExportSign=(values)=>{
		var searchParams={
            cmtId:State.info.communityId
		}
		var where=[];
		for(var item in searchParams){
			if(searchParams.hasOwnProperty(item)){
			where.push(`${item}=${searchParams[item]}`);
			}
		}
		var url = `http://optest.krspace.cn/api/krspace-finance-web/operation/signed-customer-excel?${where.join('&')}`
		window.location.href = url;
	}


    
    

	render(){
        
		return(
			<div className='detail-report' style={{height:470}}>
	         <Table
                    ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={this.onExportSign}
                    ajaxParams={{
						page:1,
						pageSize:10,
						cmtId:State.info.communityId
					}}
                    ajaxUrlName='get-signed-customer'
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>社区名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>客户名称</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>工位/独立办公空间数</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>起租日期</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>结束日期</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>联系人</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>联系电话</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow className='detail-row'>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='community' component={(value,oldValue)=>{
		 						var maxWidth=6;
		 						if(value.length>maxWidth){
		 						 value = value.substring(0,6)+"...";
		 						}
		 						return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}} ></TableRowColumn>

                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='customer' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>

			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='customer' component={(value,oldValue,itemData)=>{
		 							let values = itemData.stations + '/'+itemData.boardrooms;
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{values}</span><Tooltip offsetTop={8} place='top'>{values}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseStart' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseEnd' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='contact' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='phone' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
	 </div>
	 );
  }
}
export default reduxForm({ form: 'MonthPayment',enableReinitialize:true,keepDirtyOnReinitialize:true})(MonthPayment);
