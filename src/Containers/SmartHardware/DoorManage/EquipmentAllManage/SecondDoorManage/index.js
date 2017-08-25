

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
import PasswordCode from './PasswordCode';
import BtnBox from './BtnBox';

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

	render(){
		let {itemDetail}=this.state;
		let {showOpretion} = State;
		// console.log("itemDetail",itemDetail);
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
			          title="重启APP提示"
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

				</div>
				
			</div>
		);
	}
}


