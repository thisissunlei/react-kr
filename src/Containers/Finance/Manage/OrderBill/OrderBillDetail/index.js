import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	LabelText
} from 'kr-ui';
import {
	Actions,
	Store,
} from 'kr/Redux';
import dateFormat from 'dateformat';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	Dialog,
	KrDate,
	DotTitle,
	ButtonGroup,
	Loading,
	Title,
	Tooltip,
	SnackTip,
	Message,
	Drawer
} from 'kr-ui';
import {
	reduxForm,
	reset,
	initialize
} from 'redux-form';

import {
	browserHistory
} from 'react-router'
import BasicInfo from './BasicInfo';
import SearchParam from './SearchParam';
import SearchForm from './SearchForm';
import ReceivedBtnForm from './ReceivedBtnForm';
import QuitBtnForm from './QuitBtnForm';
import SwitchBtnForm from './SwitchBtnForm';
import BusinessBtnForm from './BusinessBtnForm';
import AccountBtnForm from './AccountBtnForm';
import SupplementBtnForm from './SupplementBtnForm';
import ShiftBtnForm from './ShiftBtnForm';
import ReceiveDetailTop from './ReceiveDetailTop';
import './index.less';



//获取单条的金额
var fiMoney = '';
//得到单条数据
var fiItem = {};
class ViewForm extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		let items = this.props.detail

		if (!items.fileList) {
			items.fileList = []
		}

		return (
			<div className='m-watch-detail'>
					<KrField grid={1/2}  component="labelText" label="支付方式" value={items.accountName} inline={false} defaultValue="无"/>
					<KrField grid={1/2} label="付款日期" component="labelText" inline={false} value={items.occuryear} defaultValue="无" type="date"/>

					<KrField grid={1/2} label="操作时间" component="labelText" value={items.operatedate} format="yyyy-mm-dd hh:mm:ss" type="date" inline={false} defaultValue="无"/>

					<KrField grid={1/2}  component="labelText" label="交易编号" value={items.tradingCode} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="labelText" label="操作人"  value={items.optUserName} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="labelText" label="金额（元）" value={items.finaflowAmount} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="labelText" label="备注" value={items.finaflowdesc} inline={false} defaultValue="无"/>
					<KrField grid={1/2}  component="group" label="上传附件"  inline={false} defaultValue="无">
			         {items.fileList.map((item,index)=>{
						 return <Button label={item.fileName} type="link" href={item.fileUrl} key={index}/>
			         }
					)}
					</KrField>
				</div>


		);
	}
}
export default class AttributeSetting extends Component {

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static childContextTypes = {
		refresh: React.PropTypes.func,
		//router: React.PropTypes.object.isRequired
	}

	getChildContext() {
		return {
			refresh: this.refresh,
			//router:this.props.router
		};
	}


	constructor(props, context) {
		super(props, context);
		this.onSearch = this.onSearch.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddReceivedSubmit = this.onAddReceivedSubmit.bind(this);
		this.onQuitSubmit = this.onQuitSubmit.bind(this);
		this.onSwitchSubmit = this.onSwitchSubmit.bind(this);
		this.onBusinessSubmit = this.onBusinessSubmit.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);
		this.onSupplementSubmit = this.onSupplementSubmit.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSelect = this.onSelect.bind(this);


		this.openSearchDialog = this.openSearchDialog.bind(this);
		this.openReceivedBtn = this.openReceivedBtn.bind(this);
		this.openQuitBtn = this.openQuitBtn.bind(this);
		this.openSwitchBtn = this.openSwitchBtn.bind(this);
		this.openBusinessBtn = this.openBusinessBtn.bind(this);
		this.openAccountBtn = this.openAccountBtn.bind(this);
		this.openSupplementBtn = this.openSupplementBtn.bind(this);
		this.openViewDialog = this.openViewDialog.bind(this);

		this.closeSearchDialog = this.closeSearchDialog.bind(this);
		this.closeReceivedDialog = this.closeReceivedDialog.bind(this);
		this.closeSwitchBtn = this.closeSwitchBtn.bind(this);
		this.closeQuitBtn = this.closeQuitBtn.bind(this);
		this.closeBusinessBtn = this.closeBusinessBtn.bind(this);
		this.closeAddaccount = this.closeAddaccount.bind(this);
		this.closeViewDialog = this.closeViewDialog.bind(this);

		this.initBasicInfo = this.initBasicInfo.bind(this);
		this.searchUpperFun = this.searchUpperFun.bind(this);

		this.refresh = this.refresh.bind(this);


