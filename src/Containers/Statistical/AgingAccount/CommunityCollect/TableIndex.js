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

export default class TanLinLin extends React.Component{
	constructor(props){
		super(props);
		this.state={

			windowScrollTop:0,
			isShowTitle:"none",
			isShowLeftTitle:"none",
			titleLeft:0,
			leftTitleTop:213,
			leftTitleItemP:'',
			leftTitleItemTop:100,
			fixedWidth : 930

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
						leftTitleItemTop:100-($(window).scrollTop()-154)
					})
				}else{
					_this.setState({
						isShowTitle:"none",
						leftTitleTop:213-(_this.state.windowScrollTop),
						leftTitleItemP:''
						
					})
				}
			})
			



		}
		$('.table-box').eq(0).scroll(function(event){
			
		    if($(this).scrollLeft()>140){
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
	
	render(){
		let {isShowTitle,titleLeft,isShowLeftTitle,leftTitleTop,leftTitleItemP,leftTitleItemTop,fixedWidth} = this.state;

		return (
			<div className="table-box">
				<div className="table-title" style={{display:isShowTitle,width:fixedWidth}}>
					<table className="table-container" cellPadding='0' cellSpacing='0' style={{position:"absolute",left:titleLeft}} >
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
				<div className="table-left-title" style={{display:isShowLeftTitle,top:leftTitleTop}}>
					<div className="left-title-header" style={{position:leftTitleItemP}}>社区</div>
					<div className="left-title-box" style={{position:leftTitleItemP,top:leftTitleItemTop}}>
						<div className="left-title-item">创业大街社区</div>
						<div className="left-title-item">酒仙桥社区</div>
						<div className="left-title-item">浦项社区</div>
						<div className="left-title-item">酒仙桥社区</div>
						<div className="left-title-item">浦项社区</div>
						<div className="left-title-item">酒仙桥社区</div>
						<div className="left-title-item">浦项社区</div>
						<div className="left-title-item">酒仙桥社区</div>
						<div className="left-title-item">浦项社区</div>
						<div className="left-title-item">酒仙桥社区</div>
						<div className="left-title-item">浦项社区</div>

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
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>创业大街社区</div></td>
				   		<td><div>1111</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>酒仙桥社区</div></td>
				   		<td><div>2222</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   		<td><div>3333</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>酒仙桥社区</div></td>
				   		<td><div>4444</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   		<td><div>5555</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   		<td><div>6666</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   	</tr>
				   	<tr>
				   		<td><div>fmsalsfdad</div></td>
				   		<td><div>浦项社区</div></td>
				   	</tr>

				   </tbody>
				   <tfoot>
				    
				  </tfoot>
				</table>

		  	</div>
		);
	}
}

