import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';


import NewCreateDoorGroup from './NewCreateDoorGroup';
import EditDoorGroup from './EditDoorGroup';
import SearchGroupForm from './SearchGroupForm';
import DeleteGroupDialog from './DeleteGroupDialog';
// import ChangeMember from './ChangeMember';
// import ChangeEquipment from './ChangeEquipment';


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
			page : 1,
			realPage : 1,
			selected : [],
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

	

	componentWillUnmount(){

		State.openNewCreateDoorGroup =false;
		State.openChangeEquipmentDialog =false;
		State.openChangeMemeberDialog = false;
		State.openNewCreateDoorGroup =false;
		State.openEditDoorGroup=false;
		State.openDeleteGroup = false;
		
		
	}
	
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}

	openDeleteGroupFun=()=>{
		State.openDeleteGroup = !State.openDeleteGroup;
	}


	onSelect=(selected,selectItems)=>{

		this.setState({
			selected :selectItems
		})

	}

	//操作相关
	onOperation=(type,itemDetail,event)=>{
		let _this = this;
		this.setState({
			itemDetail
		})
		
		if (type == 'delete') {
			
			_this.openDeleteGroupFun();
			return;
		}
		if(type == 'edit') {
			_this.openEditDoorGroupFun();
			return;
			
		}
		// if(type=='changeMember'){
		// 	_this.openChangeMemeberFun();
		// 	return;
			
		// }
		
		if(type=="addMemberToGroup"){
			let {clickAddMemberBtn} =this.props;
			clickAddMemberBtn &&clickAddMemberBtn(itemDetail)
		}
		if(type=="powerOwner"){
			window.open(`../doorpermmision/powerOwner?groupid=${itemDetail.id}&groupname=${itemDetail.name}&groupLevel=${itemDetail.groupLevel}`,'_blank');
			return;
		}

		if(type=='powerOrigin'){
			
			window.open(`../doorpermmision/powerOrigin?groupid=${itemDetail.id}&groupname=${itemDetail.name}&groupLevel=${itemDetail.groupLevel}`,'_blank');
			return;
			
		}
		
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

		let {getDoorPermissionListParams,realPage} = this.state;
		var params = Object.assign({},params,{date:new Date(),page : 1});
		this.setState({
			getDoorPermissionListParams:params,
			realPage : 1
		})
	}


	submitNewCreateDoorGoup=(values)=>{
		let that= this;
		let {getDoorPermissionListParams} = this.state;
		Http.request('newCreateDoorGroup',{},values).then(function(response) {

			that.openNewCreateDoorGoupDialog();
			Message.success("添加成功");
			that.setState({
				realPage :1
			},function(){
				that.refreshPage();
			})
			
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	submitEditDoorGroup=(values)=>{
		let that= this;
		
		Http.request('editDoorGroupApi',{},values).then(function(response) {

			that.openEditDoorGroupFun();
			that.refreshPage();
			Message.success("编辑成功");
			
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	refreshPage=()=>{
		let {getDoorPermissionListParams,realPage}  =this.state;
		var newObj = Object.assign({},getDoorPermissionListParams,{date :new Date(),page : realPage});
		this.setState({
			getDoorPermissionListParams:newObj
		})
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

	confirmDelete=()=>{
		
		let {itemDetail,getDoorPermissionListParams}  = this.state;
		let that = this;
		Http.request('deleteDoorGroup',{id:itemDetail.id}).then(function(response) {
			
			that.openDeleteGroupFun();
			that.refreshPage();
			Message.success("删除成功");
			
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	// openChangeMemeberFun=()=>{

	// 	State.openChangeMemeberDialog = !State.openChangeMemeberDialog;
	// }

	// openChangeEquipmentFun=()=>{
	// 	State.openChangeEquipmentDialog = !State.openChangeEquipmentDialog;
		
	// }

	openEditDoorGroupFun=()=>{
		State.openEditDoorGroup = !State.openEditDoorGroup;
	}

	addSelected=()=>{
		let {selected} = this.state;
		if(selected.length<1){
			Message.warntimeout("请选择要加入的组","error");
			return;
		}
		this.sendAddReq()
	}

	sendAddReq=()=>{
		let {selected} = this.state;
		var selectedGrouppid = selected.map(function(item,index){
			return item.id;
		})
		var selectedStr = selectedGrouppid.join(",");
		var param ={
			groupIds : selectedStr
		}
		let {sendAddReq} = this.props;
		sendAddReq && sendAddReq(selectedStr);
		
	}

	



	render() {
		let {
			getDoorPermissionListParams,
			itemDetail
		} = this.state;
		let groupLevelOptions = State.groupLevelOptions;
		let that = this;
		let {rootPage,showAddMultiple}=this.props;
		return (
		    <div className="door-permission-manage" style={{minHeight:'910',backgroundColor:"#fff"}} >
				
				<Section title={`门禁组管理`} description="" >
					
					<div style={{float:"right",marginTop:"-60px"}}>
						<Button label="新建门禁组"  onTouchTap={this.openNewCreateDoorGoupDialog} className="button-list"/>
					</div>
					<div>
						<SearchGroupForm 
							addSelected ={this.addSelected}
							submitSearchParams={this.submitSearchParams} clearParams={this.clearParams}
							showAddMultiple = {showAddMultiple}
						/>
					</div>

					<Table
						className="member-list-table door-group-list"
						style={{marginTop:0,position:'inherit'}}
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
                        onSelect={this.onSelect}
					>
						<TableHeader>
							<TableHeaderColumn>组名称</TableHeaderColumn>
							<TableHeaderColumn>组级别
								<Tooltip offsetTop={5} place='top'>
									<p>复合组中只能添加设备组，设备组中只能添加设备</p>
									<p>例子：若想建一个北京通开组，只需建一个复合组，然后把北京所有社区通开组加入该组即可</p>
								</Tooltip>
							</TableHeaderColumn>
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

							
							<TableRowColumn type="operation"
								style={{width:"15%"}}
								component={
									(itemData)=>{
										return (
											(rootPage && rootPage=="personalDoorPermmision")?
												<div>
															
													<Button  label="加入"  type="operation" operation="addMemberToGroup" onClick={that.onOperation.bind(this,"addMemberToGroup",itemData)}/>
												</div>
												:<div>
													
													
													<Button  label="已有权限"  type="operation" operation="powerOrigin" onClick={that.onOperation.bind(this,"powerOrigin",itemData)}/>
													<Button  label="授予详情"  type="operation" operation="powerOwner" onClick={that.onOperation.bind(this,"powerOwner",itemData)}/>

													<Button  label="编辑"  type="operation" operation="edit"  onClick={that.onOperation.bind(this,"edit",itemData)}/>
													<Button  label="删除"  type="operation" operation="delete" onClick={that.onOperation.bind(this,"delete",itemData)}/>

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
			          title="新建门禁组"
			          open={State.openNewCreateDoorGroup}
			          onClose={this.openNewCreateDoorGoupDialog}
			          contentStyle={{width:640}}
			        >
			          <NewCreateDoorGroup
			            onCancel={this.NewCreateDoorGroup}
						submitNewCreateDoorGoup = {this.submitNewCreateDoorGoup}
			          />
			        </Dialog>

					<Dialog
			          title="编辑门禁组"
			          open={State.openEditDoorGroup}
			          onClose={this.openEditDoorGroupFun}
			          contentStyle={{width:640}}
			        >
			          <EditDoorGroup
			            onCancel={this.openEditDoorGroupFun}
						submitEditDoorGroup = {this.submitEditDoorGroup}
						itemDetail={itemDetail}
			          />
			        </Dialog>
					

					
					<Dialog
			          title="删除门禁组"
			          open={State.openDeleteGroup}
			          onClose={this.openDeleteGroupFun}
			          contentStyle={{width:425}}
			        >
			          <DeleteGroupDialog
			            onCancel={this.openDeleteGroupFun}
						confirmDelete = {this.confirmDelete}
						
			          />
			        </Dialog>


					{/* <Drawer 
			        	open={State.openChangeMemeberDialog}
			        	onClose = {this.openChangeMemeberFun}
					    width={"70%"} 
					    openSecondary={true} 
					>
						<ChangeMember onCancel={this.openChangeMemeberFun} itemDetail={itemDetail} closeChangeMember={this.openChangeMemeberFun}/>
					</Drawer> */}

					{/* <Drawer 
			        	open={State.openChangeEquipmentDialog}
			        	onClose = {this.openChangeEquipmentFun}
					    width={"70%"} 
					    openSecondary={true} 
					>
						<ChangeEquipment onCancel={this.openChangeEquipmentFun} itemDetail={itemDetail} closeChangeMember={this.openChangeEquipmentFun}/>
					</Drawer> */}


				</Section>
			</div>
		);

	}

}
