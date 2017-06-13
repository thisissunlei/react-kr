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
	Loading,
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
			sWidthC :0,
			middlePX : 0
		}
	}

	componentWillReceiveProps(nextProps){
		let _this = this;
		if(!nextProps.isLeftNavShow){
			$(".table-box").eq(0).width($(window).width()-80);
			$(".table-data").eq(0).width($(window).width()-80);
			_this.setState({
				middlePX : ($(window).width()-80)/2-60
			})
		}else{
			$(".table-box").eq(0).width(_this.state.sWidthC);
			$(".table-data").eq(0).width(_this.state.sWidthC);
			_this.setState({
				middlePX : (_this.state.sWidth)/2-60
			})
		}
		var tableContainerWidth = $(".table-container").eq(0).width();
		var tableBoxWidth = $(".table-box").eq(0).width();
		if(tableContainerWidth<tableBoxWidth){
			$("td div").filter(".header-div").width((tableBoxWidth-10)/10-10);
			$(".date-items").eq(0).width(tableBoxWidth);
		}
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
		var tableBoxWidth = $(".table-box").eq(0).width();
		this.setState({
			sWidthC:$(window).width()-260,
			middlePX : ($(window).width()-80)/2-60
		})
		$(".table-data").width(tableBoxWidth);
		$(".table-box").eq(0).width($(".community-collect-box").eq(0).width());
		$(".table-box").height($(window).height()-215);
		
		var tableContainerWidth = $(".table-container").eq(0).width();

		if(tableContainerWidth<tableBoxWidth){
			$("td div").filter(".header-div").width((tableBoxWidth-10)/10-10);
			$(".date-items").eq(0).width(tableBoxWidth);
		}
		$('.table-data').eq(0).scroll(function(event){
			_this.refs.tableHeader.style.left =-$(this).scrollLeft()+"px"; 
		   
		    if($(this).scrollLeft()>140){

		    	_this.refs.leftTitle.style.display = "block";
		    	_this.refs.leftTitleBox.style.top = -$(this).scrollTop()+"px";
		 
		    }else{
		    	_this.refs.leftTitle.style.display = "none";
		    	
		    }
		   
		});
		
	}

	
	
	render(){
		let _this = this;
		let {middlePX} = this.state;
		
		return (
			<div className="table-box">
				
				<div className="table-left-title" ref="leftTitle">
					<div className="left-title-header">社区</div>
					<div className="left-title-box" ref="leftTitleBox">
						
						{
							State.items.map(function(item,index){
								return <div className="left-title-item" key={index}>{item.communityName}</div>
							})
						}

					</div>
					
				</div>
				<div className="table-data">
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
					
					
					<div className='date-items'>
						{
						State.items.length<1 && <div style={{width:121,height:169,marginTop:200,marginLeft:middlePX}}>
													<img style={{display: "inline-block",width: 121, height: 169}} src={require('../images/nothings.png')}/>
												</div>
						}
						{
						   	State.items.length>0 && State.items.map(function(item,index){
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

