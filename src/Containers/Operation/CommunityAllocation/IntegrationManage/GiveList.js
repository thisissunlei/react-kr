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
	DrawerTitle,
	KrDate
} from 'kr-ui';
import './index.less';


export default class GiveList extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15,
				companyId:this.props.detail.customerId
			}
			
		}
		
	}
	

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			const {detail}=this.props;
		return (
			<div className="g-give-list-integration">
				<div className="u-create-title">
					<DrawerTitle title ={detail.customerName+'—积分充值记录'} onCancel = {this.onCancel}/>
				</div>
				<div style={{paddingLeft:50}}>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='charge-list'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  displayCheckbox={false}
					  >
				            <TableHeader>
				              <TableHeaderColumn>充值金额</TableHeaderColumn>
				              <TableHeaderColumn>剩余金额</TableHeaderColumn>
				              <TableHeaderColumn>状态</TableHeaderColumn>
				              <TableHeaderColumn>生效时间</TableHeaderColumn>
				              <TableHeaderColumn>过期时间</TableHeaderColumn>
				              <TableHeaderColumn>创建时间</TableHeaderColumn>
				              <TableHeaderColumn>操作人</TableHeaderColumn>
				          	</TableHeader>
					        <TableBody >
					              <TableRow>
					                <TableRowColumn 
					                		name="point"
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (
													<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
													<span className='tableOver' style={{maxWidth:80,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 		<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												 	</div>
												)
											}} ></TableRowColumn>
					                <TableRowColumn 
					                		name="remainPoint"
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (
													<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
													<span className='tableOver' style={{maxWidth:80,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 		<Tooltip offsetTop={5} place='top'>{value}</Tooltip>
												 	</div>
												)
											}}></TableRowColumn>
                                    <TableRowColumn 
                                            name="status" 
                                            component={(value)=>{
                                                let StyleName;
                                                if(value=='1'){
                                                    value="过期";
                                                    StyleName='u-font-red'
                                                }else if(value=='0'){
                                                    value="有效";
                                                    StyleName='u-font-green'
                                                }   
                                                return (
                                                    <span className={StyleName} >{value}</span>
                                                )
                                        }} ></TableRowColumn>
					                <TableRowColumn  name="beginTime" ></TableRowColumn>
					                <TableRowColumn name="expireTime"  ></TableRowColumn>
                                    <TableRowColumn name="ctime"></TableRowColumn>
					                <TableRowColumn 
					                		name="creater" 
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
									
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
				</div>
			</div>
		);
	}
}



