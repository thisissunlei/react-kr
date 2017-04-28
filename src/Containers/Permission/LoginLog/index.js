import React from 'react';
import {
	Http
} from "kr/Utils";

import {
	
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
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import HightSearchForm from "./HightSearchForm";
export default class LoginLog extends React.Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
			},
			openSearchDialog:false,
			
		}
	}

	openSearchDialog=()=>{
		this.setState({
			openSearchDialog:!this.state.openSearchDialog
		})
	}

	onSearchSubmit = (name) => {
		

	}

	render() {


		return (
			<div className="g-loginlog">
				<Section title="登录日志" >
					<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
						<Button   type='search'  searchClick={this.openSearchDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
						<SearchForms onSubmit={this.onSerchSubmit} placeholder="请输入被访公司名称"  style={{marginTop:5,zIndex:10000}} />
					</form>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='get-login-log'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							  >
						<TableHeader>
						<TableHeaderColumn>日志ID</TableHeaderColumn>
						<TableHeaderColumn>登录IP</TableHeaderColumn>
						<TableHeaderColumn>登录时间</TableHeaderColumn>
						<TableHeaderColumn>设备信息</TableHeaderColumn>
						<TableHeaderColumn>登录账号</TableHeaderColumn>
						<TableHeaderColumn>登录ID</TableHeaderColumn>
						<TableHeaderColumn>备注</TableHeaderColumn>
						<TableHeaderColumn>登录结果</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="id"></TableRowColumn>
							<TableRowColumn name="clientIp"></TableRowColumn>
							<TableRowColumn 
									name="ctime" 
									type="date"
									component={(value)=>{
										return (
											<KrDate value={value} />
										)
									}}
									></TableRowColumn>
							<TableRowColumn name="deviceInfo"></TableRowColumn>
							<TableRowColumn name="loginAccount"></TableRowColumn>
							<TableRowColumn name="loginId"></TableRowColumn>
							<TableRowColumn name="remark" ></TableRowColumn>
							<TableRowColumn name="successful" component={(value)=>{
								console.log('value',value)
								
							}}></TableRowColumn>
							
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>
				<Dialog
					title="高级查询"
					modal={true}
					open={this.state.openSearchDialog}
					onClose={this.openSearchDialog}
					contentStyle={{width:687}}
				>
					<HightSearchForm 
							onSubmit={this.onHightSubmit}
							onCancel={this.openSearchDialog}
							detail="" 
							style={{marginTop:37}} 
					/>
			  </Dialog>

			</div>
		);
	}

}
