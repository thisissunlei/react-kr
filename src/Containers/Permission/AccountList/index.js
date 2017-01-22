import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
} from 'kr-ui';
import './index.less';
export default class AccountList  extends Component{

	constructor(props,context){
		super(props, context);

	}



	render(){

		return(

			<div>
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
					<TableHeaderColumn>ID</TableHeaderColumn>
					<TableHeaderColumn>登录名</TableHeaderColumn>
					<TableHeaderColumn>姓名</TableHeaderColumn>
					<TableHeaderColumn>手机号</TableHeaderColumn>
					<TableHeaderColumn>电子邮箱</TableHeaderColumn>
					<TableHeaderColumn>锁定标识</TableHeaderColumn>
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
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
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
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
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
							  {/*<Button label="生成对账单"  type="operation" operation="edit"/>*/}
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>
			</div>
		);
	}

}
