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
import State from "./State";
import './index.less';
import $ from 'jquery';
import {
	observer
} from 'mobx-react';
@ observer

export default class TableIndex extends React.Component{
	constructor(props){
		super(props);
		this.state={

			windowScrollTop:0,
			isShowTitle:"none",
			isShowLeftTitle:"none",
			titleScrollLeft:0,
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
			
		    if($(this).scrollLeft()>140){
		    	_this.setState({
		    		
		    		isShowLeftTitle:"block",
		    		titleScrollLeft : -($('.table-box').eq(0).scrollLeft())
		    		

		    	})
		    }else{
		    	_this.setState({
		    		isShowLeftTitle:"none",
		    		titleScrollLeft : -($('.table-box').eq(0).scrollLeft())
		    		
		    	})
		    }
		   
		});
		
		
		
	  	
		

		
	}
	
	render(){
		let {isShowTitle,titleScrollLeft,isShowLeftTitle,leftTitleTop,leftTitleItemP,leftTitleItemTop,fixedWidth,titleLeftMarginTop} = this.state;

		return (
			<div className="table-box">
				<div className="table-title" style={{display:isShowTitle,width:fixedWidth}}>
					<table className="table-container" cellPadding='0' cellSpacing='0' style={{position:"absolute",left:titleScrollLeft}} >
					  <tbody>
					  	<tr>
					      <td rowSpan="2" className="dark-color"><div className="header-div  full-height">城市</div></td>
					      <td rowSpan="2" className="light-color"><div className="header-div full-height">社区</div></td>
					      <td colSpan="2" className="dark-color"><div className="header-div-box  half-height">应收账款</div></td>
					      <td colSpan="2" className="light-color"><div className="header-div-box half-height">实收回款</div></td>
					      <td colSpan="2" className="dark-color"><div className="header-div-box  half-height">欠款情况</div></td>
					      <td rowSpan="2" className="light-color"><div className="header-div full-height">应缴滞纳金</div></td>
					      <td rowSpan="2" className="dark-color"><div className="header-div full-height">应催缴金额合计</div></td>
					    </tr>
					    <tr>
					      <td className="dark-color"><div className="header-div  half-height">工位服务费</div></td>
					      <td className="dark-color"><div className="header-div  half-height">履约保证金</div></td>
					      <td className="light-color"><div className="header-div half-height">工位服务费</div></td>
					      <td className="light-color"><div className="header-div half-height">履约保证金</div></td>
					      <td className="dark-color"><div className="header-div  half-height">工位服务费</div></td>
					      <td className="dark-color"><div className="header-div  half-height">履约保证金</div></td>
					    </tr>
					   </tbody>
					</table>
				</div>
				<div className="table-left-title" style={{display:isShowLeftTitle,top:leftTitleTop,marginTop:titleLeftMarginTop}}>
					<div className="left-title-header" style={{position:leftTitleItemP}}>社区</div>
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
				      <td rowSpan="2" className="light-color"><div className="header-div full-height">社区</div></td>
				      <td colSpan="2" className="dark-color"><div className="header-div-box  half-height">应收账款</div></td>
				      <td colSpan="2" className="light-color"><div className="header-div-box half-height">实收回款</div></td>
				      <td colSpan="2" className="dark-color"><div className="header-div-box  half-height">欠款情况</div></td>
				      <td rowSpan="2" className="light-color"><div className="header-div full-height">应缴滞纳金</div></td>
				      <td rowSpan="2" className="dark-color"><div className="header-div full-height">应催缴金额合计</div></td>
				    </tr>
				    <tr>
				      <td className="dark-color"><div className="header-div  half-height">工位服务费</div></td>
				      <td className="dark-color"><div className="header-div  half-height">履约保证金</div></td>
				      <td className="light-color"><div className="header-div half-height">工位服务费</div></td>
				      <td className="light-color"><div className="header-div half-height">履约保证金</div></td>
				      <td className="dark-color"><div className="header-div  half-height">工位服务费</div></td>
				      <td className="dark-color"><div className="header-div  half-height">履约保证金</div></td>
				    </tr>
				   	
				   {
					   	State.items.map(function(item,index){
					   		return <tr key={index}>
						   		<td><div>{item.cityName}</div></td>
						   		<td><div>{item.communityName}</div></td>
						   		<td><div>{(item.rent.receivableBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div>{(item.deposit.receivableBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div>{(item.rent.realBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div>{(item.deposit.realBackAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div>{(item.rent.arrearsAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div>{(item.deposit.arrearsAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div style={{color:"#ff0000"}}>{(item.lateFee+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		<td><div style={{color:"#ff0000"}}>{(item.totalAmount+"").replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
												  return s+','
												}) 
				  							}</div></td>
						   		
						   	</tr>
					   	})
				   }
				   	
				   </tbody>
				   <tfoot>
				    
				  </tfoot>
				</table>

		  	</div>
		);
	}
}

