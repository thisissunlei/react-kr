import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo
} from 'kr-ui';
import './index.less';


class AddMoney extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			flowAmount: 0,
			payment: [{
				label: '无',
				value: 'NONE'
			}, {
				label: '支付宝支付',
				value: 'ZHIFUBAO'
			}, {
				label: '微信支付',
				value: 'WEIXIN'
			}, {
				label: '银行转账',
				value: 'YINGHANG'
			}, {
				label: 'POS机支付',
				value: 'POS'
			}],
			accountList: [],
			mainbillInfo: {},
			showName: false,
			finaflowInfo: {},
			customerId: "",
		}
		this.receivedBtnFormChangeValues = {};


	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			showName: !this.state.showName
		})
	}

	openCreateCustomer = () => {
		let {
			openCreateCustomer
		} = this.props;
		openCreateCustomer && openCreateCustomer();
	}
	openCustomer = (form) => {
		if (form.id == 0) {
			this.openCreateCustomer();
		} else {
			this.setState({
				customerId: form.id
			})
		}


	}

	argreementChecked = (options) => {
		var name = [],
			input = {
				value: 0
			},
			nameList = [];
		let {
			finaflowInfo
		} = this.state;
		var _this = this;
		options.map((item, index) => {
			var len = options.length - 1;
			name.push(`fix-${item.detailid}-${item.depositId}`);
			name.push(`fix-${item.detailid}-${item.totalrentId}`);
			if (item.checked == false) {
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.depositId}-1`, ''));
				Store.dispatch(change('addMoney', `fix-${item.detailid}-${item.totalrentId}-2`, ''));
				_this.getCount(input, name);
			}
			if (options[len].checked == false) {
				finaflowInfo.scvList.map((item, index) => {
					nameList.push(`no-${item.id}`)
					Store.dispatch(change('addMoney', `no-${item.id}`, ''));
				})
				_this.getCount(input, '', nameList);
			}

		})

	}

	calcBalance = (value, input) => {
		var lastValue = value.split('.')[1]
		if (lastValue && lastValue.length > 2) {
			Message.error('最多到小数点后两位');
			return;
		}
		let {
			changeValues,
		} = this.props;
		input.value = value;
		this.getCount(input)
	}

	getCount = (input, name, nameList) => {
		input.value = Math.round((input.value * 100))
		this.receivedBtnFormChangeValues[input.name] = input.value;
		let receivedBtnFormChangeValues = this.receivedBtnFormChangeValues;
		let liveMoneyValue = 0;
		if (input.value === 0) {
			var n1 = name[0];
			var n2 = name[1];
			var name1 = `${n1}-1`,
				name2 = `${n2}-2`;
			receivedBtnFormChangeValues[name1] = 0;
			receivedBtnFormChangeValues[name2] = 0;

			if (nameList && nameList.length > 0) {
				nameList.map((item, index) => {
					receivedBtnFormChangeValues[item] = 0;
				})
			}

		}
		for (var item in receivedBtnFormChangeValues) {
			if (receivedBtnFormChangeValues.hasOwnProperty(item)) {
				liveMoneyValue += receivedBtnFormChangeValues[item] * 1;
			}
		}


		liveMoneyValue = liveMoneyValue / 100;
		this.setState({
			flowAmount: liveMoneyValue
		});


	}

	openCreateMainbill = () => {
		let {
			openCreateMainbill
		} = this.props;
		openCreateMainbill && openCreateMainbill();
	}
	getMainbillInfo = (form) => {
		var _this = this;
		if (form.id == 0) {
			this.openCreateMainbill();
		}
		Store.dispatch(Actions.callAPI('get-mainbill-info', {
			mainBillId: form.value
		}, {})).then(function(response) {

			_this.setState({
				mainbillInfo: response
			})

		}).catch(function(err) {});
		Store.dispatch(Actions.callAPI('get-finaflow-info', {
			mainBillId: form.value
		}, {})).then(function(response) {
			var obj = {
				label: "无合同",
				contactType: '0',
				value: '0'
			}
			response.cimbList.map((item, index) => {
				item.value = item.detailid;
				item.label = item.contactName;
				return item;
			})
			response.cimbList.push(obj)
			_this.setState({
				finaflowInfo: response
			})

		}).catch(function(err) {});
	}
	getAccount = (form) => {
		var accountList;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-account-info', {
			accountType: form.value
		}, {})).then(function(response) {
			accountList = response.map((item, index) => {
				item.label = item.accountNum;
				item.value = item.accountId;
				return item;
			})
			_this.setState({
				accountList: accountList
			})

		}).catch(function(err) {});
	}

	onSubmit = (form) => {
		var parentIdList = form.contract.split(',');
		var childrenList = [];
		var reg = /^fix/;
		var noReg = /^no/;
		var fixList = [];
		var valueList = [];
		var noList = []
		var key;
		for (key in form) {
			if (reg.test(key)) {
				fixList.push(key);
				valueList.push(form[key])
			}

			if (noReg.test(key)) {
				var arr = key.split('-');
				var obj = {
					"id": arr[1],
					"value": form[key]
				}
				noList.push(obj)
			}
		}
		parentIdList.map((item, index) => {
			var obj = {
				"id": item,
				"value": []
			}

			fixList.map((items, index) => {

				var arr = items.split('-');
				if (arr[1] == item) {
					var obj2 = {
						"id": arr[2],
						"value": valueList[index]
					}
					obj.value.push(obj2)
				}

			})
			childrenList.push(obj)
		})
		childrenList.map((item, index) => {
			if (item.id == 0) {
				childrenList.pop();
			}
		})

		let {
			onSubmit
		} = this.props;
		var params = {
			accountId: form.accountId,
			customerId: form.customerId,
			dealTime: form.dealTime,
			mainBillId: form.mainBillId,
			payAccount: form.payAccount,
			payWay: form.payWay,
			remark: form.remark,
			uploadFileIds: form.uploadFileIds,
			conJasonStr: JSON.stringify(childrenList),
			propJasonStr: JSON.stringify(noList),
			flowAmount: this.state.flowAmount
		}
		onSubmit && onSubmit(params);
	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	joinInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = "履约保证金"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = "工位服务费"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	increaseInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = "履约保证金"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = "工位服务费"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	renewInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = "履约保证金"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.depositId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = "工位服务费"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.totalrentId}-2`
			}
			style = {
				{
					width: 261,
					marginLeft: 28
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/> < /div >
		)
	}
	adminInputRender = (item) => {
		return ( < div style = {
				{
					width: 600,
					marginTop: 8
				}
			}
			className = 'm-tenantStation' >
			< KrField label = "定金"
			grid = {
				1 / 2
			}
			name = {
				`fix-${item.detailid}-${item.frontId}-1`
			}
			style = {
				{
					width: 261,
					marginLeft: -9
				}
			}
			component = "input"
			type = "text"
			onChange = {
				this.calcBalance
			}
			onBlur = {
				this.moneyCheck
			}
			/>

			< /div>
		)
	}



	renderPayList = () => {
		let {
			finaflowInfo
		} = this.state;

		if (!finaflowInfo.cimbList) {
			return (
				<div className="u-audit-content-null">
					<div className="u-audit-content-null-icon"></div>
					<div className="u-audit-content-null-title">暂时还没有数据呦亲~</div>
				</div>
			)
		}

		var _this = this;
		if (finaflowInfo.cimbList && finaflowInfo.cimbList.length > 0) {

			finaflowInfo.cimbList.map(function(item, index) {

				//意向书
				if (item.contactType == '1') {
					item.component = _this.adminInputRender.bind(this, item);

				}
				//入驻协议书
				if (item.contactType == '2') {
					item.component = _this.joinInputRender.bind(this, item);

				}

				//增租协议书
				if (item.contactType == '3') {

					item.component = _this.increaseInputRender.bind(this, item);
				}
				//续租协议书
				if (item.contactType == '4') {

					item.component = _this.renewInputRender.bind(this, item);
				}
				//
				if (item.contactType == '0') {

					item.component = _this.receiveInputRender;
				}
			})
			return (
				<div>
					<KrField label="对应合同" name='contract' grid={1 / 2} component="groupCheckbox" defaultValue={finaflowInfo.cimbList} requireLabel={true} onChange={this.argreementChecked}/>
				</div>

			)
		}


	}

	//无合同
	receiveInputRender = () => {
		let {
			finaflowInfo
		} = this.state;
		var _this = this;

		return ( < div style = {
				{
					marginBottom: -7,
					width: 650
				}
			} > {
				finaflowInfo.scvList.map(function(item, index) {
					if (index % 2 == 0) {
						return <div className='leftBottomValue'><KrField key={index} style={{
                            marginBottom: 5,
                            width: 261,
                            marginLeft: -9
                        }} grid={1 / 2} label={item.categoryName} component="input" name={`no-${item.id}`} type="text" onChange={_this.calcBalance} onBlur={_this.moneyCheck}/></div>
					} else {
						return <div className='rightBottomValue'><KrField key={index} style={{
                            marginBottom: 5,
                            width: 261
                        }} grid={1 / 2} label={item.categoryName} component="input" name={`no-${item.id}`} type="text" onChange={_this.calcBalance} onBlur={_this.moneyCheck}/></div>
					}
				})
			} < /div>)

		}



		render() {

			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			let {
				payment,
				accountList,
				mainbillInfo,
				showName,
				customerId,
				flowAmount,
			} = this.state;
			return (
				<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>添加回款</span>
			     	<span className="u-audit-close" onTouchTap={this.onCancel}></span>
			     </div>
			     <form onSubmit={handleSubmit(this.onSubmit)} >
					<CircleStyleTwo num="1" info="付款信息">
						<KrField
								style={{width:260}}
								name="customerId" 
								component="searchCustomer" 
								label="客户名称"
								requireLabel={true}
								onChange={this.openCustomer}
								showName={showName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="mainBillId" 
								component="searchMainbill" 
								label="所属订单"
								requireLabel={true}
								customerId={customerId}
								onChange={this.getMainbillInfo}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false} 
								label="订单起止"
								defaultValue="-" 
								value={mainbillInfo.mainBillDate} 
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText" 
								inline={false}
								label="公司主体"
								defaultValue="-"
								value={mainbillInfo.corporationName} 
						/>
						<KrField
								style={{width:260}}
								name="payWay" 
								component="select" 
								label="收款方式" 
								options={payment}
								onChange={this.getAccount}
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="accountId" 
								component="select" 
								label="我司账户" 
								options={accountList}
								requireLabel={true}
						/>
						<KrField
								style={{width:260}}
								name="payAccount" 
								type="text" 
								component="input"
								label="付款账户" 
								options=""
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime" 
								component="date" 
								label="收款日期" 
								requireLabel={true}
						/>
						<KrField  
								style={{width:548}}  
								name="remark" 
								component="textarea" 
								label="备注" 
								maxSize={100}
						/>
						<KrField  
							 	name="contractFileList" 
							 	component="input" 
							 	type="hidden" 
							 	label="合同附件"
						/>
						<KrField  
							style={{width:548}}  
							name="uploadFileIds" 
							component="file" 
							label="上传附件" 
							defaultValue={[]} 
							onChange={(files)=>{
								Store.dispatch(change('AddMoney','contractFileList',files));
							}} 
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span>{flowAmount}</span>
						</div>
						{this.renderPayList()}
						<Grid style={{marginTop:50}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"  />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
					</CircleStyleTwo>
				</form>
			</div>


			);
		}
	}
	const validate = values => {

		const errors = {}

		if (!values.customerId) {
			errors.customerId = '请选择客户名称';
		}

		if (!values.mainBillId) {
			errors.mainBillId = '请选择所属订单';
		}

		if (!values.payWay) {
			errors.payWay = '请选择收款方式';
		}
		if (!values.accountId) {
			errors.accountId = '请选择我司账户';
		}
		if (!values.payAccount) {
			errors.payAccount = '请输入付款账户';
		}
		if (!values.dealTime) {
			errors.dealTime = '请选择收款日期';
		}


		return errors
	}


	export default reduxForm({
		form: 'addMoney',
		validate,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	})(AddMoney);