import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Button,
	Notify,
	BreadCrumbs,
	KrField,
	Form,
	Row,
	Col,
} from 'kr-ui';

import './index.less';

import EmployessTable from './EmployessTable';
import ItemTable from './ItemTable';
import DismantlingForm from './DismantlingForm';

class SearchForm extends Component {



	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(form) {
		console.log('yyyyyyy', form)
		/*Store.dispatch(Actions.callAPI('getInstallmentplan', {}, form)).then(function(response) {
			console.log("response", response);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});*/
	}



	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)}>

              <Row>
              <Col md={5}><KrField name="type" type="select" component="select" options={[{label:'订单名称',value:1},{label:'员工姓名',value:2},{label:'手机号',value:3}]}/></Col>
				<Col md={5}><KrField name="value" type="text" placeholder="搜索关键字" /></Col>
				<Col md={2}><Button  label="查询" type="submit" primary={true} /></Col>
              </Row>

			</form>
		);
	}
}

SearchForm = reduxForm({
	form: 'searchForm'
})(SearchForm);

export default class BasicTable extends Component {

	constructor(props, context) {
		super(props, context);

		this.onPreYear = this.onPreYear.bind(this);
		this.onNextYear = this.onNextYear.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);
		this.openDismantlingDialog = this.openDismantlingDialog.bind(this);
		this.onDismantling = this.onDismantling.bind(this);
		this.getInstallmentplan = this.getInstallmentplan.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: []
		};
		this.getInstallmentplan();

	}

	componentDidMount() {

		}
		//撤场
	onDismantling() {
		this.openDismantlingDialog();
	}

	onCancel() {

	}


	onSubmit() {

	}
	onConfrimSubmit(formValues) {
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

	openDismantlingDialog() {
		this.setState({
			dismantling: !this.state.dismantling
		})
	}


	onPreYear() {
		let {
			currentYear
		} = this.state;
		currentYear--;
		this.setState({
			currentYear
		});
	}

	onNextYear() {
		let {
			currentYear
		} = this.state;
		currentYear++;
		this.setState({
			currentYear
		});
	}


	getInstallmentplan() {
		var that = this;
		var Installmentplan, rate;
		Store.dispatch(Actions.callAPI('getInstallmentplan', {
			communityids: 1
		})).then(function(response) {
			Installmentplan = response.vo;
			rate = response.rate;
			that.setState({
				Installmentplan,
				rate
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}

	render() {

		let {
			currentYear,
			Installmentplan
		} = this.state;

		return (

			<div>
		 	<div className="basic-con">
		 		<div className="legend">
		 			<div className="legend-left">
		 				<p>
		 					<span className="square bule"></span>
		 					<span className="txt" >当前的分期时间</span>
		 				</p>
		 				<p>
		 					<span className="square grey"></span>
		 					<span className="txt">过去的分期时间</span>
		 				</p>
		 			</div>
		 			<div className="legend-right">
		 				<p>
							<span className="circle red"></span>
		 					<span className="txt" >催账时间</span>
		 				</p>
		 				<p>
							<span className="circle green"></span>
		 					<span className="txt" >工位变更</span>
		 				</p>
		 			</div>
		 		</div>
		 		<div className="search">
					<SearchForm />	
		 		</div>
		 	</div>
		 	
			<table className="basic-table" >
				<thead>
					<tr>
						<th onClick={this.onPreYear} className="pre-year">
							{currentYear -1}年 <span className="prev"></span>
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
								{currentYear*1+1}年 <span className="next"></span>
						</th>
					</tr>
				</thead>
				<tbody>
					{/*入住率*/}
					<tr className="header-td">
						<td className='white'>
							<div className="header-title">
								<p className="title-right">入驻率</p>
								<p  className="title-left">订单名称</p>
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
						<td></td>
					</tr>
					{
						Installmentplan.map((item,index)=>{
							return (

							<ItemTable onDismantling={this.onDismantling} item={{name:'ddd'}} detail={item} key={index}/>
								
							)

						})
					}
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