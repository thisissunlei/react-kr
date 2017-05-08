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
	Message,
	Tooltip,
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
	onHightSubmit=(form)=>{
		this.setState({
			searchParams:form
		})
		this.openSearchDialog();
	}
	onSerchSubmit = (form) => {
		this.setState({
			searchParams:{
				loginAccount:form.content,
			}
		})
	}

	render() {


		return (
			<div className="g-loginlog">
				<Section title="登录日志" >
					<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
						<Button   type='search'  searchClick={this.openSearchDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
						<SearchForms onSubmit={this.onSerchSubmit} placeholder="请输入登录账号"  style={{marginTop:5,zIndex:10000}} />
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
						<TableHeaderColumn>ID</TableHeaderColumn>
						<TableHeaderColumn>登录账号</TableHeaderColumn>
						<TableHeaderColumn>登录结果</TableHeaderColumn>
						<TableHeaderColumn>设备信息</TableHeaderColumn>
						<TableHeaderColumn>备注</TableHeaderColumn>
						<TableHeaderColumn>登录IP</TableHeaderColumn>
						<TableHeaderColumn>登录时间</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="loginId"></TableRowColumn>
							<TableRowColumn name="loginAccount"></TableRowColumn>
							<TableRowColumn name="successful" component={(value)=>{
								if(value==1){
									return(
										<span>成功</span>
									)
								}else if(value==0){
									return(
										<span>失败</span>
									)
								}
								
							}}></TableRowColumn>
							<TableRowColumn 
									name="deviceInfo"
									component={(value)=>{
		                            var styles = {
		                              display:'block',
		                              paddingTop:5
		                            };
		                            if(value.length==""){
		                              styles.display="none"

		                            }else{
		                              styles.display="block";
		                            }
		                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:190,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		                           }}
							></TableRowColumn>
							<TableRowColumn name="remark" ></TableRowColumn>
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
