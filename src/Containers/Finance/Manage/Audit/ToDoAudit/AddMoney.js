import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
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
			mainbillInfo: {}
		}



	}

	getMainbillInfo = (form) => {
		var mainbillInfo;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-account-info', {
			mainBillId: form.value
		}, {})).then(function(response) {
			console.log('response---', response)
			_this.setState({
				mainbillInfo: response
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
	renderPayList = () => {
		return (
			<div className="u-audit-content-null">
				<div className="u-audit-content-null-icon"></div>
				<div className="u-audit-content-null-title">暂时还没有数据呦亲~</div>
			</div>
		)
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			totalCountMoney,
			payment,
			accountList,
			mainbillInfo
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
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="mainBillId" 
								component="searchMainbill" 
								label="所属订单"
								requireLabel={true}
								onChange={this.getMainbillInfo}
						/>
						<KrField
								style={{width:260}}
								component="labelText"
								inline={false} 
								label="订单起止"
								defaultValue="-" 
								value={`${mainbillInfo.actualEntrydate}-${mainbillInfo.actualLeavedate}`} 
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
								options=""
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


export default reduxForm({
	form: 'addMoney'
})(AddMoney);