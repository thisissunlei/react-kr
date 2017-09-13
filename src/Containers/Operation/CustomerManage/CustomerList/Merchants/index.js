import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
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
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message,
	CheckPermission
} from 'kr-ui';
import $ from 'jquery';
import {DateFormat} from "kr/Utils";
import State from './State';
import editsourceCustomer from "../EditCustomerList/State";
import StateIn from '../NewVisitIndent/State.js';
import NewCustomerList from '../NewCustomerList';
import SearchUpperForm from '../SearchUpperForm';
import EditCustomerList from "../EditCustomerList";
import NewVisitIndent from '../NewVisitIndent';
import CatchMerchants from './CatchMerchants';
import treeData from "../../../../../Components/KrField/TreeComponent/State";
import cityData from "../../../../../Components/KrField/CityComponent/State";
import './index.less';
import {
	LookCustomerList
} from 'kr/PureComponents';
import {
	observer,
	inject
} from 'mobx-react';
@inject("CommunityDetailModel")
@observer
class Merchants extends Component{

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
	//新建页面的开关
	opNewMerchants=()=>{
		 State.switchNewCustomerList();
		 treeData.listValue="请选择项目类型";
		 cityData.city="请选择";
	}
	//新建页面的开关
	switchNewMerchants= (params) => {
		State.switchNewCustomerList();
	}

	//查看页面开关
	switchLookCustomerList=() => {
      	State.switchLookCustomerList();
	}


