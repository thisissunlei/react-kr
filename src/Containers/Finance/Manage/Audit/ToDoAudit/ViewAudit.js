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
	initialize
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
	KrDate,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo
} from 'kr-ui';
import './index.less';


export default class ViewAudit extends Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			totalCountMoney: 0,
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
			infoList: {},
			payInfoList: {},
			topInfoList: [],
			infoDetailList: [],
		}

	}
	componentDidMount() {
		this.getInfo();
		this.getPayInfo();
		}
		//付款信息
	getInfo = () => {
			var id = this.props.detail.id
			var _this = this;
			Store.dispatch(Actions.callAPI('get-fina-infos', {
				finaVerifyId: id
			}, {})).then(function(response) {
				_this.setState({
					infoList: response
				},function(){
					var fileList=[];
					if(this.state.infoList.fileList.length>0){
						this.state.infoList.fileList.map((item, value) => {
							fileList.push(item.fileName)
							fileList.push(' ')
						});
					}else{
						fileList=['暂无上传任何附件'];
					}
						this.fileList=fileList;
				})
			}).catch(function(err) {});
		}

	//付款明细
	getPayInfo = () => {
			var id = this.props.detail.id
			var _this = this;
			Store.dispatch(Actions.callAPI('get-flow-edit-info', {
					finaVerifyId: id
			}, {})).then(function(response) {
					_this.setState({payInfoList: response})

			}).catch(function(err) {});
	}
	onCancel = () => {
    let {onCancel} = this.props;
    onCancel && onCancel();
	}
	renderPayList = () => {
			let {payInfoList} = this.state;
			var type;
			if (payInfoList.cimbList && payInfoList.cimbList.length > 0) {
					return payInfoList.cimbList.map((item, index) => {
							if (item.contactType == 1) {
									type = "承租意向书"
							} else if (item.contactType == 2) {
									type = "入驻协议书"
							} else if (item.contactType == 3) {
									type = "增租协议书"
							} else if (item.contactType == 4) {
									type = "续租协议书"
							}
							return (
									<div key={index} className="u-order-list u-clearfix">
											<div className="u-order-name">{`${type}-${item.contactName}`}</div>
											{item.frontmoney
													? (
															<div className="u-order-font-list">
																	<div className="u-order-deatil">定金<span className="u-font-red">{`（未回款额：${item.nFrontmoney}）`}</span>
																	</div>
																	<div className="u-order-count">{item.frontmoney}</div>
															</div>
													)
													: ''
	}
											{item.depositId
													? (
															<div className="u-order-font-list">
																	<div className="u-order-deatil">履约保证金<span className="u-font-red">{`（未回款额：${item.nDeposit}）`}</span>
																	</div>
																	<div className="u-order-count">{item.deposit}</div>
															</div>
													)
													: ''
	}
											{item.totalrentId
													? (
															<div className="u-order-font-list">
																	<div className="u-order-deatil">工位服务费<span className="u-font-red">{`（未回款额：${item.nTotalrent}）`}</span>
																	</div>
																	<div className="u-order-count">{item.totalrent}</div>
															</div>
													)
													: ''
	}

									</div>

							)

					})
			}

	}
	renderNullOrder = () => {
		let {
			payInfoList
		} = this.state;
		if (payInfoList.scvList && payInfoList.scvList.length > 0) {

			return (
				<div style={{marginTop:16}}>
						<div className="u-order-title">无合同</div>
						<div className="u-order-list u-clearfix">
						{ payInfoList.scvList.map((item, index) => {
							return (
								<div className="u-order-font-list" key={index}>
									<div className="u-order-deatil">{item.propname}</div>
									<div className="u-order-count">{item.propamount}</div>
								</div>
							)
						})}
						</div>
					</div>
			)
		}
	}

	renderFileName=()=>{
		this.fileList.map((item, value) => {
			return (
				<div key={index}>{item}</div>
			)
		});
	}
	render() {
		console.log(this.fileList);
		let {
			totalCountMoney,
			payment,
			accountList,
			mainbillInfo,
			showName,
			customerId,
			infoList
		} = this.state;
		return (
			<div className="u-audit-add  u-audit-edit">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>回款详情</span>
			     	<span className="u-audit-close" style={{
								marginRight: 40
						}} onTouchTap={this.onCancel}></span>
			     </div>
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
								name="payName"
								inline={false}
								component="labelText"
								label="收款方式"
								value={infoList.payName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="accountNum"
								component="labelText"
								inline={false}
								label="我司账户"
								value={infoList.accountNum}
						/>
						<KrField
								style={{width:260}}
								name="payAccount"
								inline={false}
								type="text"
								component="labelText"
								label="付款账户"
								value={infoList.payAccount}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime"
								inline={false}
								component="labelText"
								label="收款日期"
								value={< KrDate style = {{marginTop:5}} value = {
                    infoList.dealTime
                }
                format = "yyyy-mm-dd HH:MM:ss" />}
						/>
						<KrField
								style={{width:548}}
								name="remark"
								component="labelText"
								label="备注"
								value={infoList.remark}
								inline={false}
						/>
						<KrField
							style={{width:548}}
							name="uploadFileIds"
							component="labelText"
							label="上传附件"
							inline={false}
							value={this.fileList}
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span>{infoList.flowAmount}</span>
						</div>
						<div className="u-order-title">对应合同</div>
						{this.renderPayList()}
						{this.renderNullOrder()}
					</CircleStyleTwo>
			</div>


		);
	}
}
