import React from 'react';
import {
	Http
} from "kr/Utils";
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


export default class ViewLogs extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
		var _this = this;
		setTimeout(function() {
			_this.getInfo();
		}, 0)
	}

	onCancel = () => {
    let {onCancel} = this.props;
    onCancel && onCancel();
	}


	render() {

		let {
			totalCountMoney,
			payment,
			accountList,
			mainbillInfo,
			showName,
			customerId,
			infoList,
			topInfoList
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
			     {topInfoList.length>0?this.renderTable(topInfoList):''}
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
								component="labelText"
								inline={false}
								label="社区名称"
								value={infoList.communityName}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payName"
								inline={false}
								component="labelText"
								label="收款方式"
								value={infoList.payName}
						/>
						<KrField
								style={{width:260}}
								name="accountNum"
								component="labelText"
								inline={false}
								label="我司账户"
								value={infoList.accountNum}
						/>
						<KrField
								style={{width:260,marginLeft:25}}
								name="payAccount"
								inline={false}
								type="text"
								component="labelText"
								label="付款账户"
								value={infoList.payAccount}
						/>
						<KrField
								style={{width:260}}
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
