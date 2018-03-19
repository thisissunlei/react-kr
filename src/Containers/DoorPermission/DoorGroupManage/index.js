import React from 'react';
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
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Tooltip
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';

import UpgradeAdd from './UpgradeAdd';
import BatchUpgrade from './BatchUpgrade';

import NewCreateDoorGroup from './NewCreateDoorGroup';
import SearchGroupForm from './SearchGroupForm';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DoorGroupManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			itemDetail:{},
			groupLevelOptions: [{
				label:"普通组",
				value: "NORMAL"
			},{
				label:"全国通开组",
				value: "COUNTRYWIDE"
			},{
				label:"社区通开组",
				value: "COMMUNITYWIDE"
			}],
			getDoorPermissionListParams:{
				communityId : '',
				customerId : '',
				name : '',
				page : '',
				pageSize : 15,
				groupLevel:''
			}
		}
	}

	componentDidMount(){
		State.getDicOptions();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		State.itemDetail = itemDetail;
		this.setState({
			itemDetail
		})
		let _this = this;
		if (type == 'delete') {
			_this.closeConfirmDeleteFun();
		}
		if(type == 'detail') {
			_this.openUpgradeAddFun();
		}
		if(type == 'upgradeBtach'){
			_this.openBatchUpgrade();
		}
	}

	openBatchUpgrade=()=>{
		State.openBatchUpgradeDialog();
	}

	//升级包地址详情
	openUpgradeAddFun=()=>{
		State.openUpgradeAdd = !State.openUpgradeAdd ;
	}

	//确认删除提示窗口是否打开
	closeConfirmDeleteFun =()=>{
		State.closeConfirmDelete = !State.closeConfirmDelete
	}


	//确认删除
	confirmDelete = ()=>{
		State.confirmDeleteAction();
		this.closeConfirmDeleteFun();
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}




	openNewCreateDoorGoupDialog=()=>{
		State.openNewCreateDoorGroup = !State.openNewCreateDoorGroup;
	}

	submitSearchParams=(params)=>{
		let {getDoorPermissionListParams} = this.state;
		var params = Object.assign({},getDoorPermissionListParams,params);
		this.setState({
			getDoorPermissionListParams:params
		})
	}


	submitNewCreateDoorGoup=(values)=>{
		let that= this;
		let {getDoorPermissionListParams} = this.state;
		Http.request('newCreateDoorGroup',{},values).then(function(response) {
			Message.success("添加成功");
			var newObj = Object.assign({},getDoorPermissionListParams,{date :new Date()});
			that.setState({
				getDoorPermissionListParams:newObj
			})
			that.openNewCreateDoorGoupDialog();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	clearParams=()=>{
		this.setState({
			getDoorPermissionListParams:{
				communityId : '',
				customerId : '',
				name : '',
				page : '',
				pageSize : 15,
				groupLevel:''
			}
		})
	}



	render() {
		let {
			groupLevelOptions,getDoorPermissionListParams,
			list,seleced,itemDetail
		} = this.state;
		
		return (
		    <div className="door-permission-manage" style={{minHeight:'910',backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={`门禁组管理`} description="" >
					
					<div style={{float:"right",marginTop:"-60px"}}>
						<Button label="新建门禁组"  onTouchTap={this.openNewCreateDoorGoupDialog} className="button-list"/>
					</div>
					<div>
						<SearchGroupForm submitSearchParams={this.submitSearchParams} clearParams={this.clearParams}/>
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
						onOperation={this.onOperation}
						ajaxFieldListName='items'
						ajaxUrlName='getDoorPermissionList'
						ajaxParams={getDoorPermissionListParams}
						onPageChange={this.onPageChange}
						displayCheckbox={false}
					>
						<TableHeader>
							<TableHeaderColumn>组名称</TableHeaderColumn>
							<TableHeaderColumn>组级别</TableHeaderColumn>
							<TableHeaderColumn>所属社区</TableHeaderColumn>
							<TableHeaderColumn>公司名称</TableHeaderColumn>
							<TableHeaderColumn>创建时间</TableHeaderColumn>
							<TableHeaderColumn>创建人</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>
						<TableBody style={{position:'inherit'}}>
							<TableRow>

							<TableRowColumn 
								style={{width:"12%",overflow:"visible"}} 
								name="name" 
								component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
							}} ></TableRowColumn>

							<TableRowColumn name="groupLevel"
							style={{width:"5%",overflow:"visible"}} 
							options={groupLevelOptions}
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>

							<TableRowColumn name="communityName"
							style={{width:"10%",overflow:"visible"}} 
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>
							


							<TableRowColumn 
								style={{width:"10%",overflow:"visible"}} 
								name="customerName" 
								component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
							}} ></TableRowColumn>



							<TableRowColumn 
								name="ctime" 
								type="date" 
								format="yyyy-mm-dd HH:MM:ss"
								style={{width:"12%"}}
							>
							</TableRowColumn>

							

							<TableRowColumn 
								style={{width:"10%",overflow:"visible"}} 
								name="creatorName" 
								component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
							}} ></TableRowColumn>

							

							
							<TableRowColumn type="operation" style={{width:"16%",overflow:"visible"}} >

								<Button  label="添加成员"  type="operation" operation="addMember"/>
								<Button  label="授权设备"  type="operation" operation="upgradeBtach"/>
								<Button  label="编辑"  type="operation" operation="detail"/>
								<Button  label="添加成员"  type="operation" operation="delete"/>
								
							</TableRowColumn>

						</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
					</Table>
					<Dialog
			          title="新建门禁组"
			          open={State.openNewCreateDoorGroup}
			          onClose={this.openNewCreateDoorGoupDialog}
			          contentStyle={{width:625}}
			        >
			          <NewCreateDoorGroup
			            onCancel={this.NewCreateDoorGroup}
						submitNewCreateDoorGoup = {this.submitNewCreateDoorGoup}
			          />
			        </Dialog>

					{/* <Dialog
			          title="编辑门禁组"
			          open={State.openEditDoorGroup}
			          onClose={this.openEditDoorGroupFun}
			          contentStyle={{width:625}}
			        >
			          <NewCreateDoorGroup
			            onCancel={this.openEditDoorGroupFun}
						submitEditDoorGroupFun = {this.submitEditDoorGroupFun}
			          />
			        </Dialog> */}


			        <Dialog
			          title="删除升级版本提示"
			          open={State.closeConfirmDelete}
			          onClose={this.closeConfirmDeleteFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:20}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除升级版本吗？</p>
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
			          title="升级包地址详情"
			          open={State.openUpgradeAdd}
			          onClose={this.openUpgradeAddFun}
			          contentStyle={{width:687,height:300}}
			        >
			          <UpgradeAdd onCancle={this.openUpgradeAddFun} detail={itemDetail}/>
			        </Dialog>

			        <Dialog
			          title="批量升级"
			          open={State.batchUpgradeDialog}
			          onClose={this.openBatchUpgradeDialog}
			          contentStyle={{width:470}}
			        >
			          <BatchUpgrade onCancle={State.openBatchUpgradeDialog} detail={itemDetail}/>
			        </Dialog>

				</Section>
			</div>
		);

	}

}
