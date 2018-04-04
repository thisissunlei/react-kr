
import React from 'react';

import {Http,DateFormat} from 'kr/Utils';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Notify,
	CheckPermission,
	Tooltip,
	Grid,
	Row,
	ListGroup,
	ListGroupItem

} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';

import OpenSearchForm from './OpenSearchForm';
import NewCreate from './NewCreate';
import EditForm from './EditForm';



import './index.less';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
			realPage : 1,
			itemDetail : {}
		}
	}

	componentDidMount(){
		State.getPrintPriceNameList();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
		State.page  = page
	}


	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}

	editList=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openEditDialog = true;
		})
	}


	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}


	onClickDelete=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openConfirmDelete = true;
		})
	}


	confirmDelete=()=>{
		let {itemDetail} = this.state;
		State.deletePrinterConfig(itemDetail.id)
	}


	openDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}

	render() {
		let {itemDetail} = this.state;

		return (
			    <div className="second-door-open-log" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="打印配置"/>
					<Section title={`打印配置`} description="" >
						<div>
							<Button label="新增"  onTouchTap={this.openNewCreateDialog}/>
							<span style={{color : "red",marginLeft:10}}>一个社区只能使用一个费用策略</span>
							<OpenSearchForm/>

						</div>
						<Table
							className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							exportSwitch={false}
							ajaxFieldListName='items'
							ajaxUrlName='PrinterConifigList'
							ajaxParams={State.printerConifigListParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								
								<TableHeaderColumn>社区</TableHeaderColumn>
								
								<TableHeaderColumn>节点服务器域名</TableHeaderColumn>
								<TableHeaderColumn>价格策略名称</TableHeaderColumn>
								<TableHeaderColumn>创建人</TableHeaderColumn>
								<TableHeaderColumn>创建时间</TableHeaderColumn>
								<TableHeaderColumn>最后一次更新时间</TableHeaderColumn>
								<TableHeaderColumn>操作</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								
								
								
		              			<TableRowColumn name="communityName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								
								
								<TableRowColumn 
		                            name="nodeIp" 
		                            component={(value,oldValue,itemData)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                                TooltipStyle="none"

		                            }else{
		                                TooltipStyle="block";
		                            }
		                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
		                                <Tooltip offsetTop={5} place='top'>
										<span style={{display: 'inline-block',minWidth: 200,wordWrap: 'break-word',wordBreak: "break-all",whiteSpace: 'normal'}}>
		                                {value}
		                                </span>
		                                </Tooltip></div>)
		                        }} ></TableRowColumn>
								<TableRowColumn name="printPriceName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="creatorName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
							
								<TableRowColumn 
									
									name="ctime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
								>
								</TableRowColumn>
							
								<TableRowColumn 
									
									name="utime" 
									type="date" 
									format="yyyy-mm-dd HH:MM:ss" 
								>
								</TableRowColumn>
								<TableRowColumn type="operation"
					            	
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div>
														<Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value)}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.onClickDelete.bind(this,value,itemData)}/>
															
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
				          title="新增打印机设备"
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
				          title="编辑打印配置"
				          open={State.openEditDialog}
				          onClose={this.openEditDialogFun}
				          contentStyle={{width:687}}
				        >
				          <EditForm
				            detail={itemDetail}
				            closeEditEquipment = {this.openEditDialogFun}
				          />
				        </Dialog>
					</Section>
				</div>
		);

	}

}
