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
								<TableRowColumn name="time" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>
								
								<TableRowColumn name="communityName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								 ></TableRowColumn>
								<TableRowColumn name="doorCode"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="deviceId" style={{overflow:"hidden"}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="memberName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="company"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="phone" style={{overflow:"hidden"}}
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="openType"
								component={(value,oldValue)=>{
									if(value=="1"){
										value="刷卡开门"
									}else if(value=="2"){
										value = "微信开门"
									}
								return (<span>{value}</span>)}}></TableRowColumn>
									<TableRowColumn name="success"
								component={(value,oldValue)=>{
									var spanColor
									if(value=="true"){
										value="成功"
									}else{
										value = "失败"
										spanColor = "#ff6868";
									}
								return (<span style={{color:spanColor}}>{value}</span>)}}></TableRowColumn>
								
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
				</div>
		);

	}

}
