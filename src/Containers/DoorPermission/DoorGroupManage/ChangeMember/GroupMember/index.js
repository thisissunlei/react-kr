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
 import SearchGroupMember from '../AllMemberManage/SearchGroupMember';
 import DeleteMemberFromGroup from './DeleteMemberFromGroup';
 import BatchDeleteMemberFromGroup from './BatchDeleteMemberFromGroup';
 import AllMemberList from './AllMemberList';


import State from './State';
import PropsState from '../../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class GroupMemberManage extends React.Component {

	constructor(props, context) {
        super(props, context);
        this.groupItemDetail  = this.props.groupItemDetail;
		this.state = {
            items : [],
			itemDetail:{},
			batchChecked :false,
			checkedIds : '',
			selectedListData : [],
            getDoorGroupMemberParams:{
                name : '',
                communityId :'',
                groupId : this.props.groupItemDetail.id,
                customerId : '',
				phone : '',
				page : 1,
				pageSize : 15
            }
		}
	}

	componentDidMount(){
        // this.getItemsData();
	}
	
	componentWillReceiveProps(nextProps){

		let {freshGroupMemberList} = this.props;
		if(freshGroupMemberList!==nextProps.freshGroupMemberList){
			this.refreshPage();
		}
	}

	

	submitSearchParams=(params)=>{
		let {groupItemDetail} = this.props;
		let that =this;
		var params = Object.assign({},params,{date:new Date(),groupId :groupItemDetail.id});
		this.setState({
			getDoorGroupMemberParams:params
		})
	}



	refreshPage=()=>{
		let {getDoorGroupMemberParams}  =this.state;
		let {groupItemDetail} = this.props;
		let that = this;
		var newObj = Object.assign({},getDoorGroupMemberParams,{date :new Date(),groupId :groupItemDetail.id });
		this.setState({
			getDoorGroupMemberParams:newObj
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
		Http.request('deleteGroupMemberApi',{},{ids:itemDetail.id}).then(function(response) {
			that.openDeleteMemberFromGroupFun();
			that.refreshPage();
			Message.success("移除成功");
			
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	

	openDeleteMemberFromGroupFun=()=>{
		State.openDeleteMemberFromGroup = !State.openDeleteMemberFromGroup;
	}
	

	batchDeleteMember=()=>{
		
		let {selectedListData} = this.state;
		if(selectedListData.length==0){
			Message.warntimeout("请选择您要移除的成员",'error');
			return ;
		}
		this.openBatchDeleteDialogFun();

	}

	openBatchDeleteDialogFun=()=>{
		State.openBatchDeleteDialog = !State.openBatchDeleteDialog
	}

	confirmBatchDelete=()=>{
		
		let {ids} = this.state;
		let that = this;
		Http.request('deleteGroupMemberApi',{},{ids:ids}).then(function(response) {

			that.openBatchDeleteDialogFun();
			that.refreshPage();
			that.setState({
				batchChecked : false
			})

		}).catch(function(err) {
			Message.error(err.message);
		});

	}

	onOperation=(type,itemDetail,event)=>{
		this.setState({
			ids : itemDetail.id,
			itemDetail
		})
		if(type=="deleteMember"){
			this.openDeleteMemberFromGroupFun();
		}
	}

	renderOther=()=>{
		return (
			
			<a style={{width:80,height:30,background:'#499df1',color:'#fff',display:'inline-block',borderRadius:'4px',lineHeight:'30px',textAlign:'center',boxShadow:' 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)',marginRight:20,cursor: 'pointer'}} 
				onClick={this.batchDeleteMember}>
				批量移除
			</a>

			
		)
	}

	batchDeleteMember=()=>{

        let _this =this;
        let {selectedListData}  = this.state;
       

        if(selectedListData.length<1){
            Message.warntimeout("请选择您要移除的成员","error")
        }else{

            let idList = [];
            selectedListData.map((item, value) => {
				idList.push(item.id)
			});
            var ids = idList.join(",");
            this.setState({
                ids 
            },function(){
                _this.openBatchDeleteDialogFun();
            })
        }
	}

	

	onSelect=(result,selectedListData)=>{
		this.setState({
            selectedListData 
        })
	}

	

	openAddMemberDialogFun=()=>{
		State.openAddMemberDialog = !State.openAddMemberDialog;
	}

	toMemberDetailInfo=(itemDetail,data)=>{
		window.open(`./#/member/memberManage/list/${itemDetail.uid}`,'_blank');
	}

	
	


	render() {
		let {
			items,batchChecked,itemDetail,getDoorGroupMemberParams
		} = this.state;
		let that = this;
		let {groupItemDetail} = this.props;
		let doorTypeOptions = PropsState.doorTypeOptions;
		var str = "组成员 | 组名称：" + groupItemDetail.name
		
		return (
		    <div className="change-member-item-box" style={{backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={str} description="" >
					<div style={{    float: "right", marginTop: "-60px"}}>
						<Button label="添加成员"  onTouchTap={this.openAddMemberDialogFun} className="button-list"/>
					</div>
					<div className="group-member-search-box">
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
						ajaxUrlName='getDoorGroupMemberList'
						ajaxParams={getDoorGroupMemberParams}
						onPageChange={this.onPageChange}
						displayCheckbox={true}
						onSelect={this.onSelect}
					>
					<TableHeader>
						<TableHeaderColumn>姓名</TableHeaderColumn>
						<TableHeaderColumn>电话</TableHeaderColumn>
						<TableHeaderColumn>操作人</TableHeaderColumn>
						<TableHeaderColumn>操作时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>
					<TableBody style={{position:'inherit'}}>
						<TableRow>
							
						
						<TableRowColumn name="name"
							style={{width:"20%"}}
							component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="inline-block";
								}
								return (<div style={{display:TooltipStyle,paddingTop:5,width:"100%"}} className='financeDetail-hover' ><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} ><span onClick={this.toMemberDetailInfo.bind(this,itemData,value)} style={{color:"#499df1",cursor:"pointer"}}>{value}</span></span>
									</div>
								)
							}} 
						>
						</TableRowColumn>

						<TableRowColumn 
							style={{width:"20%"}}
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
							name="creatorName" 
							style={{width:"20%"}}
							component={(value,oldValue,itemData)=>{
							var TooltipStyle=""
							if(value.length==""){
								TooltipStyle="none"

							}else{
								TooltipStyle="block";
							}
								return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
								</div>)
						}} ></TableRowColumn>
						
						<TableRowColumn 
							name="ctime" 
							type="date" 
							format="yyyy-mm-dd HH:MM:ss"
							style={{width:"20%"}}
						>
						</TableRowColumn>
						

						

						<TableRowColumn type="operation" style={{width:"15%",overflow:"visible"}} >

							<Button  label="移除"  type="operation" operation="deleteMember"/>
							
						</TableRowColumn>
						
						
					</TableRow>
						
					</TableBody>
						<TableFooter renderOther={this.renderOther} >
						</TableFooter>
					</Table>

					<Dialog
			          title="确认移除成员"
			          open={State.openDeleteMemberFromGroup}
			          onClose={this.openDeleteMemberFromGroupFun}
			          contentStyle={{width:425}}
			        >
			          <DeleteMemberFromGroup
			            onCancel={this.openDeleteMemberFromGroupFun}
						confirmDelete = {this.confirmDelete}
						groupItemDetail={groupItemDetail}
						itemDetail={itemDetail}
			          />
			        </Dialog>

					<Dialog
			          title="确认移除成员"
			          open={State.openBatchDeleteDialog}
			          onClose={this.openBatchDeleteDialogFun}
			          contentStyle={{width:425}}
			        >
			          <BatchDeleteMemberFromGroup
			            onCancel={this.openBatchDeleteDialogFun}
						confirmDelete = {this.confirmBatchDelete}
						groupItemDetail={groupItemDetail}
						
			          />
			        </Dialog>
					<Drawer 
			        	open={State.openAddMemberDialog}
			        	onClose = {this.openAddMemberDialogFun}
					    width={"70%"} 
					    openSecondary={true} 
					>
						<AllMemberList groupItemDetail={groupItemDetail} freshGroupMemberList={this.refreshPage}/>
						
					</Drawer>

				</Section>
			</div>
		);

	}

}
