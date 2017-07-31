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
import home from './images/home-community.svg';
import  "./index.less";
import State from './State';
import {Http,DateFormat} from "kr/Utils";
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
											<span className="tableOver">{item.lessorAddress}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{item.lessorAddress}</div></Tooltip>
										</div>
									</td>
									<td >{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</td>
									<td >{item.id}</td>
									<td >
										<div style={{height:40}}>
											<span className="tableOver">{DateFormat(item.leaseBegindate,'yyyy-mm-dd')}至{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{DateFormat(item.leaseBegindate,'yyyy-mm-dd')}至{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</div></Tooltip>
										</div>
									</td>
								</tr>

							)
						})}
					</tbody>
				</table>

           		<div className='footPage' style={{marginTop:40}}>
           			<Pagination  totalCount={State.paymentList.totalCount} page={State.paymentList.page} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>

				


	     	</div>

		);
	}
}

export default PaymentTable;
