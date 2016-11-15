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
	SearchForms
} from 'kr-ui';

import './index.less';

import EmployessTable from './EmployessTable';
import ItemTable from './ItemTable';
import DismantlingForm from './DismantlingForm';

class SearchForm extends Component {

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: [],
			communityIdList: [],
			page: 70,
			pageSize: 5,
			type: 'BILL',
			communityids: ''

		};
		this.getcommunity = this.getcommunity.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getcommunity();

	}


	onSubmit(form) {

		let {
			communityids
		} = this.state
		let {
			page,
			pageSize,
		} = this.state
		let {
			formValues
		} = this.state;

		formValues = {
			type: form.filter,
			value: form.content,
			communityids: communityids,
			page: page,
			pageSize: pageSize

		}

		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(formValues);

	}
	getcommunity() {
		let _this = this;
		let {
			communityIdList,
			page,
			pageSize,
			type
		} = this.state;
		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			console.log(communityIdList);
			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {
			console.log('err', err);
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	selectCommunity(personel) {

		this.setState({
			communityids: personel.id,
		})
		const {
			onChange
		} = this.props;
		console.log(personel);
		onChange && onChange(personel.id);
	}



	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			communityIdList
		} = this.state;
		let options = [{
			label: '订单名称',
			value: 'BILL'
		}, {
			label: '员工姓名',
			value: 'MEMBER'
		}, {
			label: '手机号',
			value: 'PHONE'
		}];

		return (
			<form name="searchForm" style={{borderBottom:'2px solid #eee',marginBottom:30,paddingTop:'20px'}}>
				{/*<KrField  name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} left={60}/>*/}
				<KrField name="community"  grid={1/3} component="select" label="社区" search={true}  options={communityIdList} onChange={this.selectCommunity} />
				<SearchForms onSubmit={this.onSubmit} searchFilter={options} />
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
		this.onChange = this.onChange.bind(this);
		//var year = new Date()
		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: [],

			communityIdList: [],
			page: 70,
			pageSize: 5,
			type: 'BILL'

		};
		this.getInstallmentplan();

	}


	componentDidMount() {
		this.getInstallmentplan();
	}


	componentWillReceiveProps(nextProps) {

		if (nextProps.community !== this.props.communityids) {
			this.setState({
				communityids: nextProps.community

			});
			this.getInstallmentplan();
		}
	}



	//撤场

	onDismantling() {
		this.openDismantlingDialog();
	}

	onCancel() {

	}

	onChange(id) {
		let {
			type,
			page,
			pageSize,
		} = this.state
		var _this = this;
		console.log('1234')
		Store.dispatch(Actions.callAPI('getInstallmentplan', {
			communityids: id,
			value: '',
			type: type,
			page: page,
			pageSize: pageSize
		})).then(function(response) {
			_this.setState({
				Installmentplan: response.vo || [],
				rate: response.rate
			});

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	onSubmit(formValues) {
		var _this = this;
		Store.dispatch(Actions.callAPI('getInstallmentplan', formValues)).then(function(response) {

			_this.setState({
				Installmentplan: response.vo,
				rate: response.rate
			});

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

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
		var _this = this;

		let {
			community
		} = this.props;

		let {
			type,
			page,
			pageSize
		} = this.state

		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response) {

			var communityIds = [];
			response.communityInfoList.map((item) => {
				communityIds.push(item.id);
			});
			var content = community || communityIds;
			_this.setState({
				communityIds: communityIds
			})
			Store.dispatch(Actions.callAPI('getInstallmentplan', {
				communityids: content.toString(),
				value: '',
				type: type,
				page: page,
				pageSize: pageSize
			})).then(function(response) {
				_this.setState({
					Installmentplan: response.vo || [],
					rate: response.rate
				});

			}).catch(function(err) {
				Notify.show([{
					message: err.message,
					type: 'danger',
				}]);
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
			Installmentplan,
			rate
		} = this.state;
		let {
			communityids,
		} = this.props
		var _this = this;


		return (
			<div>

			<SearchForm  communityids={communityids} onSubmit={this.onSubmit} onChange={this.onChange}/>
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
						{
							rate.map((value,index)=><td>{value}</td>)
						}
						<td></td>
					</tr>
					{
						Installmentplan && Installmentplan.map((item,index)=>{
							return (

							<ItemTable onDismantling={this.onDismantling}  communityids={_this.props.communityids} detail={item} key={index}/>
								
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