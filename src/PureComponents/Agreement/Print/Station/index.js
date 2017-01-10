import React, {
	Component
} from 'react';

import './index.less';

export default class Station extends Component {
	static defaultProps = {
		data: [],
		baseTimeBegin: false,
		info: '服务费总计',
		reduceTh: '服务期限',
		method: false,
	}

	static propTypes = {
		data: React.PropTypes.array,
		orderTime: React.PropTypes.bool,
		stationVOs: React.PropTypes.object,
		baseInfo: React.PropTypes.object,
		baseType: React.PropTypes.string,
		baseTimeBegin: React.PropTypes.bool,
		info: React.PropTypes.string,
		reduceTh: React.PropTypes.string,
	}
	constructor(props, context) {
		super(props, context);

	}

	method = () => {
		let {
			payModelList,
			payModel
		} = this.props.baseInfo;
		var reg = /转账/g,
			methodObj;
		payModelList && payModelList.map((item, index) => {
			if (payModel == item.id) {
				if (!reg.test(item.dicName)) {
					payModelList.id = item.id;
					payModelList.dicName = item.dicName;
					payModelList.flag = true;
				} else {
					payModelList.flag = false;
					payModelList.id = item.id;
				}
			}
			return payModelList;

		})
	}
	basicType = (stationTypeName) => {
		if (stationTypeName == 1) {
			return "工位"
		}
		if (stationTypeName == 2) {
			return "会议室"
		}
	}
	getLocalTime = (beginDate) => {
		var now = new Date(beginDate);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "年" + mm + "月" + dd + "日")
	}


	render() {
		let {
			stationVOs,
			baseInfo,
			installmentPlans,
			baseType,
			baseTimeBegin,
			info,
			reduceTh,
			method,
		} = this.props;

		let {
			payType,
			payTypeList,
			payModel,
			payModelList
		} = this.props.baseInfo;

		this.method();

		return (


			<div className="ui-print-Station">

				<div className="normal-station-head">
					<span className="enter-info">
						{baseType}

						{baseTimeBegin && <span className="right-date">日期：自{this.getLocalTime(baseInfo.leaseBegindate)}起</span>}
					</span>
					{method &&
						<div className="pay-method clear">
							<div className="method-list">
								<span className={payModelList && payModelList.flag && payModel==payModelList.id?"checked":"discheck"}></span>
								<span>其他{payModelList && payModelList.flag && payModel==payModelList.id?`-${payModelList.dicName}`:" "}</span>
							</div>
							<div className="method-list">
								<span className={payModelList && !payModelList.flag && payModel==payModelList.id?"checked":"discheck"}></span>
								<span>转账</span>
							</div>
						</div>}
				</div>
					<div className="auto-height">
						<table>
							<tbody>
								<tr>
									<th>类别</th><th>编号/名称</th><th>单价(元/月)</th><th>数量</th><th>{reduceTh}</th><th>小计</th><th>备注</th>
								</tr>

							{
								stationVOs && stationVOs.map((item,index)=>{
										return(
											<tr key={index}>
												<td>{this.basicType(item.stationTypeName)}</td>
												<td>{item.stationName}</td>
												<td>{item.unitPrice}</td>
												<td>{item.num}</td>
												<td>{item.leaseDate}</td>
												<td>{item.lineTotal}</td>
												<td></td>

										</tr>

										)
									})
							}


							</tbody>
						</table>
						<p className="station-bottom">
							<span>{info}</span>
							<span>{baseInfo.rentTotal}</span>
							<span>{baseInfo.rentTotalCN}</span>
							{this.props.orderTime && <span>(签署意向书后5个工作日内支付)</span>}
						</p>

					</div>


					<p>注：不足一月的，按照月服务费*12月/365天计算</p>

			</div>



		);
	}
}
