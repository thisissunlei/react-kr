

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

@inject("NavModel")
@observer


export default class SecondDoorManage  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
			openMenu :false,
			showOpretion : false
			
		}
	}

	componentWillMount(){
	}
	componentDidMount() {
		State.getListDic();
	}
	componentWillUnmount(){

	}
	componentWillReceiveProps(nextProps){
	}

	freshPageThis=()=>{
		State.freshPage();
	}

	
	//操作相关
	onOperation=(type, itemDetail)=>{
		console.log("itemDetail",itemDetail);
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
		State.deviceVO = value.deviceVO;
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
	//批量删除
	deleteSelectEquipment=()=>{
		if(this.state.selectIds.length == 0){
			Message.error("请选择您要删除的设备");
			return;
		}
		var selectedIdsArr = this.state.selectIds;
		State.selectedDeleteIds = selectedIdsArr.join(",");
		State.deleteEquipmentBatch();
		
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
		this.setState({
			showOpretion :!this.state.showOpretion,
		})
		State.itemDetail = thisP;
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
		this.setState({
			showOpretion:false
		})
		this.upgradeDialogFun();
	}

	//控制升级窗口是否显示
	upgradeDialogFun=()=>{
		State.upgradeDialog = !State.upgradeDialog;
	}
	//点击清空缓存
	clearCache=()=>{
		this.setState({
			showOpretion:false
		})
		this.openClearCachedFun();
	}
	//控制确认清空缓存窗口是否显示
	openClearCachedFun=()=>{
		State.openClearCached = !State.openClearCached;
	}

	//点击断开重连
	connectAgain=()=>{
		this.setState({
			showOpretion:false
		})
		this.openConnectAgianFun();
	}

	openConnectAgianFun=()=>{
		State.openConnectAgian = !State.openConnectAgian;
	}

	openDoorInline=()=>{
		this.setState({
			showOpretion:false
		})
		State.openDoorOnlineAction();
	}

	deviceCache=()=>{
		this.setState({
			showOpretion:false
		})
		this.openEquipmentCacheFun();

	}

	openEquipmentCacheFun=()=>{
		State.openEquipmentCache = !State.openEquipmentCache;
	}
	
		

	getDoorPassWord=()=>{
		this.setState({
			showOpretion:false
		})
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


	render(){
		let {itemDetail,showOpretion}=this.state;
		let options=[{
		      label:"门编号",
		      value:"doorCode"
		    },{
		      label:"硬件编号",
		      value:"deviceId"
		    }]
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
			                <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="communityName"></TableRowColumn>
								<TableRowColumn style={{width:160,overflow:"visible"}} name="title" component={(value,oldValue)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								<TableRowColumn name="doorCode" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="deviceId"  style={{width:310}} type="operation"
									component={(value,oldValue,itemData)=>{
									if(value==""){
										value="-"
									}
									return (<Button  label={value}  type="operation" operation="seeDatailInfo" onTouchTap={this.seeDetailInfoFun.bind(value,itemData)}/>)}}
								></TableRowColumn>
								
								<TableRowColumn name="maker" component={(value,oldValue)=>{
									if(value=="SHEN_DIAN"){
										value="深电"
									}
									if(value=="ZHONG_KONG"){
										value="中控"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="doorType" component={(value,oldValue)=>{
									if(value == 1){
										value = "大门"
									}else if(value==2){
										value = "会议室"
									}else if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
					            <TableRowColumn name="logined"
					              component={(value,oldValue)=>{
					                var spanColor = "";
					                if(value  == true){
					                	value="已连接";
					                }else{
					                	value="未连接";
					                	spanColor = "#ff6868";
					                }
					                return (<span style={{color:spanColor}}>{value}</span>)}}>
					            </TableRowColumn>
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
														<div style={{display:"inline-block",height:40,verticalAlign:"middle"}}>
															<Button type="link" href="javascript:void(0)" icon={<FontIcon className="icon-more" style={{fontSize:'16px'}}/>} onTouchTap={this.showMoreOpretion.bind(this,value,itemData)} linkTrue/>
															<div style={{visibility:showOpretion?"visible":"hidden",padding:"10px 5px", background:" #fff",border:"solid 1px rgba(204, 204, 204, 0.98)",borderRadius: '3px',position:"relative",cursor:"pointer"}}>
																<div onClick={this.upgrade.bind(this,value,itemData)} className="list-div">升级</div>
																<div onClick={this.clearCache.bind(this,value,itemData)} className="list-div">清空设备缓存</div>
																<div onClick={this.connectAgain.bind(this,value,itemData)} className="list-div">断开重连</div>
																<div onClick={this.getDoorPassWord.bind(this,value,itemData)} className="list-div">获取口令</div>
																<div onClick={this.openDoorInline.bind(this,value,itemData)} className="list-div">远程开门</div>
																<div onClick={this.deviceCache.bind(this,value,itemData)} className="list-div">查看设备缓存</div>
															</div>

														</div>
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
					    width={"70%"} 
					    openSecondary={true} 
					>
						<EquipmentDetail onCancel={this.openSeeDetail}/>
					</Drawer>
					 <Drawer 
			        	open={State.openSearchEquipment}
			        	onClose = {this.openSearchEquipmentFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
						<EquipmentFind onCancel={this.openSearchEquipmentFun}/>
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
			          contentStyle={{width:687}}
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

			         <Drawer 
			        	open={State.openEquipmentCache}
			        	onClose = {this.openEquipmentCacheFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
						<EquipmentCache onCancel={this.openEquipmentCacheFun}/>
					</Drawer>
				</div>
				
			</div>
		);
	}
}


