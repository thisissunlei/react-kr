import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Button,
	Notify,
	BreadCrumbs,
} from 'kr-ui';

import './index.less';

import EmployessTable from './EmployessTable';
import ItemTable from './ItemTable';


export default  class BasicTable extends Component {

	constructor(props,context){
		super(props, context);

		this.onPreYear = this.onPreYear.bind(this);
		this.onNextYear = this.onNextYear.bind(this);


		this.state = {
			currentYear:'2016',
		}

	}

	componentDidMount(){

	}

	onPreYear(){
		let {currentYear} = this.state;
		currentYear--;
		this.setState({
			currentYear
		});
	}

	onNextYear(){
		let {currentYear} = this.state;
		currentYear++;
		this.setState({
			currentYear
		});
	}

  render() {

	let {currentYear} = this.state;
    return (

		 <div>
			<table className="basic-table">
				<thead>
					<tr>
						<th onClick={this.onPreYear} className="pre-year">
							{currentYear}年
						</th>
						<th>1月</th>
						<th>2月</th>
						<th>3月</th>
						<th>4月</th>
						<th>5月</th>
						<th>6月</th>
						<th>7月</th>
						<th>8月</th>
						<th>9月</th>
						<th>10月</th>
						<th>11月</th>
						<th>12月</th>
						<th onClick={this.onNextYear} className="next-year">
								{currentYear - 1}年
						</th>
					</tr>
				</thead>
				<tbody>
					{/*入住率*/}
					<tr>
						<td>
							<div className="header-title">
								<span>入驻率</span>
								<span>订单名称</span>
							</div>
						</td>
						<td>35%</td>
						<td>40%</td>
						<td>40%</td>
						<td>40%</td>
						<td>40%</td>
						<td>30%</td>
						<td>35%</td>
						<td>40%</td>
						<td>30%</td>
						<td>35%</td>
						<td>40%</td>
						<td>30%</td>
					</tr>
					<ItemTable />
				</tbody>
			</table>
		</div>
	);
  }
}




