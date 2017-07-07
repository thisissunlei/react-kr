 import React, {
 	Component
 } from 'react';

 import './index.less';


 export default class Baseinfo extends Component {
 	static defaultProps = {
 		baseInfo: {},
 	}

 	static propTypes = {
 		baseInfo: React.PropTypes.object,
 	}
 	constructor(props, context) {
 		super(props, context);

 	}


 	render() {
 		let {
 			baseInfo
 		} = this.props;
 		return (

 			<div className="ui-print-baseinfo">
				<div className="baseinfo">基础信息</div>
				{baseInfo.withCachet && <img src={baseInfo.cachetUrl} className="logo-pic"></img>}
				<div className="baseinfo-content">

					{/*1*/}
					<div className="infolist" >
						<div >
							<div className="username long">服务提供方（甲方）：</div>
							<div className="namelist">{baseInfo.lessorName}</div>
						</div>
						<div>
							<div className="username long">服务接收方（乙方）：</div>
							<div className="namelist">{baseInfo.leaseName}</div>
						</div>
					</div>


					{/*2*/}
					<div className="infolist" >
						<div  style={{verticalAlign:'top'}} >
							<div className="username long" >地址：</div>
							<div className="namelist address">{baseInfo.lessorAddress}</div>
						</div>
						<div  style={{verticalAlign:'top'}}>
							<div className="username long" >地址：</div>
							<div className="namelist address">{baseInfo.leaseAddress}</div>
						</div>
					</div>


					{/*3*/}
					<div className="infolist">
						<div  className="infolist-div ">联系人：{baseInfo.lessorContact}</div>
						<div  className="infolist-div">联系人：{baseInfo.leaseContact}</div>
					</div>

					<div className="infolist">
						<div  className="infolist-div">联系电话：{baseInfo.lessorContacttel}</div>
						<div  className="infolist-div">联系电话：{baseInfo.leaseContacttel}</div>
					</div>





				</div>
			</div>
 		);
 	}

 }
