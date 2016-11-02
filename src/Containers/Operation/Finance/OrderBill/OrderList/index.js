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
	ListGroup,
	ListGroupItem
} from 'kr-ui';


import NewCreateForm from './NewCreateForm';
import SearchForm from './SearchForm';
import ItemDetail from './ItemDetail';
import CompareBillForm from './CompareBillForm';



export default class AttributeSetting  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.onNewCreateSubmit = this.onNewCreateSubmit.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);
		this.onLoaded=this.onLoaded.bind(this);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openViewDialog = this.openViewDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);

		this.onExport = this.onExport.bind(this);



		this.state = {
			openNewCreate:false,
			openView:false,
			openEditDetail:false,
			itemDetail:{},
			item:{},
			list:{},
			searchParams:{
				page:1,
				pageSize:10
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

	onExport(idList){
		var list=[];
		idList.map(function(item,index){
          var idList={};
          idList.communityid=item.communityid;
          idList.customername=item.customername;
          idList.mainbilltype=item.mainbilltype;
          idList.startDate=item.actualEntrydate;
          idList.endDate=item.operatedate;
          list.push(idList);
          return list;
		})
		var url = `http://optest.krspace.cn/api/krspace-finance-web/finaccount/data/exportExcel?list=${list}`
		window.location.href = url;
	}

	//操作相关
	onOperation(type,itemDetail){

        
		this.setState({
			itemDetail
		});

		if(type == 'view'){
			let orderId=itemDetail.id
			window.location.href=`./#/operation/finance/orderbill/${orderId}/detail`;
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

	onNewCreateSubmit(searchParams){
		this.setState({
			searchParams,
			openNewCreate:!this.state.openNewCreate
		});
	}

	onNewCreateCancel(){
		this.openNewCreateDialog();
	}

	onLoaded(response){
		
    	let list = response;    
    	this.setState({
    		list
    	})
    }


	render(){
        
      let {list}=this.state;

      if(!list.sumcome){
      	  list.sumcome=0;
      }
      if(!list.sumAmount){
      	  list.sumAmount=0;
      }
      if(!list.summount){
      	  list.summount=0;
      }
     
    
        
		return(

			<div>
					<Section title="订单账单列表" description="" >

					<Grid>
						<Row>
							<Col md={6} align="left"> 
								<ListGroup>
									<ListGroupItem>  <KrField label="收入总额" component="labelText" primary={true} inline={true} value={list.sumcome} defaultValue="0"/></ListGroupItem>
									<ListGroupItem> <KrField label="回款总额" component="labelText" primary={true} inline={true} value={list.sumAmount} defaultValue="0"/> </ListGroupItem>
									<ListGroupItem> <KrField label="余额" component="labelText" primary={true} inline={true} value={list.summount} defaultValue="0"/></ListGroupItem>	
								</ListGroup>	
							</Col> 
							<Col md={6} align="right"> 
								<ListGroup>
									<ListGroupItem> <SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
									<ListGroupItem> <Button onTouchTap={this.openNewCreateDialog} label="高级查询" /></ListGroupItem>
								</ListGroup>	
							</Col> 
						</Row>
					</Grid>



				<Table  style={{marginTop:10}}
						displayCheckbox={true} 
						onLoaded={this.onLoaded} 
						ajax={true} 
						ajaxFieldListName="finaContractMainbillVOList" 
						ajaxUrlName='getFinaDataByList' 
						ajaxParams={this.state.searchParams} 
						onOperation={this.onOperation}
						exportSwitch={true}
						onExport={this.onExport}
						  >
						
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
						<TableRowColumn name="mainbilltype" options={[{label:'工位入驻订单',value:'STATION'}]}></TableRowColumn>
						<TableRowColumn name="community"></TableRowColumn>
						<TableRowColumn name="contractEntrydate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="contractLeavedate" type="date" format="yyyy-mm-dd"></TableRowColumn>
						<TableRowColumn name="come"></TableRowColumn>
						<TableRowColumn name="backMount"></TableRowColumn>
						<TableRowColumn name="mount"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  {/*<Button label="生成对账单"  type="operation" operation="edit"/>*/}
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>

				</Table>

					</Section>

					<Dialog
						title="高级查询"
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

