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
			batchChecked :false,
			checkedIds : '',
            searchParams:{
                name : '',
                communityId :'',
                customerId : '',
                phone : ''
            }
		}
	}

	componentDidMount(){
        this.getItemsData();
    }
    
    getItemsData=()=>{
        let that = this;
		let {searchParams} = this.state;
		let {groupItemDetail} = this.props;
		
		var params = Object.assign({},searchParams);
        Http.request('getAllMemberInDoorPermissionApi',params).then(function(response) {
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
		var params = Object.assign({},searchParams,params,{date:new Date()});
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

	confirmAdd=()=>{
		
		let {itemDetail,getDoorPermissionListParams}  = this.state;
		let {groupItemDetail}= this.props;
		let that = this;
		var params = {
			uids:itemDetail.uid,
			groupId : groupItemDetail.id
		}
		that.sendAddRequest(params);
	}



	sendAddRequest=(params)=>{

		let that = this;
		Http.request('addGroupMemberApi',{},params).then(function(response) {
			Message.success("添加成功");

			State.openAddMemberToGroup = false;
			State.openBatchAddDialog = false;
		
			let {freshGroupMemberList} = that.props;
			freshGroupMemberList && freshGroupMemberList();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	addMember=(item)=>{
		
		let that = this;
		this.setState({
			itemDetail : item
		},function(){
			that.openAddMemberToGroupFun();
		})
		

	}

	openAddMemberToGroupFun=()=>{
		State.openAddMemberToGroup = !State.openAddMemberToGroup;
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

    renderItemsList=(items)=>{
		let that = this;
        var dom = items.map(function(item,index){
            return (
                <div key={index} className="item-line">
					<span  className="first-line-item item-line-span">
						<input type="checkbox"  checked={item.checked?"checked":""} onClick={that.changeItemCheckbox.bind(this,item)}/>
					</span>
                    <span className="item-line-span">{item.name}</span>
					<span className="item-line-span">{item.phone}</span>
					<span className="item-line-span">{item.communityName}</span>
					<span className="item-line-span company-item-span">{item.companyName}</span>
					<span className="item-line-span">{item.email}</span>
					<span className="item-line-span last-line-span" onClick={that.addMember.bind(this,item)}>添加</span>
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

	batchAddMember=()=>{
		
		let {items} = this.state;
		console.log("batch==>items",items);
		var chekedNum=0;
		for(let i=0;i<items.length;i++){
			if(items[i].checked){
				chekedNum++;
			}
		}
		if(chekedNum==0){
			Message.warntimeout("请选择您要添加的成员",'error');
			return ;
		}
		this.openBatchAddDialogFun();

	}

	openBatchAddDialogFun=()=>{
		State.openBatchAddDialog = !State.openBatchAddDialog
	}

	confirmBatchAddMember=()=>{
		let {items} = this.state;
		let {groupItemDetail} = this.props;
		let that = this;
		var toAddIds = [];
		for(let i=0;i<items.length;i++){
			if(items[i].checked){
				toAddIds.push(items[i].uid)
			}
		}
		var toAddIdsStr = toAddIds.join(",");
		var params = {groupId: groupItemDetail.id,uids :toAddIdsStr }
		that.sendAddRequest(params);
		

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
				<Section title={`全部会员`} description="" >
					<div>
						<SearchGroupMember submitSearchParams={this.submitSearchParams} clearParams={this.clearParams}/>
					</div>
                    <div className="table">
						<div className="title">
							<span  className="first-line-item">
							
							</span>
							<span className="item-line-span">姓名</span>
							<span className="item-line-span">电话</span>
							<span className="item-line-span">社区</span>
							<span className="item-line-span company-item-span">公司</span>
							<span className="item-line-span">邮箱</span>
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
										<Button  label="批量添加" type="button"  cancle={true} onTouchTap={this.batchAddMember} />
									</ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
						
                    </div>

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
