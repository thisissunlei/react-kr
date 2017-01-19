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
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message
} from 'kr-ui';
import State from './State';
import StateIn from '../NewVisitIndent/State.js';
import NewCustomerList from '../NewCustomerList';
import LookCustomerList from '../LookCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import EditCustomerList from "../EditCustomerList";
import NewVisitIndent from '../NewVisitIndent';
import CatchMerchants from './CatchMerchants';
import './index.less';
@observer
class Merchants extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams:{
				page:1,
				pageSize:15,
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
	switchNewMerchants= (params) => {
		
		Store.dispatch(initialize('NewCustomerList',{}));
		State.switchNewCustomerList();

	}

	//查看页面开关
	switchLookCustomerList=() => {
      	State.switchLookCustomerList();
	}


	openEditCustomerList=()=>{
		let listId=State.listId;
		
		Store.dispatch(Actions.callAPI('get-edit-info',{id:listId})).then(function(response) {
			console.log(response,"Lllllll")
			Store.dispatch(initialize('EditCustomerList',response));
			
		}).catch(function(err) {
			
		});
		State.switchEditCustomerList();
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

    
    //选中几项领取，转移等
    onSelect=(value)=>{
        var value=Array.prototype.slice.call(value);
    	var arrItem=[]
    	let {loadData}=this.state;
        for(var i=0;i<value.length;i++){
        	var allId=value[i];
        	arrItem.push(loadData[allId].id)
        }

      if(value.length>0){
      	State.openDialog=true;	
        this.setState({
         dialogNum:value.length,
         arrItem
        })	
      }else{
      	State.openDialog=false;	
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
        State.openDialog=false;	
    }
    //查看相关操作
    onOperation=(type, itemDetail)=>{
      if(type=='watch'){
      	State.MerchantsListId(itemDetail.id);
      	State.switchLookCustomerList();
      	State.companyName=itemDetail.company;
      }
    }
	//新建提交按钮
	onNewMerchants=(params)=>{
		switchNewMerchants(params);
	}
	
	//搜索
	onSearchSubmit=(params)=>{
        let obj = {
			company: params.content,
		}
		this.setState({
			searchParams: obj
		});
	}

	//高级查询
	openSearchUpperDialog=()=>{
	  let {searchParams}=this.state;
      searchParams.company='';
      searchParams.createEndDate='';
      searchParams.createStartDate='';
      searchParams.intentionCityId='';
      searchParams.intentionCommunityId='';
      searchParams.levelId='';
      searchParams.sourceId='';
      State.searchUpperCustomer();
	}
    //高级查询提交
     onSearchUpperSubmit=(searchParams)=>{
     	searchParams = Object.assign({}, this.state.searchParams, searchParams);
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
      	this.setState({
      	  searchParams
      	})
      	State.searchUpperCustomer();
     }

     //领取开关
     openCatchDialog=()=>{
     	State.openCatchGoDialog();
     }
     //领取确定
     catchGoSubmit=()=>{
     	let {arrItem}=this.state;
     	State.catchSubmit(arrItem);
     }

     
	closeAllMerchants=()=>{
		State.closeAllMerchants();
	}


	render(){
      let {dataReady,searchParams}=this.props;

      var blockStyle={};
      if(State.openDialog==true){
        blockStyle={
        	display:'inline-block'
        }
      }else{
      	blockStyle={
        	display:'none'
        }
      }

      
		return(
      <div className="m-merchants" style={{paddingTop:25}}>
      		<Title value="运营平台"/>
      		<div className='merchants-dialog' style={blockStyle}>
      		  <div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
      		  <Button  label="领取" type="button" onTouchTap={this.openCatchDialog}/>
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
				            <ListGroupItem><SearchForms placeholder='请输入客户名称' onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	        </Row>

	        {/*<div onClick={this.openDeleteDialog}>123</div>*/}

            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            onSelect={this.onSelect}
	            onLoaded={this.onLoaded}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='shareCustomers'
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
			              <TableRow>
			                <TableRowColumn name="company" component={(value,oldValue)=>{
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
			                <TableRowColumn name="createDate" type='date' format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>
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
								come={"1"}
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
				                 editsSwitch={this.openEditCustomerList}
				                 IndentSwitch={this.switchCustomerIndent}
				                 
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

				    {/*新增拜访记录*/}
					<Drawer
							open={State.openNewCustomerIndent}
							width={650}
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:228,zIndex:20}}
					 >
						<NewVisitIndent
			                 comeFrom="Merchant"
			                 open={State.openNewCustomerIndent}
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
						    flag='招商'
						    searchParams={searchParams}
						/>
				    </Dialog>

				    {/*领取*/}
                    <Dialog
						title="提示"
						modal={true}
						onClose={this.openCatchDialog}
						open={State.openCatch}
						contentStyle ={{ width: '445',height:'230'}}
					>
						<CatchMerchants 
						  onSubmit={this.catchGoSubmit} 
						  onCancel={this.openCatchDialog}
						  customerIds={this.state.dialogNum}
						  />
				    </Dialog>


				   

					{
						(State.openNewMerchants||
							State.openEditMerchants||
							State.openLookMerchants||
							State.openEditCustomerList||
							State.openNewCustomerIndent
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
export default Merchants;
