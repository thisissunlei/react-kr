import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer
} from 'kr-ui';

import State from './State';

import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import NewCustomerIndent from '../NewCustomerIndent';


import './index.less'
@observer
class Personal extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{},
		}
	}


	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchLookCustomerList();
	}

	//查看页面开关
	switchLookCustomerList=() => {
      	State.switchLookCustomerList();
	}
	//客户编辑页面开关
	switchEditCustomerList=() => {
		State.switchEditCustomerList();
	}
	//新增拜访记录的开关
	switchCustomerIndent = () =>{
		State.switchCustomerIndent();
	}
    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	State.switchLookCustomerList();
      }
    }
	//新建提交按钮
	onNewMerchants=(params)=>{

	}
	//高级查询
	openSearchUpperDialog=()=>{
      State.searchUpperCustomer();
	}
	//导出
	onExport=(value)=>{
	    State.exportData(value);	
	}

	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}
    
	render(){
		let {dataReady,searchParams}=this.props;
		return(

      <div className="m-merchants" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
	        <Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left'}}
					   >
						<Button
								label="新建客户"
								type='button'
								onTouchTap={this.switchNewMerchants}
						/>
					  </Col>

			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	        </Row>

            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            exportSwitch={true}
	            onExport={this.onExport}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='personalCustomers'
	            ajaxFieldListName="list"
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>意向城市</TableHeaderColumn>
		              <TableHeaderColumn>意向社区</TableHeaderColumn>
		              <TableHeaderColumn>意向工位数</TableHeaderColumn>
		              <TableHeaderColumn>来源</TableHeaderColumn>
		              <TableHeaderColumn>客户分类</TableHeaderColumn>
		              <TableHeaderColumn>领取人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody >
			              <TableRow displayCheckbox={true}>
			                <TableRowColumn name="customerCompany" ></TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn name="intentionCommunityName"></TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName"></TableRowColumn>
			                <TableRowColumn name="levelName"></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="createDate"></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="查看"  type="operation"  operation="watch" />
			                 </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
           </Table>


					{/*新建*/}
					<Drawer
				        open={State.openNewMerchants}
				        width={700}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:228,zIndex:20}}
			        >
								<NewCustomerList
										onSubmit={this.onNewMerchants}
										onCancel={this.switchNewMerchants}
										dataReady={dataReady}
										come={"2"}
								/>

		           </Drawer>


					{/*查看*/}
					<Drawer
							open={State.openLookMerchants}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
							<LookCustomerList
				                 comeFrom="Merchant"
								 onCancel={this.switchLookCustomerList}
				                 listId={State.listId}
				                 dataReady={dataReady}
				                 editsSwitch={this.switchEditCustomerList}
				                 IndentSwitch={this.switchCustomerIndent}
							/>
					</Drawer>

                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666'}}
					>
						<SearchUpperForm  
						    onCancel={this.openSearchUpperDialog}
						    flag='个人'
						    searchParams={searchParams}
						/>
				    </Dialog>


					{/*
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants
						)&&
							<div className="mask"
								onClick={this.closeAllMerchants}
							>
							</div>
					*/}
        </div>
		);
	}

}
export default Personal;
