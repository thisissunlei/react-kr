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
import DismantlingForm from './DismantlingForm';

export default  class BasicTable extends Component {

	constructor(props,context){
		super(props, context);

		this.onPreYear = this.onPreYear.bind(this);
		this.onNextYear = this.onNextYear.bind(this);
		this.onCancel =this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);
		this.openDismantlingDialog = this.openDismantlingDialog.bind(this);
		this.onDismantling = this.onDismantling.bind(this);

		this.state = {
			currentYear:'2016',
			dismantling:false,
			formValues:{},
		}

	}

	componentDidMount(){

	}
	//撤场
	onDismantling(){
       this.openDismantlingDialog();
	}
	
	onCancel(){

	}
	onConfrimSubmit(formValues){
		console.log('formValues',formValues)
		/*Store.dispatch(Actions.callAPI('addOrEditEnterContract',{},formValues)).then(function(response){
			console.log("response",response);

			Notify.show([{
				message:'创建成功',
				type: 'danger',
			}]);

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});*/


	}
	
	openDismantlingDialog(){
		this.setState({
			dismantling:!this.state.dismantling
		})
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
					<ItemTable onDismantling={this.onDismantling}/>
				</tbody>
			</table>
			<Dialog
				title="撤场日期"
				modal={true}
				
				open={this.state.dismantling} >
				<DismantlingForm detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openDismantlingDialog} />
			  </Dialog>
			
		</div>
	);
  }
}





