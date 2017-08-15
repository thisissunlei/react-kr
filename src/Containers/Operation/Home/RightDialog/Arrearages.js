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
import {DateFormat,Money} from "kr/Utils";
import {
	observer
} from 'mobx-react';
@observer
class MonthPayment extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			customerId:''
		}
	}

	

	//导出
	onExportSign=(values)=>{
		var searchParams={
            cmtId:State.info.communityId,
			customerId:this.state.customerId
		}
		var where=[];
		for(var item in searchParams){
			if(searchParams.hasOwnProperty(item)){
			where.push(`${item}=${searchParams[item]}`);
			}
		}
		var url = `http://optest02.krspace.cn/api/krspace-finance-web/operation/cmt-arrearages-excel?${where.join('&')}`
		window.location.href = url;
	}

	searchSignChange=(value)=>{
		if(!value){
			value = {
				value :''
			}
		}
		this.setState({
			customerId:value.value
		})
	}


    
    

	render(){
		let {customerId} = this.state;
        
		return(
			<div className='detail-report' style={{height:470}}>
				<form style={{textAlign:'right',marginBottom:'-33px'}}>
						<KrField  grid={1/2}  	
							name="companyId" 
							inline={true} 
							component='searchSignCompanyName'  
							label="客户名称" 
							placeholder='请输入客户名称' 
							onChange={this.searchSignChange}
						/>
				</form>
	         <Table
                    ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={this.onExportSign}
                    ajaxParams={{
						page:1,
						pageSize:10,
						cmtId:State.info.communityId,
						customerId:customerId
					}}
                    ajaxUrlName='get-cmt-arrearages'
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>社区名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>客户名称</TableHeaderColumn>
                      <TableHeaderColumn className='header-row'>订单名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>履约保证金欠款</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>工位服务费欠款</TableHeaderColumn>
					  <TableHeaderColumn className='header-row' style={{width:250}}>账款周期</TableHeaderColumn>
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
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='mainbillName' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='deposit' component={(value,oldValue)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='rent' component={(value,oldValue)=>{
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='rent' component={(value,oldValue,itemData)=>{
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span>{DateFormat(itemData.periodStart,'yyyy-mm-dd')}至{DateFormat(itemData.periodEnd,'yyyy-mm-dd')}</span></div>)
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
