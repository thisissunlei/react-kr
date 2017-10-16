import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	IconTip

} from 'kr-ui';
import home from './images/home-community.svg';
import PaymentTable from './LeftTable/PaymentTable';
import OrderTable from './LeftTable/OrderTable';
import AgreementTable from './LeftTable/AgreementTable';
import VisitTable from './LeftTable/VisitTable';
import  "./index.less";
import State from './State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class HomeLeft  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
		State.getPaymentList({page:1,pageSize:10})
	}
	onChangeTab=(type)=>{
		State.stationType = type;
	}
	onChangeRoom=(type)=>{
		State.roomType = type;
	}
	onChangeTable=(type)=>{
		// State.tableType = type;
		State.getLeftList(type);
	}


	render(){
		let left = 20;
		if(State.tableType === 'payment'){
			left = 20
		}else if(State.tableType === 'order'){
			left = 105
		}else if(State.tableType === 'agreement'){
			left = 203
		}else if(State.tableType === 'visit'){
			left = 295
		}else{
			left = 20
		}
		
		return(
			<div >
				<div className="item-left-line-one">

					<span className='item-one item'>
						<div className="tab-lists">
							<span className="tab-list" style={{color:State.stationType == 'rent'?'#394457':'#999'}} 
							onTouchTap={this.onChangeTab.bind(this,'rent')}>已租工位
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:100}}>
	                                    <div style={{textAlign:'left'}}>截止到当前时间，本社区已租工位</div>
	                                </IconTip>
	                            </div>
							</span>
							<span className="tab-list" style={{color:State.stationType == 'all'?'#394457':'#999'}}
							onTouchTap={this.onChangeTab.bind(this,'all')}>总工位数
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:100}}>
	                                    <div style={{textAlign:'left'}}>社区可出租工位数</div>
	                                </IconTip>
	                            </div>
							</span>
						</div>
						{State.stationType == 'rent' && <div className="stations-num" >{State.InfoData.letStation || '0'} <span style={{fontSize:'16px'}}>个</span></div>}
						{State.stationType == 'all' && <div className="stations-num"><span style={{fontSize:'30px'}}>{State.InfoData.totalStation || '0'} </span><span style={{fontSize:'16px'}}>个</span></div>}
					</span>
					<span className='item-tow item'>
						<div className="tab-lists">
							<span className="tab-list" style={{color:State.roomType == 'rent'?'#394457':'#999'}} 
							onTouchTap={this.onChangeRoom.bind(this,'rent')}>签约率
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:200}}>
	                                    <div style={{textAlign:'left'}}>（占用工位数+已签约未入住工位个数）／可出租工位数；其中已签约未入住工位统计未来90天内的工位。</div>
	                                </IconTip>
	                            </div>
							</span>
							<span className="tab-list" style={{color:State.roomType == 'free'?'#394457':'#999'}}
							onTouchTap={this.onChangeRoom.bind(this,'free')}>下月出租率
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:120}}>
	                                    <div style={{textAlign:'left'}}>截止到下月占用工位数/社区可出租工位数</div>
	                                </IconTip>
	                            </div>
							</span>
							
						</div>
						{State.roomType == 'rent' && <div className="room-num"><span style={{fontSize:'30px'}}>{State.InfoData.signRate || '0%'} </span><span style={{fontSize:'16px'}}></span></div>}
						{State.roomType == 'free' && <div className="room-num"><span style={{fontSize:'30px'}}>{State.InfoData.nextMonthRate || '0%'}</span> <span style={{fontSize:'16px'}}></span></div>}
						
					</span>
					<span className='item-three item'>
						<div className="tab-lists">
							<span className="tab-list">平均工位月均价
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:140}}>
	                                    <div style={{textAlign:'left'}}>工位价格总和/工位数量</div>
	                                </IconTip>
	                            </div>
							</span>
						</div>
						<span className="price-num"><span style={{fontSize:'30px'}}>{State.InfoData.averagePrice || '0'}</span><span style={{fontSize:'16px'}}>/月</span></span>
					</span>
				</div>
				<div className='item-left-table'>
					<div className="item-left-table-head">
						<span style={{fontSize:'16px',color:'#666',paddingLeft:'20px'}}>日常运营</span>
						<div className="tab-lists">
							<span className={State.tableType=='payment'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'payment')}>应收账款
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:230}}>
	                                    <div style={{textAlign:'left'}}>截止到当前日期的应催缴客户及已欠费客户</div>
	                                </IconTip>
	                            </div>
							</span>
							<span className={State.tableType=='order'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'order')}>到期订单
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:150}}>
	                                    <div style={{textAlign:'left'}}>未来30自然日到期订单数据</div>
	                                </IconTip>
	                            </div>
							</span>
							<span className={State.tableType=='agreement'?'tab-list active':'tab-list'}
							onTouchTap={this.onChangeTable.bind(this,'agreement')}>待入驻合同
								<div className='mask-icon'>
	                                <IconTip tipStyle = {{width:240}}>
	                                    <div style={{textAlign:'left'}}>现在签署，但开始时间在未来的入驻协议客户</div>
	                                </IconTip>
	                            </div>
							</span>
							<span className={State.tableType=='visit'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'visit')}>预约参观</span>
							<span className="active-line" style={{left:left}}></span>
						</div>
					</div>
					<div className="item-left-table-content">
						{State.tableType == 'payment' && <PaymentTable />}
						{State.tableType == 'order' && <OrderTable />}
						{State.tableType == 'agreement' && <AgreementTable />}
						{State.tableType == 'visit' && <VisitTable />}

					</div>
				</div>
				


	     	</div>

		);
	}
}

export default HomeLeft;
