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
			

		}
	}
	componentWillMount() {
	}

	componentWillReceiveProps(nextProps){

		
	}

	componentDidMount(){

		let _this = this;
		var tableBoxWidth = $(".table-box").eq(0).width();
		$(".table-data-detail").width(tableBoxWidth);
		$(".table-box").height($(window).height()-200);
		
		$('.table-data-detail').eq(0).scroll(function(event){
			
			_this.refs.tableHeader.style.left =-$(this).scrollLeft()+"px"; 
		   
		    if($(this).scrollLeft()>443){
		    	_this.refs.leftTitle.style.display = "block";
		    	_this.refs.leftTitleBox.style.top = -$(this).scrollTop()+"px";
		 
		    }else{
		    	_this.refs.leftTitle.style.display = "none";
		    	
		    }
		   
		});
		
		
	}

	seeDetailForm=(_this,item)=>{
		
		window.open(`./#/operation/customerManage/${_this.customerId}/order/${_this.mainBillId}/detail`);

	}
	thousands=(num)=>{

	    num = num.toString();   

	    if(/^-?\d+\.?\d+$/.test(num)){  
	        if(/^-?\d+$/.test(num)){    
	            num =num + ",00";   
	        }else{
	            num = num.replace(/\./,',');    
	        }

	        while(/\d{4}/.test(num)){ 
	            
	            num = num.replace(/(\d+)(\d{3}\,)/,'$1,$2');
	        }

	        num = num.replace(/\,(\d*)$/,'.$1');   
	    }
	    return num;
	}


	
	render(){
		let _this = this;
		return (
			<div className="table-box">
				
				<div className="table-left-title" ref="leftTitle">
					<div className="left-title-header" >客户</div>
					<div className="left-title-box" ref="leftTitleBox">
						{
							State.items.map(function(item,index){
								return <div className="left-title-item" key={index}>{item.customerName}</div>
							})
						}
					</div>
					
				</div>
				<div className="table-data-detail">
					<table ref="tableHeader" className="table-container" cellPadding='0' cellSpacing='0'>
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
						  	
					    </tbody>
					</table>
					<div className='date-items'>
						{
							State.items.map(function(item,index){

					  			return <div key={index} className="data-item">
					  				<div className="item-div line-height">{item.cityName}</div>
					  				<div className="item-div ">{item.corporationName}</div>
				  					<div className="item-div line-height">{item.communityName}</div>
				  					<div className="item-div">{item.customerName}</div>
				  					<div className="item-div line-height">{index==0?"-":DateFormat(item.beginDate,"yyyy-mm-dd") }</div>
				  					<div className="item-div line-height">{index==0?"-":DateFormat(item.endDate,"yyyy-mm-dd")}</div>
				  					<div className="item-div line-height">{_this.thousands(item.deposit.receivableBackAmount)}</div>

				  					<div className="item-div line-height">{_this.thousands(item.deposit.realBackAmount)}</div>
				  					<div className="item-div line-height" style={{color:"#ff0000"}}>{_this.thousands(item.deposit.arrearsAmount)}</div>

				  					<div className="item-div line-height">{_this.thousands(item.rent.receivableBackAmount)}</div>
				  					<div className="item-div line-height">{_this.thousands(item.rent.realBackAmount)}</div>
				  					<div className="item-div line-height" style={{color:"#ff0000"}}>{_this.thousands(item.rent.arrearsAmount)}</div>
				  					<div className="item-div line-height" style={{color:"#ff0000"}}>{index==0?"-":item.rent.arrearsDays}</div>

				  					<div className="item-div line-height" style={{color:"#ff0000"}}>{_this.thousands(item.lateFee)}</div>
				  					<div className="item-div line-height" style={{color:"#ff0000"}}>{_this.thousands(item.totalAmount)}</div>
				  					<div className="item-div line-height">{index==0?"-":(item.endState?"已结束":"未结束")}</div>
				  					<div className="item-div line-height" style={{color:"#499df1"}}>
				  						{
				  							index==0?<span>-</span>:<span onClick={_this.seeDetailForm.bind(_this,item)} style={{cursor:"pointer"}}>查看</span>

				  						}
				  					</div>

					  			</div>
					  		})
					   }
					</div>
				</div>
		  	</div>
		);
	}
}

