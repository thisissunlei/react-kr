import React from 'react';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Tooltip,
	KrDate
} from 'kr-ui';
import './index.less';


export default class ViewIntegration extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15,
				customerId:this.props.detail.customerId
			}
			
		}
		
	}
	

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			
			let {
				infoList,
				ifCity,
			}=this.state;
			const {detail}=this.props;
			
		return (
			<div className="g-view-integration">
				<div className="u-create-title">
						<div className="title-text"><span className="u-view-customerName">{detail.customerName}</span>—积分消费记录</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<div style={{paddingLeft:50}}>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-point-detail'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  displayCheckbox={false}
					  >
				            <TableHeader>
				              <TableHeaderColumn>社区</TableHeaderColumn>
				              <TableHeaderColumn>记录描述</TableHeaderColumn>
				              <TableHeaderColumn>积分</TableHeaderColumn>
				              <TableHeaderColumn>创建时间</TableHeaderColumn>
				              <TableHeaderColumn>操作人</TableHeaderColumn>
				          	</TableHeader>
					        <TableBody >
					              <TableRow>
					                <TableRowColumn 
					                		name="cmtName"
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (
													<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
													<span className='tableOver' style={{maxWidth:100,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 		<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												 	</div>
												)
											}} ></TableRowColumn>
					                <TableRowColumn 
					                		name="descr" 
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (
													<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
													<span className='tableOver' style={{maxWidth:180,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 		<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												 	</div>
												)
											}}></TableRowColumn>
					                <TableRowColumn name="pointAmount" ></TableRowColumn>
					                <TableRowColumn 
					                	name="cDate" 
					                	component={(value) => {
					                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
					                    }}
					                ></TableRowColumn>
					                <TableRowColumn 
					                		name="operater" 
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (
													<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
													<span className='tableOver' style={{maxWidth:150,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 		<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												 	</div>
												)
											}} ></TableRowColumn>
									
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
				</div>
			</div>
		);
	}
}



