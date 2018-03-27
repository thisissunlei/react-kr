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
 import SearchGroupMember from './SearchGroupMember';
 import AddMemberToGroup from './AddMemberToGroup';
 import BatchAddMemberToGroup from './BatchAddMemberToGroup';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DoorGroupManage extends React.Component {

	constructor(props, context) {
        super(props, context);
        this.groupItemDetail  = this.props.groupItemDetail;
		this.state = {
            items : [],
			itemDetail:{},
			selectedListData : [],
			getAllMemberInDoorParams:{
            // searchParams:{
                name : '',
                communityId :'',
                customerId : '',
				phone : '',
				page : 1,
				pageSize :15
            }
		}
	}

	componentDidMount(){
        
    }
    
	

	submitSearchParams=(params)=>{

		let that =this;
		let {getAllMemberInDoorParams} = this.state;
		var params = Object.assign({},params,{date:new Date()});
		this.setState({
			getAllMemberInDoorParams:params
		})
	}



	refreshPage=()=>{
		let {getAllMemberInDoorParams}  =this.state;
		let that = this;
		var newObj = Object.assign({},getAllMemberInDoorParams,{date :new Date()});
		this.setState({
			getAllMemberInDoorParams:newObj
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

	confirmAdd=()=>{
		
		let {itemDetail,getDoorPermissionListParams,ids}  = this.state;
		let {groupItemDetail}= this.props;
		let that = this;
		console.log("itemDetail",itemDetail);
		var params = {
			uids:itemDetail.uid,
			groupId : groupItemDetail.id
		}
		that.sendAddRequest(params);
	}



	sendAddRequest=(params)=>{

		let that = this;
		Http.request('addGroupMemberApi',{},params).then(function(response) {


			State.openAddMemberToGroup = false;
			State.openBatchAddDialog = false;
			Message.success("添加成功");

			let {freshGroupMemberList} = that.props;
			freshGroupMemberList && freshGroupMemberList();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	

	openAddMemberToGroupFun=()=>{
		State.openAddMemberToGroup = !State.openAddMemberToGroup;
	}


	
	

	openBatchAddDialogFun=()=>{
		State.openBatchAddDialog = !State.openBatchAddDialog
	}

	confirmBatchAddMember=()=>{
		let {selectedListData}= this.state;
		let {groupItemDetail} = this.props;
		this.openBatchAddDialogFun();

		var idsArr =[];
		for(var i=0;i<selectedListData.length;i++){
			console.log("selectedListData[i]",selectedListData[i],"selectedListData[i].uid",selectedListData[i].uid);
			idsArr.push(selectedListData[i].uid)
		}
		var sendIds = idsArr.join(",");
		let params = {
			uids: sendIds,
			groupId : groupItemDetail.id
		}
		this.sendAddRequest(params);
		
	}

	renderOther=()=>{
		return (
			
			<a style={{width:80,height:30,background:'#499df1',color:'#fff',display:'inline-block',borderRadius:'4px',lineHeight:'30px',textAlign:'center',boxShadow:' 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)',marginRight:20,cursor: 'pointer'}} 
				onClick={this.batchAddMemberBtn}>
				批量添加
			</a>

			
		)
	}

	batchAddMemberBtn=()=>{
		let {selectedListData} = this.state;
		if(selectedListData.length<1){
			Message.warntimeout("请选择您要添加的会员","error");
			return;
		}
		this.openBatchAddDialogFun();
	}

	onSelect=(result,selectedListData)=>{
		
		this.setState({
            selectedListData 
        })
	}

	onOperation=(type,itemDetail)=>{
		
		let that = this;
		this.setState({
			itemDetail
		})
		if(type=="addMember"){
			that.openAddMemberToGroupFun();
		}
	}


	render() {
		let {items,itemDetail,getAllMemberInDoorParams} = this.state;
		let {groupItemDetail} = this.props;
		
		return (
		    <div className="change-member-item-box" style={{backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={`全部会员`} description="" >
					<div className="group-manage-all-member-search">
						<SearchGroupMember submitSearchParams={this.submitSearchParams} clearParams={this.clearParams}/>
					</div>
					<Table
						className="member-list-table"
						style={{marginTop:0,position:'inherit'}}
						onLoaded={this.onLoaded}
						ajax={true}
						onProcessData={(state)=>{
							return state;
							}}
						exportSwitch={false}
						onOperation={this.onOperation}
						ajaxFieldListName='items'
						ajaxUrlName='getAllMemberInDoorPermissionApi'
						ajaxParams={getAllMemberInDoorParams}
						onPageChange={this.onPageChange}
						displayCheckbox={true}
						onSelect={this.onSelect}
					>
					<TableHeader>
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>电话</TableHeaderColumn>
						<TableHeaderColumn>社区名称</TableHeaderColumn>
						<TableHeaderColumn>公司</TableHeaderColumn>
						<TableHeaderColumn>邮箱</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody style={{position:'inherit'}}>
						<TableRow>
							
						<TableRowColumn name="name"
							style={{width:"15%"}}
							
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>

						<TableRowColumn 
							style={{width:"15%"}}
							name="phone" 
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
							name="communityName" 
							style={{width:"15%"}}
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
							name="companyName" 
							style={{width:"25%"}}
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
							name="email" 
							style={{width:"15%"}}
							component={(value,oldValue,itemData)=>{
							var TooltipStyle=""
							if(value.length==""){
								TooltipStyle="none"

							}else{
								TooltipStyle="block";
							}
								return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
								<Tooltip offsetTop={5} place='top'><span  className="start-end">{value}</span></Tooltip></div>)
						}} ></TableRowColumn>

						

						<TableRowColumn type="operation" style={{width:"10%",overflow:"visible"}} >

							<Button  label="添加"  type="operation" operation="addMember"/>

							
						</TableRowColumn>
						
						
					</TableRow>
						
					</TableBody>
						<TableFooter renderOther={this.renderOther} >
						</TableFooter>
					</Table>

					<Dialog
			          title="确认添加成员"
			          open={State.openAddMemberToGroup}
			          onClose={this.openAddMemberToGroupFun}
			          contentStyle={{width:425}}
			        >
			          <AddMemberToGroup
			            onCancel={this.openAddMemberToGroupFun}
						confirmAdd = {this.confirmAdd}
						groupItemDetail={groupItemDetail}
						itemDetail={itemDetail}
			          />
			        </Dialog>

					<Dialog
			          title="确认添加成员"
			          open={State.openBatchAddDialog}
			          onClose={this.openBatchAddDialogFun}
			          contentStyle={{width:425}}
			        >
			          <BatchAddMemberToGroup
			            onCancel={this.openBatchAddDialogFun}
						confirmBatchAddMember = {this.confirmBatchAddMember}
						groupItemDetail={groupItemDetail}
						itemDetail={itemDetail}
			          />
			        </Dialog>
					

				</Section>
			</div>
		);

	}

}
