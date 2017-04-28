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
//import SearchForm from './SearchForm';

export default class LoginLog extends React.Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
			},
			itemDetail: '',
		}
	}

	

	onSearchSubmit = (name) => {
		var roleId = this.props.params.userId
		this.setState({
			searchParams: {
				userName: name.searchParam,
				roleId: roleId
			}
		})

	}

	render() {


		return (
			<div className="g-loginlog">
				<Section title="登录日志" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" > </Col>
						<Col md={8} align="right">
						   <ListGroup>
							 <ListGroupItem><SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
						   </ListGroup>
						</Col>
					  </Row>
					</Grid>
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

			</div>
		);
	}

}
