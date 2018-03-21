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
 import DeleteMemberFromGroup from './DeleteMemberFromGroup';
 import BatchDeleteMemberFromGroup from './BatchDeleteMemberFromGroup';


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
			batchChecked :false,
			checkedIds : '',
            searchParams:{
                communityId :'',
                doorType : '',
				floor : '',
				deviceId : '',
				title : '',
				doorCode:''
            }
		}
	}

	componentDidMount(){
		State.getDicOptions();
        this.getItemsData();
    }
    
    getItemsData=()=>{
        let that = this;
		let {searchParams} = this.state;
		let {groupItemDetail} = this.props;
		
		var params = Object.assign({},searchParams,{groupId : groupItemDetail.id});
        Http.request('getGroupAuthorizeEquipmentApi',params).then(function(response) {
			var returnItems= response.items;
			returnItems.forEach(function(element,index,array){
				element.checked = false;
			})
			
			that.setState({
				items: response.items,
				// batchChecked :
            })
		}).catch(function(err) {
			Message.error(err.message);
		});
    }
	
	

	submitSearchParams=(params)=>{

		let that =this;
		let {searchParams} = this.state;
		var params = Object.assign({},params,{date:new Date()});
		this.setState({
			searchParams:params
		},function(){
			that.getItemsData();
		})
	}



	refreshPage=()=>{
		let {searchParams}  =this.state;
		let that = this;
		var newObj = Object.assign({},searchParams,{date :new Date()});
		this.setState({
			searchParams:newObj
		},function(){
			that.getItemsData();
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
		Http.request('deleteEquipmentFromGroupApi',{ids:itemDetail.id}).then(function(response) {
			Message.success("删除成功");
			that.openDeleteMemberFromGroupFun();
			that.refreshPage();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	deleteMember=(item)=>{

		let that = this;
		this.setState({
			itemDetail : item
		},function(){
			that.openDeleteMemberFromGroupFun();
		})
		

	}

	openDeleteMemberFromGroupFun=()=>{
		State.openDeleteMemberFromGroup = !State.openDeleteMemberFromGroup;
	}

	changeItemCheckbox=(item)=>{
		let {batchChecked} = this.state;
		if(item.checked){
			this.setState({
				batchChecked : false
			})
		}
		item.checked = !item.checked;
		let {items} = this.state;
		this.setState({
			items : items
		})
	}

	renderDoorType=(doorType)=>{
		for(let i=0;i<State.doorTypeOptions.length;i++){
			if(State.doorTypeOptions[i].value == doorType){
				return(
					<span>{State.doorTypeOptions[i].label}</span>
				)
			}
		}

	}

    renderItemsList=(items)=>{
		let that = this;
        var dom = items.map(function(item,index){
            return (
                <div key={index} className="item-line">
					<span  className="first-line-item item-line-span">
						<input type="checkbox"  checked={item.checked?"checked":""} onClick={that.changeItemCheckbox.bind(this,item)}/>
					</span>
                    <span className="item-line-span">{item.communityName}</span>
					<span className="item-line-span">{item.title}</span>
					<span className="item-line-span">{item.doorCode}</span>
					<span className="item-line-span deviceId-line-span">{item.deviceId}</span>
					<span className="item-line-span">{that.renderDoorType(item.doorType)}</span>
					<span className="item-line-span last-line-span" onClick={that.deleteMember.bind(this,item)}>移除</span>
                </div>
            )
        });
        return dom;
	}
	
	changeBatchCheck=()=>{

		let {batchChecked,items} = this.state;
		let that = this;
		items.forEach(function(element,index,array){
			element.checked = !batchChecked;
		})
		this.setState({
			batchChecked : !batchChecked,
			items : items
		})
	}

	batchDeleteMember=()=>{
		
		let {items} = this.state;
		var chekedNum=0;
		for(let i=0;i<items.length;i++){
			if(items[i].checked){
				chekedNum++;
			}
		}
		if(chekedNum==0){
			Message.warntimeout("请选择您要删除的成员",'error');
			return ;
		}
		this.openBatchDeleteDialogFun();

	}

	openBatchDeleteDialogFun=()=>{
		State.openBatchDeleteDialog = !State.openBatchDeleteDialog
	}

	confirmBatchDelete=()=>{
		let {items} = this.state;
		let that = this;
		var toDeleteIds = [];
		for(let i=0;i<items.length;i++){
			if(items[i].checked){
				toDeleteIds.push(items[i].id)
			}
		}
		var toDeleteIdsStr = toDeleteIds.join(",");
		Http.request('deleteEquipmentFromGroupApi',{ids:toDeleteIdsStr}).then(function(response) {

			that.openBatchDeleteDialogFun();
			that.refreshPage();
			that.setState({
				batchChecked : false
			})

		}).catch(function(err) {
			Message.error(err.message);
		});

	}


	render() {
		let {
			items,batchChecked,itemDetail
		} = this.state;
		let that = this;
		let {groupItemDetail} = this.props;
		
		return (
		    <div className="change-member-item-box" style={{backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={`已授权设备`} description="" >
					<div>
						<SearchGroupMember submitSearchParams={this.submitSearchParams} clearParams={this.clearParams} />
					</div>
                    <div className="table">
						<div className="title">
							<span  className="first-line-item">
							
							</span>
							<span className="item-line-span">社区名称</span>
							<span className="item-line-span">屏幕展示标题</span>
							<span className="item-line-span">屏幕展示编号</span>
							<span className="item-line-span">硬件ID</span>
							<span className="item-line-span">门类型</span>
							<span className="item-line-span last-line-span">操作</span>
						</div>
                        {
                            this.renderItemsList(items)
						}
						<Grid>
							<Row style={{marginTop:10}}>
								<ListGroup >
									<ListGroupItem style={{padding:"7px 10px 0 5px",display:'inline-block',}}>
										<input type="checkbox" checked={batchChecked} onClick={that.changeBatchCheck}/>
										<span style={{marginLeft:5}}>全选</span>
									</ListGroupItem>
									<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
										<Button  label="批量删除" type="button"  cancle={true} onTouchTap={this.batchDeleteMember} />
									</ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
						
                    </div>

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
					

				</Section>
			</div>
		);

	}

}
