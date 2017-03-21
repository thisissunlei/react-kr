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
			infoDetailList: [],
		}
		this.getDetailInfo();
		this.getInfo();


	}
	componentDidMount() {

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
				})
			}).catch(function(err) {});
		}
		//付款明细
	getDetailInfo = () => {
		var id = this.props.detail.id
		var _this = this;
		Store.dispatch(Actions.callAPI('get-flow-edit-info', {
			finaVerifyId: id
		}, {})).then(function(response) {
			_this.setState({
				infoDetailList: response
			})
		}).catch(function(err) {});

	}

	onCancel = () => {
    let {onCancel} = this.props;
    onCancel && onCancel();
	}

  joinInputRender = (index) => {
    return ( < div style = {
        {
          width: 600,
          marginTop: 8
        }
      }
      className = 'm-tenantStation' >
      < KrField label = "押金"
      grid = {
        1 / 2
      }
      name = 'fix1'
      style = {
        {
          width: 261,
          marginLeft: -9
        }
      }
      component = "labelText"
      type = "text"
      /> < KrField label = "工位服务费"
      grid = {
        1 / 2
      }
      name = 'fix3'
      style = {
        {
          width: 261,
          marginLeft: 28
        }
      }
      component = "labelText"
      type = "text"
      /> < /div >
    )
  }



	renderPayList = () => {
		let {
			infoDetailList
		} = this.state;

		if (!infoDetailList.cimbList) {
			return (
				<div className="u-audit-content-null">
					<div className="u-audit-content-null-icon"></div>
					<div className="u-audit-content-null-title">暂时还没有数据呦亲~</div>
				</div>
			)
		}
		var finaflowInfoList;
		var _this = this;

		if (infoDetailList.cimbList && infoDetailList.cimbList.length > 0) {
			finaflowInfoList = infoDetailList.cimbList.map(function(item, index) {
				console.log('item----', item)
				if (item.value == '2') {
					item.component = _this.joinInputRender.bind(this, index);

				}
			})
			return (
				<div>
					<KrField label="对应合同" name='contract' grid={1 / 2} component="labelText" defaultValue={finaflowInfoList} />
				</div>

			)
		}


	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
		} = this.props;
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
			<div className="u-audit-add">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>回款详情</span>
			     	<span className="u-audit-close" onTouchTap={this.onCancel}></span>
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
								name="payWay"
								component="labelText"
								label="收款方式"
								options={payment}
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="accountId"
								component="labelText"
								label="我司账户"
								options={accountList}
								requireLabel={true}
						/>
						<KrField
								style={{width:260}}
								name="payAccount"
								type="text"
								component="labelText"
								label="付款账户"
								options=""
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime"
								component="labelText"
								label="收款日期"
								requireLabel={true}
						/>
						<KrField
								style={{width:548}}
								name="remark"
								component="labelText"
								label="备注"
								maxSize={100}
						/>
						<KrField
							 	name="contractFileList"
							 	component="labelText"
							 	type="hidden"
							 	label="合同附件"
						/>
						<KrField
							style={{width:548}}
							name="uploadFileIds"
							component="labelText"
							label="上传附件"
							defaultValue={[]}
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span>{totalCountMoney}</span>
						</div>
						{this.renderPayList()}
					</CircleStyleTwo>
			</div>


		);
	}
}
