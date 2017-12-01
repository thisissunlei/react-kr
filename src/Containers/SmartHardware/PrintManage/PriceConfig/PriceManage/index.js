

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

import NewCreate from './NewCreate';
import EditForm from './EditForm';
import DetailDialog from './DetailDialog';
import SearchForm from './SearchForm';

@inject("NavModel")
@observer


export default class PrinterManage  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
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

		console.log("onOperation",itemDetail)
		this.setState({
			itemDetail
		});
		if (type == 'delete') {
			this.openDeleteFun();
			
		}
		if (type == 'edit') {
			
			this.openEditDialogFun();
		}

		if (type == 'detail') {
			
			this.seeDetailFun();
		}

		
		
	}

	seeDetailFun=()=>{
		console.log("this.state.itemDetail",this.state.itemDetail);
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


	onClickDelete=(params)=>{

		this.setState({
			itemDetail :params
		},function(){
			this.openDeleteFun();
		});

	}


	//打开确认删除
	openDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}

	
	//打开编辑
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}


	//确认删除
	confirmDelete=()=>{

		this.openDeleteFun();
		State.deleteEquipmentSingle(this.state.itemDetail.id);

	}


	editList=(value,str)=>{


		let _this = this;
		Http.request('printerDetailInfo',{id:value.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				if(str=="edit"){
					_this.openEditDialogFun();
				}if(str=="detail"){
					_this.openDetailDialog();
				}
				
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	deleteList=(thisP,value,itemData)=>{
		this.setState({
			itemDetail:thisP
		});
		this.openDeleteFun();
	}


	openDetailDialog=()=>{
		State.detailDialogOpen = !State.detailDialogOpen;
	}



	render(){
		let {itemDetail}=this.state;
	
		return(
			<div >
				<div>

					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					
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
			            ajaxUrlName='printerManageList'
			            ajaxParams={State.printerManageListParams}
			            onPageChange={this.onPageChangeFun}
			            displayCheckbox={true}
			           
			          >
			            <TableHeader>
			            	<TableHeaderColumn>打印机名称</TableHeaderColumn>
			              	<TableHeaderColumn>打印机别名</TableHeaderColumn>
				            <TableHeaderColumn>所在社区</TableHeaderColumn>
				            <TableHeaderColumn>位置</TableHeaderColumn>
			              	
				            <TableHeaderColumn>读卡器名称</TableHeaderColumn>
			              	<TableHeaderColumn>序列号</TableHeaderColumn>
			                <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="printerName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="alias" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

				            	<TableRowColumn name="communityName" style={{width:"11%"}}></TableRowColumn>

								<TableRowColumn name="location" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
							
								

								
								<TableRowColumn name="readerName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>

								<TableRowColumn name="serialNo" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
							
					            <TableRowColumn type="operation"
					            	style={{width:"15%"}}
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div>
														<Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value,"edit")}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.onClickDelete.bind(this,value,itemData)}/>
														<Button  label="详情"  type="operation" operation="detail" onTouchTap={this.editList.bind(this,value,"detail")}/>
															
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
		
					
					<Dialog
			          title="新增费用配置"
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
			          title="编辑费用配置"
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
			          onClose={this.openDeleteFun}
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
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openDeleteFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>

			        <Dialog
			          title="费用详情"
			          open={State.detailDialogOpen}
			          onClose={this.openDetailDialog}
			          contentStyle={{width:687}}
			        >
			          <DetailDialog
			            detail={itemDetail}
			            closeEditEquipment = {this.openEditDialogFun}
			          />
			        </Dialog>
			        
			  


				</div>
				
			</div>
		);
	}
}


