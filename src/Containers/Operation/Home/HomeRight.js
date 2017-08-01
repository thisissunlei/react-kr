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
import  "./index.less";
import State from './State';
import {Http,DateFormat} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
@observer

class HomeRight  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
	}
	clickSpan=(type)=>{
		switch (type){
			case 'monthPayment':
				State.openMonthPayment = true;
				break;
			case 'allPayment':
				State.openAllPayment = true;
				break;
			case 'arrearages':
				State.arrearages = true;
				break;
			case 'settledCustomer':
				State.openSettledCustomer = true;
				break;
			case 'signedCustomer':
				State.signedCustomer = true;
				break;
			case 'allCustomer':
				State.allCustomer = true;
				break;
			case 'fCustomer':
				State.fCustomer = true;
				break;
			case 'newClue':
				State.newClue = true;
			default:
				return;
		}
	}


	render(){
		var myDate = new Date();
		let month = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)

		let day = myDate.getDate(); //获取当前日(1-31)

		return(
			<div >
				<div className="item-left-line-right">
					<div className="first-item">
						<div className="items item">
							<div className="item-title">社区出租率</div>
							<div className="item-content"  style={{color:'#499DF1'}}>160%</div>
						</div>
						<div className="items item">
							<div className="item-title"><span className="icon-month item-logo"></span>经营月报</div>
							<div className="item-content" style={{color:'#8290A8'}}>{month}月</div>
						</div>
						<div className="items item">
							<div className="item-title"><span className="icon-day item-logo"></span>经营日报</div>
							<div className="item-content" style={{color:'#8290A8'}}>{day}日</div>
						</div>
					</div>
					<div className="second-item">
						<div className="item-list item">
							<div className='item-head'>账户信息</div>
							<div className="lists-info">
								<div className='list-info' onClick={this.clickSpan.bind(this,'monthPayment')}>
									<div className="item-title">本月回款</div>
									<div className="item-content"  style={{color:'#FF7876'}}>{State.InfoData.backMoney}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'allPayment')}>
									<div className="item-title">累计回款</div>
									<div className="item-content"  style={{color:'#FF7876'}}>{State.InfoData.totalBackMoney}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'arrearages')}>
									<div className="item-title">社区欠款</div>
									<div className="item-content"  style={{color:'#FF7876'}}>{State.InfoData.arrearages}</div>
								</div>
								<div className='list-info' style={{cursor:'auto'}}>
									<div className="item-title">本月收入</div>
									<div className="item-content"  style={{color:'#8290A8'}}>{State.InfoData.income}</div>
								</div>
								<div className='list-info' style={{cursor:'auto'}}>
									<div className="item-title">累计收入</div>
									<div className="item-content"  style={{color:'#8290A8'}}>{State.InfoData.totalIncome}</div>
								</div>
							</div>

						</div>
						<div className="item-list  item">
							<div className='item-head'>客户信息</div>
							<div className="lists-info">
								<div className='list-info'  onClick={this.clickSpan.bind(this,'settledCustomer')}>
									<div className="item-title">现入驻客户</div>
									<div className="item-content"  style={{color:'#FFB846'}}>{State.InfoData.settledCustomer}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'signedCustomer')}>
									<div className="item-title">已约未入驻</div>
									<div className="item-content"  style={{color:'#FFB846'}}>{State.InfoData.signedCustomer}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'allCustomer')}>
									<div className="item-title">客户总数</div>
									<div className="item-content"  style={{color:'#FFB846'}}>{State.InfoData.totalCustomer}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'fCustomer')}>
									<div className="item-title">跟进中客户</div>
									<div className="item-content"  style={{color:'#FFB846'}}>{State.InfoData.followingCustomer}</div>
								</div>
								<div className='list-info' onClick={this.clickSpan.bind(this,'newClue')}>
									<div className="item-title">新增线索</div>
									<div className="item-content"  style={{color:'#FFB846'}}>{State.InfoData.newClue}</div>
								</div>
							</div>
						</div>
					</div>
					
				</div>
				


	     	</div>

		);
	}
}

export default HomeRight;
