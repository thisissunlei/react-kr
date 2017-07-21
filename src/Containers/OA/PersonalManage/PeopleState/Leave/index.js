import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message,
	CheckPermission
} from 'kr-ui';
export default class Leave extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {
				page:1,
				pageSize:15,
				searchKey:'',
			},
		}
	}


	

	//搜索确定
	onSearchSubmit = (data)=>{
		// searchKey = data.value;
		// let {searchParams} = this.state;
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.searchKey = data.content;
		this.setState({
			searchParams
		})
		
	}	
	
	
	//关闭所有侧滑
	allClose = () =>{

	}

	render(){
		return(
      	<div className="oa-leave-position" style={{paddingTop:25}}>
		
	        <Row style={{marginBottom:21}}>
			        
				<Col
					align="right" 
					style={{
							marginTop:0,
							float:"right",
							marginRight:-10
						   }}
				>
					<ListGroup>
						<ListGroupItem>
							<SearchForms 
								placeholder='请输入姓名' 
								inputName='search'
								onSubmit={this.onSearchSubmit}
							/>
						</ListGroupItem>
					</ListGroup>
				</Col>
	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='getLeaveList'
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
				onExport={this.onExport}
				exportSwitch={true}
			>
				<TableHeader>
					<TableHeaderColumn>部门</TableHeaderColumn>
					<TableHeaderColumn>姓名</TableHeaderColumn>
					<TableHeaderColumn>人员编码</TableHeaderColumn>
					<TableHeaderColumn>职位</TableHeaderColumn>
					<TableHeaderColumn>入职时间</TableHeaderColumn>
					<TableHeaderColumn>状态</TableHeaderColumn>

				</TableHeader>
				<TableBody >
					<TableRow>
						<TableRowColumn 
							name="intentionCityName" 
							component={(value,oldValue)=>{
								return (<span>value</span>)
							}}
						></TableRowColumn>
						<TableRowColumn name="name"></TableRowColumn>
						<TableRowColumn name="code"></TableRowColumn>
						<TableRowColumn name="jobName"></TableRowColumn>
						<TableRowColumn 
							name="entryDate"
							component={(value,oldValue)=>{
								return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
							}}
						></TableRowColumn>
						<TableRowColumn name="status"
							component={(value,oldValue)=>{
								let status = ""
								if(value == "UNENTRY"){
									status = "待入职"
								}
								if(value == "PROBATION"){
									status = "试用"
								}
								if(value == "REGULAR"){
									status = "正式"
								}
								if(value == "UNDIMISSION"){
									status = "待离职"
								}
								if(value == "DIMISSION"){
									status = "离职"
								}
								return (<span>{status}</span>)
							}}
						
						></TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
        </div>
		);
	}

}
;
