

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
import UpgradeForm from './UpgradeForm';
import EquipmentCache from './EquipmentCache';
import PsdList from './PsdList';
import PasswordCode from './PasswordCode';
import BtnBox from './BtnBox';
import EquipmentFirstDetail from './EquipmentFirstDetail';

@inject("NavModel")
@observer


export default class SecondDoorManage  extends React.Component{

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
		//获取升级信息列表
		State.getUpgradeTypeOptions();

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
	seeDetailInfoFun=(value,itemData)=>{
		console.log("value",value);
		if(value.maker == "KRSPACE"){
			this.secondEquipment(value);
		}else{
			this.firstEquipment(value);
		}
		
	}

	firstEquipment=(value)=>{
		let _this = this;
		Http.request('getFirstEquipmentDetailUrl',{id:value.id}).then(function(response) {
				
			_this.setState({
				itemDetail:response
			},function(){
				State.openFirstHardwareDetail = true;
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	secondEquipment=(value)=>{
		let _this = this;
		Http.request('getSecEquipmentDetailUrl',{id:value.id}).then(function(response) {
			
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
	//打开查看详情
	openSeeDetail=()=>{
		State.openHardwareDetail = !State.openHardwareDetail;
	}
	//打开一代查看详情
	openSeeDetail=()=>{
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

	//确认清空缓存
	confirmClearCache=()=>{
		State.clearCacheAction();
		State.openClearCached =false;
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

	//重启APP提示
	openRestartAPPDialogFun=()=>{
		State.openRestartAPPDialog = !State.openRestartAPPDialog;
	}

	//确认重启APP
	confirmOpenRestartAPP=()=>{
		State.confirmOpenRestartAPPAction();
		this.openRestartAPPDialogFun();
	}

	//确认重启设备系统
	confirmOpenRestartSystems=()=>{
		State.confirmOpenRestartSystemsAction();
		this.openRestartSystemsDialogFun();
	}

	//重启设备系统提示
	openRestartSystemsDialogFun = ()=>{
		State.openRestartSystemsDialog=!State.openRestartSystemsDialog;
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


	//控制确认清空缓存窗口是否显示
	openClearCachedFun=()=>{
		State.openClearCached = !State.openClearCached;
	}

	//确认同步口令
	confirmSynchronizingPsw=()=>{
		State.confirmSynchronizingAction();
		this.synchronizingPswDialogFun();
	}

	//口令提示
	synchronizingPswDialogFun=()=>{
		State.synchronizingPswDialog = !State.synchronizingPswDialog;
	}

	registeEquipmentFun=(value)=>{
		this.setState({
			itemDetail : value
		})
	}

	

	//点击清空缓存
	clearCache=()=>{
		
		State.openClearCached = !State.openClearCached;

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


	//刷新H5页面
	freshH5=()=>{

		State.openFreshHTMLDialog = !State.openFreshHTMLDialog;

	}

	//同步口令
	synchronizingPsw=()=>{
		
		State.synchronizingPswDialog = true;
	}

	//点击断开重连
	connectAgain=()=>{
		State.openConnectAgian = !State.openConnectAgian;
	}


	openDoorInline=()=>{
		State.openDoorOnlineAction();
	}



	getDoorPassWord=()=>{
		State.getPassword();
	}


	openFirstHardwareDetailFun=()=>{
		State.openFirstHardwareDetail = !State.openFirstHardwareDetailFun;
	}

	//获取管理员密码
	getManagerPsd=()=>{
		State.openManagePsd = !State.openManagePsd;
	}


	//重启APP
	restartAPP=()=>{
		State.openRestartAPPDialog = !State.openRestartAPPDialog;
	}


	//重启设备系统
	restartSystems=()=>{
		State.openRestartSystemsDialog=!State.openRestartSystemsDialog;
	}

	//恢复设备出厂设置
	resetEquipmentOrigin=()=>{
		State.resetEquipmentDialog = !State.resetEquipmentDialog;
	}

	//升级
	upgrade=(thisP,value,itemData)=>{
		State.upgradeDialog = !State.upgradeDialog;
	}

	onMouseOn=(thisP)=>{
		State.deviceVO = thisP.deviceVO
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP
		})

		let _this = this;
		if(thisP.maker=="KRSPACE"){

			State.DropItems=[
				{title:"清空设备缓存",onClickFun:_this.clearCache},
				{title:"查看设备缓存",onClickFun:_this.deviceCache},
				{title:"刷新屏幕",onClickFun:_this.freshH5},
				{title:"同步口令",onClickFun:_this.synchronizingPsw},

				{title:"断开重连",onClickFun:_this.connectAgain},
				{title:"远程开门",onClickFun:_this.openDoorInline},
				{title:"获取口令",onClickFun:_this.getDoorPassWord},
				{title:"获取管理员密码",onClickFun:_this.getManagerPsd},

				{title:"重启设备APP",onClickFun:_this.restartAPP},
				{title:"重启设备系统",onClickFun:_this.restartSystems},
				{title:"恢复出厂设置",onClickFun:_this.resetEquipmentOrigin},
				{title:"升级",onClickFun:_this.upgrade}
				
			]
		}else{

			State.DropItems=[

				{title:"清空设备缓存",onClickFun:_this.clearCache},
				{title:"刷新屏幕",onClickFun:_this.freshH5},
				{title:"远程开门",onClickFun:_this.openDoorInline},
				{title:"重置",onClickFun:_this.resetFirstEquipmentFun}
				
			]
		}

	}

	resetFirstEquipmentFun=()=>{
		this.resetFirstEquipmentDialogFun();
	}

	resetFirstEquipmentDialogFun=()=>{
		State.resetFirstEquipmentDialog = !State.resetFirstEquipmentDialog ;
	}

	confirmResetFirstEquipment=()=>{

		State.confirmResetFirstEquipmentState();
		this.resetFirstEquipmentDialogFun();
		
	}


	prodoctQRCodeFun=()=>{
		this.productQRCodeXHR();
	}

	productQRCodeXHR = ()=>{
		let _this = this;
		let {itemDetail} = this.state;
		Http.request('productQRCodeUrl',{deviceId:itemDetail.deviceId}).then(function(response) {
		
			_this.firstEquipment(itemDetail)

		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	


	render(){
		let {itemDetail}=this.state;
		let {showOpretion} = State;
		return(
			<div >
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
			            ajaxUrlName='getDecondeEquipmentList'
			            ajaxParams={State.equipmentSecondParams}
			            onPageChange={this.onPageChangeFun}
			            displayCheckbox={true}
			            onSelect={this.onSelcet}
			          >
			            <TableHeader>
			              	<TableHeaderColumn>社区名称</TableHeaderColumn>
			              	<TableHeaderColumn>屏幕显示标题</TableHeaderColumn>
				            <TableHeaderColumn>屏幕显示编号</TableHeaderColumn>
				            <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
				            <TableHeaderColumn>厂商</TableHeaderColumn>
				            <TableHeaderColumn>门类型</TableHeaderColumn>
			                <TableHeaderColumn>连接状态</TableHeaderColumn>
			                <TableHeaderColumn>最后一次连接时间</TableHeaderColumn>
			                <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="communityName"></TableRowColumn>
								<TableRowColumn style={{width:100,overflow:"visible"}} name="title" component={(value,oldValue)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								<TableRowColumn name="doorCode" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
								
								<TableRowColumn name="deviceId"
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="inline-block";
										}
										return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:170,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
										)
									}} 
								>
								</TableRowColumn>
								<TableRowColumn name="makerName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="doorTypeName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
					            <TableRowColumn name="logined"
					              component={(value,oldValue)=>{
					                var spanColor = "";

					                if(value  == "true"){
					                	value="已连接";
					                }else{
					                	value="未连接";
					                	spanColor = "#ff6868";
					                }
					                return (<span style={{color:spanColor}}>{value}</span>)}}>
					            </TableRowColumn>
					            
								<TableRowColumn name="loginedUtime" type="date" format="yyyy-mm-dd HH:MM:ss" style={{width:160}}></TableRowColumn>

					            <TableRowColumn type="operation"
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
												)
										}
									}
								> 
								</TableRowColumn>
				            </TableRow>
			            </TableBody>
			            <TableFooter></TableFooter>
			        </Table>
			        <Drawer 
			        	open={State.openHardwareDetail}
			        	onClose = {this.openSeeDetail}
					    width={1000} 
					    openSecondary={true} 
					>
						<EquipmentDetail onCancel={this.openSeeDetail} detail={itemDetail}/>
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
			          title="升级"
			          open={State.upgradeDialog}
			          onClose={this.upgradeDialogFun}
			          contentStyle={{width:400}}
			        >
			          	<UpgradeForm/>
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
			          title="清空缓存提示"
			          open={State.openClearCached}
			          onClose={this.openClearCachedFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>清空设备缓存可导致断网时无法开门，确认清空设备缓存吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmClearCache} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openClearCachedFun} />
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
			          title="重启设备系统提示"
			          open={State.openRestartSystemsDialog}
			          onClose={this.openRestartSystemsDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>重启设备系统有可能导致设备几分钟不可用，确定重启？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmOpenRestartSystems} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openRestartSystemsDialogFun} />
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
			          title="重启APP提示"
			          open={State.openRestartAPPDialog}
			          onClose={this.openRestartAPPDialogFun}
			          contentStyle={{width:443,height:260}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>重启APP可能会导致失败，确定重启？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmOpenRestartAPP} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openRestartAPPDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
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
			        <Dialog
			          title="同步口令提示"
			          open={State.synchronizingPswDialog}
			          onClose={this.synchronizingPswDialogFun}
			          contentStyle={{width:443,height:260}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>同步口令后有可能造成口令码无法开门，确认同步？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmSynchronizingPsw} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.synchronizingPswDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
			        <Dialog
			          title="一代门禁重置警告"
			          open={State.resetFirstEquipmentDialog}
			          onClose={this.resetFirstEquipmentDialogFun}
			          contentStyle={{width:443,height:260}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>重置可能导致设备暂时掉线，确认重置？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmResetFirstEquipment} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.resetFirstEquipmentDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>

				</div>
				
			</div>
		);
	}
}


