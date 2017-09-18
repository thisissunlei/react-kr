import React from 'react';

import './index.less';

export default class Discounts extends React.Component {
	

	static propTypes = {
		data: React.PropTypes.array,
		baseInfo: React.PropTypes.object,
		baseType: React.PropTypes.string,
		infos: React.PropTypes.string,
	}
	constructor(props, context) {
		super(props, context);
		
		

	}
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProp){
		
		

		
	}

	
	
	getLocalTime = (beginDate) => {
		var now = new Date(beginDate);
		var yy = now.getFullYear(); //年
		var mm = now.getMonth() + 1; //月
		var dd = now.getDate(); //日
		return (yy + "/" + mm + "/" + dd )
	}


	render() {
		let {
			baseInfo,
			baseType,
		} = this.props;
		console.log('baseInfo-====>>>',baseInfo)
		return (


			<div className="ui-print-Discounts" >
				<span className="normal-discounts-head">
					{baseType}
				</span>
				<div className="auto-height">
						<table>
							<tbody>
								<tr>
									<th>优惠类型</th><th>优惠期限</th><th>折扣</th><th>优惠金额</th>
								</tr>

							{
								baseInfo.infos && baseInfo.infos.map((item,index)=>{
									let start=this.getLocalTime(item.start);
									let end=this.getLocalTime(item.end);
										return(
											<tr key={index} >
												<td>{item.name}</td>
												<td>{`${start}-${end}`}</td>
												<td>{item.zhekou!='-'?`${item.zhekou}折`:item.zhekou}</td>
												<td>{`￥${item.amount}`}</td>
											</tr>
										)
									})
							}
							</tbody>
						</table>
						<p className="discounts-table-bottom">
							<span>优惠总计</span>
							<span>{baseInfo.rentTotal}</span>
							<span>{baseInfo.amountCN}</span>
						</p>
						<p className="discounts-bottom">{`优惠后服务费总额：￥${baseInfo.finalAmount} ${baseInfo.finalAmountCN}`}</p>
					</div>
				
			</div>



		);
	}
}
