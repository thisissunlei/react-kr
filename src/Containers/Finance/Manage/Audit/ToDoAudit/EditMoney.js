import React from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {DateFormat} from 'kr/Utils';
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
	CircleStyleTwo,
	Message,
	LoadingTwo
} from 'kr-ui';
import './index.less';


class EditMoney extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			flowAmount: 0,
			payment: [{
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
			infoList: {},
			finaflowInfo: {},
			corporationId: '',
			Loading: false
		}
		this.getDetailInfo();
		this.getInfo();
		this.receivedBtnFormChangeValues = {};

	}
	componentDidMount() {
		var _this = this;
		setTimeout(function() {
			_this.getDetailInfo();
		}, 0)
	}


	//付款信息
	getInfo = () => {
			var _this = this;
			var finaVerifyId = this.props.detail.id
			Store.dispatch(Actions.callAPI('get-fina-infos', {
				finaVerifyId
			})).then(function(response) {
				response.dealTime = DateFormat(response.dealTime, "yyyy-mm-dd hh:MM:ss");
				_this.setState({
					infoList: response,
					flowAmount: response.flowAmount.replace(/,/gi,''),
					corporationId: response.corporationId
				})
				var form = {
					"value": response.payWay
				}
				_this.getAccount(form)
				Store.dispatch(initialize('editMoneys', response));



			});
		}
		//付款明细
	getDetailInfo = () => {
		var finaVerifyId = this.props.detail.id
		var _this = this;
		Store.dispatch(Actions.callAPI('get-flow-edit-info', {
			finaVerifyId
		})).then(function(response) {
			var obj = {
				label: "无合同",
				contactType: '0',
				value: '0',
				checked: true
			}

			response.cimbList && response.cimbList.map((item, index) => {
				item.checked = true;
				item.label = item.contactName;
				item.value = item.detailid;
				if(item.depositId){
					var deposit=item.deposit.replace(/,/gi,'')
					Store.dispatch(change('editMoneys', `fix-${item.detailid}-${item.depositId}-1`, deposit));
					_this.receivedBtnFormChangeValues[`fix-${item.detailid}-${item.depositId}-1`] = deposit * 100;
				}

				if(item.frontId){
					var frontmoney=item.frontmoney.replace(/,/gi,'')
					Store.dispatch(change('editMoneys', `fix-${item.detailid}-${item.frontId}-1`, frontmoney));
					_this.receivedBtnFormChangeValues[`fix-${item.detailid}-${item.frontId}-1`] = frontmoney * 100;
				}
				if(item.totalrentId){
					var totalrent=item.totalrent.replace(/,/gi,'')
					Store.dispatch(change('editMoneys', `fix-${item.detailid}-${item.totalrentId}-2`, totalrent));
					_this.receivedBtnFormChangeValues[`fix-${item.detailid}-${item.totalrentId}-2`] = totalrent * 100;
				}


				return item;
			})

			response.scvList && response.scvList.map((item, index) => {
				item.propamount=item.propamount.replace(/,/gi,'');
				Store.dispatch(change('editMoneys', `no-${item.id}`, item.propamount));
				_this.receivedBtnFormChangeValues[`no-${item.id}`] = item.propamount * 100;
			})

			response.cimbList.push(obj)
			_this.setState({
				finaflowInfo: response
			})
		});

	}


	//获取付款方式对应的我司账户
	getAccount = (form) => {
		var accountList;
		var _this = this;
		Store.dispatch(change('editMoneys', 'accountId', ''));
		Store.dispatch(Actions.callAPI('get-account-info', {
			corporationId: this.state.corporationId,
			accountType: form.value
		})).then(function(response) {
			accountList = response.map((item, index) => {
				item.label = item.accountNum;
				item.value = item.accountId;
				return item;
			})
			_this.setState({
				accountList: accountList
			})

		});
	}

	argreementChecked = (options, value) => {
		Store.dispatch(change('editMoneys', 'contract', value));
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
			if (options[len].checked != false && item.checked == false) {
				Store.dispatch(change('editMoneys', `fix-${item.detailid}-${item.depositId}-1`, ''));
				Store.dispatch(change('editMoneys', `fix-${item.detailid}-${item.totalrentId}-2`, ''));
				_this.receivedBtnFormChangeValues[`fix-${item.detailid}-${item.depositId}-1`] = '';
				_this.receivedBtnFormChangeValues[`fix-${item.detailid}-${item.totalrentId}-2`] = '';
				_this.getCount(input, name);
			}
			if (options[len].checked == false) {
				finaflowInfo.scvList.map((item, index) => {
					nameList.push(`no-${item.id}`)
					Store.dispatch(change('editMoneys', `no-${item.id}`, ''));
					_this.receivedBtnFormChangeValues[`no-${item.id}`] = '';
				})

				_this.getCount(input, '', nameList);
			}

		})

	}
	trim = (str) => {
		return str.replace(/\s+/g, "");
	}

	calcBalance = (item, value, input) => {
		var lastValue = value.split('.')[1];
		var name = input.name.split('-')[3];
		var val = this.trim(value);
		var deposit = 1;//押金
		var totalrent = 2;//定金
		var nDeposit,nTotalrent,nFrontmoney;
		val=val.replace(/,/gi,'');
		if (/[^0-9]+.[^0-9]+/.test(value)) {
			Message.error('金额只能为数字');
			return;
		}
		if (lastValue && lastValue.length > 2) {
			Message.error('最多到小数点后两位');
			return;
		}
		if (name == deposit) {
				var str=new String(item.nDeposit);
						nDeposit=str.replace(/,/gi,'');
				if(nDeposit >= 0 && value*100 > nDeposit*100){
						Message.error('金额不能大于未回款额');
						return
				}

		}
		if (name == totalrent) {
				var str=new String(item.nTotalrent);
						nTotalrent=str.replace(/,/gi,'');
				if(item && nTotalrent >= 0 && value*100 > nTotalrent*100){
					Message.error('金额不能大于未回款额');
					return
				}
		}
		if (name == deposit) {
			var str=new String(item.nFrontmoney)
				nFrontmoney=str.replace(/,/gi,'');
				if(item && nFrontmoney >= 0 && value*100 > nFrontmoney*100){
					Message.error('金额不能大于未回款额');
					return
				}

		}

		let {
			changeValues,
		} = this.props;
		input.value = val;
		this.getCount(input)
	}

	getCount = (input, name, nameList) => {
		input.value = Math.round((input.value * 100));
		this.receivedBtnFormChangeValues[input.name] = input.value;
		let receivedBtnFormChangeValues = this.receivedBtnFormChangeValues;
		let liveMoneyValue = 0;
		if (input.value === 0 && !input.name) {
			var deposit = name[0];
			var totalrent = name[1];
			var name1 = `${deposit}-1`,
				name2 = `${totalrent}-2`;
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
	onSubmit = (form) => {
		form = Object.assign({},form);
		this.setState({
			Loading: true
		})
		if (!form.contract) {
			Message.error('请选择对应合同');
			this.setState({
				Loading: false
			})
			return;
		}
		if (this.state.flowAmount == 0) {
			Message.error('回款金额不能为0');
			this.setState({
				Loading: false
			})
			return
		}
		var _this = this;
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
				if (form[key] != 0) {
					var obj = {
						"id": arr[1],
						"value": form[key]
					}
					noList.push(obj)
				}
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
					if (valueList[index] != 0) {
						var obj2 = {
							"id": arr[2],
							"value": valueList[index]
						}
						obj.value.push(obj2)
					}
				}

			})
			childrenList.push(obj)
		})
		childrenList.map((item, index) => {
			if (item.id == 0) {
				childrenList.pop();
			}
		})

		var finaVerifyId = _this.props.detail.id;
		var params = {
			finaVerifyId,
			accountId: form.accountId,
			customerId: form.customerId,
			dealTime: form.dealTime,
			mainBillId: form.mainbillId,
			payAccount: form.payAccount,
			payWay: form.payWay,
			remark: form.remark,
			uploadFileIds: form.uploadFileIds,
			conJasonStr: JSON.stringify(childrenList),
			propJasonStr: JSON.stringify(noList),
			flowAmount: _this.state.flowAmount
		}

		let {
			onSubmit
		} = _this.props;

		this.setState({
			Loading: false
		})

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
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
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
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
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
				this.calcBalance.bind(this, item)
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
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
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
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
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
				this.calcBalance.bind(this, item)
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
			< KrField label = {
				`履约保证金（未回款额：${item.nDeposit}）`
			}
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
				this.calcBalance.bind(this, item)
			}
			onBlur = {
				this.moneyCheck
			}
			/> < KrField label = {`工位服务费（未回款额：${item.nTotalrent}）`}
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
				this.calcBalance.bind(this, item)
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
			< KrField label = {
				`定金（未回款额：${item.nFrontmoney}）`
			}
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
				this.calcBalance.bind(this, item)
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

		if (finaflowInfo && !finaflowInfo.cimbList) {
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

					item.component = _this.receiveInputRender.bind(this);
				}
			})

			return (
				<div className="u-audit-orderlist">
					<KrField label="对应合同" name='contract'  grid={1 / 2} component="groupCheckbox" defaultValue={finaflowInfo.cimbList} requireLabel={true} onChange={this.argreementChecked}/>
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
                        }} grid={1 / 2} label={item.propname} component="input" name={`no-${item.id}`} type="text"  onChange={_this.calcBalance.bind(this, item)} onBlur={_this.moneyCheck}/></div>
					} else {
						return <div className='rightBottomValue'><KrField key={index} style={{
                            marginBottom: 5,
                            width: 261
                        }} grid={1 / 2} label={item.propname} component="input" name={`no-${item.id}`} type="text"  onChange={_this.calcBalance.bind(this, item)} onBlur={_this.moneyCheck}/></div>
					}
				})
			} < /div>)

		}


		render() {

			const {
				handleSubmit,
			} = this.props;
			let {
				flowAmount,
				payment,
				accountList,
				infoList,
				Loading
			} = this.state;
			return (
				<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>编辑回款</span>
			     	<span className="u-audit-close" onTouchTap={this.onCancel}></span>
			     </div>
			     <form onSubmit={handleSubmit(this.onSubmit)} >
					<CircleStyleTwo num="1" info="付款信息">
						<KrField
								style={{width:260}}
								component="labelText"
								label="客户名称"
								inline={false}
								value={infoList.company}

						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText"
								label="所属订单"
								inline={false}
								value={infoList.mainBillName}

						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false}
								label="订单起止"
								value={infoList.mainBillDate}

						/>
						<KrField
								style={{width:260,marginLeft:25}}
								component="labelText"
								inline={false}
								label="公司主体"
								value={infoList.corporationName}
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
								style={{width:548}}
								name="uploadFileIds"
								component="file"
								label="上传附件"
								defaultValue={infoList.uploadFileIds}
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span>{flowAmount}</span>
						</div>
						{this.renderPayList()}
						<Grid style={{marginTop:50,width:'81%'}}>
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
				{Loading?<LoadingTwo />:''}
			</div>


			);
		}
	}
	const validate = values => {

		const errors = {}
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
		form: 'editMoneys',
		validate,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	})(EditMoney);
