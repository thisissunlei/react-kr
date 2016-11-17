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
	SearchForms,
	Loading,
} from 'kr-ui';
import $ from 'jquery';
import './index.less';
import ReactDOM from 'react-dom';

import EmployessTable from './EmployessTable';
import ItemTable from './ItemTable';
import DismantlingForm from './DismantlingForm';

class SearchForm extends Component {
	static defaultProps = {
		tab: '',
	}
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
			page: 1,
			pageSize: 5,
			type: 'BILL',
			communityids: '',


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

			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {

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
			<form name="searchForm" className="searchForm searchList" style={{borderBottom:'2px solid #eee',marginBottom:10,paddingBottom:'15px',height:45}}>
				{/*<KrField  name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} multi={true} requireLabel={true} left={60}/>*/}
				
				<SearchForms onSubmit={this.onSubmit} searchFilter={options} />
				<KrField name="community"  grid={1/3} component="select" label="社区" search={true}  options={communityIdList} onChange={this.selectCommunity} />
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
		this.onStation = this.onStation.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.renderNone = this.renderNone.bind(this);
		this.state = {
			currentYear: '2016',
			dismantling: false,
			formValues: {},
			Installmentplan: [],
			rate: [],
			value: '',
			communityIdList: [],
			page: 1,
			pageSize: 5,
			type: 'BILL',
			detail: {},
			activity: false,
			nowDate: '',
			isIscroll: true,
			totalCount: '',
			isLoading: false,
			totalPages: '',
			istip: false,
			dataLoading: true,

		};
		this.getInstallmentplan();
		this.getWidth = this.getWidth.bind(this);

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

	scrollLoad() {
		var _this = this;
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0;
			var height = $(window).height() || 0;
			var num = $(document).height() - $(window).height();
			var scrollBottom = top - num;

			var isOutBoundary = scrollBottom >= 0;

			if (isOutBoundary) {

				let {
					communityIds,
					type,
					page,
					pageSize,
					value,
					Installmentplan,
					isIscroll,
					totalCount,
					totalPages,
					istip
				} = _this.state;
				if (isIscroll) {
					_this.setState({
						isIscroll: !_this.state.isIscroll
					})

					var step = 1;
					var len = page;
					if (totalPages - page == 1) {
						window.setTimeout(function() {
							_this.setState({
								istip: !_this.state.istip
							})
						}, 1000)
					}

					if (totalPages > page) {
						len += step;
						_this.setState({
							page: len,
							isLoading: !_this.state.isLoading
						})
						Store.dispatch(Actions.callAPI('getInstallmentplan', {
							communityids: communityIds,
							value: value,
							type: type,
							page: len,
							pageSize: pageSize
						})).then(function(response) {

							if (response.vo) {
								var list = Installmentplan.concat(response.vo.items)
							} else {
								var list = [];
							}


							_this.setState({
								Installmentplan: list, //response.vo.items,
								rate: response.rate,
							});

							if (_this.state.page < _this.state.totalPages) {

								_this.setState({
									isIscroll: !_this.state.isIscroll
								})
							}
							window.setTimeout(function() {
								_this.setState({
									isLoading: !_this.state.isLoading
								})
							}, 100)

						}).catch(function(err) {
							Notify.show([{
								message: err.message,
								type: 'danger',
							}]);
						});


					}


				}



			}
		})


	}


	//撤场

	onDismantling(detail) {
		this.setState({
			detail: detail
		})
		this.openDismantlingDialog();
	}

	onCancel() {

	}


	//分配工位显示
	onStation() {
		this.setState({
			activity: !this.state.activity
		});

	}

	onChange(id) {
		this.setState({
			page: 1,
			isIscroll: true
		})
		let {
			type,
			page,
			pageSize,
			totalPages,
			isIscroll
		} = this.state

		var _this = this;

		Store.dispatch(Actions.callAPI('getInstallmentplan', {
			communityids: id,
			value: '',
			type: type,
			page: 1,
			pageSize: pageSize

		})).then(function(response) {
			_this.setState({
				Installmentplan: response.vo.items || [],
				rate: response.rate,
				communityIds: id,
				totalPages: response.vo.totalPages,
				istip: ' '
			});

			window.setTimeout(function() {
				_this.setState({
					istip: false
				});
			}, 100)



		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	onSubmit(formValues) {
		var _this = this;
		var activity = true;
		if (formValues.type == "BILL") {
			activity = false;
		}

		Store.dispatch(Actions.callAPI('getInstallmentplan', formValues)).then(function(response) {

			var Installmentplan = response.vo.items;
			Installmentplan.forEach(function(item, index) {
				item.activity = activity;
			});

			_this.setState({
				Installmentplan,
				rate: response.rate,
				totalPages: response.vo.totalPages,
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
		this.getInstallmentplan();
	}

	onNextYear() {
		let {
			currentYear
		} = this.state;
		currentYear++;
		this.setState({
			currentYear
		});
		this.getInstallmentplan();
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

			var Ids = [];
			response.communityInfoList.map((item) => {
				Ids.push(item.id);
				return Ids
			});
			var communityIds = Ids.join(',');
			var content = community || communityIds;
			_this.setState({
				communityIds: communityIds
			})
			Store.dispatch(Actions.callAPI('getInstallmentplan', {
				communityids: content.toString(),
				value: '',
				type: type,
				page: page,
				pageSize: pageSize,
				year: _this.state.currentYear,
			})).then(function(response) {
				if (response.vo) {
					var list = response.vo.items;
					var totalCount = response.vo.totalCount;
					var totalPages = response.vo.totalPages;
				} else {
					var list = [];
					var totalCount = 0;
					var totalPages = 0;
				}

				_this.setState({
					Installmentplan: list,
					rate: response.rate,
					totalCount: totalCount,
					totalPages: totalPages,
					dataLoading: false
				});
				if (totalPages > page) {
					_this.setState({
						isIscroll: true
					})
				}

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
	renderNone(showNone) {
		let {
			rate,
			dataLoading
		} = this.state;
		if (dataLoading) {
			return (
				<tr style={{height:200,position:'relative'}}>
						<td colSpan={14} style={{border:'none'}}>
						<div style={{left:'50%',top:'40%',zIndex:100}}><Loading/></div>
						</td>
						
					</tr>



			)
		}
		if (!showNone && !dataLoading) {
			return (
				<tr style={{height:300}}>
						<td colSpan={14} style={{border:'none'}}>
							<div style={{textAlign:'center'}}>
								<div className="ui-nothing">
									<div className="icon"></div>
									<p className="tip">暂时还没有数据呦~</p>
								</div>
							</div>
						</td>
						
					</tr>



			)
		}
	}
	getWidth(){
			const list = ReactDOM.findDOMNode(this.trLength);
			let th = list.getElementsByTagName('th')[1].offsetWidth;
			let length = th*12;
			return 0;



		}


	render() {

		let {
			currentYear,
			Installmentplan,
			rate,
			communityIds,
			totalCount,
			isLoading,
			dataLoading,
			totalPages,
			istip,
			page,
			isIscroll
		} = this.state;
		var _this = this;
		const id = communityIds;

		let {
			tab
		} = this.props;
		if (tab === 'table') {
			this.scrollLoad();
		} else {
			$(window).unbind('scroll', this.scrollLoad());
		}
		let showNone;
		if (Installmentplan.length) {
			showNone = true;
		} else {
			showNone = false;
		}
		
		


		return (
			<div style={{position:'relative'}}>
			{isLoading?<div style={{position:'fixed',left:'50%',top:'40%',zIndex:100}}><Loading/></div>:''}
			{istip?<div style={{width:640,color:'#999',fontSize:'14px',position:'absolute',left:'50%',bottom:'-73px',marginLeft:'-320px',zIndex:100}}><p style={{width:260,borderBottom:'1px solid #cccccc',height:9,float:'left'}} ></p><p style={{float:'left',paddingLeft:'15px',paddingRight:'15px'}}>我是有底线的</p><p style={{width:260,height:9,borderBottom:'1px solid #cccccc',float:'left'}} ></p></div>:''}
			
					
			<SearchForm  onSubmit={this.onSubmit} onChange={this.onChange}/>
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
					<tr ref={tr=>{this.trLength = tr}}>
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
								
							</div>
						</td>
						{
							rate.map((value,index)=><td>{value}</td>)
						}
						<td class="last"></td>
					</tr>

					{
						showNone && Installmentplan.map((item,index)=>{
							
							console.log(this.getWidth());
							return (

							<ItemTable onDismantling={this.onDismantling}  communityids={id} detail={item} index={index} key={index} onStation={this.onStation} activity={this.state.activity} width={this.getWidth()} />
							
								
							)

						})
					}
					{
						this.renderNone(showNone)
					}
					
					

				</tbody>
			</table>


			<Dialog
				title="撤场日期"
				modal={true}
				onClose={this.openDismantlingDialog}
				open={this.state.dismantling} 
				contentStyle={{width:445}}
				>
				<DismantlingForm  onSubmit={this.onConfrimSubmit} onCancel={this.openDismantlingDialog} detail={this.state.detail} />
			 </Dialog>
			
		</div>
		);


	}

}