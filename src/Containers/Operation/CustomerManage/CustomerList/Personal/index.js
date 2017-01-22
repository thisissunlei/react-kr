import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
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
	Drawer,
	Message,
	Tooltip
} from 'kr-ui';

import State from './State';
import StateIn from '../NewVisitIndent/State.js';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import EditCustomerList from "../EditCustomerList";
import NewIndent from "../NewIndent";
import EditIndent from "../EditIndent";
import NewVisitIndent from '../NewVisitIndent';
import SwitchPerson from '../SwitchPerson';
import QuitContinue from './QuitContinue';
import OrderDelete from '../OrderDelete';
import './index.less'
@observer
class Personal extends Component{

	constructor(props,context){
		super(props, context);
		this.state={		
			//选中的数量
			dialogNum:0,
			//加载后的数据
			loadData:[],
			//选中的值
			arrItem:[],
		}
	}


	//新建页面的开关
	switchNewMerchants=()=>{
		Store.dispatch(initialize('NewCustomerList',{hasOffice:'NO'}));
		State.switchNewCustomerList();
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
	}
	//新建订单页面的开关
	switchNewIndent=()=>{
		State.switchNewIndent();
	}
	//打开编辑页
	openEditIndent=(editIndentId)=>{
		var data={};
		var {orderReady}=this.props;
		State.editIndentIdChange(editIndentId);

		data.mainBillId=editIndentId;
		
		var _this=this;
		Store.dispatch(Actions.callAPI('get-simple-order',data)).then(function(response) {
			for(var i=0;i<orderReady.communityCity.length;i++){
				if(orderReady.communityCity[i].communityId==response.communityid){
					response.cityid=orderReady.communityCity[i].cityId;
					State.cityChange(orderReady.communityCity[i].cityName);

					break;
				}
			}
			data.cityid=orderReady.communityCity[i].cityId;
			data.mainbillname=response.mainbillname;
			data.communityid=""+response.communityid;
			data.mainbilltype=response.mainbilltype;
			data.mainbilldesc=response.mainbilldesc;
			Store.dispatch(initialize('EditIndent',data));
			State.orderNameChange(response.mainbillname);

		}).catch(function(err) {
			 Message.error(err.message);
		});
		State.switchEditIndent();

	}

