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
		console.log('page',page);
	}

	render(){
		console.log('----->',State.paymentList)
		
		return(
			<div className="payment-table">
				<table>
					<thead>
						<tr>
							<td style={{width:'30%'}}>
								<div >客户</div>
							</td>
							<td style={{width:'20%'}}><div style={{minWidth:100}}>应缴日期</div></td>
							<td style={{width:'20%'}}><div style={{minWidth:100}}>应缴金额</div></td>
							<td style={{width:'30%'}}><div>账款期间</div></td>
						</tr>
					</thead>
					<tbody>
						{State.paymentList.map((item,index)=>{
							return (
								<tr key={index}>
									<td style={{width:'30%'}}>
										<div style={{height:40}}>
											<span className="tableOver">{item.lessorAddress}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{item.lessorAddress}</div></Tooltip>
										</div>
									</td>
									<td style={{width:'20%'}}>{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</td>
									<td style={{width:'20%'}}>{item.id}</td>
									<td style={{width:'30%'}}>
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
           			<Pagination  totalCount={20} page={1} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>

				


	     	</div>

		);
	}
}

export default PaymentTable;
