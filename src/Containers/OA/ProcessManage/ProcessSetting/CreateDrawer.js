import React from 'react';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {Http} from 'kr/Utils';

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
	Message
} from 'kr-ui';
import './CreateDrawer.less';


class CreateDrawer extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			flowAmount: 0,
			accountList: [],
			mainbillInfo: {},
			showName: false,
			finaflowInfo: {},
			customerId: " ",
			billInfo: " ",
			corporationId: "",
			
		}
	}
		render() {

			const {
				error,
				handleSubmit,
				reset
			} = this.props;
		
			return (
				<div className="u-creat-drawer">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>新建流程</span>
			     	<span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
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
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="mainBillId"
								component="searchMainbill"
								label="所属订单"
								requireLabel={true}
								customerId={customerId}
						/>
						<KrField
								style={{width:260}}
								name="accountId"
								component="select"
								label="我司账户"
								options={accountList}
								requireLabel={true}
								onChange={this.accountChange}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payAccount"
								type="text"
								ref="payAccount"
								component="input"
								label="付款账户"
								requireLabel={true}
								
						/>
						<KrField
								style={{width:548}}
								name="remark"
								component="textarea"
								label="描述"
								maxSize={100}
						/>
					
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="开关设置" circle="bottom">
						<div className="u-add-total-count">
							
						</div>
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
			</div>


			);
		}
	}
	const validate = values => {

		const errors = {};


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
		form: 'CreateDrawer',
		validate,
		enableReinitialize: true,
		keepDirtyOnReinitialize: true,
	})(CreateDrawer);
