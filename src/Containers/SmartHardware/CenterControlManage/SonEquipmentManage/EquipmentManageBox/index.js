

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	FieldArray,
	change
} from 'redux-form';
import {
	Message,Dialog,Button,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,Drawer,Grid,Row,
	ListGroup,ListGroupItem,SearchForms,FontIcon,
	Dropdown,
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

import EquipmentDetail from './EquipmentDetail';
import NewCreate from './NewCreate';
import EditForm from './EditForm';
import EquipmentFind from './EquipmentFind';
import EquipmentSearchForm from './EquipmentSearchForm';
import EquipmentCache from './EquipmentCache';
import PsdList from './PsdList';
import PasswordCode from './PasswordCode';
import BtnBox from './BtnBox';
import EquipmentFirstDetail from './EquipmentFirstDetail';
import HttpTokenDialog from './HttpTokenDialog';

@inject("NavModel")
@observer


export default class EquipmentManageBox  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
			openMenu :false,
			itemDetail : {}
		}
	}


	componentDidMount() {

		State.getDicList();
		

	}

	componentWillMount(){
		var paramId =this.getUrlParam();
		// console.log("paramId",paramId)
		State.refreshList(paramId);

	}


	getUrlParam=()=>{
		var hashStr = window.location.hash;
		var hashArr = hashStr.split("/");
		var param = hashArr.pop()
		return param
	}


	freshPageThis=()=>{
		State.freshPageReturn();
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		this.setState({
			itemDetail
		});
		if (type == 'delete') {

			this.closeConfirmDeleteFun();
			
		}
		if (type == 'edit') {
			
			this.openEditDialogFun();
		}
		
	}




	seeDetailInfoFun=(value)=>{
		let _this = this;
		Http.request('SonEquipmentDetail',{id:value.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				State.openHardwareDetail = true;
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		State.deviceVO = State.itemDetail.deviceVO;
	}



	closeAll=()=>{
		State.openHardwareDetail = false;
	}

	onSelcet=(result,selectedListData)=>{
		var ids=[];
		for(var i=0;i<selectedListData.length;i++){
			ids.push(selectedListData[i].id);
		}
		this.setState({
			selectIds:ids
		})
	}

	//打开新建
	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}
	//打开确认删除
	closeConfirmDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}
	//打开查看二代详情
	openSeeDetailSecond=()=>{
		State.openHardwareDetail = !State.openHardwareDetail;
	}

	//打开查看一代详情
	openFirstHardwareDetailFun=()=>{
		State.openFirstHardwareDetail = !State.openFirstHardwareDetail;
	}
	
	//打开编辑
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}
	//打开设备搜索
	openSearchEquipmentFun=()=>{
		State.openSearchEquipment = !State.openSearchEquipment;
	}


	openSearchEquipmentList=()=>{
		this.openSearchEquipmentFun();
	}
	//确认删除
	confirmDelete=()=>{

		this.closeConfirmDeleteFun();
		State.selectedDeleteIds = this.state.itemDetail.id;
		State.deleteEquipmentSingle();

	}

	

	onPageChangeFun=(page)=>{

		State.realPage =page;
	}

	openEquipmentsearchDialogFun=()=>{

		State.openSearchDialog = !State.openSearchDialog;
	}

	//断开重连提示窗口
	openConnectAgianFun=()=>{
		State.openConnectAgian = !State.openConnectAgian;
	}


	showMoreOpretion=(thisP,value,itemData)=>{
		State.deviceVO = thisP.deviceVO
		this.showOpretionFun();
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP
		})
	}

	showOpretionFun=()=>{
		State.showOpretion = !State.showOpretion;
	}




	passwordDialogFun=()=>{
		State.passwordDialog = !State.passwordDialog;
	}


	confirmConnnetAgain=()=>{
		State.disConnectAction();
		State.openConnectAgian =false;
	}

	//确认刷新h5页面
	confirmFreshHTML=()=>{
		State.confirmFreshHTMLAction();
		this.openFreshHTMLDialogFun();
	}

		//刷新H5页面窗口
	openFreshHTMLDialogFun=()=>{
		State.openFreshHTMLDialog = !State.openFreshHTMLDialog;
	}


	editList=(thisP,value,itemData)=>{
		let _this = this;
		Http.request('getEditEquipmentUrl',{id:thisP.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				_this.openEditDialogFun();
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	deleteList=(thisP,value,itemData)=>{
		this.setState({
			itemDetail:thisP
		});
		this.closeConfirmDeleteFun();
	}

	//恢复出厂设置提示窗口
	resetEquipmentDialogFun=()=>{
		State.resetEquipmentDialog = !State.resetEquipmentDialog;
	}  

	//确认恢复出厂设置
	confirmResetEquipment=()=>{
		State.confirmResetEquipmentAction();
		this.resetEquipmentDialogFun();
	}






	
	
	//点击批量删除
	deleteSelectEquipment = ()=>{
		if(this.state.selectIds.length == 0){
			Message.error("请选择您要删除的设备");
			return;
		}
		this.deleteSelectEquipmentFun();
	}

	//批量删除提示窗口
	deleteSelectEquipmentFun=()=>{
		State.openConfirmDeleteBatch = !State.openConfirmDeleteBatch
	}

	//批量删除
	confirmDeleteBatch=()=>{
		
		var selectedIdsArr = this.state.selectIds;
		State.selectedDeleteIds = selectedIdsArr.join(",");
		State.deleteEquipmentBatch();
		this.deleteSelectEquipmentFun();
	}

	registeEquipmentFun=(value)=>{
		this.setState({
			itemDetail : value
		})
	}

	


	//查看设备缓存
	deviceCache=()=>{
		State.showOpretion=false;
		let _this =this;
		var urlParamsT = {
							deviceId:State.itemDetail.deviceId,
							lastCardNo:'',
							limit:50,
						}
		Http.request('getEquipmentCacheURL',urlParamsT).then(function(response) {
				
			_this.openEquipmentCacheFun();

		}).catch(function(err) {
			Message.error(err.message);
		});
		

	}

	openEquipmentCacheFun=()=>{
		State.openEquipmentCache = !State.openEquipmentCache;
	}





	controlEquipment=()=>{
		console.log("远程控制");
	}

	onMouseOn=(thisP)=>{
		State.deviceVO = thisP.deviceVO
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP
		})

		let _this = this;
		

			State.DropItems=[
				{title:"远程控制",onClickFun:_this.controlEquipment},
				{title:"数据查看",onClickFun:_this.deviceCache},
			]
	}






	prodoctQRCodeFun=()=>{
		this.productQRCodeXHR();
	}

	productQRCodeXHR = ()=>{
		let _this = this;
		let {itemDetail} = this.state;
		Http.request('productQRCodeUrl',{deviceId:itemDetail.deviceId}).then(function(response) {
		
			// _this.firstEquipment(itemDetail)

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	openHttpTokenDialogFun=()=>{
		State.httpTokenDialog = !State.httpTokenDialog;
	}


	returnCenterControl=()=>{
		window.location.href='/#/smarthardware/centercontrolmanage/equipmentmanage';
	}
	


	render(){
		let {itemDetail}=this.state;
		let {showOpretion} = State;
		let deviceTypeOptions = [{label:"灯",value:"LAMP"},
								{label:"雾化膜",value:"ATOMIZATION_MEMBRANE"},
								{label:"空调",value:"AIR_CONDITION"},
								{label:"空气质量仪",value:"AIR_SENSOR"},
								{label:"温湿度计",value:"HUMITURE_SENSOR"},
								{label:"网关面板",value:"BODY_SENSOR"}]
		return(
			<div >
				<span style={{float:"right",marginTop:"-50px",cursor:"pointer"}} onClick={this.returnCenterControl}>返回中央控制管理</span>
				<div>
					<Button label="刷新"  onTouchTap={this.freshPageThis} className="button-list"/>
					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					<Button label="删除"  onTouchTap={this.deleteSelectEquipment} className="button-list"/>
					<Button label="发现设备"  onTouchTap={this.openSearchEquipmentList} className="button-list"/>
					
				</div>
				<div>
					<EquipmentSearchForm/>
				</div>
				
				<div>
					<Table
			            className="second-equipment-table"
			            ajax={true}
			            onProcessData={(state)=>{
			              return state;
			             }}
			            onOperation={this.onOperation}
			            exportSwitch={false}
			            ajaxFieldListName='items'
			            ajaxUrlName='getSonEquipmentList'
			            ajaxParams={State.equipmentSearchParams}
			            onPageChange={this.onPageChangeFun}
			            displayCheckbox={true}
			            onSelect={this.onSelcet}
			          >
			            <TableHeader>
							
							<TableHeaderColumn>设备ID</TableHeaderColumn>
				            <TableHeaderColumn>类型</TableHeaderColumn>
			              	<TableHeaderColumn>名称</TableHeaderColumn>
							<TableHeaderColumn>权重</TableHeaderColumn>
			              	<TableHeaderColumn>社区</TableHeaderColumn>
							<TableHeaderColumn>房间</TableHeaderColumn>
				            <TableHeaderColumn>位置</TableHeaderColumn>
			            	<TableHeaderColumn>备注</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	
								
								<TableRowColumn name="localNo"
									style={{width:"15%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="inline-block";
										}
										return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
											<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
										)
									}} 
								>
								</TableRowColumn>

								<TableRowColumn name="deviceType" 
									style={{width:"10%",overflow:"visible"}} 
									options={deviceTypeOptions}
									component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="block";
									}
										return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
								}} ></TableRowColumn>

				            	<TableRowColumn name="name" style={{width:"15%"}}></TableRowColumn>

				            	<TableRowColumn name="weight" 
									style={{width:"5%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

								<TableRowColumn name="communityName" 
									style={{width:"12%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
								<TableRowColumn name="spaceName"
									style={{width:"8%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="inline-block";
										}
										return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
											<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
										)
									}} 
								>
								</TableRowColumn>
								<TableRowColumn name="location"
									style={{width:"10%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="inline-block";
										}
										return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
											<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
										)
									}} 
								>
								</TableRowColumn>
								
								

								
								<TableRowColumn name="memo" 
									style={{width:"15%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
					      		<TableRowColumn type="operation"
					        		style={{width:"25%"}}
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div>
				                    					<Button  label="查看"  type="operation" operation="seeDetail"  onTouchTap={this.seeDetailInfoFun.bind(this,value,itemData)}/>
														<Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value,itemData)}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.deleteList.bind(this,value,itemData)}/>
														<Dropdown 
															wrapStyle={{marginLeft:5}} 
															textTitle="更多" 
															dropItmes={State.DropItems} 
															liWidth={100} 
															onMouseOn={this.onMouseOn.bind(this,value,itemData)} 
															titleStyle={{color:"#499df1",fontSize:14}}
														/>

													</div>
											)}}
								> 
								</TableRowColumn>
				            </TableRow>
			          </TableBody>
			          <TableFooter></TableFooter>
			        </Table>
			        <Drawer 
			        	open={State.openHardwareDetail}
			        	onClose = {this.openSeeDetailSecond}
					    width={1000} 
					    openSecondary={true} 
					>
						<EquipmentDetail onCancel={this.openSeeDetailSecond} detail={itemDetail}/>
					</Drawer>

					<Drawer 
			        	open={State.openFirstHardwareDetail}
			        	onClose = {this.openFirstHardwareDetailFun}
					    width={1000} 
					    openSecondary={true} 
					>
						<EquipmentFirstDetail onCancel={this.openFirstHardwareDetailFun} detail={itemDetail} prodoctQRCodeFun={this.prodoctQRCodeFun}/>
					</Drawer>

					 <Drawer 
			        	open={State.openSearchEquipment}
			        	onClose = {this.openSearchEquipmentFun}
					    width={1100} 
					    openSecondary={true} 
					>
						<EquipmentFind onCancel={this.openSearchEquipmentFun} registeEquipment={this.registeEquipmentFun}/>
					</Drawer>
					
					<Dialog
			          title="新增门禁设备"
			          open={State.openNewCreate}
			          onClose={this.openNewCreateDialog}
			          contentStyle={{width:687}}
			        >
			          <NewCreate
			            onCancel={this.openNewCreateDialog}
			            style ={{paddingTop:'35px'}}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            saveAndNewCreate= {this.saveAndNewCreate}
			          />
			        </Dialog>
			        <Dialog
			          title="编辑门禁设备"
			          open={State.openEditDialog}
			          onClose={this.openEditDialogFun}
			          contentStyle={{width:687}}
			        >
			          <EditForm
			            detail={itemDetail}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            closeEditEquipment = {this.openEditDialogFun}
			          />
			        </Dialog>
			        
			      
			        <Dialog
			          title="删除提示"
			          open={State.openConfirmDelete}
			          onClose={this.closeConfirmDeleteFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmDelete} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeConfirmDeleteFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>

			        <Dialog
			          title="批量删除提示"
			          open={State.openConfirmDeleteBatch}
			          onClose={this.copenConfirmDeleteBatchFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmDeleteBatch} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.copenConfirmDeleteBatchFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
			        
			        
			        <Dialog
			          title="断开重连提示"
			          open={State.openConnectAgian}
			          onClose={this.openConnectAgianFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>断开重连有可能导致设备连接失败,确定要断开重连吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmConnnetAgain} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openConnectAgianFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
			      

			        <Dialog
			          title="刷新屏幕提示"
			          open={State.openFreshHTMLDialog}
			          onClose={this.openFreshHTMLDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>刷新屏幕可能导致屏幕显示不正常，确定刷新？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmFreshHTML} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openFreshHTMLDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
			        <Dialog
			          title="恢复出厂设置提示"
			          open={State.resetEquipmentDialog}
			          onClose={this.resetEquipmentDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>恢复出厂设置可能导致设备无法被发现，确定恢复出厂设置？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmResetEquipment} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.resetEquipmentDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
			        <Dialog
			          title="口令码"
			          open={State.passwordDialog}
			          onClose={this.passwordDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			         	<PasswordCode onCancle={this.passwordDialogFun}/>
			        </Dialog>
			        <Dialog
			          title="管理员密码"
			          open={State.openManagePsd}
			          onClose={this.openManagePsdFun}
			          contentStyle={{width:443,height:260}}
			        >
			          	<PsdList/>
			        </Dialog>


			        <Dialog
			          title="HttpToken"
			          open={State.httpTokenDialog}
			          onClose={this.openHttpTokenDialogFun}
			          contentStyle={{width:443,height:260}}
			        >
			          	<HttpTokenDialog onCancle={this.openHttpTokenDialogFun}/>
			        </Dialog>


			         <Drawer 
			        	open={State.openEquipmentCache}
			        	onClose = {this.openEquipmentCacheFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
						<EquipmentCache onCancel={this.openEquipmentCacheFun}/>
					</Drawer>

					<Dialog
			          title="按钮库"
			          open={State.showOpretion}
			          onClose={this.showOpretionFun}
			          contentStyle={{width:700,height:355}}
			        >
			          <BtnBox onCancle={this.showOpretionFun}/>
			        </Dialog>
			      

				</div>
				
			</div>
		);
	}
}


