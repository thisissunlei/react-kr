import React,{Component} from 'react';
import { connect } from 'react-redux';
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

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			isClass:false,
		}
	}
	static defaultProps = {
		data: []
	}

	static propTypes = {
		data: React.PropTypes.array,
		orderTime:React.PropTypes.bool
	}
	initBasicClass=()=>{

	}
	componentDidMount() {
		this.initBasicClass()
	}

	render(){

		return(


			<div className="print-Station">

					<p>入驻信息</p>
					<div className={this.state.isClass?'fixed-height':'auto-height'}>
						<table>
							<tbody>
								<tr>
									<th>类别</th><th>编号/名称</th><th>单价</th><th>数量</th><th>服务期限</th><th>小计</th><th>备注</th>
								</tr>

								{/*
											stationVOs && stationVOs.map((item,index)=>{
												return(
													<tr key={index}>
														<td>item.leaseDate</td>
														<td>2015/09/10-2016/10/10</td>
														<td>2015/09/10</td>
														<td>1200</td>

												</tr>

												)
											})
								*/}


									<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
										<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
											<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
												<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
															<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
																<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
																	<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
																		<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
																			<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>
																						<tr><td>工位/办公室</td><td>007141-007149</td><td>1200</td><td>9</td><td>2015/09/10-2016/09/12</td><td>50,000,42</td><td></td></tr>


							</tbody>
						</table>
						<p className="station-bottom"><span>服务费总计</span><span>¥23456.45</span><span>贰叄肆伍陆</span>{this.props.orderTime && <span>(签署意向书后5个工作日内支付)</span>}</p>

					</div>


					<p>注：不足一月的，按照月服务费*12月/365天计算</p>

			</div>



		);
	}

}
