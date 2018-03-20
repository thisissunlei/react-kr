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
            searchParams:{
                name : '',
                communityId :'',
                groupId : '',
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
		console.log("<=======>groupItemDetail",groupItemDetail);
		var params = Object.assign({},searchParams,{groupId : groupItemDetail.id});
        Http.request('getDoorGroupMemberList',params).then(function(response) {
			that.setState({
                items: response.items
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

	confirmDelete=()=>{
		
		let {itemDetail,getDoorPermissionListParams}  = this.state;
		let that = this;
		Http.request('deleteDoorGroup',{id:itemDetail.id}).then(function(response) {
			Message.success("删除成功");
			that.openDeleteMemberFromGroupFun();
			that.refreshPage();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	openChangeMemeberFun=()=>{

		State.openChangeMemeberDialog = !State.openChangeMemeberDialog;
	}

	deleteMember=(item)=>{

		console.log("item",item);
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

    renderItemsList=(items)=>{
		let that = this;
        var dom = items.map(function(item,index){
            return (
                <div key={index} className="item-line">
					<span  className="first-line-item item-line-span">
						<input type="checkbox"/>
					</span>
                    <span className="item-line-span">{item.name}</span>
					<span className="item-line-span">{item.phone}</span>
					<span className="item-line-span">{item.communityName}</span>
					<span className="item-line-span">{item.customerName}</span>
					<span className="item-line-span">{item.email}</span>
					<span className="item-line-span last-line-span" onClick={that.deleteMember.bind(this,item)}>移除</span>
                </div>
            )
        });
        return dom;
    }

	render() {
		let {
			items
		} = this.state;
		
		return (
		    <div className="change-member-item-box" style={{backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={`组成员`} description="" >
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
							<span className="item-line-span">公司</span>
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
										<input type="checkbox"/>
										<span style={{marginLeft:5}}>全选</span>
									</ListGroupItem>
									<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
										<Button  label="批量删除" type="button"  cancle={true} onTouchTap={this.closeNewCreateDoorGroup} />
									</ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
						
                    </div>

					<Dialog
			          title="移除成员"
			          open={State.openDeleteMemberFromGroup}
			          onClose={this.openDeleteMemberFromGroupFun}
			          contentStyle={{width:425}}
			        >
			          <DeleteMemberFromGroup
			            onCancel={this.openDeleteMemberFromGroupFun}
						confirmDelete = {this.confirmDelete}
						
			          />
			        </Dialog>
					

				</Section>
			</div>
		);

	}

}
