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
import OperateSearchForm from './OperateSearchForm';
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
		}
	}

	componentDidMount(){
		
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



	render() {
		let {list,seleced} = this.state;
		console.log("State",State);
		let spaceTypeOptions =  [{label:"会议室",value:"MEETING"},
								{label:"大厅",value:"HALL"},
								{label:"独立办公室",value:"OFFICE"}]

		return (
			    <div className="second-door-open-log" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="操作记录"/>
					<Section title={`操作记录`} description="" >
						<div>
							<OperateSearchForm/>
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
							ajaxUrlName='centerControlOperateLog'
							ajaxParams={State.openLogSearchParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								<TableHeaderColumn>时间</TableHeaderColumn>
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>智能硬件ID</TableHeaderColumn>
								<TableHeaderColumn>空间类型</TableHeaderColumn>
								<TableHeaderColumn>房间号</TableHeaderColumn>
								<TableHeaderColumn>操作事件</TableHeaderColumn>
								<TableHeaderColumn>结果</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn 
									name="time" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
									style={{width:"15%"}}
								></TableRowColumn>
								
								
								 <TableRowColumn 
								 style={{width:"10%",overflow:"visible"}} 
								 name="communityName" 
								 component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								
								<TableRowColumn name="serialNo" style={{width:"15%"}}
								component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}}></TableRowColumn>

								  <TableRowColumn name="spaceType" 
								  style={{width:"10%"}}
								  options={spaceTypeOptions}
								></TableRowColumn>

								<TableRowColumn name="spaceName"
								style={{width:"10%"}}
								component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                            	value="-"
		                              	TooltipStyle="none"
		                            }else{
		                            	TooltipStyle="block";
		                            }

		                             return (<div style={{width:"100%",display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}}></TableRowColumn>
								
								
								
								<TableRowColumn 
									name="conent" 
									style={{width:"10%"}}
								></TableRowColumn>
								<TableRowColumn style={{width:"10%",overflow:"visible"}} name="success" component={(value,oldValue,itemData)=>{
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