		this.state = {
				params: {
					accountType: 'PAYMENT',
					childType: 'basic',
					propInfo: 'SETTLED',
					orderId: this.props.params.orderId,
					page: 1,
					pageSize: 30,
					index: '',
				},
				itemDetail: {},
				//为了判断和获取选中的条的id
				fiMoney: '',
				fiItem: '',
				//这几个是上下的数据
				basicInfo: {},
				detailPayment: [],
				detailIncome: [],
				detailBalance: '',
				//高级查询
				codeList: [],
				typeList: [],
				receivedList: [],

				//这三个是为了挑出选定的那个复选框
				list: [],
				selectedList: [],
				listValues: [],

				payWayList: [],
				accountDetail: [],
				contractList: [],
				stationPayment: {},

				//回款合同
				contractReceive: [],
				//回款合同顶部
				contractTopReceive: [],

				//转移
				shiftData: [],



				openSearch: false,
				openReceivedBtn: false,
				openQuitBtn: false,
				openSwitchBtn: false,
				openBusinessBtn: false,
				openAddaccountBtn: false,
				openSupplementBtn: false,
				openShift: false,
				isLoading: true,
				isInitLoading: true,
				openView: false,
				openRight: false,
				openContract: false,
				colorClassName: '',
				isRunningIncome: 0,
				//回款总金额和余额变化
				liveMoneyValue: 0,
			}
			//回款计算余额所需字段值
		this.receivedBtnFormChangeValues = {};
	}



	refresh() {
		//console.log('00000')
		var _this = this;
		this.setState({
			isInitLoading: true
		}, function() {
			window.setTimeout(function() {
				_this.initBasicInfo();
			}, 1000)
		});

	}

	//打开遮罩层区域
	openSearchDialog() {
		this.searchUpperFun();
		this.setState({
			openSearch: !this.state.openSearch
		});
	}
	openReceivedBtn() {

		this.receivedBtnFormChangeValues = {};
		//Store.dispatch(reset('receivedBtnForm',{totalPayment:'',preCode:'1',operatedate:''}));

		var _this = this;
		Store.dispatch(Actions.callAPI('getPaymentActData', {
			mainbillId: _this.props.params.orderId
		})).then(function(response) {
			var payWayList = [];
			var contractReceive = [];
			response.payWay.map(function(item, index) {
				var list = {}
				list.value = item.id;
				list.label = item.accountname;
				payWayList.push(list);
			});
			response.contract.map(function(item, index) {
				var lists = {};
				lists.label = item.contactName + '-' + item.contractcode;
				lists.value = item.contactType;
				lists.contractId = item.detailid;
				contractReceive.push(lists);
			});

			var noContract = {
				'value': '000',
				'label': '无合同'
			}
			contractReceive.push(noContract);
			_this.setState({
				payWayList,
				accountDetail: response.propData,
				contractTopReceive: response.contract,
				contractReceive
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
		this.setState({
			openRight: !this.state.openRight
		});
	}
	openQuitBtn() {
		let items = this.state.selectedList
		var _this = this;
		items.map(function(item, index) {
			if (typeof(item.finaflowAmount) == 'number') {
				fiMoney = item.finaflowAmount;
				fiItem = item;
			}
		})
		if (this.state.listValues.length == 0) {
			Message.error('请选择一条回款数据进行退款');
		} else if (this.state.listValues.length > 1) {
			Message.error('只能选择一条数据');
		} else if (fiMoney >= 0) {
			Message.error('金额必须为负且存在可用金额');
		} else {
			this.getMoneyALLTrue();
			this.setState({
				openQuitBtn: !this.state.openQuitBtn
			});
		}
	}

	openSwitchBtn() {

		let items = this.state.selectedList
		var _this = this;
		items.map(function(item, index) {
			if (typeof(item.finaflowAmount) == 'number') {
				fiMoney = item.finaflowAmount;
				fiItem = item;
			}
		})

		if (this.state.listValues.length == 0) {
			Message.error('请选择一条回款数据进行转押金');
		} else if (this.state.listValues.length > 1) {
			Message.error('只能选择一条数据');
		} else if (fiMoney >= 0) {
			Message.error('金额必须为负且存在可用金额');
		} else {
			this.setState({
				openSwitchBtn: !this.state.openSwitchBtn,
			});
			this.getMoneyALLTrue();
			//console.log('2222',fiItem.id);
			Store.dispatch(Actions.callAPI('findContractListById', {
				mainbillId: _this.props.params.orderId
			})).then(function(response) {
				var receivedList = [];
				response.map(function(item, index) {
					var list = {}
					list.value = item.id;
					list.label = item.contractcode;
					receivedList.push(list);
				})
				_this.setState({
					receivedList: receivedList
				});
			}).catch(function(err) {
				Message.error(err.message);
			});
		}
	}
	openBusinessBtn() {
		let items = this.state.selectedList
		var _this = this;
		items.map(function(item, index) {
			if (typeof(item.finaflowAmount) == 'number') {
				fiMoney = item.finaflowAmount;
				fiItem = item;
			}
		})
		if (this.state.listValues.length == 0) {
			Message.error('请选择一条回款数据进行转营收');
		} else if (this.state.listValues.length > 1) {
			Message.error('只能选择一条数据');
		} else if (fiMoney >= 0) {
			Message.error('金额必须为负且存在可用金额');
		} else {
			this.getMoneyALLTrue();
			this.setState({
				openBusinessBtn: !this.state.openBusinessBtn
			});
		}
	}

	getMoneyALLTrue = () => {
		var _this = this;
		Store.dispatch(Actions.callAPI('getFlowRemainMoney', {
			flowId: fiItem.id
		})).then(function(response) {
			_this.setState({
				fiMoney: response
			});
		}).catch(function(err) {
			Message.error(err.message);
		});

	}

	openAccountBtn() {
		var _this = this;
		Store.dispatch(Actions.callAPI('getOnNewAccountData', {
			mainbillId: _this.props.params.orderId
		})).then(function(response) {
			var payWayList = [];
			var contractList = [];
			var stationPayment = {};
			response.payWay.map(function(item, index) {
				var list = {}
				list.value = item.id;
				list.label = item.accountname;
				payWayList.push(list);
			});
			if (response.contractList) {
				response.contractList.map(function(item, index) {
					var list = {}
					list.value = item.id;
					list.label = item.contractcode;
					contractList.push(list);
				});
			} else if (!response.contractList) {
				contractList = '无'
			}
			if (response.stationPayment) {
				stationPayment = response.stationPayment;
			} else if (!response.stationPayment) {
				stationPayment = '无'
			}
			_this.setState({
				payWayList,
				accountDetail: response.propData,
				contractList,
				stationPayment: stationPayment,
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
		this.setState({
			openAddaccountBtn: !this.state.openAddaccountBtn
		});
	}
	openSupplementBtn() {
		this.setState({
			openSupplementBtn: !this.state.openSupplementBtn
		})
	}
	openViewDialog(itemDetail) {
		var _this = this;
		let id = itemDetail.id
		Store.dispatch(Actions.callAPI('getAccountFlowDetail', {
			id: id
		})).then(function(response) {
			_this.setState({
				itemDetail: response
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		this.setState({
			openView: !this.state.openView
		});
	}
	openShiftBtn = () => {
		var _this = this;
		let items = this.state.selectedList
		items.map(function(item, index) {
			if (typeof(item.finaflowAmount) == 'number') {
				fiMoney = item.finaflowAmount;
				fiItem = item;
			}
		})
		if (this.state.listValues.length == 0) {
			Message.error('请选择一条数据进行转移');
		} else if (this.state.listValues.length > 1) {
			Message.error('只能选择一条数据');
		} else if (fiMoney >= 0) {
			Message.error('金额必须为负且存在可用金额');
		} else {
			this.setState({
				openShift: !this.state.openShift
			});
			Store.dispatch(Actions.callAPI('getTransferData', {
				flowId: fiItem.id,
				mainbillId: _this.props.params.orderId
			})).then(function(response) {
				_this.setState({
					shiftData: response.propData,
					fiMoney: response.remainMoney
				})
			}).catch(function(err) {
				Message.error(err.message);
			});

		}
	}

	//关闭遮罩层区域
	closeReceivedDialog() {
		this.setState({
			openReceivedBtn: !this.state.openReceivedBtn,
		});
	}

	closeSearchDialog() {
		this.setState({
			openSearch: !this.state.openSearch
		});
	}

	closeSwitchBtn() {
		this.setState({
			openSwitchBtn: !this.state.openSwitchBtn,
		});
	}
	closeBusinessBtn() {
		this.setState({
			openBusinessBtn: !this.state.openBusinessBtn,
		});
	}
	closeQuitBtn() {
		this.setState({
			openQuitBtn: !this.state.openQuitBtn,
		});
	}
	closeAddaccount() {
		this.setState({
			openAddaccountBtn: !this.state.openAddaccountBtn
		})
	}
	closeViewDialog() {
		this.setState({
			openView: !this.state.openView,
		});
	}
	closeShiftBtn = () => {
		this.setState({
			openShift: !this.state.openShift
		});
	}

	//确定提交区域
	//切换
	onSearch(params) {
			var listValues = '';
			if (params.index == this.state.params.index && params.accountType == this.state.params.accountType) {
				listValues = this.state.listValues
			} else {
				listValues = ''
			}
			this.setState({
				params,
				listValues: listValues
			});

		}
		//高级查询
	onSubmit(params) {
		params = Object.assign({}, this.state.params, params);
		params.time = +new Date();
		if (params.startTime != '' && params.endTime != '' && params.endTime < params.startTime) {
			Message.error('开始时间不能大于结束时间');
			return;
		}
		if (params.startTime == '' && params.endTime != '') {
			params.startTime = params.endTime
		}
		if (params.startTime != '' && params.endTime == '') {
			params.endTime = params.startTime
		}
		this.setState({
			params,
			openSearch: !this.state.openSearch
		});
	}
	onSelect(values) {
		//此处反着？
		let {
			list,
			selectedList
		} = this.state;
		selectedList = list.map(function(item, index) {
			if (values.indexOf(index)) {
				return false;
			}
			return item;
		});
		this.setState({
			selectedList,
			listValues: values
		});
	}
	onLoaded(response) {
			let list = response.items;
			this.setState({
				list
			})
		}
		//回款提交
	onAddReceivedSubmit(params) {
		let {
			accountDetail,
			contractTopReceive
		} = this.state;
		params = Object.assign({}, params);
		params.mainbillId = this.props.params.orderId

		var intentStr = {};
		var joinStr = {};
		var increaseStr = {};
		var adminStr = {};
		contractTopReceive.map(function(item, index) {
			var key = item.detailid;
			var accountType = item.contactType;
			if (accountType == 2) {
				var conJasonStre = {};
				if (params['fix' + key + '1'] && !params['fix' + key + '3']) {
					conJasonStre['1'] = params['fix' + key + '1'];
					joinStr[key] = conJasonStre
					delete params['fix' + key + '1'];
				} else if (params['fix' + key + '3'] && !params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					joinStr[key] = conJasonStre
					delete params['fix' + key + '3'];
				} else if (params['fix' + key + '3'] && params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					conJasonStre['1'] = params['fix' + key + '1'];
					joinStr[key] = conJasonStre
					delete params['fix' + key + '3'];
					delete params['fix' + key + '1'];
				}

			}
			if (accountType == 3) {
				var conJasonStre = {};
				if (params['fix' + key + '1'] && !params['fix' + key + '3']) {
					conJasonStre['1'] = params['fix' + key + '1'];
					increaseStr[key] = conJasonStre
					delete params['fix' + key + '1'];
				} else if (params['fix' + key + '3'] && !params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					increaseStr[key] = conJasonStre
					delete params['fix' + key + '3'];
				} else if (params['fix' + key + '3'] && params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					conJasonStre['1'] = params['fix' + key + '1'];
					increaseStr[key] = conJasonStre
					delete params['fix' + key + '3'];
					delete params['fix' + key + '1'];
				}

			}
			if (accountType == 4) {
				var conJasonStre = {};
				if (params['fix' + key + '1'] && !params['fix' + key + '3']) {
					conJasonStre['1'] = params['fix' + key + '1'];
					adminStr[key] = conJasonStre
					delete params['fix' + key + '1'];
				} else if (params['fix' + key + '3'] && !params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					adminStr[key] = conJasonStre
					delete params['fix' + key + '3'];
				} else if (params['fix' + key + '3'] && params['fix' + key + '1']) {
					conJasonStre['3'] = params['fix' + key + '3'];
					conJasonStre['1'] = params['fix' + key + '1'];
					adminStr[key] = conJasonStre
					delete params['fix' + key + '3'];
					delete params['fix' + key + '1'];
				}

			}
			if (accountType == 1) {
				var conJasonStre = {};
				if (params['fix' + key + '2']) {
					conJasonStre['2'] = params['fix' + key + '2'];
					intentStr[key] = conJasonStre
					delete params['fix' + key + '2'];
				}

			}

		});


		let {
			totalPayment
		} = params;
		let liveMoneyValue = this.state.liveMoneyValue;

		params.conJasonStr = {
			intentStr,
			joinStr,
			increaseStr,
			adminStr
		}
		params.conJasonStr = Object.assign({}, intentStr, joinStr, increaseStr, adminStr);


		params = Object.assign({}, params);
		params.propJasonStr = {};
		accountDetail.map(function(item, index) {
			var key = item.id;
			if (params.hasOwnProperty(key) && params[key]) {
				params.propJasonStr[key] = params[key];
				delete params[key];
			}
		});
		params.operatedate = dateFormat(params.operatedate, "yyyy-mm-dd hh:MM:ss");
		params.propJasonStr = JSON.stringify(params.propJasonStr);
		params.conJasonStr = JSON.stringify(params.conJasonStr);


		if (!params.contract) {
			Message.error('请选择对应合同');
			return;
		}
		if (params.propJasonStr == '{}' && params.conJasonStr == '{}') {
			Message.error('回款不能为空');
			return;
		}
		if (liveMoneyValue < 0) {
			Message.error('拆分金额大于回款总额');
			return;
		}
		if (liveMoneyValue > 0) {
			Message.error('回款总额有剩余');
			return;
		}

		var _this = this;
		Store.dispatch(Actions.callAPI('returnMoneyNew', {}, params)).then(function(response) {
			_this.refresh();
			_this.setState({
				openRight: !_this.state.openRight,
				isLoading: true,
			});
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	onQuitSubmit(params) {
		var _this = this;
		params = Object.assign({}, params);
		params.operatedate = dateFormat(params.operatedate, "yyyy-mm-dd hh:MM:ss");
		Store.dispatch(Actions.callAPI('payBack', {}, params)).then(function(response) {
			_this.refresh();
			_this.setState({
				openQuitBtn: !_this.state.openQuitBtn,
				isLoading: true,
				listValues: ''
			});
		}).catch(function(err) {
			Message.error(err.message);
		});


	}
	onSwitchSubmit(params) {
		var _this = this;
		Store.dispatch(Actions.callAPI('transToDeposit', {}, params)).then(function(response) {
			_this.refresh();
			_this.setState({
				openSwitchBtn: !_this.state.openSwitchBtn,
				isLoading: true,
				listValues: ''
			});
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	onBusinessSubmit(params) {
		var _this = this;
		Store.dispatch(Actions.callAPI('transToOperateIncome', {}, params)).then(function(response) {
			_this.refresh();
			_this.setState({
				openBusinessBtn: !_this.state.openBusinessBtn,
				isLoading: true,
				listValues: ''
			});
		}).catch(function(err) {
			Message.error(err.message);
		});



	}
	onConfrimSubmit(params) {
		let {
			stationPayment,
			accountDetail
		} = this.state;
		var contractId = stationPayment.id;
		params = Object.assign({}, params);
		params.propJasonStr = {};
		accountDetail.map(function(item, index) {
			var key = item.id;
			if (params.hasOwnProperty('fix' + key) && params['fix' + key]) {
				params.propJasonStr[key] = params['fix' + key];
				delete params['fix' + key];
			}
		});
		params.propJasonStr[contractId] = params.stationPaymentName;
		//delete params.stationPaymentName;
		params.propJasonStr = JSON.stringify(params.propJasonStr);

		if (params.propJasonStr == '{}') {
			Message.error('至少填写一项金额');
			return;
		}

		var _this = this;
		params.operatedate = dateFormat(params.operatedate, "yyyy-mm-dd hh:MM:ss");
		Store.dispatch(Actions.callAPI('onNewAccountg', {}, params)).then(function() {
			_this.refresh();
			_this.setState({
				openAddaccountBtn: !_this.state.openAddaccountBtn,
				isLoading: true,
			})
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	onSupplementSubmit() {
			var _this = this;
			Store.dispatch(Actions.callAPI('addIncome', {
				mainbillid: _this.props.params.orderId
			})).then(function(response) {
				_this.refresh();
				_this.setState({
					openSupplementBtn: !_this.state.openSupplementBtn,
					isLoading: true
				})
			}).catch(function(err) {
				Message.error(err.message);
			});


		}
		//操作相关
	onOperation(type, itemDetail) {
		if (type == 'view') {
			this.openViewDialog(itemDetail);
		}
	}
	onShiftBtnSubmit = (params) => {
		let {
			shiftData
		} = this.state;
		params = Object.assign({}, params);
		params.propJasonStr = {};
		shiftData.map(function(item, index) {
			var key = item.id;
			if (params.hasOwnProperty('fix' + key) && params['fix' + key]) {
				params.propJasonStr[key] = params['fix' + key];
				delete params['fix' + key];
			}
		});
		params.propJasonStr = JSON.stringify(params.propJasonStr);

		if (params.propJasonStr == '{}') {
			Message.error('至少填写一项金额');
			return;
		}

		var _this = this;
		params.operatedate = dateFormat(params.operatedate, "yyyy-mm-dd hh:MM:ss");
		Store.dispatch(Actions.callAPI('transferPayment', {}, params)).then(function() {
			_this.refresh();
			_this.setState({
				openShift: !_this.state.openShift,
				isLoading: true,
				listValues: ''
			})
		}).catch(function(err) {
			Message.error(err.message);
		});

	}

	//
	initBasicInfo() {
		var _this = this;
		let {
			params
		} = this.props;
		Store.dispatch(Actions.callAPI('getAccountFlow', {
			mainbillid: params.orderId,
		})).then(function(response) {
			_this.setState({
				basicInfo: response.topdata,
				detailPayment: response.paymentdata,
				detailIncome: response.incomedata,
				detailBalance: response.balance,
				isInitLoading: false,
				isRunningIncome: response.isIncomeRunning,
				colorClassName: response.isIncomeRunning == 2 ? 'historyIncomeGray' : 'historyIncome'
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	searchUpperFun() {

		var _this = this;
		let {
			params
		} = this.state;

		params.endTime = '';
		params.startTime = '';
		params.tradingCode = '';
		params.propertyId = '';
		params.accountId = '';

		Store.dispatch(Actions.callAPI('findAccountAndPropList', {
			accountType: params.accountType
		})).then(function(response) {
			var codeList = [];
			var typeList = [];
			response.account.map(function(item, index) {
				var list = {}
				list.value = item.id;
				list.label = item.accountname;
				codeList.push(list);
			});

			response.property.map(function(item, index) {
				var list = {}
				list.value = item.id;
				list.label = item.propname;
				typeList.push(list);
			})
			_this.setState({
				codeList,
				typeList,
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	historyIncomed = () => {
		let {
			isRunningIncome
		} = this.state;
		if (isRunningIncome == 0) {

			var _this = this;
			let {
				params
			} = this.props;
			_this.setState({
				isRunningIncome: 1
			});
			Store.dispatch(Actions.callAPI('runStationIncome', {
				mainbillId: params.orderId,
			})).then(function(response) {
				setTimeout(function() {
					_this.setState({
						isRunningIncome: 2,
						colorClassName: 'historyIncomeGray'
					});
				}, 1000)
			}).catch(function(err) {
				Message.error(err.message);
				_this.setState({

					isRunningIncome: 0

				});
			});
		}
	}



	componentDidMount() {
		this.initBasicInfo();
		Store.dispatch(Actions.switchSidebarNav(false));
	}



	snackTipClose = () => {


		var _this = this;
		let {
			params
		} = this.props;
		Store.dispatch(Actions.callAPI('removeRunningTag', {}, {
			mainbillId: params.orderId,
		})).then(function(response) {
			//_this.refresh();
			window.location.reload();
			_this.setState({
				isRunningIncome: 0,
				colorClassName: 'historyIncome'
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	initializeSnack = (open = false, title = '正在补历史收入...', titleAfter, color) => {

		let style = {
			'background': color,
			'position': 'fixed',
			'top': '10px',
			'left': 0,
			'right': 0
		}

		return (

			<SnackTip style={style} open={open} title={title} titleAfter={titleAfter} onClose={this.snackTipClose}/>

		);
	}



	renderSnack = () => {

		let {
			isRunningIncome
		} = this.state;
		if (isRunningIncome == 1) {
			return this.initializeSnack(true, '正在补历史收入...', '', '#69bbf0');
		} else if (isRunningIncome == 0) {
			return this.initializeSnack(false, '未完成');
		} else if (isRunningIncome == 2) {

			return this.initializeSnack(true, '补历史收入已完成!', '确认', '#75c7bc');
		}


	}

	renderReceived = () => {
		return (<Table style={{marginTop:60}} ajax={true} loading={this.state.isLoading} onSelect={this.onSelect} onLoaded={this.onLoaded} ajaxUrlName='getAccountNewFlow' ajaxParams={this.state.params} onOperation={this.onOperation}>
							              <TableHeader>
										          <TableHeaderColumn>交易编号</TableHeaderColumn>
										          <TableHeaderColumn>交易日期</TableHeaderColumn>
										          <TableHeaderColumn>支付方式</TableHeaderColumn>
										          <TableHeaderColumn>类别</TableHeaderColumn>
										          <TableHeaderColumn>款项</TableHeaderColumn>
										          <TableHeaderColumn>金额</TableHeaderColumn>
										          <TableHeaderColumn>备注</TableHeaderColumn>
										           <TableHeaderColumn>操作</TableHeaderColumn>
							              </TableHeader>
							              <TableBody>
							                <TableRow>
							                	<TableRowColumn name="tradingCode" style={{width:160,overflow:"visible"}} component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value==''){
                                                           value='无'
														 }
														if(value.length==""){
															TooltipStyle="none"
														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
							                    <TableRowColumn name="occuryear" type="date" format="yyyy-mm-dd"></TableRowColumn>
							                    <TableRowColumn name="accountName"></TableRowColumn>
							                    <TableRowColumn name="typeName"></TableRowColumn>
							                    <TableRowColumn name="propertyName"></TableRowColumn>
							                    <TableRowColumn name="finaflowAmount"></TableRowColumn>
							                    <TableRowColumn name="finaflowdesc" style={{width:160,overflow:"visible"}} component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'><div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div></Tooltip></div>)
													 }}></TableRowColumn>
							                    <TableRowColumn>
							                        <Button label="查看"  type="operation" operation="view"/>
							                    </TableRowColumn>
							                  </TableRow>
							              </TableBody>
							              <TableFooter></TableFooter>
						              </Table>)
	}
	renderIncomed = () => {
		return (<Table style={{marginTop:60}} ajax={true} loading={this.state.isLoading} onSelect={this.onSelect} onLoaded={this.onLoaded} ajaxUrlName='getAccountNewFlow' ajaxParams={this.state.params} onOperation={this.onOperation}>
							              <TableHeader>
										          <TableHeaderColumn>交易编号</TableHeaderColumn>
										          <TableHeaderColumn>交易日期</TableHeaderColumn>
										          <TableHeaderColumn>支付方式</TableHeaderColumn>
										          <TableHeaderColumn>类别</TableHeaderColumn>
										          <TableHeaderColumn>款项</TableHeaderColumn>
										          <TableHeaderColumn>金额</TableHeaderColumn>
										          <TableHeaderColumn>工位</TableHeaderColumn>
										          <TableHeaderColumn>月租金</TableHeaderColumn>
										          <TableHeaderColumn>备注</TableHeaderColumn>
										           <TableHeaderColumn>操作</TableHeaderColumn>
							              </TableHeader>
							              <TableBody>
							                <TableRow>
							                	<TableRowColumn name="tradingCode"  style={{width:160,overflow:"visible"}} component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value==''){
                                                           value='无'
														 }
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
							                    <TableRowColumn name="occuryear" type="date" format="yyyy-mm-dd"></TableRowColumn>
							                    <TableRowColumn name="accountName"></TableRowColumn>
							                    <TableRowColumn name="typeName"></TableRowColumn>
							                    <TableRowColumn name="propertyName"></TableRowColumn>
							                    <TableRowColumn name="finaflowAmount"></TableRowColumn>
							                    <TableRowColumn name="stationNum"></TableRowColumn>
							                    <TableRowColumn name="monthRent"></TableRowColumn>
							                    <TableRowColumn name="finaflowdesc" style={{width:160,overflow:"visible"}} component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'><div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div></Tooltip></div>)
													 }}></TableRowColumn>
							                    <TableRowColumn>
							                        <Button label="查看"  type="operation" operation="view"/>
							                    </TableRowColumn>
							                  </TableRow>
							              </TableBody>
							              <TableFooter></TableFooter>
						             </Table>)
	}

	typeSelectRender = () => {
		let {
			params,
		} = this.state;

		let parentBtn = params.accountType;
		let childBtn = params.childType;
		if (parentBtn == 'INCOME' && childBtn == 'gongweishouru' || parentBtn == 'INCOME' && childBtn == 'basic') {
			return this.renderIncomed();
		} else {
			return this.renderReceived();
		}
	}

	iconClose = () => {
		this.setState({
			openRight: !this.state.openRight,
			liveMoneyValue: 0
		});
		this.receivedBtnFormChangeValues = {}
	}



	contractContinue = (type, detailid) => {
		let {
			basicInfo,
		} = this.state;
		let {
			params
		} = this.props;
		var orderType;
		if (type == 1) {
			orderType = 'admit';
		} else if (type == 2) {
			orderType = 'join';
		} else if (type == 3) {
			orderType = 'increase';
		} else if (type == 4) {
			orderType = 'renew';
		} else if (type == 5) {
			orderType = 'reduce';
		} else if (type == 6) {
			orderType = 'exit';
		}
		location.href = `/#/operation/customerManage/${basicInfo.customerid}/order/${params.orderId}/agreement/${orderType}/${detailid}/detail`
	}

	calcBalance = (input) => {


		input.value = Math.round((input.value * 100))

		this.receivedBtnFormChangeValues[input.name] = input.value;



		let receivedBtnFormChangeValues = this.receivedBtnFormChangeValues;
		let {
			totalPayment
		} = receivedBtnFormChangeValues;
		let liveMoneyValue = totalPayment;

		if (totalPayment) {

			for (var item in receivedBtnFormChangeValues) {
				if (receivedBtnFormChangeValues.hasOwnProperty(item) && item != 'totalPayment') {

					liveMoneyValue -= receivedBtnFormChangeValues[item];
				}
			}
		}



		liveMoneyValue = liveMoneyValue / 100;

		this.setState({
			liveMoneyValue
		});


	}


	render() {

		let {
			params,
			isInitLoading,
			colorClassName,
			fiMoney,
			shiftData,
			stationPayment
		} = this.state;

		if (isInitLoading) {
			return <Loading/>
		}



		//判断按钮出现与隐藏
		let childBtn = params.childType;
		let parentBtn = params.accountType;
		let propInfo = params.propInfo;
		//回款传订单id
		let initialValues = {
				mainbillid: params.orderId,
			}
			//退款等要操作的id
		let initialValuesId = {
				id: fiItem.id,
				fiMoney: fiMoney
			}
			//高级查询
		let searchValue = {
			accountType: params.accountType,
			orderId: params.orderId
		}

		var buttonArr = [];
		if (parentBtn == 'PAYMENT' && childBtn == 'basic') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="退款"   type="button" joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	  <Button label="转移"   type="button"  onTouchTap={this.openShiftBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'dingjin') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转押金"  type="button"  joinEditForm onTouchTap={this.openSwitchBtn}/>
       	   	  <Button label="转营收"  type="button" joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	 </ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'yajin') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转营收"  type="button"  joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	  </ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'gongweihuikuan') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转营收"  type="button"  joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	  </ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'qitahuikuan') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="转营收"  type="button" joinEditForm onTouchTap={this.openBusinessBtn}/>
       	   	  <Button label="退款"  type="button"  joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	   <Button label="转移"   type="button"  onTouchTap={this.openShiftBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'yingshouhuikuan') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
				</ButtonGroup>

			);
		}
		if (parentBtn == 'PAYMENT' && childBtn == 'shenghuoxiaofeihuikuan') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>

       	   	  <Button label="退款"  type="button" joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	   <Button label="转移"   type="button"  onTouchTap={this.openShiftBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && childBtn == 'basic') {
			buttonArr.push(<ButtonGroup><Button label="挂账" type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && childBtn == 'gongweishouru') {
			buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/>
       	   	  <Button label="补收入"  type="button" joinEditForm onTouchTap={this.openSupplementBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && childBtn == 'qitashouru') {
			buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && childBtn == 'yingyewaishouru') {
			buttonArr.push(<ButtonGroup><Button label="挂账" type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && childBtn == 'shenghuoxiaofeishouru') {
			buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'PAYMENT' && propInfo == 'NEW') {
			buttonArr.push(<ButtonGroup><Button label="回款"  type="button" joinEditForm onTouchTap={this.openReceivedBtn}/>
       	   	  <Button label="退款" type="button" joinEditForm onTouchTap={this.openQuitBtn}/>
       	   	   <Button label="转移"   type="button"  onTouchTap={this.openShiftBtn}/></ButtonGroup>);
		}
		if (parentBtn == 'INCOME' && propInfo == 'NEW') {
			buttonArr.push(<ButtonGroup><Button label="挂账"  type="button" joinEditForm onTouchTap={this.openAccountBtn}/></ButtonGroup>);
		}

		const close = [
			<Button
        label="关闭"
        joinEditForm
         style={{marginLeft:10}}
        onTouchTap={this.closeViewDialog}
        />
		]


		return (

			<div className='m-orderBillDetail'>

			        {this.renderSnack()}
					<Title value="订单明细账_财务管理"/>
					<Section title="订单明细账" description="" style={{marginBottom:-5,minHeight:910}}>

					      <DotTitle title='订单描述' style={{marginTop:'6',marginBottom:'40'}}/>
						  <BasicInfo  detail={this.state.basicInfo}  />

						  <DotTitle title='订单明细账' style={{marginTop:'28',marginBottom:'62'}}/>
						  <div className='ui-detail-bottom'>
								<Row style={{marginTop:10}}>
								 <div className='detail-left'>
									<SearchParam onSearch={this.onSearch} params={this.state.params} detailPayment={this.state.detailPayment} detailIncome={this.state.detailIncome} detailBalance={this.state.detailBalance}/>

								 </div>
								 <div className='detail-right'>
								     <div>
								        <Col align="left" md={9} className='btn-left'>{buttonArr}</Col>
								        <Col align="right" md={3} style={{'position':'relative'}}><Button  type='search'  searchClick={this.openSearchDialog}/><span className={colorClassName} onClick={this.historyIncomed}><Tooltip  offsetTop={8} place='top'>重跑历史收入</Tooltip></span></Col>
								     </div>

									 {this.typeSelectRender()}
								</div>

							</Row>
                       </div>
				</Section>


				    <Dialog
						title="高级查询"
						open={this.state.openSearch}
						onClose={this.closeSearchDialog}
						contentStyle ={{ width: '686'}}
						>
					   <SearchForm  onCancel={this.closeSearchDialog} initialValues={searchValue} codeList={this.state.codeList} typeList={this.state.typeList} onSubmit={this.onSubmit}/>
					 </Dialog>
                   

				      <Drawer 
				        open={this.state.openRight} 
				        width={650} 
				        openSecondary={true}
				        className='m-finance-drawer' 
				        containerStyle={{top:60,paddingBottom:228,zIndex:20}} 
				        >
				       <div>
                        <ReceiveDetailTop iconClose={this.iconClose} contractTopReceive={this.state.contractTopReceive} liveMoneyValue={this.state.liveMoneyValue} contractContinue={this.contractContinue}/>
                        <ReceivedBtnForm
                          open={this.state.openRight} 
                          onSubmit={this.onAddReceivedSubmit}
                          onCancel={this.iconClose}
                          optionList={this.state.payWayList}
                          accountDetail={this.state.accountDetail}
                          contractReceive={this.state.contractReceive}
                          calcBalance={this.calcBalance}
                          />
                       </div>
                      </Drawer>
             


                     {this.state.openRight&&<div className='trasparent' onClick={this.iconClose}></div>}


					 <Dialog
						title="退款"
						open={this.state.openQuitBtn}
						onClose={this.closeQuitBtn}
						contentStyle ={{ width: '688'}}
						>
					   <QuitBtnForm  onSubmit={this.onQuitSubmit} onCancel={this.closeQuitBtn}  fiMoney={fiMoney} initialValuesId={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="添加转移"
						open={this.state.openShift}
						onClose={this.closeShiftBtn}
						contentStyle ={{ width: '688'}}
						>
					   <ShiftBtnForm onSubmit={this.onShiftBtnSubmit}  onCancel={this.closeShiftBtn} initialValuesId={initialValuesId} shiftData={shiftData} />
					 </Dialog>


					 <Dialog
						title="转押金"
						open={this.state.openSwitchBtn}
						onClose={this.closeSwitchBtn}
						contentStyle ={{ width: '688'}}
						>
					   <SwitchBtnForm  onSubmit={this.onSwitchSubmit} onCancel={this.closeSwitchBtn} optionList={this.state.receivedList}  fiMoney={fiMoney} initialValuesId={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="转营收"
						open={this.state.openBusinessBtn}
						onClose={this.closeBusinessBtn}
						contentStyle ={{ width: '688'}}
						>
					   <BusinessBtnForm  onSubmit={this.onBusinessSubmit} onCancel={this.closeBusinessBtn}  fiMoney={fiMoney} initialValuesId={initialValuesId}/>
					 </Dialog>

					 <Dialog
						title="挂账"
						open={this.state.openAddaccountBtn}
						onClose={this.closeAddaccount}
						contentStyle ={{ width: '688'}}
						>
					   <AccountBtnForm  onSubmit={this.onConfrimSubmit}  onCancel={this.closeAddaccount}  optionList={this.state.payWayList}  accountDetail={this.state.accountDetail} contractList={this.state.contractList} stationPayment={stationPayment}/>
					 </Dialog>

					 <Dialog
						title="补收入"
						open={this.state.openSupplementBtn}
						onClose={this.openSupplementBtn}
						contentStyle ={{ width: '445',height:'236'}}
						>
					   <SupplementBtnForm  onSubmit={this.onSupplementSubmit} mainbillid="{params.orderId}" onCancel={this.openSupplementBtn} />
					 </Dialog>

					  <Dialog
						title="查看"
						open={this.state.openView}
						onClose={this.closeViewDialog}
						>
						<ViewForm detail={this.state.itemDetail}  />
					 </Dialog>

					 <Dialog
						title="合同详情"
						open={this.state.openContract}
						onClose={this.contractContinue}
						contentStyle ={{ width: '443',height:'236'}}
						>
						<div className='m-continueGo'>正在开发中，敬请期待...</div>
					 </Dialog>

					 

			</div>
		);

	}
}