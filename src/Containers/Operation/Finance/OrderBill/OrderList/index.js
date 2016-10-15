import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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

		this.onLoaded = this.onLoaded.bind(this);

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

	onLoaded(response){
     let 
	 console.log('re',response);

	}

	//操作相关
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
		this.openEditDetailDialog();
		window.location.reload();
	}

	//查看
	openViewDialog(){
		this.setState({
			openView:!this.state.openView
		});
	}


	//搜索
	onSearchSubmit(searchParams){
		
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
					<Section title="属性配置" description="" >

					<Grid>
						<Row>
							<Col md={3}> 
							    <KrField label="收入总额" component="labelText" primary={true} />
							</Col>
                            
							<Col md={3}> 
							    <KrField label="回款总额" component="labelText" primary={true}/>
							</Col>
							<Col md={2}> 
							    <KrField label="余额" component="labelText" primary={true}/>
							</Col>
							<Col md={4} align="right"> 
									<SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/>
							</Col> 
							<Col md={4} align="right"> 
									<Button onTouchTap={this.openNewCreateDialog} label="查询"/>
							</Col> 
						</Row>
					</Grid>


				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true} onLoaded={this.onLoaded} ajaxFieldListName="finaContractMainbillVOList" ajaxUrlName='getFinaDataByList' ajaxParams={this.state.searchParams} onOperation={this.onOperation} >
					<TableHeader>
					<TableHeaderColumn>公司名称</TableHeaderColumn>
					<TableHeaderColumn>订单类型</TableHeaderColumn>
					<TableHeaderColumn>所在社区</TableHeaderColumn>
					<TableHeaderColumn>起始日期</TableHeaderColumn>
					<TableHeaderColumn>结束日期</TableHeaderColumn>
					<TableHeaderColumn>收入总额</TableHeaderColumn>
					<TableHeaderColumn>回款总额</TableHeaderColumn>
					<TableHeaderColumn>余额</TableHeaderColumn>
					<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn name="customername" ></TableRowColumn>
						<TableRowColumn name="mainbilltype" ></TableRowColumn>
						<TableRowColumn name="community"></TableRowColumn>
						<TableRowColumn name="actualEntrydate"></TableRowColumn>
						<TableRowColumn name="actualLeavedate"></TableRowColumn>
						<TableRowColumn name="come"></TableRowColumn>
						<TableRowColumn name="backMount"></TableRowColumn>
						<TableRowColumn name="mount"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  <Button label="生成对账单"  type="operation" operation="edit"/>
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

