
import React from 'react';

import {Http,DateFormat} from 'kr/Utils';
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

import OpenSearchForm from './OpenSearchForm';
import NewCreate from './NewCreate';


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


	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}

	editList=(value)=>{

	}
	onClickDelete=(value)=>{

	}

	render() {
		let {list,seleced,openType} = this.state;

		return (
			    <div className="second-door-open-log" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="打印配置"/>
					<Section title={`打印配置`} description="" >
						<div>
							<Button label="新增"  onTouchTap={this.openNewCreateDialog}/>

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
							ajaxUrlName='PrinterConifigList'
							ajaxParams={State.printerConifigListParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								
								<TableHeaderColumn>社区</TableHeaderColumn>
								<TableHeaderColumn>创建人</TableHeaderColumn>
								<TableHeaderColumn>创建时间</TableHeaderColumn>
								<TableHeaderColumn>节点服务器IP</TableHeaderColumn>
								<TableHeaderColumn>价格策略名称</TableHeaderColumn>
								<TableHeaderColumn>最后一次更新时间</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								
								
								 <TableRowColumn style={{width:"9%",overflow:"visible"}} name="communityName" 
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
								<TableRowColumn name="creatorName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
								<TableRowColumn 
									style={{width:"15%"}}
									name="ctime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
								>
								</TableRowColumn>
								<TableRowColumn name="nodeIp" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="printPriceName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
								<TableRowColumn 
									style={{width:"15%"}}
									name="utime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
								>
								</TableRowColumn>
								<TableRowColumn type="operation"
					            	style={{width:"15%"}}
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div>
														<Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value)}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.onClickDelete.bind(this,value,itemData)}/>
															
													</div>
												)
										}
									}
								> 
								</TableRowColumn>
							 </TableRow>
							 
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
						<Dialog
				          title="新增打印机设备"
				          open={State.openNewCreate}
				          onClose={this.openNewCreateDialog}
				          contentStyle={{width:687}}
				        >
					        <NewCreate
					            onCancel={this.openNewCreateDialog}
					            style ={{paddingTop:'35px'}}
					        />
			       		</Dialog>
					</Section>
				</div>
		);

	}

}
