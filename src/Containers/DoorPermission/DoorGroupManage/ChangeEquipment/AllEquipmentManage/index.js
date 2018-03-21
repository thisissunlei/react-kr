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
 import SearchAllEquipment from './SearchAllEquipment';
 import AddEquipmentToGroup from './AddEquipmentToGroup';
 import BatchAddEquipmentToGroup from './BatchAddEquipmentToGroup';


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
			doorTypeOptions:[],
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
		this.getBasicInfoList();
        this.getItemsData();
	}
	
	getBasicInfoList=()=>{
		let that = this;
		Http.request('getWarningType',{}).then(function(response) {
			var arrNew = []
			if(response.DoorType){
				for (var i=0;i<response.DoorType.length;i++){
	
				arrNew[i] = {
							label:response.DoorType[i].desc,
							value:response.DoorType[i].value
						}
				}
			}
	
			that.setState({
				doorTypeOptions : arrNew
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
    
    getItemsData=()=>{
        let that = this;
		let {searchParams} = this.state;
		let {groupItemDetail} = this.props;
		
		var params = Object.assign({},searchParams,{groupId : groupItemDetail.id});
        Http.request('doorGroupAllEquipmentApi',params).then(function(response) {

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

	confirmAddEquipment=(values)=>{

		let {itemDetail,getDoorPermissionListParams}  = this.state;
		let {groupItemDetail} = this.props;
		
		var params = {
			deviceIds : itemDetail.id,
			granteeId : groupItemDetail.id,
			granteeType : "USER_GROUP"
		}
		var sendParams = Object.assign({},params,values)

		this.sendAddRequest(sendParams);
		
	}

	sendAddRequest=(sendParams)=>{
		let that = this;
		Http.request('addEquipmentToGroupApi',{},sendParams).then(function(response) {
			Message.success("授权成功");
			State.openAddEquipmentToGroup = false;
			State.openBatchAddDialog = false;
			that.setState({
				batchChecked : false
			})
			// 刷新组内设备列表
			let {refreshEquipmentInGroupList} = that.props;
			refreshEquipmentInGroupList && refreshEquipmentInGroupList();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	confirmBatchAdd=(values)=>{

		let {items} = this.state;
		let {groupItemDetail} = this.props;
		
		let that = this;
		var toDeleteIds = [];
		for(let i=0;i<items.length;i++){
			if(items[i].checked){
				toDeleteIds.push(items[i].id)
			}
		}
		var toDeleteIdsStr = toDeleteIds.join(",");
		var params = {
			deviceIds : toDeleteIdsStr,
			granteeId : groupItemDetail.id,
			granteeType : "USER_GROUP"
		}
		var sendParams = Object.assign(params,values)
		this.sendAddRequest(sendParams);
	
	}


	addMember=(item)=>{

		let that = this;
		this.setState({
			itemDetail : item
		},function(){
			that.openAddEquipmentToGroupFun();
		})
		

	}

	openAddEquipmentToGroupFun=()=>{
		State.openAddEquipmentToGroup = !State.openAddEquipmentToGroup;
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
		let {doorTypeOptions} = this.state;
		for(let i=0;i<doorTypeOptions.length;i++){
			if(doorTypeOptions[i].value == doorType){
				return(
					<span>{doorTypeOptions[i].label}</span>
				)
			}else{
				return(
					<span>doorType</span>
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
					<span className="item-line-span last-line-span" onClick={that.addMember.bind(this,item)}>授权</span>
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
			Message.warntimeout("请选择您要授权的设备",'error');
			return ;
		}
		this.openBatchAddDialogFun();

	}

	openBatchAddDialogFun=()=>{
		State.openBatchAddDialog = !State.openBatchAddDialog
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
						<SearchAllEquipment submitSearchParams={this.submitSearchParams} clearParams={this.clearParams} />
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
										<Button  label="批量授权" type="button"  cancle={true} onTouchTap={this.batchDeleteMember} />
									</ListGroupItem>
								</ListGroup>					
							</Row>
						</Grid>
						
                    </div>

					<Dialog
			          title="授权时间"
			          open={State.openAddEquipmentToGroup}
			          onClose={that.openAddEquipmentToGroupFun}
			          contentStyle={{width:425}}
			        >
			          <AddEquipmentToGroup
			            onCancel={that.openAddEquipmentToGroupFun}
						confirmAddEquipment = {that.confirmAddEquipment}
			          />
			        </Dialog>

					<Dialog
			          title="授权时间"
			          open={State.openBatchAddDialog}
			          onClose={that.openBatchAddDialogFun}
			          contentStyle={{width:425}}
			        >
			          <BatchAddEquipmentToGroup
			            onCancel={that.openBatchAddDialogFun}
						confirmBatchAdd = {that.confirmBatchAdd}
			          />
			        </Dialog>
					

				</Section>
			</div>
		);

	}

}
