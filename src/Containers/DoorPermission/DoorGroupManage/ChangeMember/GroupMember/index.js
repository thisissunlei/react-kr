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
        this.groupId  = this.props.groupItemDetail.id;
		this.state = {
            items : [],
            itemDetail:{},
            searchParams:{
                name : '',
                communityId :'',
                groupId : this.props.groupItemDetail.id,
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
		
        Http.request('getDoorGroupMemberList',searchParams).then(function(response) {
			that.setState({
                items: response.items
            })
		}).catch(function(err) {
			Message.error(err.message);
		});
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

	//操作相关
	onOperation=(type, itemDetail)=>{
		State.itemDetail = itemDetail;
		this.setState({
			itemDetail
		})
		let _this = this;
		if (type == 'delete') {
			
			_this.openDeleteGroupFun();
		}
		if(type == 'detail') {
			// _this.openUpgradeAddFun();
		}
		if(type=='changeMember'){
			
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

		let that =this;
		let {searchParams} = this.state;
		var params = Object.assign({},searchParams,params,{date:new Date()});
		this.setState({
			searchParams:params
		},function(){
			that.getItemsData();
		})
	}


	submitNewCreateDoorGoup=(values)=>{
		let that= this;
		let {getDoorPermissionListParams} = this.state;
		Http.request('newCreateDoorGroup',{},values).then(function(response) {
			Message.success("添加成功");
			that.refreshPage();
			that.openNewCreateDoorGoupDialog();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	refreshPage=()=>{
		let {getDoorPermissionListParams}  =this.state;
		var newObj = Object.assign({},getDoorPermissionListParams,{date :new Date()});
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
			Message.success("删除成功");
			that.refreshPage();
			that.openDeleteGroupFun();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	openChangeMemeberFun=()=>{

		State.openChangeMemeberDialog = !State.openChangeMemeberDialog;
	}

    renderItemsList=(items)=>{

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
					<span className="item-line-span last-line-span">移除</span>
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
					
					

				</Section>
			</div>
		);

	}

}
