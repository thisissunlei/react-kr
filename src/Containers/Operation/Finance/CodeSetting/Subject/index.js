import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import * as actionCreators from 'kr-ui/../Redux/Actions';

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
		Dialog,
} from 'kr-ui';


import NewCreateForm from './NewCreateForm';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail';
import EditDetailForm from './EditDetailForm';


export default class AttributeSetting  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openViewDialog = this.openViewDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);

		this.state = {
			openNewCreate:false,
			openView:false,
			openEditDetail:false,
			itemDetail:{},
			searchParams:{
				page:1,
				pageSize:20
			}
		}
	}

	componentDidMount() {

	}

	onOperation(type,itemDetail){

		this.setState({
			itemDetail
		});
		if(type == 'view'){
			this.openViewDialog();
		}else if(type == 'edit'){
			this.openEditDetailDialog();
		}
	}

	//编辑
	openEditDetailDialog(){
		this.setState({
			openEditDetail:!this.state.openEditDetail
		});
	}

	onEditSubmit(){

	}

	//查看
	openViewDialog(){
		this.setState({
			openView:!this.state.openView
		});
	}

	//搜索
	onSearchSubmit(searchParams){
		console.log('----')
		this.setState({
			searchParams
		});
	}

	onSearchCancel(){

	}


	//新建
	openNewCreateDialog(){
		this.setState({
			openNewCreate:!this.state.openNewCreate
		});
	}

	onNewCreateSubmit(form){
		window.location.reload();
	}

	onNewCreateCancel(){
		this.openNewCreateDialog();
	}

	render(){

		return(

			<div>
					<Section title="科目配置" description="" >

					<Grid>
						<Row>
							<Col md={3}> <Button label="新建" primary={true} onTouchTap={this.openNewCreateDialog} /> </Col>
							<Col md={4} align="right"> 
									<SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/>
							</Col> 
						</Row>
					</Grid>

				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='getFinaFinaflowAccountModelByAjax' ajaxParams={this.state.searchParams} onOperation={this.onOperation} >
					<TableHeader>
					  <TableHeaderColumn>科目编码</TableHeaderColumn>
					  <TableHeaderColumn>科目名称</TableHeaderColumn>
					  <TableHeaderColumn>科目类别</TableHeaderColumn>
					  <TableHeaderColumn>是否启用</TableHeaderColumn>
					  <TableHeaderColumn>排序号</TableHeaderColumn>
					  <TableHeaderColumn>描述</TableHeaderColumn>
				  <TableHeaderColumn>操作</TableHeaderColumn>
				 </TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn name="accountcode" ></TableRowColumn>
						 <TableRowColumn name="accountname"></TableRowColumn>
						 <TableRowColumn name="accounttype"></TableRowColumn>
						 <TableRowColumn name="enableflag"></TableRowColumn>
						 <TableRowColumn name="ordernum"></TableRowColumn>
						 <TableRowColumn name="accountdesc"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="新建"
						modal={true}
						open={this.state.openNewCreate}
					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="编辑"
						modal={true}
						open={this.state.openEditDetail}
					>
						<EditDetailForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
				  </Dialog>

					<Dialog
						title="查看"
						modal={true}
						open={this.state.openView}
					>
						<ItemDetail  detail={this.state.itemDetail} onCancel={this.openViewDialog} />
				  </Dialog>


			</div>		

		);

	}

}

