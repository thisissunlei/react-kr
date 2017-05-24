import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
import './index.less';
import $ from 'jquery';
import {DateFormat} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class TableIndex extends React.Component{
	constructor(props){
		super(props);
		this.state={
			pageSecond:false,
			windowScrollTop:0,
			isShowTitle:"none",
			isShowLeftTitle:"none",
			titleLeft:0,
			leftTitleTop:213,
			leftTitleItemP:'',
			leftTitleItemTop:100,
			fixedWidth : 930,
			titleLeftMarginTop:0,

		}
	}
	componentWillMount() {
	}

	componentWillReceiveProps(nextProps){

		
	}

	componentDidMount(){
		let _this = this;
		window.onscroll = function(){
			_this.setState({
				windowScrollTop:$(window).scrollTop(),
				fixedWidth : $('.table-box').eq(0).width()
			},function(){

				if($(window).scrollTop()>153){
					_this.setState({
						isShowTitle:"block",
						leftTitleTop:60,
						leftTitleItemP:"absolute",
						leftTitleItemTop:100-($(window).scrollTop()-154),
						titleLeftMarginTop:0,
					})
				}else{
					_this.setState({
						isShowTitle:"none",
						leftTitleTop:213-(_this.state.windowScrollTop),
						leftTitleItemP:'',
						titleLeftMarginTop:1,
						
					})
				}
			})

		}
		$('.table-box').eq(0).scroll(function(event){
			
		    if($(this).scrollLeft()>280){
		    	_this.setState({
		    		
		    		isShowLeftTitle:"block",
		    		titleLeft : -($('.table-box').eq(0).scrollLeft()),

		    	})
		    }else{
		    	_this.setState({
		    		isShowLeftTitle:"none",
		    		titleLeft : -($('.table-box').eq(0).scrollLeft()),

		    	})
		    }
		   
		});
		
		
	}

	seeDetailForm=(_this,item)=>{
		
		window.open(`./#/operation/customerManage/${_this.customerId}/order/${_this.mainBillId}/detail`);

	}



	
	render(){
		let {isShowTitle,titleLeft,isShowLeftTitle,leftTitleTop,leftTitleItemP,leftTitleItemTop,fixedWidth} = this.state;
		let _this = this;
		return (
			<div className="table-box">
				<div className="table-title" style={{display:isShowTitle,width:fixedWidth}}>
					<table className="table-container" cellPadding='0' cellSpacing='0' style={{position:"absolute",left:titleLeft}} >
					  <tbody>
					  	<tr>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">城市</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">我方签约主体</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">社区</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div  full-height">客户</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">订单开始日期</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">订单结束日期</div></td>
						    <td colSpan="3" className="dark-color"><div className="header-div-box1 half-height">履约保证金详情</div></td>
						    <td colSpan="4" className="light-color"><div className="header-div-box2 half-height">工位服务费详情</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div full-height">应缴滞纳金</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">应催缴金额合计</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div full-height">订单是否结束</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">操作</div></td>
						</tr>
					    <tr>
					        <td className="dark-color"><div className="header-div  half-height">应收回款</div></td>
				        	<td className="dark-color"><div className="header-div  half-height">实收回款</div></td>
					        <td className="dark-color"><div className="header-div half-height">欠款金额</div></td>
					        <td className="dark-color"><div className="header-div half-height">欠款天数</div></td>
					        <td className="light-color"><div className="header-div  half-height">应收回款</div></td>
					        <td className="light-color"><div className="header-div  half-height">实收回款</div></td>
					        <td className="light-color"><div className="header-div  half-height">欠款金额</div></td>
					    </tr>
					   </tbody>
					</table>
				</div>
				<div className="table-left-title" style={{display:isShowLeftTitle,top:leftTitleTop}}>
					<div className="left-title-header" style={{position:leftTitleItemP,background:"#319eff"}}>社区</div>
					<div className="left-title-box" style={{position:leftTitleItemP,top:leftTitleItemTop}}>
						{
							State.items.map(function(item,index){
								return <div className="left-title-item" key={index}>{item.communityName}</div>
							})
						}
					</div>
					
				</div>
				<table className="table-container" cellPadding='0' cellSpacing='0'>
				  	<tbody>
					  	<tr>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">城市</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">我方签约主体</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">社区</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div  full-height">客户</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div  full-height">订单开始日期</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">订单结束日期</div></td>
						    <td colSpan="3" className="dark-color"><div className="header-div-box1 half-height">履约保证金详情</div></td>
						    <td colSpan="4" className="light-color"><div className="header-div-box2 half-height">工位服务费详情</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div full-height">应缴滞纳金</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">应催缴金额合计</div></td>
						    <td rowSpan="2" className="dark-color"><div className="header-div full-height">订单是否结束</div></td>
						    <td rowSpan="2" className="light-color"><div className="header-div full-height">操作</div></td>
						</tr>
					    <tr>
					        
					        <td className="dark-color"><div className="header-div  half-height">应收回款</div></td>
					        <td className="dark-color"><div className="header-div  half-height">实收回款</div></td>
					        <td className="dark-color"><div className="header-div  half-height">欠款金额</div></td>
					        <td className="light-color"><div className="header-div  half-height">应收回款</div></td>
					        <td className="light-color"><div className="header-div  half-height">实收回款</div></td>
					        <td className="light-color"><div className="header-div half-height">欠款金额</div></td>
					        <td className="light-color"><div className="header-div half-height">欠款天数</div></td>
					    </tr>
					  	{

					  		State.items.map(function(item,index){
					  			return <tr key={index}>
					  				<td><div>{item.cityName}</div></td>
					  				<td><div>{item.corporationName}</div></td>
				  					<td><div>{item.communityName}</div></td>
				  					<td><div>{item.customerName}</div></td>
				  					<td><div>{DateFormat(item.beginDate,"yyyy-mm-dd") }</div></td>
				  					<td><div>{DateFormat(item.endDate,"yyyy-mm-dd")}</div></td>
				  					<td><div>{(item.deposit.receivableBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div>{(item.deposit.realBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div style={{color:"#ff0000"}}>{(item.deposit.arrearsAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>

				  					<td><div>{(item.rent.receivableBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div>{(item.rent.realBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div style={{color:"#ff0000"}}>{(item.rent.arrearsAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div style={{color:"#ff0000"}}>{item.rent.arrearsDays}</div></td>

				  					<td><div style={{color:"#ff0000"}}>{(item.lateFee+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div style={{color:"#ff0000"}}>{(item.totalAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
				  					<td><div>{item.endDate>Date.parse(new Date())?"未结束":"已结束"}</div></td>
				  					<td><div style={{color:"#499df1"}}><span onClick={_this.seeDetailForm.bind(_this,item)} style={{cursor:"pointer"}}>查看</span></div></td>

					  			</tr>
					  		})
				  		}

				    </tbody>
				</table>

		  	</div>
		);
	}
}

