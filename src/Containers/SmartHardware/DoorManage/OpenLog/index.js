import React from 'react';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Notify,
	CheckPermission,
	Tooltip
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import OpenSearchForm from './OpenSearchForm';
import './index.less';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
			realPage : 1,
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				jobId:'',
				companyId:0,
				cityId:'',
				type:'COMP_NAME',
				value:'',
			},
			openType:[]
		}
	}

	componentDidMount(){
		this.getDicList();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}

	// 获取通用字典
	getDicList =()=>{
		var _this = this;
		Http.request('getWarningType', {}).then(function(response) {
			var arrNew = []
			for (var i=0;i<response.OpenType.length;i++){
				
				arrNew[i] = {
							label:response.OpenType[i].desc,
							value:response.OpenType[i].value
						}
			}
			_this.setState({
				openType : arrNew
			})
			

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	render() {
		let {list,seleced,openType} = this.state;
		console.log("openType",openType);
		return (
			    <div className="second-door-open-log" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="开门记录"/>
					<Section title={`开门记录`} description="" >
						<div>
							<OpenSearchForm/>
						</div>
						<Table
							className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							exportSwitch={false}
							ajaxFieldListName='items'
							ajaxUrlName='getOpenLogList'
							ajaxParams={State.openLogSearchParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								<TableHeaderColumn>时间</TableHeaderColumn>
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>设备展示编号</TableHeaderColumn>
								<TableHeaderColumn>智能硬件ID</TableHeaderColumn>
								<TableHeaderColumn>姓名</TableHeaderColumn>
								<TableHeaderColumn>公司</TableHeaderColumn>
								<TableHeaderColumn>手机号</TableHeaderColumn>
								<TableHeaderColumn>开门方式</TableHeaderColumn>
								<TableHeaderColumn>结果</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn name="time" type="date" format="yyyy-mm-dd HH:MM:ss" style={{width:150}}></TableRowColumn>
								
								
								 <TableRowColumn style={{width:120,overflow:"visible"}} name="communityName" component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="block"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:120,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								<TableRowColumn name="doorCode"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="deviceId" style={{width:170}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
								<TableRowColumn style={{width:100,overflow:"visible"}} name="memberName" component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            
		                            
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="block"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{itemData.card}</Tooltip></div>)
		              			}} ></TableRowColumn>
		              			<TableRowColumn style={{width:120,overflow:"visible"}} name="company" component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="block"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:120,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								
								<TableRowColumn name="phone" style={{overflow:"hidden"}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="openType" options={openType}></TableRowColumn>
								<TableRowColumn style={{width:90,overflow:"visible"}} name="success" component={(value,oldValue,itemData)=>{
		                            var TooltipStyle="";
		                            var spanColor='';
		                            var msg = itemData.msg || "失败";
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                              if(value=='true'){
		                              	value = "成功"
		                              	msg='成功'
		                              }else{
		                              	value = "失败"
		                              	spanColor = "#ff6868";
		                              	try{
		                              		msg = JSON.parse(msg).message;
		                              	}catch(e){
		                              		msg = msg 
		                              	}
		                              	
		                              }
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:90,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",color:spanColor}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{msg}</Tooltip></div>)
		              			}} ></TableRowColumn>
							 </TableRow>
							 
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
				</div>
		);

	}

}
