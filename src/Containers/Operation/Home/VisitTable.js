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
								<tr key={index} >
									<td>
										{item.visitor}
									</td>
									<td >{item.phone}</td>
									<td >{item.date}</td>
									<td >
										{item.number}
									</td>
									<td>{item.source}</td>
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
