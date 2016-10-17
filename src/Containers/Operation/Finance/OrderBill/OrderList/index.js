import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
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
import CompareBillForm from './CompareBillForm';
import ConfirmBillDetail from './ConfirmBillDetail';


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

		this.openConfirmBillDetailDialog = this.openConfirmBillDetailDialog.bind(this);

		this.state = {
			openNewCreate:false,
			openView:false,
			openEditDetail:false,
			openConfirmBillDetail:false,
			itemDetail:{},
			item:{},
			searchParams:{
				page:1,
				pageSize:20
			}
		}
	}

	componentDidMount() {
       var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataByList')).then(function(response){
			_this.setState({
				item:response,
				loading:false
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
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

	//对账单的确定操作
	onEditSubmit(){
		this.openEditDetailDialog();
		this.openConfirmBillDetailDialog();
	}

	//对账单查看详情
	openConfirmBillDetailDialog(){

		this.setState({
			openConfirmBillDetail:!this.state.openConfirmBillDetail
		});		

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
        
      let items=this.state.item;
      console.log("yyyy",items);

     
        
		return(

			<div>
					<Section title="订单账单列表" description="" >

					<Grid>
						<Row>
							<Col md={2}> 
							    <KrField label="收入总额" component="labelText" primary={true} />
							</Col>
                            
							<Col md={2}> 
							    <KrField label="回款总额" component="labelText" primary={true}/>
							</Col>
							<Col md={2}> 
							    <KrField label="余额" component="labelText" primary={true}/>
							</Col>
							<Col md={4} align="right"> 
									<SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/>
							</Col> 
							<Col md={2} align="right"> 
									<Button onTouchTap={this.openNewCreateDialog} label="查询"/>
							</Col> 
						</Row>
					</Grid>


				<Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxFieldListName="finaContractMainbillVOList" ajaxUrlName='getFinaDataByList' ajaxParams={this.state.searchParams} onOperation={this.onOperation} >
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
						title="查询"
						modal={true}
						open={this.state.openNewCreate}
					>
						<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="生成对账单"
						modal={true}
						open={this.state.openEditDetail}
					>
						<CompareBillForm  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
				  </Dialog>

				  <Dialog
						title="对账单详情确认"
						modal={true}
						open={this.state.openConfirmBillDetail}
					>
						<ConfirmBillDetail  detail={this.state.itemDetail} onCancel={this.openConfirmBillDetailDialog} />
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

