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
import {DateFormat,Money} from "kr/Utils";
import State from '../State';
import '../detail.less';
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
		var url = location.protocol +"//"+`op.krspace.cn/api/krspace-finance-web/operation/settled-customer-excel?${where.join('&')}`
		window.location.href = url;
	}

	searchSignChange=(value)=>{
		if(!value){
			value = {
				value:''
			}
		}
		this.setState({
			customerId:value.value
		})
	}


    
    

	render(){
		let {customerId} = this.state;
        
		return(
			<div className='detail-report' style={{height:489}}>
				<form style={{textAlign:'right',marginBottom:'-20px',marginTop:10}}>
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
                    ajaxUrlName='get-settled-customer'
                    ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn className='header-row'>社区名称</TableHeaderColumn>
		              <TableHeaderColumn className='header-row'>客户名称</TableHeaderColumn>
                      <TableHeaderColumn className='header-row' style={{width:120}}>工位/独立办公空间数</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>起租日期</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>结束日期</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>费用总额</TableHeaderColumn>
					  <TableHeaderColumn className='header-row'>缴费总额</TableHeaderColumn>
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
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB',width:120}} name='customer' component={(value,oldValue,itemData)=>{
		 							let values = itemData.stations + '/'+itemData.boardrooms;
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{values}</span><Tooltip offsetTop={8} place='top'>{values}</Tooltip></div>)
		 					}}></TableRowColumn>
			                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseStart' component={(value,oldValue,itemData)=>{
		 							var maxWidth=6;
		 							if(value.length>maxWidth){
		 							 value = value.substring(0,6)+"...";
		 							}
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{DateFormat(itemData.leaseStart,'yyyy-mm-dd')}</span></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='leaseEnd' component={(value,oldValue,itemData)=>{
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{DateFormat(itemData.leaseEnd,'yyyy-mm-dd')}</span></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='expenses' component={(value,oldValue)=>{
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{Money(value)}</span></div>)
		 					}}></TableRowColumn>
		 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='payAmount' component={(value,oldValue)=>{
		 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{Money(value)}</span></div>)
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
