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
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class AgreementTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	onPageChange=(page)=>{
		console.log('page',page);
		State.getIncomeList({page:page,pageSize:10})
	}
	click=(item)=>{
		State.setAgreementData(item);
	}


	render(){
		
		return(
			<div className="payment-table point-table">
				{!!State.agreementList.items.length && 
				<table>
					<thead>
						<tr>
							<td style={{maxWidth:300}}>客户</td>
							<td ><div >开始时间</div></td>
							<td ><div>工位／独立空间</div></td>
							<td ><div>联系人</div></td>
							<td ><div>联系方式</div></td>
						</tr>
					</thead>
					<tbody>
						{State.agreementList.items.map((item,index)=>{
							return (
								<tr key={index} onClick={this.click.bind(this,item)} >
									<td style={{maxWidth:300}}>
										<div style={{height:40}}>
											<span className="tableOver">{item.customer}</span>
											<Tooltip offsetTop={5} place='top'><div style={{width:200,lineHeight:'20px'}}>{item.customer}</div></Tooltip>
										</div>
									</td>
									<td >{DateFormat(item.leaseBegindate,'yyyy-mm-dd')}</td>
									<td >{item.stationnum}/{item.boardroom}</td>
									<td >
										{item.leaseContact}
									</td>
									<td>{item.phone}</td>
								</tr>

							)
						})}
					</tbody>
				</table>}

           		{!!State.agreementList.items.length && 
           		<div className='footPage' style={{marginTop:40}}>
           			<Pagination  totalCount={State.agreementList.totalCount} page={State.agreementList.page} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>}
           		{!State.agreementList.items.length && 
           			<NullTable />
           		}

				


	     	</div>

		);
	}
}

export default AgreementTable;
