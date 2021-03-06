import React, {
	Component
} from 'react';

import './index.less';
import Print from 'kr/PureComponents/Agreement/Print';

export default class CommonItem extends Component {
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


		return (


			<div className="ui-print-Common-item">
				<div>
					<div className="ui-print-Common-item-title">《入驻服务协议》通用条款</div>
					<div className="ui-print-Common-item-content">
						<div className="common-item-left">
							<p>一、甲方提供的服务</p>
							<p>(1)联合办公工位服务（具体见附表）(2) 能源相关服务：服务期内乙方使用的工位/办公室的水电、空调费、供暖费、公用无线网络费、物业管理费等由甲方提供。 (3) 会议室服务：甲方向乙方提供会议室服务，乙方需按甲方规定提前预定，限时使用。每个入驻工位/办公室享受一定免费使用时长。 (4)附加服务：甲方为乙方提供第三方服务商，包括政府政策解读、政策申报、法务、工商注册、协作软件、在线营销等，甲方提供合作服务商的对接，但不承担任何中介介绍或者服务保证的义务。乙方使用该等服务需另行支付服务费用。(5) 增值服务：甲方不定期向乙方提供创业培训指导以及投资者对接服务。帮助乙方在合适的机会下进行项目推介和宣传推广，收费标准双方另行协商。</p>
							<p>二、权利义务及服务工位的变更</p>
							<p>1、乙方按期足额支付服务费用后，甲方在乙方入驻期间按照本协议约定向乙方提供各项服务。2、甲方在收到乙方款项后十五个工作日后向乙方开具（入驻服务费/工位服务费）相关发票或收据。3、乙方应遵守由甲方制定、发布且不时进行修订的《氪空间管理公约》。4、乙方不得私自拆改办公结构，不得损坏办公区域内的设备设施。5、乙方增加和延续入驻服务的，应提前20个工作日向甲方提出申请，同等条件下乙方享有优先增加、延续服务权。6乙方减少入驻服务的，应提前15个工作日向甲方提出申请，并按照减少工位占总工位百分比扣减履约保证金作为违约金。</p>
							<p>三、协议解除</p>
							<p>1、在服务期间，未经甲方同意，乙方不得将服务标的使用权转让给第三方。否则，甲方有权单方解除协议。</p>
							<p>2、甲方提供的工位仅用于办公，未经书面许可，乙方不得在工位及办公区内进行任何经营活动；乙方如违反合同约定、法律法规规定进行经营的，甲方有权单方解除合同，给甲方造成不良影响、经济损失的，应由乙方赔偿。</p>
							<p>3、乙方逾期付款超过10日的，构成根本性违约,甲方有权单方解除协议。</p>
							<p>4、乙方使用工位违法经营遭受政府部门行政处罚等，或者所用工位或其内任何物品遭受法院或其他部门的查封，乙方违反本协议约定或《氪空间管理公约》，经甲方要求后未在规定时间内改正的，甲方有权单方解除协议。</p>
							<p>5、合同期满或甲方依据第三条单方解除合同的，乙方应在期满之日或甲方通知之日搬离办公区域。逾期未搬离的，甲方有权停止乙方门禁系统的使用，强制收回工位，并有权自行处置乙方遗留在工位的任何物品且不需承担任何责任。</p>
							<p>6、甲方依据协议第三条解除合同的，自通知乙方之日起本协议解除，保证金作为违约金不予退还，服务费及各项费用实时结算。因此给甲方造成损失的，甲方有权向乙方追偿。</p>
							<p>四、履约保证金返还：</p>
							<p> (1)当服务期满终止，乙方结清相关费用，搬离甲方服务区域，完成注册地址迁离/或未占用服务地址进行工商注册后，甲方于二十个工作日内无息退还乙方履约保证金及剩余服务费。乙方入驻时享受了折扣价格和/或其他优惠的，如提前退出服务或服务期内存在逾期付款及其他违约行为的，甲方有权取消折扣和/或其他优惠，乙方须按原价和/或优惠前价格结算入驻服务费用。</p>
							<p> (2)当 a乙方依据本协议应付的服务费加违约金总额超过履约保证金之50%或b乙方逾期付款累计超过两次时；甲方有权要求乙方增加履约保证金，乙方应于甲方提出要求后十(10)个工作日内支付。</p>
							<p> (3)乙方无权主张以履约保证金抵扣服务费或其他任何费用。</p>
							<p>五、违约责任</p>
							<p>1、双方应按照协议约定履行权利义务，任何一方违反本协议的约定，均构成违约。</p>
							<p>2、乙方逾期支付本协议费用的，每逾期一日，乙方应按月服务费用的1%承担逾期付款违约金；逾期超过三个工作日的，乙方应按月服务费用的10%承担逾期付款违约金；逾期超过10日的，构成根本性违约,甲方有权单方面解除协议。</p>
							<p>3、乙方提前退出服务时应提前30日通知甲方，服务费及各项费用实时结算，剩余保证金作为违约金不予退还；若乙方未提前30日通知甲方(即立即搬离)，乙方仍应承担下30日的服务费用，即服务期计算至乙方搬离日的第30日，同时剩余保证金作为违约金不予退还。若剩余保证金不足以支付给甲方造成的损失，不足部分甲方有权向乙方追偿。</p>
							<p>六、免责条款</p>
							<p>1、乙方在氪空间发生的任何本人及他人的财物纠纷和人身伤害或工伤事故，均由乙方自行处理解决，甲方不对此承担任何责任。乙方在氪空间所有财务自行保管，发生物品被盗、丢失等一切责任由乙方自行承担。甲方可提供摄像查看等配合调查。</p>
							<p>2、协议履行期间，如因地震，台风，火灾、水灾及其他自然灾害，战争，政府及其他不可抗力事件导致本协议不能正常履行，应免除双方责任。</p>
							<p>七、法律适用和争议解决</p>
							<p>1、本协议的效力、解释及履行适用中国法律。2、本协议争议协商解决，协商不成由甲方所在地人民法院管辖。</p>
							<p >八、其他</p>
							<p >1、与协议履行有关的通知，均应以协议附表中的联络方式送达。以邮件方式发出的通知，发出的次日视为送达。</p>
							<p>2、本协议自甲乙双方签字盖章后生效。一式三份，甲方执二份，乙方执一份，具有同等法律效力。</p>
							<div className='company-cachet'>
								<div className='left'  style={{width:'48%',position:'relative'}}>
									<p>甲方（签章）：</p>
									<p>代表：</p>
									{baseInfo.withCachet && <img src={baseInfo.cachetUrl} className="logo-pic"></img>}

									<p>签署日期：<span style={{paddingLeft:30}}></span>年<span  style={{paddingLeft:10}}> </span>月<span  style={{paddingLeft:10}}></span>日</p>

								</div>
								<div className='right' style={{width:'48%'}}>
									<p>乙方（签章）：</p>
									<p>代表：</p>
									<p>签署日期：<span style={{paddingLeft:30}}></span>年<span  style={{paddingLeft:10}}> </span>月<span  style={{paddingLeft:10}}></span>日</p>
									
								</div>
							</div>
							<p style={{fontSize:12}}>注：服务期限及工位/办公室数量、费用支付信息见附表，协议期内工位/办公室数量调整，双方可书面确认调整后的附表，无需另行签订协议。</p>
						</div>
					</div>
				</div>
				
				
				<p className="print-Item-Bottom">
					<span style={{fontSize:'14px'}}>氪空间&ensp;<span className="dott"></span>&ensp;让办公更简单</span>
					<span  style={{fontSize:'13px',marginLeft:25}} className="tel">Tel：400-807-3636</span>
				</p>



			</div>



		);
	}
}
