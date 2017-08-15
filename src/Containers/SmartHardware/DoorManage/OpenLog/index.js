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
	CheckPermission
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import SecDoorOpenLog from './SecDoorOpenLog';
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
			}
		}
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
		let {
			list,seleced
		} = this.state;
		
		return (
			    <div className="member-list-div" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="开门记录"/>
					<Section title={`开门记录`} description="" >
						<div>
							<SecDoorOpenLog/>
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
								<TableHeaderColumn>门编号</TableHeaderColumn>
								<TableHeaderColumn>智能硬件ID</TableHeaderColumn>
								<TableHeaderColumn>姓名</TableHeaderColumn>
								<TableHeaderColumn>公司</TableHeaderColumn>
								<TableHeaderColumn>手机号</TableHeaderColumn>
								<TableHeaderColumn>验证方式</TableHeaderColumn>
								<TableHeaderColumn>结果</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>
								<TableRowColumn name="phone"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="name"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								 ></TableRowColumn>
								<TableRowColumn name="wechatNick"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="email" style={{overflow:"hidden"}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="jobName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="cityName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="companyName" style={{overflow:"hidden"}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="registerName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}></TableRowColumn>
								
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
				</div>
		);

	}

}
