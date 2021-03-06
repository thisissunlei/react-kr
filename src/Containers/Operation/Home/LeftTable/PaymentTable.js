import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog,
	KrField,
	Grid,
	Row,
	Col,
	Pagination,
	Button,
	Tooltip,
	ButtonGroup,

} from 'kr-ui';
import home from '../images/home-community.svg';
import  "../index.less";
import NullTable from './NullTable';

import State from '../State';
import {Http,DateFormat,Money} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class PaymentTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	onPageChange=(page)=>{
		State.getPaymentList({page:page,pageSize:10})
		console.log('page',page);
	}

	render(){
		
		return(
			<div className="payment-table">
				{!!State.paymentList.items.length && 
				<table>
					<thead>
						<tr>
							<td style={{maxWidth:300}}>客户</td>
							<td ><div >应缴日期</div></td>
							<td ><div>应缴金额</div></td>
							<td ><div>账款期间</div></td>
						</tr>
					</thead>
					<tbody>
						{State.paymentList.items.map((item,index)=>{
							return (
								<tr key={index}>
									<td style={{maxWidth:300}}>
										<div style={{height:40}}>
											<span className="tableOver">{item.customer}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{item.customer}</div></Tooltip>
										</div>
									</td>
									<td >{DateFormat(item.installmentReminddate,'yyyy-mm-dd')}</td>
									<td >{Money(item.installmentAmount)||'-'}</td>
									<td >
										<div style={{height:40}}>
											<span className="tableOver">{DateFormat(item.installmentBegindate,'yyyy-mm-dd')}至{DateFormat(item.installmentEnddate,'yyyy-mm-dd')}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{DateFormat(item.installmentBegindate,'yyyy-mm-dd')}至{DateFormat(item.installmentEnddate,'yyyy-mm-dd')}</div></Tooltip>
										</div>
									</td>
								</tr>

							)
						})}
					</tbody>
				</table>}

           		{!!State.paymentList.items.length && 
           		<div className='footPage' style={{marginTop:40}}>
           			<Pagination  totalCount={State.paymentList.totalCount} page={State.paymentList.page} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>}
           		{!State.paymentList.items.length && 
					<NullTable />
           		}

				


	     	</div>

		);
	}
}

export default PaymentTable;
