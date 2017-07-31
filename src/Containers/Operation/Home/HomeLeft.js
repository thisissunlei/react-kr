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

} from 'kr-ui';
import home from './images/home-community.svg';
import PaymentTable from './PaymentTable';
import OrderTable from './OrderTable';
import AgreementTable from './AgreementTable';
import VisitTable from './VisitTable';
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
		
		return(
			<div >
				<div className="item-left-line-one">

					<span className='item-one item'>
						<div className="tab-lists">
							<span className="tab-list" style={{color:State.stationType == 'rent'?'#394457':'#999'}} 
							onTouchTap={this.onChangeTab.bind(this,'rent')}>已租工位</span>
							<span className="tab-list" style={{color:State.stationType == 'free'?'#394457':'#999'}}
							onTouchTap={this.onChangeTab.bind(this,'free')}>空置工位</span>
							<span className="tab-list" style={{color:State.stationType == 'all'?'#394457':'#999'}}
							onTouchTap={this.onChangeTab.bind(this,'all')}>总工位数</span>
						</div>
						{State.stationType == 'rent' && <div className="stations-num">{State.InfoData.letStation} <span style={{fontSize:'20px'}}>个</span></div>}
						{State.stationType == 'free' && <div className="stations-num">{State.InfoData.vacantStation} <span style={{fontSize:'20px'}}>个</span></div>}
						{State.stationType == 'all' && <div className="stations-num">{State.InfoData.totalStation} <span style={{fontSize:'20px'}}>个</span></div>}
					</span>
					<span className='item-tow item'>
						<div className="tab-lists">
							<span className="tab-list" style={{color:State.roomType == 'rent'?'#394457':'#999'}} 
							onTouchTap={this.onChangeRoom.bind(this,'rent')}>已租房间</span>
							<span className="tab-list" style={{color:State.roomType == 'free'?'#394457':'#999'}}
							onTouchTap={this.onChangeRoom.bind(this,'free')}>空置房间</span>
							<span className="tab-list" style={{color:State.roomType == 'all'?'#394457':'#999'}}
							onTouchTap={this.onChangeRoom.bind(this,'all')}>总房间数</span>
						</div>
						{State.roomType == 'rent' && <div className="room-num">{State.InfoData.letRoom} <span style={{fontSize:'20px'}}>间</span></div>}
						{State.roomType == 'free' && <div className="room-num">{State.InfoData.vacantRoom} <span style={{fontSize:'20px'}}>间</span></div>}
						{State.roomType == 'all' && <div className="room-num">{State.InfoData.totalRoom} <span style={{fontSize:'20px'}}>间</span></div>}
					</span>
					<span className='item-three item'>
						<span className="tab-list">平均工位月均价</span>
						<span className="price-num">{State.InfoData.averagePrice}<span style={{fontSize:'20px'}}>/月</span></span>
					</span>
				</div>
				<div className='item-left-table'>
					<div className="item-left-table-head">
						<span style={{fontSize:'16px',color:'#666',paddingLeft:'20px'}}>日常运营</span>
						<div className="tab-lists">
							<span className={State.tableType=='payment'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'payment')}>应收账款</span>
							<span className={State.tableType=='order'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'order')}>到期订单</span>
							<span className={State.tableType=='agreement'?'tab-list active':'tab-list'}
							onTouchTap={this.onChangeTable.bind(this,'agreement')}>待驻合同</span>
							<span className={State.tableType=='visit'?'tab-list active':'tab-list'} 
							onTouchTap={this.onChangeTable.bind(this,'visit')}>预约参观</span>
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
