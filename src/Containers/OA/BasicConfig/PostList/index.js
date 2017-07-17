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
export default class PostList extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {},
		}
		this.allConfig = {
			openNew : false,
			openEdit : false,
			openDel : false,
			searchParams : {

			}
		}
	}


	onExport = () =>{

	}

	//搜索确定
	onSearchSubmit = ()=>{

	}
	//新建页开关
	newSwidth = () =>{
		let {openNew} = this.allConfig;
		this.allConfig.openNew = !openNew;
	}
	
	//编辑页开关
	editSwidth = () =>{
		let {openEdit} = this.allConfig;
		this.allConfig.openEdit = !openEdit;
	}
	//删除页面的开关
	delSwidth = () =>{
		
	}
	//关闭所有侧滑
	allClose = () =>{

	}

	render(){
		return(
      	<div className="basic-post-list" style={{paddingTop:25,background:"#fff"}}>
		
	        <Row style={{marginBottom:21}}>
			    <Col
					style={{float:'left'}}
				>
					<Button
							label="新建用户"
							type='button'
							onTouchTap={this.openAddPersonal}
					/>
				</Col>
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
	            ajaxUrlName='shareCustomers'
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
						<TableRowColumn name="intentionCityName" ></TableRowColumn>
						<TableRowColumn name="stationNum"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
						<TableRowColumn name="receiveName"></TableRowColumn>
					</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
           </Table>
        </div>
		);
	}

}
;
