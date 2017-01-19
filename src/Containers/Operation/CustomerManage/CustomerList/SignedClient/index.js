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
import StateIn from '../NewVisitIndent/State.js';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import SwitchPerson from '../SwitchPerson';
import './index.less'
@observer
class SignedClient extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{
				page:1,
				pageSize:15
			},
			//选中的数量
			dialogNum:0,
			//加载后的数据
			loadData:[],
			//选中的值
			arrItem:[]
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

	 //选中几项领取，转移等
    onSelect=(value)=>{
    	var arrItem=[]
    	let {loadData}=this.state;
        for(var i=0;i<value.length;i++){
        	var allId=value[i];
        	arrItem.push(loadData[allId].id)
        }
      if(value.length>0){
      	State.openPersonDialog=true;
        this.setState({
         dialogNum:value.length,
         arrItem
        })	
      }else{
        State.openPersonDialog=false;
      }
    }

    //加载所有数据
    onLoaded=(value)=>{
       let loadData = value.items;
	   this.setState({
			 loadData
		 })
    }

    //领取浮框的关闭
    merClose=()=>{
       State.openPersonDialog=false; 	
    }

	//搜索
	onSearchSubmit=(params)=>{
        let obj = {
			company:params.content,
		}
		this.setState({
			searchParams: obj
		});
	}

	//高级查询
	openSearchUpperDialog=()=>{
	  let {searchParams}=this.state;
	  searchParams.company='';
      searchParams.cityId='';
      searchParams.communityId='';
      searchParams.signEndDate='';
      searchParams.signStartDate='';
      State.searchUpperCustomer();
	}

	//高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({}, this.state.searchParams, searchParams);
      	searchParams.time=+new Date();
		if(searchParams.signStartDate!=''&&searchParams.signEndDate!=''&&searchParams.signEndDate<searchParams.signStartDate){
			 Message.error('开始时间不能大于结束时间');
	         return ;
		}
		if(searchParams.signStartDate==''&&searchParams.signEndDate!=''){
			searchParams.signStartDate=searchParams.signEndDate
		}
		if(searchParams.signStartDate!=''&&searchParams.signEndDate==''){
			searchParams.signEndDate=searchParams.signStartDate
		}
      	this.setState({
      	  searchParams
      	})
      	State.searchUpperCustomer();
     }
     //转移客户
	openSwitchDialog=()=>{
		State.openSwitchGoDialog();
	}
	//转移确定
     switchPersonSubmit=(params)=>{
       let {arrItem}=this.state;
       var switchData={
         receiveId:params.receiveId,
         ids:arrItem
       }
       State.switchSureSubmit(switchData);
    }

	//导出
	onExport=(value)=>{
	    State.exportData(value);	
	}

	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}

	render(){

     
       let {searchSignParams,dataReady}=this.props; 
        
       var blockStyle={};
      if(State.openPersonDialog==true){
        blockStyle={
        	display:'inline-block'
        }
      }else{
      	blockStyle={
        	display:'none'
        }
      }

		return(
      <div className="m-signed" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <Button  label="转移" type="button" onTouchTap={this.openSwitchDialog}/>
      		  <span className='mer-close' onClick={this.merClose}></span>
      		</div>
	        <Row style={{marginBottom:21}}>
			         
			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' inputName='sign' onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            onSelect={this.onSelect}
	            onLoaded={this.onLoaded}
	            onExport={this.onExport}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='signCustomers'
	            ajaxFieldListName="items"
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
			                <TableRowColumn name="unBackamount" style={{color:'#ff6868'}}></TableRowColumn>
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
										come={"3"}
								/>

		           </Drawer>



					{/*查看*/}
					<Drawer
							open={State.openLookMerchants}
							width={700}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
								<LookCustomerList
									comeFrom="Merchant"
									onCancel={this.switchLookCustomerList}
					                listId={State.listId}
					                dataReady={dataReady}
										
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
						    onSubmit={this.onSearchUpperSubmit}
						    flag='签约'
						    searchSignParams={searchSignParams}
						/>
				    </Dialog>

				    {/*转移*/}
                    <Dialog
						title="转移客户"
						modal={true}
						onClose={this.openSwitchDialog}
						open={State.openSwitch}
						contentStyle ={{ width: '444',height:'284'}}
					>
						<SwitchPerson 
						  onSubmit={this.switchPersonSubmit}
						  onCancel={this.openSwitchDialog}
						  customerIds={this.state.dialogNum}
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
