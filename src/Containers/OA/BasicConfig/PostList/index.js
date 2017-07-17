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
	}


	onExport = () =>{

	}

	//搜索确定
	onSearchSubmit = ()=>{

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
