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
import NullTable from './NullTable';
import  "../index.less";
import State from '../State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class OrderTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	onPageChange=(page)=>{
		console.log('page',page);
		State.getOrderList({page:page,pageSize:10})
	}
	click=(item)=>{
		window.open('#/operation/customerManage/customerList','_target')
	}


	render(){
		
		return(
			<div className="payment-table">
				{!! State.orderList.items.length && 
				<table>
					<thead>
						<tr>
							<td style={{maxWidth:300}}>订单名称</td>
							<td ><div >到期时间</div></td>
							<td ><div>工位／独立空间</div></td>
							<td ><div>联系人</div></td>
							<td ><div>联系方式</div></td>
						</tr>
					</thead>
					<tbody>
						{State.orderList.items.map((item,index)=>{
							return (
								<tr key={index} onClick={this.click.bind(this,item)} >
									<td style={{maxWidth:300}}>
										<div style={{height:40}}>
											<span className="tableOver">{item.mainbillName}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{item.mainbillName}</div></Tooltip>
										</div>
									</td>
									<td >{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</td>
									<td >{item.stations}/{item.boardrooms}</td>
									<td >
										{item.contact}
									</td>
									<td>{item.phone}</td>
								</tr>

							)
						})}
					</tbody>
				</table>}

           		{!!State.orderList.items.length && 
           		<div className='footPage' style={{marginTop:40}}>
           			<Pagination  totalCount={State.orderList.totalCount} page={State.orderList.page} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>}
				{!State.orderList.items.length && 
					<NullTable />
           		}

				


	     	</div>

		);
	}
}

export default OrderTable;
