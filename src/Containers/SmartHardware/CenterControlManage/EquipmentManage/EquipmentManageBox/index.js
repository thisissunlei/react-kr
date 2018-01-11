

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
import ControlCenterControl from './ControlCenterControl';
import PsdList from './PsdList';
import PasswordCode from './PasswordCode';
import HttpTokenDialog from './HttpTokenDialog';

@inject("NavModel")
@observer


export default class EquipmentManageBox  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			openMenu :false,
			itemDetail : {}
		}
	}


	componentDidMount() {

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
		let _this = this;
		Http.request('seeCenterControlEquipDetail',{id:value.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				State.openCenterControlDetail = true;
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		State.deviceVO = State.itemDetail.deviceVO;
	}


	//打开新建
	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}
	//打开确认删除
	closeConfirmDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}

	//打开查看设备详情
	openSeeDetailSecond=()=>{
		State.openCenterControlDetail = !State.openCenterControlDetail;
	}


	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}
	//打开发现设备
	openSearchEquipmentFun=()=>{
		State.openSearchEquipment = !State.openSearchEquipment;
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

	//断开重连提示窗口
	openConnectAgianFun=()=>{
		State.openConnectAgian = !State.openConnectAgian;
	}


	passwordDialogFun=()=>{
		State.passwordDialog = !State.passwordDialog;
	}

	confirmConnnetAgain=()=>{
		State.disConnectAction();
		State.openConnectAgian =false;
	}


	editList=(thisP,value,itemData)=>{
		let _this = this;
		Http.request('getCenterControolEditData',{id:thisP.id}).then(function(response) {

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


	registeEquipmentFun=(value)=>{
		this.setState({
			itemDetail : value
		})
	}


	//点击断开重连
	connectAgain=()=>{
		State.openConnectAgian = !State.openConnectAgian;
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


	getHttpToken=()=>{
		State.showHttpToken();
	}


	seeSonEquipment=()=>{
		let sonEquipmentId = State.itemDetail.id;
		let equipmentDeviceId =State.itemDetail.serialNo;
		console.log("State.itemDetail",State.itemDetail);
		var url = `/#/smarthardware/centercontrolmanage/sonequipmentmanage/${sonEquipmentId}/${equipmentDeviceId}`;
		window.location.href =url;
	}

	onMouseOn=(thisP)=>{
		State.deviceVO = thisP.deviceVO
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP
		})

		let _this = this;
		

		State.DropItems=[
			{title:"查看子设备",onClickFun:_this.seeSonEquipment},
			{title:"控制屏幕",onClickFun:_this.ControlCenterControlFun},
			
			{title:"断开重连",onClickFun:_this.connectAgain},
			{title:"获取管理员密码",onClickFun:_this.getManagerPsd},

			{title:"重启设备APP",onClickFun:_this.restartAPP},
			{title:"重启设备系统",onClickFun:_this.restartSystems},
			{title:"恢复出厂设置",onClickFun:_this.resetEquipmentOrigin},

			{title:"升级",onClickFun:_this.upgrade},
			{title:"获取httpToken",onClickFun:_this.getHttpToken}

			
		]
	}

	ControlCenterControlFun=()=>{
		State.ControlCenterControl = !State.ControlCenterControl;
	}




	openHttpTokenDialogFun=()=>{
		State.httpTokenDialog = !State.httpTokenDialog;
	}
	


	render(){
		let {itemDetail}=this.state;
		let {showOpretion} = State;
		let spaceTypeOptions = [{label:"会议室",value : 'MEETING'},{label:"独立办公室",value : 'OFFICE'},{label:"大厅",value : 'HALL'}]

		return(
			<div >
				<div>
					<Button label="刷新"  onTouchTap={this.freshPageThis} className="button-list"/>
					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					<Button label="发现设备"  onTouchTap={this.openSearchEquipmentFun} className="button-list"/>
					
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
			            ajaxUrlName='centerControlEquipmentList'
			            ajaxParams={State.equipmentSearchParams}
			            onPageChange={this.onPageChangeFun}
			            displayCheckbox={true}
			          >
			            <TableHeader>
			            	<TableHeaderColumn>社区名称</TableHeaderColumn>
			            	<TableHeaderColumn>屏幕显示标题</TableHeaderColumn>
				            <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
				            <TableHeaderColumn>空间类型</TableHeaderColumn>
			              <TableHeaderColumn>连接状态</TableHeaderColumn>
			              <TableHeaderColumn>最后一次连接时间</TableHeaderColumn>
				            <TableHeaderColumn>厂商</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="communityName" style={{width:"12%"}}></TableRowColumn>
								
								<TableRowColumn style={{width:"13%",overflow:"visible"}} name="name" component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"

									}else{
										TooltipStyle="block";
									}
										return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
								}} ></TableRowColumn>
								
								
								
								<TableRowColumn name="serialNo"
									style={{width:"20%"}}
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
								

								<TableRowColumn name="spaceType" 
									options = {spaceTypeOptions}
									style={{width:"6%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
							
					            <TableRowColumn name="connected"
									style={{width:"8%"}}

					              	component={(value,oldValue)=>{
						                var spanColor = "";

						                if(value  == "true"){
						                	value="已连接";
						                }else{
						                	value="未连接";
						                	spanColor = "#ff6868";
						                }
						                return (<span style={{color:spanColor}}>{value}</span>)}}
						        >
					            </TableRowColumn>
					            
								<TableRowColumn 
									style={{width:"16%"}}
									name="connectTime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
								>
								</TableRowColumn>
								<TableRowColumn name="makerName" 
									style={{width:"6%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

								<TableRowColumn type="operation"
									style={{width:"16%"}}
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
			        	open={State.openCenterControlDetail}
			        	onClose = {this.openSeeDetailSecond}
					    width={1000} 
					    openSecondary={true} 
					>
						<EquipmentDetail onCancel={this.openSeeDetailSecond} detail={itemDetail}/>
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
			          title="新增中控设备"
			          open={State.openNewCreate}
			          onClose={this.openNewCreateDialog}
			          contentStyle={{width:687}}
			        >
			          <NewCreate
			            onCancel={this.openNewCreateDialog}
			            style ={{paddingTop:'35px'}}
			          />
			        </Dialog>
			        <Dialog
			          title="编辑中控设备"
			          open={State.openEditDialog}
			          onClose={this.openEditDialogFun}
			          contentStyle={{width:687}}
			        >
			          <EditForm
			            detail={itemDetail}
			            onCancel = {this.openEditDialogFun}
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

			        
							<Dialog
								title="屏幕控制"
								open={State.ControlCenterControl}
								onClose={this.ControlCenterControlFun}
								contentStyle={{width:720}}
							>
								<ControlCenterControl detail={itemDetail}/>
							</Dialog>
				
				</div>
			</div>
		);
	}
}


