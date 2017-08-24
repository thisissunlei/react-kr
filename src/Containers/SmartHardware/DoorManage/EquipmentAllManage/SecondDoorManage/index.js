

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
	ListGroup,ListGroupItem,SearchForms,FontIcon
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
		State.freshPage();
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		console.log("itemDetail===>operation",itemDetail);
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
		// State.deviceVO = value.deviceVO;
		this.setState({
			itemDetail : value
		})
		console.log("itemDetail===>operation",itemData);
		State.deviceVO = State.itemDetail.deviceVO;
		State.openHardwareDetail = true;
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
		State.getUnusedEquipmentFun();
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


	showMoreOpretion=(thisP,value,itemData)=>{
		
		State.showOpretion = !State.showOpretion;
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP
		})
	}

	showOpretionFun=()=>{
		State.showOpretion = !State.showOpretion;
	}

	editList=(thisP,value,itemData)=>{
		console.log("thisP",thisP,'value',value,'itemData',itemData);
		this.setState({
			itemDetail:thisP
		});
		this.openEditDialogFun();
	}

	deleteList=(thisP,value,itemData)=>{
		this.setState({
			itemDetail:thisP
		});
		this.closeConfirmDeleteFun();
	}

	//升级
	upgrade=(thisP,value,itemData)=>{
		State.showOpretion=false
		this.upgradeDialogFun();
	}

	//控制升级窗口是否显示
	upgradeDialogFun=()=>{
		State.upgradeDialog = !State.upgradeDialog;
	}
	//点击清空缓存
	clearCache=()=>{
		
		State.showOpretion=false
		this.openClearCachedFun();
	}
	//控制确认清空缓存窗口是否显示
	openClearCachedFun=()=>{
		State.openClearCached = !State.openClearCached;
	}

	//点击断开重连
	connectAgain=()=>{
		State.showOpretion=false
		this.openConnectAgianFun();
	}

	openConnectAgianFun=()=>{
		State.openConnectAgian = !State.openConnectAgian;
	}

	openDoorInline=()=>{
		State.showOpretion=false
		State.openDoorOnlineAction();
	}

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
	
		

	getDoorPassWord=()=>{
		State.showOpretion=false
		State.getPassword();
	}


	confirmClearCache=()=>{
		State.clearCacheAction();
		State.openClearCached =false;
	}

	confirmConnnetAgain=()=>{
		State.disConnectAction();
		State.openConnectAgian =false;
	}

	passwordDialogFun=()=>{
		State.passwordDialog = !State.passwordDialog;
	}

	//刷新H5页面
	freshH5=()=>{
		State.showOpretion=false;
		this.openFreshHTMLDialogFun();
	}


	//刷新H5页面窗口
	openFreshHTMLDialogFun=()=>{
		State.openFreshHTMLDialog = !State.openFreshHTMLDialog;
	}

	//确认刷新h5页面
	confirmFreshHTML=()=>{
		State.confirmFreshHTMLAction();
		this.openFreshHTMLDialogFun();
	}


	//恢复设备出厂设置
	resetEquipmentOrigin=()=>{
		State.showOpretion=false;
		this.resetEquipmentDialogFun();
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

	//获取管理员密码
	getManagerPsd=()=>{
		console.log("dkdkdk");
		State.showOpretion=false;
		this.openManagePsdFun();
	}

	//管理员密码出口
	openManagePsdFun=()=>{
		State.openManagePsd = !State.openManagePsd;
	}

	

	//重启APP
	restartAPP=()=>{
		console.log("重启APP");
		State.showOpretion=false
		this.openRestartAPPDialogFun()
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

	//重启设备系统
	restartSystems=()=>{
		console.log("重启设备系统");
		this.openRestartSystemsDialogFun();
		State.showOpretion=false

	}

	//重启设备系统提示
	openRestartSystemsDialogFun = ()=>{
		State.openRestartSystemsDialog=!State.openRestartSystemsDialog;
	}

	//确认重启设备系统
	confirmOpenRestartSystems=()=>{
		State.confirmOpenRestartSystemsAction();
		this.openRestartSystemsDialogFun();
	}

	//点击批量删除
	deleteSelectEquipment = ()=>{
		if(this.state.selectIds.length == 0){
			console.log("this.state.selectIds.length ");
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


	render(){
		let {itemDetail}=this.state;
		let {showOpretion} = State;
		console.log("itemDetail",itemDetail);
		return(
			<div >
				<div style={{padding:"20px 0 0 0"}}>
					<Button label="刷新"  onTouchTap={this.freshPageThis} className="button-list"/>
					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					<Button label="删除"  onTouchTap={this.deleteSelectEquipment} className="button-list"/>
					<Button label="设备发现"  onTouchTap={this.openSearchEquipmentList} className="button-list"/>
					
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
			              	<TableHeaderColumn>展示标题</TableHeaderColumn>
				            <TableHeaderColumn>门编号</TableHeaderColumn>
				            <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
				            <TableHeaderColumn>厂商</TableHeaderColumn>
				            <TableHeaderColumn>属性</TableHeaderColumn>
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
								
								<TableRowColumn name="deviceId" style={{width:170}}  component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
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
														<Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value,itemData)}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.deleteList.bind(this,value,itemData)}/>
				                        				<Button  label="查看"  type="operation" operation="seeDetail"  onTouchTap={this.seeDetailInfoFun.bind(this,value,itemData)}/>
														<Button  label="更多"  type="operation" operation="more" onTouchTap={this.showMoreOpretion.bind(this,value,itemData)} linkTrue/>
														
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
					    width={"90%"} 
					    openSecondary={true} 
					>
						<EquipmentDetail onCancel={this.openSeeDetail} detail={itemDetail}/>
					</Drawer>
					 <Drawer 
			        	open={State.openSearchEquipment}
			        	onClose = {this.openSearchEquipmentFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
						<EquipmentFind onCancel={this.openSearchEquipmentFun} />
					</Drawer>
					
					<Dialog
			          title="新增设备定义"
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
			          title="编辑设备"
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
			          title="高级查询"
			          open={State.openSearchDialog}
			          onClose={this.openEquipmentsearchDialogFun}
			          contentStyle={{width:687}}
			        >
			          	<EquipmentSearchForm
			            	detail={itemDetail}
			            	onSubmit = {this.onSubmitNewCreateEquipment}
			            	closeEditEquipment = {this.openEquipmentsearchDialogFun}
			            	content={this.state.content}
            				filter={this.state.filter}
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
			          title="刷新H5页面提示"
			          open={State.openFreshHTMLDialog}
			          onClose={this.openFreshHTMLDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>刷新H5页面可能导致页面显示不正常，确定刷新？</p>
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
			          title="口令"
			          open={State.passwordDialog}
			          onClose={this.passwordDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>口令码：{State.EquipmentPassword}</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                    
			                      <ListGroupItem style={{width:400,textAlign:'center',padding:0}}>
			                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.passwordDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
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
			          contentStyle={{width:590,height:320}}
			        >
			          <div style={{paddingTop:30}}>
			            	<Grid style={{marginBottom:'4px'}}>
			            		<Row style={{marginBottom:10,paddingLeft:10}}>
				                    <ListGroup>
				                    	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="升级" type="button"  cancle={true} onTouchTap={this.upgrade} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'right',padding:0,paddingRight:15}}>
				                        	<Button  label="清空设备缓存" type="button" onClick={this.clearCache} cancle={true}  style={{width:115}}/>
				                        
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="断开重连" type="button"  cancle={true} onTouchTap={this.connectAgain} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0}}>
				                        	<Button  label="获取口令" type="button"  cancle={true} onTouchTap={this.getDoorPassWord} style={{width:115}}/>
				                      	</ListGroupItem>
				                    </ListGroup>
			                  	</Row>
			                  	<Row style={{marginBottom:10,paddingLeft:10}}>
				                    <ListGroup>
				                      	<ListGroupItem style={{textAlign:'right',padding:0,paddingRight:15}}>
				                        	<Button  label="远程开门" type="button" onClick={this.openDoorInline} cancle={true} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="查看设备缓存" type="button"  cancle={true} onTouchTap={this.deviceCache} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="刷新H5" type="button"  cancle={true} onTouchTap={this.freshH5} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0}}>
				                        	<Button  label="恢复设备出厂设置" type="button"  cancle={true} onTouchTap={this.resetEquipmentOrigin} style={{width:115}}/>
				                      	</ListGroupItem>
				                    </ListGroup>
			                  	</Row>
			                  	<Row style={{marginBottom:10,paddingLeft:10}}>
				                    <ListGroup>
				                      	<ListGroupItem style={{textAlign:'right',padding:0,paddingRight:15}}>
				                        	<Button  label="获取管理员密码" type="button" onClick={this.getManagerPsd} cancle={true} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="重启设备APP" type="button"  cancle={true} onTouchTap={this.restartAPP} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:15}}>
				                        	<Button  label="重启设备系统" type="button"  cancle={true} onTouchTap={this.restartSystems} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	
				                    </ListGroup>
			                  	</Row>
			                  	<Row>
				                    <ListGroup>
				                      <ListGroupItem style={{width:580,textAlign:'center',padding:0,marginTop:10}}>
				                        <Button  label="关闭" type="button"   onTouchTap={this.showOpretionFun} style={{width:115}}/>
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


