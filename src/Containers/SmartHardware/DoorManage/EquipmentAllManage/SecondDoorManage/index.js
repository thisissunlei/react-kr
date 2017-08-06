

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	FieldArray,
	change
} from 'redux-form';
import {
	Message,Dialog,Button,Table,TableHeader,TableHeaderColumn,TableBody,TableRow,TableRowColumn,TableFooter,Tooltip,Drawer
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

import EquipmentDtail from './EquipmentDtail';
import NewCreate from './NewCreate';

@inject("NavModel")
@observer


export default class SecondDoorManage  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
			equipmentParams: {
		        page : 1,
		        pageSize: 15
		      },
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
	//刷新
	freshPage=()=>{
		this.setState({
			
			equipmentParams: {
		        date:new Date(),
		        page : 1,
		        pageSize: 15
		    },
		})
	}

	
	//操作相关
	onOperation=(type, itemDetail)=>{
		this.setState({
			itemDetail
		});
		if (type == 'delete') {
			State.selectedDeleteIds = itemDetail.id;
			State.deleteEquipment();
		}
		if (type == 'edit') {
			//this.openEditDetailDialog();
			console.log("点击了编辑");
		}
		
	}
	seeDatailInfoFun=(value)=>{
		State.openHardwareDetail = true;
		console.log("seeDatailInfoFun-----",value.target.innerHTML);
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
		State.deleteEquipment();
		this.setState({
			equipmentParams: {
		        date:new Date(),
		        page : 1,
		        pageSize: 15
		    }
		})
	}

	openNewCreateDialog=()=>{
		State.opsnNewCreate = !State.opsnNewCreate;
	}

	render(){
		return(
			<div>
				<div style={{padding:"20px 0 0 0"}}>
					<Button label="刷新"  onTouchTap={this.freshPage} className="button-list"/>
					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					<Button label="删除"  onTouchTap={this.deleteSelectEquipment} className="button-list"/>
					<Button label="设备搜索"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
				</div>
				<div>
					<Table
			            className="member-list-table"
			            ajax={true}
			            onProcessData={(state)=>{
			              return state;
			             }}
			            onOperation={this.onOperation}
			            exportSwitch={false}
			            ajaxFieldListName='items'
			            ajaxUrlName='equipmentList'
			            ajaxParams={this.state.equipmentParams}
			            onPageChange={this.onPageChange}
			            displayCheckbox={true}
			            onSelect={this.onSelcet}
			          >
			            <TableHeader>
			              	<TableHeaderColumn>社区名称</TableHeaderColumn>
			              	<TableHeaderColumn>展示标题</TableHeaderColumn>
				            <TableHeaderColumn>门编号</TableHeaderColumn>
				            <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
				            <TableHeaderColumn>类型</TableHeaderColumn>
				            <TableHeaderColumn>厂商</TableHeaderColumn>
				            <TableHeaderColumn>属性</TableHeaderColumn>
				            <TableHeaderColumn>对应功能</TableHeaderColumn>
				            <TableHeaderColumn>是否上线</TableHeaderColumn>
			                <TableHeaderColumn>连接状态</TableHeaderColumn>
			                <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="communityName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn style={{width:160,overflow:"visible"}} name="showTitle" component={(value,oldValue)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								<TableRowColumn name="deviceCode" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="hardwareId"  style={{width:310}} type="operation"
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<Button  label={value}  type="operation" operation="seeDatailInfo" onTouchTap={this.seeDatailInfoFun.bind(value)}/>)}}
								></TableRowColumn>
								<TableRowColumn name="typeName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="maker" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="propertyName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
								<TableRowColumn name="functionName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="enable"
					              component={(value,oldValue)=>{
					                var spanColorOnline="";
					                if(value=="OFFLINE"){
					                  value="未上线";
					                  spanColorOnline = "#ff6868";
					                }else if(value=="ONLINE"){
					                  value="已上线";
					                }
					                return (<span style={{color:spanColorOnline}}>{value}</span>)}}>
					            </TableRowColumn>
					            <TableRowColumn name="activityTypeId"
					              component={(value,oldValue)=>{
					                var spanColor = "";
					                if(value=="UNLINK"){
					                  value="未连接";
					                  spanColor = "#ff6868";
					                }else if(value=="LINK"){
					                  value="已连接";
					                }
					                return (<span style={{color:spanColor}}>{value}</span>)}}>
					            </TableRowColumn>
					            <TableRowColumn type="operation"> 
									<Button  label="编辑"  type="operation" operation="edit"/>
									<Button  label="删除"  type="operation" operation="delete"/>
					            </TableRowColumn>
				            </TableRow>
			            </TableBody>
			            <TableFooter></TableFooter>
			        </Table>
			        <Drawer 
			        	open={State.openHardwareDetail}
			        	onClose = {this.closeAll}
					    width={"70%"} 
					    openSecondary={true} 
					>
						<EquipmentDtail onCancel={this.closeAll}/>
					</Drawer>
					<Dialog
			          title="新增设备定义"
			          open={State.opsnNewCreate}
			          onClose={this.openNewCreateDialog}
			          contentStyle={{width:687}}
			        >
			          <NewCreate
			            onCancel={this.openNewCreateDialog}
			            style ={{paddingTop:'35px'}}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            isDoorNumHas= {this.isDoorNumHas}
			            hardwareIdHas ={this.hardwareIdHas}
			            saveAndNewCreate= {this.saveAndNewCreate}
			          />
			        </Dialog>
			        <Dialog
			          title="编辑设备"
			          open={this.state.openEditEquipment}
			          onClose={this.openEditEquipmentDialog}
			          contentStyle={{width:687}}
			        >
			          {/*<NewCreate
			            detail={itemDetail}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            isDoorNumHas= {this.isDoorNumHas}
			            hardwareIdHas ={this.hardwareIdHas}
			            saveAndNewCreate= {this.saveAndNewCreate}
			            closeEditEquipment = {this.openEditEquipmentDialog}
			          />*/}
			        </Dialog>
				</div>
				
			</div>
		);
	}
}


