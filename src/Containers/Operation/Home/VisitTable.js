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

class VisitTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	onPageChange=(page)=>{
		console.log('page',page);
		State.getVisitList({page:page,pageSize:10})
	}
	click=(item)=>{
		window.open('#/operation/customerManage/customerList','_target')
	}


	render(){
		
		return(
			<div className="payment-table">
				<table>
					<thead>
						<tr>
							<td >访客姓名</td>
							<td ><div >访客电话</div></td>
							<td ><div>拜访日期</div></td>
							<td ><div>拜访人数</div></td>
							<td ><div>预约来源</div></td>
						</tr>
					</thead>
					<tbody>
						{State.visitList.items.map((item,index)=>{
							return (
								<tr key={index} onClick={this.click.bind(this,item)} >
									<td>
										田欢欢
									</td>
									<td >{DateFormat(item.leaseEnddate,'yyyy-mm-dd')}</td>
									<td >{item.id}</td>
									<td >
										田欢欢
									</td>
									<td>13314619606</td>
								</tr>

							)
						})}
					</tbody>
				</table>

           		<div className='footPage' style={{marginTop:40}}>
           			<Pagination  totalCount={State.visitList.totalCount} page={State.visitList.page} pageSize={10} onPageChange={this.onPageChange}/>
           		</div>

				


	     	</div>

		);
	}
}

export default VisitTable;
