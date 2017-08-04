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
import './index.less';


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
			oldData:[],
			//我司账户名称
			accountNum:'',
			showSection:false,
			department:''
		}
		this.receivedBtnFormChangeValues = {};


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
				oldData
			} = this.state;
			let options = [{value:'VC_SERVICE',label:'创投服务部'},{value:'PROJECT_GROUP',label:'项目组'},]

			return (
				<div className="u-audit-add  u-audit-edit">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>添加回款</span>
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
								component="labelText"
								inline={false}
								label="社区名称"
								defaultValue="-"
								value={mainbillInfo.communityName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payWay"
								component="select"
								label="收款方式"
								options={payment}
								onChange={this.getAccount}
								requireLabel={true}
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
								style={{width:260}}
								name="dealTime"
								component="date"
								label="收款日期"
								requireLabel={true}
						/>
						{this.state.showSection && <KrField
								style={{width:260,marginLeft:25}}
								name="department"
								type="text"
								component="labelText"
								defaultValue='无'
								inline={false}
								value={this.state.department}
								label="部门"
								
						/>}
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
							ref="uploadFileIds"
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
