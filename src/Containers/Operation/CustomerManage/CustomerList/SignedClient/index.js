import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';

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
    Tooltip,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Message
} from 'kr-ui';

import State from './State';
import StateIn from '../NewVisitIndent/State.js';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import LookCustomerState from '../LookCustomerList/State';
import SearchUpperForm from '../SearchUpperForm';
import EditCustomerList from "../EditCustomerList";
import NewIndent from "../NewIndent";
import EditIndent from "../EditIndent";
import NewVisitIndent from '../NewVisitIndent';
import editsourceCustomer from "../EditCustomerList/State";
import SwitchPerson from '../SwitchPerson';
import OrderDelete from '../OrderDelete';
import editIndentState from "../EditIndent/State";
import newIndentState from "../NewIndent/State";

import './index.less'
@observer
class SignedClient extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			//选中的数量
			dialogNum:0,
			//加载后的数据
			loadData:[],
			//选中的值
			arrItem:[]
		}
	}


	//查看页面开关
	switchLookCustomerList=() => {
      	State.switchLookCustomerList();
	}
	
    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	LookCustomerState.orderList(itemDetail.id);
      	State.switchLookCustomerList();
      	State.MerchantsListId(itemDetail.id)
      	State.companyName=itemDetail.company;
      }
    }
    //客户编辑页面开关
	switchEditCustomerList=() => {
		State.switchEditCustomerList();
	}
	//新增拜访记录的开关
	switchCustomerIndent = () =>{
		   Store.dispatch(change('NewVisitIndent','customerId',State.listId));
		   Store.dispatch(change('NewVisitIndent','visitType',''));
           Store.dispatch(change('NewVisitIndent','visitTime',''));
           Store.dispatch(change('NewVisitIndent','isContinue','YES'));
           Store.dispatch(change('NewVisitIndent','linkName',''));
           Store.dispatch(change('NewVisitIndent','linkTel',''));
           Store.dispatch(change('NewVisitIndent','visitDetail',''));
           Store.dispatch(change('NewVisitIndent','levelId',''));
           Store.dispatch(change('NewVisitIndent','remark',''));
           Store.dispatch(change('NewVisitIndent','reasonId',''));
           Store.dispatch(change('NewVisitIndent','reasonOther',''));
        StateIn.noShowMatureTime();
        StateIn.noShowOtherContinue();
		State.switchCustomerIndent();
	}

	//打开新建订单页
	openNewIndent=()=>{
		Store.dispatch(initialize('NewIndent',{}));
		State.orderNameInit(State.listId);
		State.switchNewIndent();
		newIndentState.cityLable="";
	}
	
	//新建订单页面的开关
	switchNewIndent=()=>{
		State.switchNewIndent();
	}
	openEditCustomerList=()=>{
		let listId=State.listId;
		Store.dispatch(Actions.callAPI('get-edit-info',{id:listId})).then(function(response) {
			Store.dispatch(initialize('EditCustomerList',response));
			if(!response.countyName){
				State.editCity=`${response.provinceName}/${response.cityName}`
			}else if(!response.countyName&&!response.cityName&&!response.countyName){
				State.editCity="";
			}else{
				State.editCity=`${response.provinceName}/${response.cityName}/${response.countyName}`
			}
			 if(response.sourceName.indexOf("介绍")!=-1){

			 	editsourceCustomer.sourceCustomer=true;
			}else{
			 	editsourceCustomer.sourceCustomer=false;
			}
			if(!response){
				return;
			}
			if(response.hasOffice=="YES"){
				State.hasOfficeChange(true);
			}else{
				State.hasOfficeChange(false);
			}
			State.editprojectName=response.projectCategoryName;
		}).catch(function(err) {
			
		});
		State.switchEditCustomerList();
	}
	//编辑订单页面的开关
	switchEditIndent=()=>{
		State.switchEditIndent();
	}

	//打开订单编辑页
	openEditIndent=(editIndentId)=>{
		var data={};
		var {orderReady}=this.props;
		State.editIndentIdChange(editIndentId);

		data.mainBillId=editIndentId;
		editIndentState.orderName="";
		
		var _this=this;
		Store.dispatch(Actions.callAPI('get-simple-order',data)).then(function(response) {
			for(var i=0;i<orderReady.communityCity.length;i++){
				if(orderReady.communityCity[i].communityId==response.communityid){
					response.cityid=orderReady.communityCity[i].cityId;
					State.editIndentState=orderReady.communityCity[i].cityName;

					break;
				}
			}
			data.cityid=orderReady.communityCity[i].cityId;
			data.mainbillname=response.mainbillname;
			data.communityid=""+response.communityid;
			data.mainbilltype=response.mainbilltype;
			data.mainbilldesc=response.mainbilldesc;
			Store.dispatch(initialize('EditIndent',data));
			State.mainbillname=response.mainbillname;
			State.customerName=response.customerName;
			State.orderCount=response.orderCount;

		}).catch(function(err) {
			 Message.error(err.message);
		});
		State.switchEditIndent();

	}


	//订单删除
     openDeleteDialog=()=>{
     	State.openDeleteOrder();
     }


	 //选中几项领取，转移等
    onSelect=(value)=>{
    	var arrItem=[]
    	let {loadData}=this.state;
    	if(loadData.length>15){
           value=value.splice(0,15);
    	}
    	if(loadData.length<=15){
    	   value=value.splice(0,loadData.length);
    	}
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
		
		State.searchParams=obj
		
	}
	componentWillReceiveProps(nextProps){
		State.openPersonDialog=false;
		if(nextProps.initSearch=='s'){
			State.searchParams={
			  time:+new Date(),
			  company:'',
			  page:1,
			}
		}
	}

	//高级查询
	openSearchUpperDialog=()=>{
	  State.searchParams.company='';
      State.searchParams.cityId='';
      State.searchParams.communityId='';
      State.searchParams.signEndDate='';
      State.searchParams.signStartDate='';
      State.searchUpperCustomer();
	}

	//高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({}, State.searchParams, searchParams);
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
      	  State.searchParams=searchParams;
      	State.searchUpperCustomer();
     }
     //转移客户
	openSwitchDialog=()=>{
		State.openSwitchGoDialog();
	}
	//转移确定
     switchPersonSubmit=(params)=>{
       let {arrItem}=this.state;
       if(!params.receiveId){
       	  return ;
       }
       var switchData={
         receiveId:params.receiveId,
         ids:arrItem,
         operType:'SIGN'
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
       
     
       let {searchSignParams,dataReady,orderReady}=this.props; 
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
      		<Title value="客户列表"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <Button  label="转移" type="button" onTouchTap={this.openSwitchDialog}/>
      		  <span className='mer-close' onClick={this.merClose}></span>
      		</div>
	        <Row style={{marginBottom:21}}>
			         
			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入公司名称' inputName='sign' onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            ajaxParams={State.searchParams}
	            ajaxUrlName='signCustomers'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>签约城市</TableHeaderColumn>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>订单总额</TableHeaderColumn>
		              <TableHeaderColumn>已回款额</TableHeaderColumn>
		              <TableHeaderColumn>未回款额</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>

		          	</TableHeader>

			        <TableBody >
			              <TableRow >
			                <TableRowColumn name="signCityName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="company" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
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
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
								<LookCustomerList
									comeFrom="SignedClient"
									companyName={State.companyName}
									onCancel={this.switchLookCustomerList}
					                listId={State.listId}
					                dataReady={dataReady}
				                 	editsSwitch={this.openEditCustomerList}
				                 	IndentSwitch={this.switchCustomerIndent}
				                 	newIndentSwitch={this.openNewIndent}
				                	editIndentSwitch={this.openEditIndent}
				                 	DeleteSwitch={this.openDeleteDialog}
									operType="SIGN"								
								/>
					</Drawer>

					{/*编辑*/}
					<Drawer
							open={State.openEditCustomerList}
							width={750}
							operType="SIGN"	
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<EditCustomerList
			                comeFrom="Merchant"
							 onCancel={this.switchEditCustomerList}
			                 listId={State.listId}
			                 dataReady={dataReady}
				             operType="SIGN"
			                 hasOffice={State.ishasOffice}
			                 cityName={State.editCity}
			                 listValue={State.editprojectName}
						/>
					</Drawer>

					{/*新建订单*/}
					<Drawer
							open={State.openNewIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<NewIndent
							 companyName={State.companyName}
							 onCancel={this.switchNewIndent}
			                 orderReady={orderReady}
			                 listId={State.listId}
			                 customerName={State.customerName}
			                 orderCount={State.orderCount}
			                 isOpenIndent={State.orderName}

						/>
					</Drawer>

					{/*新增拜访记录*/}
					<Drawer
							open={State.openNewCustomerIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<NewVisitIndent
			                 comeFrom="Merchant"
							 onCancel={this.switchCustomerIndent}
			                 listId={State.listId}
			                 selectDatas={dataReady}
			                 operType="SIGN"	
			                 companyName={State.companyName}
						/>
					</Drawer>

					{/*编辑订单*/}
					<Drawer
							open={State.openEditIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<EditIndent
							 companyName={State.companyName}
							 onCancel={this.switchEditIndent}
							 listId={State.listId}
			                 orderReady={orderReady}
			                 editIndentData={State.editIndentData}
			                 editIndentId={State.editIndentId}
			                 customerName={State.customerName}
			                 orderCount={State.orderCount}
			                 mainbillname={State.mainbillname}
			                 cityName={State.editCity}
			                 listValue={State.editprojectName}
						/>
					</Drawer>

                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666',height:'385px',overflow:'visible'}}
						operType="SIGN"	
					>
						<SearchUpperForm  
						    onCancel={this.openSearchUpperDialog}
						    onSubmit={this.onSearchUpperSubmit}
						    flag='签约'
						    searchSignParams={searchSignParams}
						/>
				    </Dialog>


				    {/*删除*/}
                    <Dialog
						title="提示"
						modal={true}
						onClose={this.openDeleteDialog}
						open={State.openDelete}
						contentStyle ={{ width: '445',height:'230'}}
					>
						<OrderDelete 
						   onCancel={this.openDeleteDialog}
						   orderId={State.deleteId}
				           operType="SIGN"
				           listId={State.listId}
						 />
				    </Dialog>

				    {/*转移*/}
                    <Dialog
						title="转移客户"
						modal={true}
						onClose={this.openSwitchDialog}
						open={State.openSwitch}
						contentStyle ={{ width: '444',height:'284',overflow:'visible'}}
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
