

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
import EditForm from './EditForm';
import EquipmentFind from './EquipmentFind';
import EquipmentSearchForm from './EquipmentSearchForm';
import ControlLampGrostGlass from './ControlLampGrostGlass';
import ControlAirCondition from './ControlAirCondition';
import EquipmentOperateLog from './EquipmentOperateLog';


@inject("NavModel")
@observer


export default class EquipmentManageBox  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
			openMenu :false,
			itemDetail : {},
			mainInfo: {},
			serialNo :'',
			controlLampOrGrostedGlass : "",
			fatherName : ''
		}
	}


	componentDidMount() {

	}

	componentWillMount(){
		var paramId =this.getUrlParam();
		State.refreshList(paramId);
	}


	getUrlParam=()=>{
		var hashStr = window.location.hash;
		var hashArr = hashStr.split("/");
		var param = hashArr[4]
		this.setState({
			serialNo : hashArr[5],
			fatherName : hashArr[6]
		})
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
		Http.request('getSonEquipmentDetailInfo',{id:value.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				State.openSonEquipmentDetail = true;
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		State.deviceVO = State.itemDetail.deviceVO;
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

	
	//打开确认删除
	closeConfirmDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}
	
	
	//打开编辑
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}
	//打开发现设备
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


	openSeeSonEquipmentDetail=()=>{
		State.openSonEquipmentDetail = !State.openSonEquipmentDetail
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

	



	registeEquipmentFun=(value)=>{
		this.setState({
			itemDetail : value
		})
	}

	


	controlEquipment=()=>{
		
		let _this =this;
		Http.request('getSonEquipmentDetailInfo',{id:State.itemDetail.id}).then(function(response) {
			_this.setState({
				mainInfo : _this.state.itemDetail,
				itemDetail : response
			},function(){
				if(State.itemDetail.deviceType=="LAMP"||State.itemDetail.deviceType=="ATOMIZATION_MEMBRANE" ){
					
					_this.setState({
						controlLampOrGrostedGlass : State.itemDetail.deviceType=="LAMP"?"远程控制灯":"远程控制雾化玻璃"
					},function(){
						_this.switchControlLampDialog()
					})
				}else if(State.itemDetail.deviceType=="AIR_CONDITION"){
					_this.switchControlAirConditionDialog();
					
				}
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
		
		
	}

	returnSeeFatherEquipment=(serialNo)=>{

		console.log("serialNo",serialNo);
		window.location.href='./#/smarthardware/centercontrolmanage/equipmentmanage';
		localStorage.setItem("fatherSerialNo",serialNo);
	}

	onMouseOn=(thisP)=>{
		State.deviceVO = thisP.deviceVO
		State.itemDetail = thisP;
		this.setState({
			itemDetail :thisP,
			mainInfo : thisP
		})

		let _this = this;
		
		if(thisP.deviceType == "LAMP"||thisP.deviceType == "ATOMIZATION_MEMBRANE"||thisP.deviceType == "AIR_CONDITION"){
			State.DropItems=[{title:"远程控制",onClickFun:_this.controlEquipment},
						{title:"查看数据变化",onClickFun:_this.switchOpenOperateLog}]
		}else{
			State.DropItems=[{title:"查看数据变化",onClickFun:_this.switchOpenOperateLog}]	
		}
		
	}

	returnCenterControl=()=>{
		window.location.href='./#/smarthardware/centercontrolmanage/equipmentmanage';
	}

	switchControlLampDialog=()=>{
		State.controlLampDialog = !State.controlLampDialog;
	}

	switchControlAirConditionDialog=()=>{
		State.controlAirConditionDialog= !State.controlAirConditionDialog
	}

	switchOpenOperateLog=()=>{
		State.openOperateLog = !State.openOperateLog
	}


	render(){
		let {itemDetail,mainInfo,serialNo,controlLampOrGrostedGlass,fatherName}=this.state;
		let deviceTypeOptions = State.sonEquipmentTypeOptions
		return(
			<div className="son-equipment-manage">
				<div style={{float:"left",marginTop:"-55px",width:"100%"}}>
					<span>
						<span style={{marginRight:10,cursor:"pointer",color:"rgb(73, 157, 241)"}} onClick={this.returnCenterControl}>网关管理</span>
						<span style={{marginRight:10}}>&gt;</span>
						<span style={{marginRight:10}}>中控子设备管理</span>
					</span>
					<span style={{float:"right"}} >
						<span style={{marginRight:10}}>父设备序列号：<span style={{color:"rgb(73, 157, 241)",cursor:"pointer"}} onClick={this.returnSeeFatherEquipment.bind(this,serialNo)}>{decodeURIComponent(serialNo)}</span></span>
						<span style={{marginRight:10}}>父设备展示标题：{decodeURIComponent(fatherName)}</span>
					</span>
				</div>
				<div>
					<Button label="刷新"  onTouchTap={this.freshPageThis} className="button-list"/>
					<Button label="发现设备"  onTouchTap={this.openSearchEquipmentList} className="button-list"/>
					
				</div>
				<div>
					<EquipmentSearchForm/>
				</div>
				
				<div>
					<Table
			            className="son-equipment-table"
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
			            displayCheckbox={false}
			            onSelect={this.onSelcet}
			          >
			            <TableHeader>
							<TableHeaderColumn>类型</TableHeaderColumn>
							<TableHeaderColumn>序列号</TableHeaderColumn>
			              	<TableHeaderColumn>名称</TableHeaderColumn>
							<TableHeaderColumn>权重</TableHeaderColumn>
			              	{/* <TableHeaderColumn>社区</TableHeaderColumn> */}
							<TableHeaderColumn>房间</TableHeaderColumn>
				            <TableHeaderColumn>位置</TableHeaderColumn>
			            	<TableHeaderColumn>备注</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>


								<TableRowColumn name="deviceType" 
									style={{width:"7%",overflow:"visible"}} 
									options={deviceTypeOptions}
									component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
										value= '-'
									}else{
										TooltipStyle="block";
									}
										return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
								}} ></TableRowColumn>
				            	
								
								<TableRowColumn name="serialNo"
									style={{width:"20%"}}
									component={(value,oldValue,itemData)=>{
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
								

								


								<TableRowColumn name="name" 
									style={{width:"12%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>


				            	<TableRowColumn name="weight" 
									style={{width:"4%"}}
									component={(value,oldValue,itemDetail)=>{
									if(itemDetail.extReported){
										value=itemDetail.extReported.weight 
									}else{
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

								{/* <TableRowColumn name="communityName" 
									style={{width:"12%"}}
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn> */}
								
								<TableRowColumn name="spaceName"
									style={{width:"7%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"
											value ='-'
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
									style={{width:"12%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"
											value ='-'
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
									style={{width:"12%"}}
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"
											value ='-'
										}else{
											TooltipStyle="inline-block";
										}
										return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
											<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
										)
									}} 
								>
								</TableRowColumn>

								
							
					      		<TableRowColumn type="operation"
					        		style={{width:"15%"}}
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
			       
					<Dialog
			          title="子设备详情"
			          open={State.openSonEquipmentDetail}
			          onClose = {this.openSeeSonEquipmentDetail}
			          contentStyle={{width:700}}
			        >
						<EquipmentDetail onCancel={this.openSeeSonEquipmentDetail} detail={itemDetail}/>
			        </Dialog>

					<Dialog
			          title={controlLampOrGrostedGlass}
			          open={State.controlLampDialog}
			          onClose = {this.switchControlLampDialog}
			          contentStyle={{width:660}}
			        >
						<ControlLampGrostGlass onCancel={this.switchControlLampDialog} detail={itemDetail} mainInfo={mainInfo}/>
			        </Dialog>

			        <Dialog
			          title="空调控制器"
			          open={State.controlAirConditionDialog}
			          onClose = {this.switchControlAirConditionDialog}
			          contentStyle={{width:660}}
			        >
						<ControlAirCondition onCancel={this.switchControlLampDialog} detail={itemDetail} mainInfo={mainInfo}/>
			        </Dialog>

					 <Drawer 
			        	open={State.openSearchEquipment}
			        	onClose = {this.openSearchEquipmentFun}
					    width={1100} 
					    openSecondary={true} 
					>
						<EquipmentFind onCancel={this.openSearchEquipmentFun} registeEquipment={this.registeEquipmentFun} serialNo={serialNo}/>
					</Drawer>
					
			        <Dialog
			          title="编辑子设备"
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

			        <Drawer 
			        	open={State.openOperateLog}
			        	onClose = {this.switchOpenOperateLog}
					    width={1000} 
					    openSecondary={true} 
					>
						<EquipmentOperateLog onCancel={this.switchOpenOperateLog} detail={itemDetail} mainInfo={mainInfo}/>
					</Drawer>

				</div>
				
			</div>
		);
	}
}


