import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import './index.less';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
} from 'kr-ui';

export default class Station extends Component {
	static defaultProps = {
		data: [],
		baseTimeBegin: false,
		info: '服务费总计',
		reduceTh: '减租期限',
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


	BasicType = (stationTypeName) => {
		if (stationTypeName == 1) {
			return "工位"
		} else if (stationTypeName == 2) {
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
		} = this.props

		return (


			<div className="print-Station">

				<div className="normal-station-head">
					<span className="enter-info">{baseType}{baseTimeBegin && <span className="right-date">日期：自{this.getLocalTime(baseInfo.leaseBegindate)}起</span>}</span>
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
												<td>{this.BasicType(item.stationTypeName)}</td>
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
						<p className="station-bottom"><span>{info}</span><span>{baseInfo.rentTotal}</span><span>{baseInfo.rentTotalCN}</span>{this.props.orderTime && <span>(签署意向书后5个工作日内支付)</span>}</p>

					</div>


					<p>注：不足一月的，按照月服务费*12月/365天计算</p>

			</div>



		);
	}
}
