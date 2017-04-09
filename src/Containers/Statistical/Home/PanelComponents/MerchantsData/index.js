import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import dateFormat from 'dateformat';

import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	Tabs,
	Tab,
	Title,
	Message,
	Loading,
	Tooltip
} from 'kr-ui';
import './index.less'
import {Http} from "kr/Utils";
import SearchDateForm from './SearchDateForm';

class MerchantsData  extends Component{

	constructor(props,context){
		super(props, context);
		let {todayDate} = this.props;
		let nowDate = dateFormat(todayDate,"yyyy-mm-dd");
		console.log(dateFormat(todayDate,"yyyy-mm-dd"),"LLLLLLLL")
		this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:nowDate,
				endDate:nowDate
			},
			data:{},
			startValue:nowDate,
			endValue:nowDate,
			loading:true,
			tabLoading:true,
			moveStyle:{
				position: "absolute",
			    marginRight: 20,
			    lineHeight: "54px",
			    zIndex: 1,
			    marginLeft: 1,
			    
			}
		}
		this.gainData();
		
	}

	onStartChange=(value)=>{
    	let {startValue,endValue}=this.state;
    	let {groupId} = this.props;
    	let start = value;
        let end = endValue;
        let _this = this;
        this.setState({
        	startValue:value,
        })

    	if(!!start && !!end && start>end){
         Message.error('开始时间不能大于结束时间');
          return ;
        }else{
        	this.setState({
        		searchParams:{
        			groupId:groupId,
	        		startDate:startValue,
					endDate:endValue,
        		}
        	},function(){
        		this.gainData();
        	})
        }
        

    }
    onEndChange=(value)=>{
    	let {startValue,endValue}=this.state;
    	let {groupId} = this.props;

        let start = startValue;
        let end = value;
        this.setState({
        	endValue:value,
        })

    	if(!!start && !!end && start>end){
         Message.error('开始时间不能大于结束时间');
          return ;
        }else{
        	this.setState({
        		searchParams:{
        			groupId:groupId,
	        		startDate:startValue,
					endDate:endValue,
        		}
        		
        	},function(){
        		this.gainData();
        	})
        }

    }
    // 获取列表数据
    gainData =() => {
    	let _this = this;
    	let {endValue,startValue}=this.state;
    	let searchParams={}
    	searchParams.groupId = this.props.groupId;
    	searchParams.startDate=startValue+" 00:00:00"
    	searchParams.endDate=endValue+" 00:00:00"
    	this.setState({
    		
    		tabLoading:true,
    	})
    	Http.request('already-open',searchParams).then(function(response) {
    		_this.setState({
    			data:response,
    			loading:false,
    			tabLoading:false
    		})
		}).catch(function(err) {
		
		});
    }

    openExprot = () =>{
    	let {groupId} = this.props;
    	let {endValue,startValue}=this.state;
    	endValue+=" 00:00:00";
    	startValue+=" 00:00:00";
		var url = `/api/krspace-finance-web/stat/merchant/data/customer/export?groupId=${groupId}&endDate=${endValue}&startDate=${startValue}`;
		window.location.href = url;
    }
    componentDidMount() {
    	var _this=this;
    	window.onscroll = function () { 
			var t = document.documentElement.scrollTop || document.body.scrollTop;
			if(t>150){
				_this.setState({
					moveStyle:{
						position: "fixed",
					    marginRight: 40,
					    lineHeight: "54px",
					    zIndex: 99,
					    marginLeft: 1,
					    top:60
					    
					}
				})
			}else{
				_this.setState({
					moveStyle:{
						position: "absolute",
					    marginRight: 20,
					    lineHeight: "54px",
					    zIndex: 1,
					    marginLeft: 1,
					    
					}
				})
			}
		}	
      Store.dispatch(change('merchansDateForm','startDate',this.props.todayDate));
      Store.dispatch(change('merchansDateForm','endDate',this.props.todayDate));

    }
    tooltip = (value) =>{
    	var maxWidth=6;
		if(value.length>maxWidth){
		 value = value.substring(0,6)+"...";
		}
		return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
		 									
    }
    createOpenElems = () =>{
    	let {data} = this.state;
		let {openList} = data;
		if(!openList || openList.length == 0){
			return;
		}
		let _this = this;

		let elems = openList.map(function(item,index){
			return (
					<TableRow key = {index}>
						<TableRowColumn >
							
						</TableRowColumn>

						<TableRowColumn >{item.cityName}</TableRowColumn>
						<TableRowColumn >{_this.tooltip(item.communityName)}</TableRowColumn>
						//新增客户
						<TableRowColumn>{item.newCustomer}</TableRowColumn>
						//参观客户
						<TableRowColumn>{item.visitCustomer}</TableRowColumn>
						//意向工位数
						<TableRowColumn>{item.intentionStation}</TableRowColumn>
						//入驻客户数
						<TableRowColumn>{item.enterCustomer}</TableRowColumn>
						//续租客户数
						<TableRowColumn>{item.continueCustomer}</TableRowColumn>
						//增租客户数
						<TableRowColumn>{item.increaseCustomer}</TableRowColumn>
						//减租客户数
						<TableRowColumn>{item.reduceCustomer}</TableRowColumn>
						//退租客户数
						<TableRowColumn>{item.returnCustomer}</TableRowColumn>
						//入驻/
						<TableRowColumn>{item.enterSeveral}</TableRowColumn>
						//续租/
						<TableRowColumn>{item.continueSeveral}</TableRowColumn>
						//曾珠
						<TableRowColumn>{item.increaseSeveral}</TableRowColumn>
						//减租
						<TableRowColumn>{item.reduceSeveral}</TableRowColumn>
						//tuizu
						<TableRowColumn>{item.returnSeveral}</TableRowColumn>
						
					</TableRow>
				);
		})
		return elems;
    	
    }
    createUnopenElems = () => {
    	let {data} = this.state;
		let {unopenList} = data;
		let _this = this;
		if(!unopenList || unopenList.length == 0){
			return;
		}
		let elems = unopenList.map(function(item,index){
			return (
					<TableRow key = {index}>
						<TableRowColumn >
							
						</TableRowColumn>

						<TableRowColumn >{item.cityName}</TableRowColumn>
						<TableRowColumn >{_this.tooltip(item.communityName)}</TableRowColumn>
						//新增客户
						<TableRowColumn>{item.newCustomer}</TableRowColumn>
						//参观客户
						<TableRowColumn>{item.visitCustomer}</TableRowColumn>
						//意向工位数
						<TableRowColumn>{item.intentionStation}</TableRowColumn>
						//入驻客户数
						<TableRowColumn>{item.enterCustomer}</TableRowColumn>
						//续租客户数
						<TableRowColumn>{item.continueCustomer}</TableRowColumn>
						//增租客户数
						<TableRowColumn>{item.increaseCustomer}</TableRowColumn>
						//减租客户数
						<TableRowColumn>{item.reduceCustomer}</TableRowColumn>
						//退租客户数
						<TableRowColumn>{item.returnCustomer}</TableRowColumn>
						//入驻/
						<TableRowColumn>{item.enterSeveral}</TableRowColumn>
						//续租/
						<TableRowColumn>{item.continueSeveral}</TableRowColumn>
						//曾珠
						<TableRowColumn>{item.increaseSeveral}</TableRowColumn>
						//减租
						<TableRowColumn>{item.reduceSeveral}</TableRowColumn>
						//tuizu
						<TableRowColumn>{item.returnSeveral}</TableRowColumn>
						
					</TableRow>
				);
		})
		return elems;
    	
    }
    createTotalList = () =>{
    	let {data} = this.state;
		let {totalList} = data;

		if(!totalList || totalList.length == 0){
			return;
		}
		let elems = totalList.map(function(item,index){
			return (
					<TableRow key = {index}>
						<TableRowColumn >
							
						</TableRowColumn>
						<TableRowColumn >{item.cityName}</TableRowColumn>
						<TableRowColumn >
							
						</TableRowColumn>
						<TableRowColumn>{item.newCustomer}</TableRowColumn>
						<TableRowColumn>{item.visitCustomer}</TableRowColumn>
						<TableRowColumn>{item.intentionStation}</TableRowColumn>
						<TableRowColumn>{item.enterCustomer}</TableRowColumn>
						<TableRowColumn>{item.reduceCustomer}</TableRowColumn>
						<TableRowColumn>{item.increaseCustomer}</TableRowColumn>
						<TableRowColumn>{item.reduceCustomer}</TableRowColumn>
						<TableRowColumn>{item.returnCustomer}</TableRowColumn>
						<TableRowColumn>{item.enterSeveral}</TableRowColumn>
						<TableRowColumn>{item.continueSeveral}</TableRowColumn>
						<TableRowColumn>{item.increaseSeveral}</TableRowColumn>
						<TableRowColumn>{item.reduceSeveral}</TableRowColumn>
						<TableRowColumn>{item.returnSeveral}</TableRowColumn>
						
					</TableRow>
				);
		})
		return elems;
    	
    }

    nothingData = () =>{
    	return (<div className = "merchants-data-nothing">
    				<div className = "ui-nothing" >
    					<div className="icon" ></div>
    					<p className="tip" >暂时还没有数据呦~</p>
    				</div>
    			</div>)
    }

	
	render(){
		let {data,loading,moveStyle,tabLoading} = this.state;
		let {unopenList,openList} = data;
		let nothingData = false;
			
		if(!openList){
			openList=[];
		}
		if(!unopenList){
			unopenList=[];
		}
		if(loading){
			return <Loading />
		}
		
		if(unopenList.length == 0 && openList.length == 0){
			nothingData = true;
		}
			return(
				<div className='open-merchants-data' style={{background:'#fff',marginBottom:'20'}}>
					<div className='ui-open-info'>
						<Grid style={{height:'76'}}>
							<Row>
								<Col align="left" md={4} style={{marginTop:'25'}}>
									<span  className='ui-pic-open' style = {{width:150}}>客户信息数据统计</span>
									<span  className='static-upload'>实时更新</span>
								</Col>
								<Col align="right" md={8}>
									<SearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange} />
								</Col>
							</Row>
						</Grid>
						<div className = 'ui-table-wrap'>
							<div className = "merchants-move" style={moveStyle}>
								<div className = "merchants-header">开业状态</div>
								<div className = "merchants-header">城市</div>
								<div className = "merchants-header">社区</div>
								<div className = "merchants-header">新增客户</div>
								<div className = "merchants-header">参观客户</div>

								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>意向</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></div></div>
								<div className = "merchants-header"><div><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></div></div>
							
							</div>

							<Table style={{marginTop:0}} displayCheckbox={false}>
								
							<TableHeader ref = "merchants-column">
								<TableHeaderColumn>开业状态</TableHeaderColumn>
								<TableHeaderColumn>城市</TableHeaderColumn>
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>新增客户</TableHeaderColumn>
								<TableHeaderColumn>参观客户</TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>意向</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>客户数</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约入驻</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约续租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约增租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约减租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
								<TableHeaderColumn style={{textAlign:'center'}}><span style={{display:'inline-block',lineHeight:'16px'}}>签约退租</span><span style={{display:'inline-block',lineHeight:'16px'}}>工位/独立空间</span></TableHeaderColumn>
							</TableHeader>

							<TableBody>
								
								{!nothingData && <div style={{paddingRight: 1,position: "absolute",zIndex: 1,width: "6.03%",border:"solid 1px #eee",background: "#fff",top: 133,height:51*(openList.length),lineHeight:51*(openList.length)+"px",borderRightWidth: 0}}>已开业</div>}
								{!nothingData && <div style={{paddingRight: 1,position: "absolute",zIndex: 1,width: "6.03%",border:"solid 1px #eee",background: "#fff",top: 133+51*(openList.length),height:51*(unopenList.length),lineHeight:51*(unopenList.length)+"px",borderRightWidth: 0}}>未开业</div>}
								{!nothingData && <div style={{paddingRight: 4,position: "absolute",zIndex: 1,width: "18.09%",border:"solid 1px #eee",background: "#fff",top: 133+51*(openList.length+unopenList.length),height:50,lineHeight:51+"px",borderRightWidth: 0}}>总计</div>}

								{!nothingData && this.createOpenElems()}
								{!nothingData && this.createUnopenElems()}	
								{!nothingData && this.createTotalList()}
				    					
				    			
							</TableBody>
							
							</Table>
							</div>
							{nothingData && this.nothingData()}
							
							<div style={{marginTop:20}}>

								<Button  label="导出" type="button" onTouchTap = {this.openExprot}/>

							</div>

					</div>
		 		</div>
			);
		}
}
export default MerchantsData;
