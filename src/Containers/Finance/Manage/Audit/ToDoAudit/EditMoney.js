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


class EditMoney extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
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
				Store.dispatch(initialize('editMoney', response));


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
			Store.dispatch(initialize('editMoney', response));


		}).catch(function(err) {});

	}


	//获取付款方式对应的我司账户
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

	onSubmit = () => {
		let {
			onSubmit
		} = this.props;
		onSubmit && onSubmit();
	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
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
			name = 'fix3'
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
					//意向书
					/*if (item.value == '1') {
						item.component = _this.adminInputRender.bind(this, index);

					}*/
					//入驻协议书
				if (item.value == '2') {
					item.component = _this.joinInputRender.bind(this, index);

				}

				//增租协议书
				/*if (item.value == '3') {

					item.component = _this.increaseInputRender.bind(this, index);
				}
				//续租协议书
				if (item.value == '4') {

					item.component = _this.renewInputRender.bind(this, index);
				}*/

			})
			return (
				<div>
					<KrField label="对应合同" name='contract' grid={1 / 2} component="groupCheckbox" defaultValue={finaflowInfoList} requireLabel={true} onChange={this.argreementChecked}/>
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
							<span>{totalCountMoney}</span>
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

	if (!values.leaseId) {
		errors.leaseId = '请输入出租方';
	}

	if (!values.lessorContactid) {
		errors.lessorContactid = '请输入出租方联系人';
	}

	if (!values.wherefloor) {
		errors.wherefloor = '请输入所在楼层';
	}


	return errors
}

export default reduxForm({
	form: 'editMoney',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditMoney);