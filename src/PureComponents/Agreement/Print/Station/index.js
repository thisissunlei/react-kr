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

	constructor(props, context) {
		super(props, context);

	}
	static defaultProps = {
		data: []
	}

	static propTypes = {
		data: React.PropTypes.array,
		orderTime: React.PropTypes.bool,
		stationVOs: React.PropTypes.object,
		baseInfo: React.PropTypes.object,
		baseType: React.PropTypes.string,
	}

	BasicType = (stationTypeName) => {
		if (stationTypeName == 1) {
			return "工位"
		} else if (stationTypeName == 2) {
			return "会议室"
		}
	}


	render() {
		let {
			stationVOs,
			baseInfo,
			installmentPlans,
			baseType,
		} = this.props
		console.log(stationVOs);
		return (


			<div className="print-Station">
				{/*this.initBasicClass(baseInfo)*/}

				<div className="normal-station-head">
					<span className="enter-info">{baseType}</span>
				</div>
					<div className="auto-height">
						<table>
							<tbody>
								<tr>
									<th>类别</th><th>编号/名称</th><th>单价(元/月)</th><th>数量</th><th>服务期限</th><th>小计</th><th>备注</th>
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
						<p className="station-bottom"><span>服务费总计</span><span>{baseInfo.rentTotal}</span><span>{baseInfo.rentTotalCN}</span>{this.props.orderTime && <span>(签署意向书后5个工作日内支付)</span>}</p>

					</div>


					<p>注：不足一月的，按照月服务费*12月/365天计算</p>

			</div>



		);
	}

}