	openEditCustomerList=()=>{
		let listId=State.listId;
		let {CommunityDetailModel} = this.props;

		Http.request('get-edit-info',{id:listId}).then(function(response) {

			Store.dispatch(initialize('EditCustomerList',response));
			CommunityDetailModel.recommendName = response.recommendName;
			if(!response.countyName){
				State.editCity=`${response.provinceName}/${response.cityName}`
			}else if(!response.countyName&&!response.cityName&&!response.countyName){
				State.editCity="";
			}else{
				State.editCity=`${response.provinceName}/${response.cityName}/${response.countyName}`
			}
			State.editprojectName=response.projectCategoryName;
			 if(response.sourceName.indexOf("推荐")!=-1){

			 	editsourceCustomer.sourceCustomer=true;
			}else{
			 	editsourceCustomer.sourceCustomer=false;
			}
			if(response.sourceName == '内部推荐'){
				editsourceCustomer.sourceCustomer = false;
				editsourceCustomer.selecting = true;
			}else{
				editsourceCustomer.selecting = false;
			}
			if(!response){
				return;
			}
			if(response.hasOffice=="YES"){
				State.hasOfficeChange(true);
			}else{
				State.hasOfficeChange(false);
			}
			State.switchEditCustomerList();
			State.allData = response;

		}).catch(function(err) {
			Message.error(err.message);
		});

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
      	this.props.CommunityDetailModel.lookListId(State.listId,"SHARE");
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
		State.searchParams=obj
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.initSearch=='m'){
			State.openDialog=false;
			State.searchParams={
			 time:+new Date(),
			 company:'',
			 page:1,
			}
		}
	}
	//

	openNewIndent = () =>{

	}

	openEditIndent = () =>{

	}
	openDeleteDialog = () => {

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
     	searchParams = Object.assign({},State.searchParams, searchParams);
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
		  searchParams.page = 1;
      	  State.searchParams=searchParams;

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

	pageChange = (page) =>{
		var searchParams = Object.assign({}, State.searchParams);
		searchParams.page = page;
		State.searchParams = searchParams;
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
			<Title value="客户列表"/>
			<CheckPermission  operateCode="oper_csr_receive" >

				<div className='merchants-dialog' style={blockStyle}>
					<div className='selectCheck'>已选中<span className='dialog-number'>{this.state.dialogNum}</span>项</div>
					<Button  label="领取" type="button" onTouchTap={this.openCatchDialog}/>
					<span className='mer-close' onClick={this.merClose}></span>
				</div>
			</CheckPermission>

	        <Row style={{marginBottom:21}}>
			          <Col
					     align="left"
					     style={{float:'left'}}
					   >

									<Button
											label="新建客户"
											type='button'
											onTouchTap={this.opNewMerchants}
											operateCode="oper_csr_add"
									/>

					  </Col>

			          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入公司名称' inputName='mr' onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>
	        </Row>


            <Table
			    style={{marginTop:8}}
                ajax={true}
                onOperation={this.onOperation}
	            displayCheckbox={true}
	            onSelect={this.onSelect}
	            onLoaded={this.onLoaded}
	            ajaxParams={State.searchParams}
	            ajaxUrlName='shareCustomers'
	            ajaxFieldListName="items"
				onPageChange = {this.pageChange}
					  >
		            <TableHeader>
		              <TableHeaderColumn>公司名称</TableHeaderColumn>
		              <TableHeaderColumn>意向城市</TableHeaderColumn>
		              <TableHeaderColumn>意向社区</TableHeaderColumn>
		              <TableHeaderColumn>意向工位数</TableHeaderColumn>
		              <TableHeaderColumn>来源</TableHeaderColumn>
		              <TableHeaderColumn>联系人</TableHeaderColumn>
									<TableHeaderColumn>联系人手机号</TableHeaderColumn>
		              <TableHeaderColumn>身份证号</TableHeaderColumn>
		              <TableHeaderColumn>领取人</TableHeaderColumn>
		              <TableHeaderColumn>创建时间</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>


		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="company"
								component={(value,oldValue)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="inline-block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
								}} >
							</TableRowColumn>
			                <TableRowColumn name="intentionCityName" ></TableRowColumn>
			                <TableRowColumn
								name="intentionCommunityName"
								component={(value,oldValue)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="inline-block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
								}} >
							</TableRowColumn>
			                <TableRowColumn name="stationNum"></TableRowColumn>
			                <TableRowColumn name="sourceName"
								component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="inline-block";
									}
										return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
									}}>
							</TableRowColumn>
							{/*联系人*/}
			                <TableRowColumn name="name" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
							{/*联系人电话*/}
							<TableRowColumn name="tel" component={(value,oldValue)=>{
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
											<TableRowColumn
												name="idCard"
												style = {{wordWrap:'break-word',whiteSpace:'normal'}}
											></TableRowColumn>
			                <TableRowColumn name="receiveName"></TableRowColumn>
			                <TableRowColumn name="createDate" type='date' component={(value,oldValue)=>{
						                				let show="inline-block";
						                				if(value.length==0){
						                					show="none";
						                				}else{
						                					show="inline-block";
						                				}
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
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
				        containerStyle={{top:60,paddingBottom:48,zIndex:20}}
			        >
						<NewCustomerList
								onSubmit={this.onNewMerchants}
								onCancel={this.switchNewMerchants}
								dataReady={dataReady}
								open={State.openNewMerchants}
								come={"1"}
								operType="SHARE"
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
				                 operType="SHARE"
				                 companyName={State.companyName}
								 			 	 onCancel={this.switchLookCustomerList}
				                 listId={State.listId}
				                 dataReady={dataReady}
				                 editsSwitch={this.openEditCustomerList}
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
				            operType="SHARE"
							openSecondary={true}
							className='m-finance-drawer'
							containerStyle={{top:60,paddingBottom:48,zIndex:20}}

					 >
						<EditCustomerList
			                 comeFrom="Merchant"
							 onCancel={this.switchEditCustomerList}
			                 listId={State.listId}
			                 dataReady={dataReady}
			                 operType="SHARE"
			                 hasOffice={State.ishasOffice}
			                 cityName={State.editCity}
			                 listValue={State.editprojectName}
							 allData = {State.allData}

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
			                 open={State.openNewCustomerIndent}
							 			 	 onCancel={this.switchCustomerIndent}
			                 listId={State.listId}
			                 operType="SHARE"
			                 selectDatas={dataReady}
			                 companyName={State.companyName}
						/>
					</Drawer>


                    {/*高级查询*/}
                    <Dialog
						title="高级查询"
						operType="SHARE"
						modal={true}
						onClose={this.openSearchUpperDialog}
						open={State.openSearchUpper}
						contentStyle ={{ width: '666',height:'476px',overflow:'visible'}}
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
							<div className="mask" style={{right:750}}
								onClick={this.closeAllMerchants}
							>
							</div>
					}
        </div>
		);
	}

}
export default Merchants;