	//编辑订单页面的开关
	switchEditIndent=(data)=>{
		State.switchEditIndent();
	}
	
    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	State.MerchantsListId(itemDetail.id)
      	State.switchLookCustomerList();
      	State.companyNameChange(itemDetail.company);
      	State.companyName=itemDetail.company;
      }
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
			company: params.content,
		}
		State.searchParams=obj
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.initSearch=='p'){
			State.searchParams={
			  time:+new Date(),
			  company:'',
			  page:1,
			  pageSize:15,	 
			}
		 }
	}

    //转移确定
     switchPersonSubmit=(params)=>{
       let {arrItem}=this.state;
       if(!params.receiveId){
       	  return ;
       }
       let switchData={};
       switchData.receiveId=params.receiveId;
       switchData.ids=arrItem; 
       State.switchSureSubmit(switchData);
    }
	//高级查询
	openSearchUpperDialog=()=>{
	  State.searchParams.company='';
      State.searchParams.createEndDate='';
      State.searchParams.createStartDate='';
      State.searchParams.intentionCityId='';
      State.searchParams.intentionCommunityId='';
      State.searchParams.levelId='';
      State.searchParams.sourceId='';
      State.searchUpperCustomer();
	}
	//高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({}, State.searchParams, searchParams);
      	searchParams.time=+new Date();
		if(searchParams.createStartDate!=''&&searchParams.createEndDate!=''&&searchParams.createEndDate<searchParams.createStartDate){
			 Message.error('开始时间不能大于结束时间');
	         return ;
		}
		if(searchParams.createStartDate==''&&searchParams.createEndDate!=''){
			searchParams.createStartDate=searchParams.createEndDate
		}
		if(searchParams.createStartDate!=''&&searchParams.createEndDate==''){
			searchParams.createEndDate=searchParams.createStartDate
		}
      	State.searchParams=searchParams;
      	State.searchUpperCustomer();
     }
	//导出
	onExport=(value)=>{
	    State.exportData(value);	
	}

	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}

	//转移客户
	openSwitchDialog=()=>{
		State.openSwitchGoDialog();
	}
	//取消客户跟进
	openQuitDialog=()=>{
        State.openQuitContinue();
	}
	//取消跟进确定
	quitContinueSubmit=()=>{
		let {arrItem}=this.state;
		State.quitSubmit(arrItem);
	}
	//订单删除
     openDeleteDialog=()=>{
     	State.openDeleteOrder();
     }

    
	render(){
		let {dataReady,searchParams,orderReady}=this.props;
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

      <div className="m-personal" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <div style={{marginRight:20,display:'inline-block'}}><Button  label="转移" type="button" onTouchTap={this.openSwitchDialog}/></div>
      		  <Button  label="取消跟进" type="button" cancle={true} style={{height:29,minWidth:80}} onTouchTap={this.openQuitDialog}/>
      		  <span className='mer-close' onClick={this.merClose}></span>
      		</div>
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
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' inputName='per' onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            ajaxUrlName='personalCustomers'
	            ajaxFieldListName="items"
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
			                <TableRowColumn name="company"  component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn name="intentionCommunityName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="levelName" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="createDate" type='date' format="yyyy-mm-dd HH:MM:ss" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:120,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
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
				        width={750}
				        openSecondary={true}
				        className='m-finance-drawer'
				        containerStyle={{top:60,paddingBottom:228,zIndex:20}}
			        >
								<NewCustomerList
										onSubmit={this.onNewMerchants}
										onCancel={this.switchNewMerchants}
										dataReady={dataReady}
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
				                 comeFrom="Personal"
				                 companyName={State.companyName}
								 onCancel={this.switchLookCustomerList}
				                 listId={State.listId}
				                 dataReady={dataReady}
				                 editsSwitch={this.switchEditCustomerList}
				                 IndentSwitch={this.switchCustomerIndent}
				                 newIndentSwitch={this.openNewIndent}
				                 editIndentSwitch={this.openEditIndent}
				                 DeleteSwitch={this.openDeleteDialog}
							/>
					</Drawer>

					{/*编辑*/}
					<Drawer
							open={State.openEditCustomerList}
							width={750}

							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<EditCustomerList
			                 comeFrom="Merchant"
							 onCancel={this.switchEditCustomerList}
			                 listId={State.listId}
			                 dataReady={dataReady}
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
			                 orderName={State.orderName}
						/>
					</Drawer>
					

					{/*编辑订单*/}
					<Drawer
							open={State.openEditIndent}
							width={750}
							openSecondary={true}
							className='m-finance-drawer'
							listId={State.listId}
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<EditIndent
							 companyName={State.companyName}
							 onCancel={this.switchEditIndent}
							 listId={State.listId}
			                 orderReady={orderReady}
			                 editIndentData={State.editIndentData}
			                 editIndentId={State.editIndentId}
			                 orderName={State.orderName}
			                 cityname={State.cityname}
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
			                 companyName={State.companyName}
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
						    flag='个人'
						    searchParams={searchParams}
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

				     {/*取消跟进*/}
                    <Dialog
						title="取消客户跟进"
						modal={true}
						onClose={this.openQuitDialog}
						open={State.openQuit}
						contentStyle ={{ width: '445',height:'230'}}
					>
						<QuitContinue 
						  onSubmit={this.quitContinueSubmit} 
						  onCancel={this.openQuitDialog}
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
						   orderId='1'
						 />
				    </Dialog>
 



					{
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants||
							State.openEditCustomerList||
							State.openNewCustomerIndent||
							State.openNewIndent||
							State.openEditIndent
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
export default Personal;
