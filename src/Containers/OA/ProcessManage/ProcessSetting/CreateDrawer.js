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
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onSubmit = (form) => {
		let {
			onSubmit
		} = this.props;
		
		onSubmit && onSubmit(form);
	}
	toBasicSetting=(form)=>{
		let {
			toBasicSetting
		} = this.props;
		
		toBasicSetting && onSubmit(form);
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
					<CircleStyleTwo num="1" info="基本信息">
						<KrField
								style={{width:260}}
								name="wfName"
								label="流程名称"
								component="input"
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="wfCode"
								component="input"
								label="流程编码"
								requireLabel={true}
						/>
						<KrField
								style={{width:260}}
								name="wfTypeId"
								type="text"
								component="input"
								label="流程类型"
								requireLabel={true}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="wfOrderNum"
								type="text"
								component="input"
								label="排序号"
								requireLabel={true}
						/>
						<KrField
								style={{width:260}}
								name="hzCode"
								type="text"
								component="input"
								label="慧正流程唯一标识"
								requireLabel={true}
						/>
					
						<KrField
                            grid={1/2}
                            style={{width:260,marginLeft:25}}
                            name="hrmResourceId"
                            component="treePersonnel"
                            label="对接人"
                            requireLabel={true}
                            ajaxUrlName = "get-personnel-tree"
                        />
						
						<KrField
								style={{width:548}}
								name="descr"
								component="textarea"
								label="描述"
								maxSize={200}
						/>
					
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="开关设置" circle="bottom">
						<Grid style={{marginTop:50,width:'81%'}}>
							<KrField style={{width:220,marginBottom:16}}  name="type" component="group" label="发起流程请求" inline={false} requireLabel={true}>
								<KrField
										name="type"
										label="允许"
										type="radio"
										value="MENU"
										checked={true}
										style={{marginRight:24}}
								/>
								<KrField
										name="type"
										label="不允许"
										type="radio"
										value="OPERATION"
								/>
							</KrField>
							<KrField style={{width:220,marginLeft:66,marginBottom:16}}  name="type" component="group" label="新办是否显示" inline={false} requireLabel={true}>
								<KrField
										name="type"
										label="显示"
										type="radio"
										value="MENU"
										checked={true}
										style={{marginRight:24}}
								/>
								<KrField
										name="type"
										label="不显示"
										type="radio"
										value="OPERATION"
								/>
							</KrField>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"/>
								<Button  label="保存并进入流程配置" type="submit" width={178} cancle={true} type="button"  onTouchTap={this.toBasicSetting}/>
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
