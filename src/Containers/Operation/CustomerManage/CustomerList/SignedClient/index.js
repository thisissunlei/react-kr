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
import './index.less'
@observer
class SignedClient extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{}
		}
	}


	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchNewCustomerList();
	}
	//新建页面的开关
	switchNewMerchants=()=>{
		State.switchNewCustomerList();
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

	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}

	render(){
     
       let {searchSignParams}=this.props; 

		return(
      <div className="m-merchants" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
	        <Row style={{marginBottom:21}}>
			         
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
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='signCustomers'
	            ajaxFieldListName="list"
					  >
		            <TableHeader>
		              <TableHeaderColumn>所属城市</TableHeaderColumn>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>订单总额</TableHeaderColumn>
		              <TableHeaderColumn>已回款额</TableHeaderColumn>
		              <TableHeaderColumn>未回款额</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody >
			              <TableRow >
			                <TableRowColumn name="signCityName" ></TableRowColumn>
			                <TableRowColumn name="customerCompany" ></TableRowColumn>
			                <TableRowColumn name="contractTotalamount"></TableRowColumn>
			                <TableRowColumn name="contractBackamount"></TableRowColumn>
			                <TableRowColumn name="unBackamount"></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="查看"  type="operation"  operation="watch" />
			                 </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
           </Table>


					


					{/*查看*/}
					<Drawer
							open={State.openLookMerchants}
							width={700}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
								<LookCustomerList
										
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
						    flag='签约'
						    searchSignParams={searchSignParams}
						/>
				    </Dialog>


					{
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants
						)&&
							<div className="mask"
								onClick={this.closeAllMerchants}
							>
							</div>
					}
        </div>
		);
	}

}

export default SignedClient;
