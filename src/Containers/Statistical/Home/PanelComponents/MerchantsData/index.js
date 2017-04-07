import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

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
	Message
} from 'kr-ui';
import './index.less'
import {Http} from "kr/Utils";
import SearchDateForm from './SearchDateForm';

class MerchantsData  extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			searchParams: {
				groupId:this.props.groupId,
				startDate:"",
				endDate:""
			},
			data:{},
			startValue:'',
			endValue:''
		}
		this.gainData();
		console.log("...,,,,,..,,>>>>",this.props.groupId);
	}

	onStartChange=(startD)=>{

    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(startD,"yyyy-mm-dd hh:MM:ss"));


        let end=Date.parse(dateFormat(searchParams.endDate,"yyyy-mm-dd hh:MM:ss"))
        this.setState({
        	startValue:startD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let startDate=this.state.startValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue,endDate:this.state.endValue||searchParams.endDate});
	    	


        })

    }
    onEndChange=(endD)=>{
    	let {searchParams}=this.state;
        let start=Date.parse(dateFormat(searchParams.startDate,"yyyy-mm-dd hh:MM:ss"));
        let end=Date.parse(dateFormat(endD,"yyyy-mm-dd hh:MM:ss"));
        this.setState({
        	endValue:endD

        },function () {

        	if(start>end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let endDate=this.state.endValue;
	    	searchParams = Object.assign({}, searchParams, {startDate:this.state.startValue||searchParams.startDate,endDate:this.state.endValue,});
	    	

        })

    }
    // 获取列表数据
    gainData =() => {
    	let _this = this;
    	let {searchParams}=this.state;

    	Http.request('already-open',searchParams).then(function(response) {
    		_this.setState({
    			data:response
    		})
		}).catch(function(err) {
		
		});
    }

    openExprot = () =>{
    	let {searchParams}=this.state;
    	console.log(searchParams,">>>>>>>>")
		Http.request('already-export',searchParams).then(function(response) {
		}).catch(function(err) {
			
		});
    }
    createOpenElems = () =>{
    	let {data} = this.state;
		let {openList} = data;
		if(!openList || openList.length == 0){
			return;
		}
		let elems = openList.map(function(item,index){
			return (
					<TableRow>
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
    createUnopenElems = () => {
    	let {data} = this.state;
		let {unopenList} = data;
		if(!unopenList || unopenList.length == 0){
			return;
		}
		let elems = unopenList.map(function(item,index){
			return (
					<TableRow>
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
    createTotalList = () =>{
    	let {data} = this.state;
		let {totalList} = data;

		if(!totalList || totalList.length == 0){
			return;
		}
		let elems = totalList.map(function(item,index){
			return (
					<TableRow>
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


	
	render(){
		let {data} = this.state;
		let {unopenList,openList} = data;
			console.log(openList,">>>>>>>>>>>>>")
		if(!openList){
			openList=[];
		}
		if(!unopenList){
			unopenList=[];
		}
			console.log(openList,"<<<<<<<<<<<<<")


			return(
				<div className='open-merchants-data' style={{background:'#fff',marginBottom:'20'}}>
					<div className='ui-open-info'>
						<Grid style={{height:'76'}}>
							<Row>
								<Col align="left" md={4} style={{marginTop:'25'}}>
									<span  className='ui-pic-open'>招商数据统计-</span>
									<span  className='static-openCompany'>已开业</span>
									<span  className='static-upload'>实时更新</span>
								</Col>
								<Col align="right" md={8}>
									<SearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange} />
								</Col>
							</Row>
						</Grid>
								<div className = 'ui-table-wrap'>

								<Table style={{marginTop:0}} displayCheckbox={false}>
									
								<TableHeader>
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
								
								<div style={{position: "absolute",zIndex: 10,width: "6.03%",boxSizing:" border-box",border:"solid 1px #eee",background: "#fff",top: 208,height:51*(openList.length),lineHeight:51*(openList.length)+"px"}}>已开业</div>
								<div style={{position: "absolute",zIndex: 10,width: "6.03%",boxSizing:" border-box",border:"solid 1px #eee",background: "#fff",top: 208+51*(openList.length),height:51*(unopenList.length),lineHeight:51*(unopenList.length)+"px"}}>未开业</div>
								<div style={{position: "absolute",zIndex: 10,width: "12.06%",boxSizing:" border-box",border:"solid 1px #eee",background: "#fff",top: 208+51*(openList.length+unopenList.length),height:51,lineHeight:51+"px"}}>总计</div>

								{this.createOpenElems()}
								{this.createUnopenElems()}	
								{this.createTotalList()}
							</TableBody>
							</Table>
							</div>
					 <Button  label="导出" type="button" onTouchTap = {this.openExprot}/>

					</div>
		 		</div>
			);
		}
}
export default MerchantsData;
