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
	CircleStyleTwo,
	KrDate
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
			showName: false,
			finaflowInfo: [],
			customerId: "",
			infoList: [],
			payInfoList: {},
			topInfoList: []
		}

		this.getDetailInfo();
		this.getPayInfo();
		this.getInfo();

	}

	componentDidMount() {
		//editMoney

	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			showName: !this.state.showName
		})
	}
	getInfo = () => {
		var _this = this;
		var id = this.props.detail.id
		Store.dispatch(Actions.callAPI('get-fina-flow-logs', {
			finaVerifyId: id
		}, {})).then(function(response) {
			_this.setState({
				topInfoList: response
			})
		}).catch(function(err) {});
	}
	getPayInfo = () => {
		var id = this.props.detail.mainbillId
		var _this = this;
		Store.dispatch(Actions.callAPI('get-finaflow-info', {
			mainBillId: id
		}, {})).then(function(response) {
			_this.setState({
				payInfoList: response
			})

		}).catch(function(err) {});
	}

	getDetailInfo = () => {
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
		let {
			finaflowInfo
		} = this.state;
		if (finaflowInfo.length == 0) {
			return (
				<div className="u-audit-content-null">
					<div className="u-audit-content-null-icon"></div>
					<div className="u-audit-content-null-title">暂时还没有数据呦亲~</div>
				</div>
			)
		}

	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			infoList,
			payInfoList,
			topInfoList
		} = this.state;
		return (
			<div className="u-audit-add u-audit-edit">
			     <div className="u-audit-add-title">
			     	<span className="u-audit-add-icon"></span>
			     	<span>编辑回款</span>
			     	<span className="u-audit-close" onTouchTap={this.onCancel}></span>
			     </div>
			     <div className="u-table-list">
				     <table className="u-table">
				     	<tr>
					     	<th>序号</th>
					     	<th width={100}>审核时间</th>
					     	<th width={100}>审核人</th>
					     	<th width={100}>审核状态</th>
					     	<th width={270}>备注</th>
				     	</tr>
				     	<tbody>
				     	{topInfoList && topInfoList.map((item,index)=>{
							return(
								<tr key={index}>
							     	<td>{index+1}</td>
							     	<td><KrDate value={item.operateTime}/></td>
							     	<td>{item.operateUserName}</td>
							     	<td>{item.targetStatus=='CHECKED'?<span className="u-font-green">{item.verifyName}</span>:<span className="u-font-red">{item.verifyName}</span>}</td>
							     	<td>{item.operateRemark}</td>
						     	</tr>
							)
				     	})}
				     	</tbody>
					 </table>
				 </div>
			     <form onSubmit={handleSubmit(this.onSubmit)} >
					<CircleStyleTwo num="1" info="付款信息">
						<KrField
								style={{width:260}}
								name="customerId"
								inline={false}  
								component="labelText" 
								label="客户名称"
								value={infoList.company}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="mainBillId" 
								component="labelText" 
								inline={false} 
								label="所属订单"
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
								inline={false} 
								value={infoList.payWayName} 
								
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="accountId" 
								component="labelText"
								inline={false} 
								value={infoList.accountNum} 
								label="我司账户" 
						/>
						<KrField
								style={{width:260}}
								name="payAccount" 
								type="text" 
								component="labelText"
								inline={false} 
								label="付款账户"
								value={infoList.payAccount} 
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="dealTime" 
								component="labelText" 
								inline={false} 
								label="收款日期" 
								value={infoList.dealTime}
						/>
						<KrField  
								style={{width:548}}  
								name="remark" 
								component="textarea" 
								label="备注" 
								maxSize={100}
								defaultValue={infoList.remark}
						/>
						<KrField  
							 	name="fileList" 
							 	component="input" 
							 	type="hidden" 
							 	label="合同附件"
						/>
						<KrField  
							style={{width:548}}  
							name="uploadFileIds" 
							component="file" 
							label="上传附件" 
							defaultValue={infoList.fileList} 
							onChange={(files)=>{
								Store.dispatch(change('AddMoney','fileList',files));
							}} 
						/>
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="付款明细" circle="bottom">
						<div className="u-add-total-count">
							<span className="u-add-total-icon"></span>
							<span className="u-add-total-title">付款总金额：</span>
							<span></span>
						</div>
						{/*this.renderPayList()*/}
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
	form: 'editMoney',
})(EditMoney);