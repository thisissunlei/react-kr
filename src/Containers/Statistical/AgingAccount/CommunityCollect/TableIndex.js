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


		}
	}
	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps){
		
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

	

	componentDidMount(){
		let _this = this;
		var windowScrollTop;
		var tableScrollLeft;
		var tableBoxWidth = $(".table-box").eq(0).width();
		$(".table-data").width(tableBoxWidth);
		window.onscroll = function(){
			var tableTotleHeight = $('.table-box').eq(0).height();
			windowScrollTop = $(window).scrollTop();
			if($(window).scrollTop()>153){
				$('.table-box').eq(0).height(tableTotleHeight);
				_this.refs.tableData.style.position = "fixed";
				_this.refs.tableData.style.top = "60px";

				_this.refs.tableHeader.style.position = "absolute";
				_this.refs.dateItems.style.marginTop = "101px";
				_this.refs.dateItems.style.transform = "translateY("+(-($(window).scrollTop()-153))+"px)";
				if(tableScrollLeft>140){
					_this.refs.leftTitleT.style.display = "block";
		    		_this.refs.leftTitleT.style.position = "fixed";
				}else{
					_this.refs.leftTitleT.style.display = "none";
				}

			}else{
				_this.refs.leftTitleT.style.display = "none";
				_this.refs.tableData.style.position = "";
				_this.refs.tableHeader.style.position = "";
				_this.refs.dateItems.style.marginTop = "0px";
				_this.refs.dateItems.style.transform = "translateY(0px)";


			}
		}
		$('.table-data').eq(0).scroll(function(event){
			tableScrollLeft = $(this).scrollLeft();
		    if($(this).scrollLeft()>140){
		    	_this.refs.leftTitle.style.display = "block";
		    	_this.refs.leftTitle.style.position = "absolute";
		    	
		    	if(windowScrollTop>153){
		    		_this.refs.leftTitleT.style.display = "block";
		    		_this.refs.leftTitleT.style.position = "fixed";
		    	}else{
		    		_this.refs.leftTitleT.style.display = "none";
		    	}

		    }else{
		    	_this.refs.leftTitle.style.display = "none";
		    	_this.refs.leftTitle.style.position = "";

		    	_this.refs.leftTitleT.style.display = "none";

		    	
		    }
		   
		});
		
	}
	
	render(){
		let _this = this;
		return (
			<div className="table-box">
				<div className="left-title-header-header" ref="leftTitleT">社区</div>
				<div className="table-left-title" ref="leftTitle">
					<div className="left-title-header">社区</div>
					<div className="left-title-box" >
						
						{
							State.items.map(function(item,index){
								return <div className="left-title-item" key={index}>{item.communityName}</div>
							})
						}

					</div>
					
				</div>
				<div ref="tableData" className="table-data">
					<table ref="tableHeader" className="table-container" cellPadding='0' cellSpacing='0'>
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
					<div className='date-items' ref="dateItems">
						{

						   	State.items.map(function(item,index){
						   		return <div key={index} className="data-item">
									   		<div className="item-div">{item.cityName}</div>
									   		<div className="item-div">{item.communityName}</div>
									   		<div className="item-div">{_this.thousands(item.rent.receivableBackAmount)}</div>
									   		<div className="item-div">{_this.thousands(item.deposit.receivableBackAmount)}</div>
									   		<div className="item-div">{_this.thousands(item.rent.realBackAmount)}</div>
									   		<div className="item-div">{_this.thousands(item.deposit.realBackAmount)}</div>
									   		<div className="item-div">{_this.thousands(item.rent.arrearsAmount)}</div>
									   		<div className="item-div">{_this.thousands(item.deposit.arrearsAmount)}</div>
									   		<div className="item-div" style={{color:"#ff0000"}}>{_this.thousands(item.lateFee)}</div>
									   		<div className="item-div" style={{color:"#ff0000"}}>{_this.thousands(item.totalAmount)}</div>
							   		
							   	</div>
						   	})
					   }
					</div>
				</div>
				
		  	</div>
		);
	}
}

