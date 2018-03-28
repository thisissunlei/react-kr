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
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import DropOutGroup from './DropOutGroup';
import AuthorizationEquipment from '../AuthorizationEquipment';
import AllGroupList from '../../DoorGroupManage';
import AddMemberIntoGroup from './AddMemberIntoGroup';
import close from "../images/close.svg";

import PropsState from '../State';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class BelongOfDoorGroup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
            items : [],
			getGroupContainMemberParams:{
                uid : ''
            },
            itemDetail : {},
            authorazitionEquipmentList : []
		}
	}

	componentDidMount(){
        
    }

    getItems=()=>{
        

        let that = this;
        let {memberDetailInfo} =this.props;
        let {getGroupContainMemberParams} = that.state;
        let obj = {uid:memberDetailInfo.uid }
        let sendParams = Object.assign({},getGroupContainMemberParams,obj);
        Http.request('getGroupContainMember',sendParams).then(function(response) {
            that.setState({
                items : response.items,
                getGroupContainMemberParams : sendParams
            })
        }).catch(function(err) {
            Message.error(err.message);
        });
       
    }

    componentWillReceiveProps(nextProps){

        let that = this;
        let {memberDetailInfo} = this.props;
        if(memberDetailInfo !== nextProps.memberDetailInfo){
            this.setState({
                getGroupContainMemberParams : {
                    uid : nextProps.memberDetailInfo.uid
                }
            },function(){
                that.getItems();
            })
        }
    }

    
    clickShowDropOutGroup=(item)=>{
        let that = this;
        this.setState({
            itemDetail : item
        },function(){
            that.showDropOutGroupFun();
        })
    }


    showDropOutGroupFun=()=>{
        State.showDropOutGroup = !State.showDropOutGroup
    }

    confirmDropOutGroup=()=>{
        let {itemDetail} = this.state;
        let {memberDetailInfo} = this.props;
        let that = this;
        Http.request('personPageDropOutGroup',{uid :memberDetailInfo.uid,groupId : itemDetail.id}).then(function(response) {
            that.showDropOutGroupFun();
            Message.success("移出成功");
            that.getItems();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    
    returnGroupLevel=(item)=>{
        let {groupLevelOptions} = PropsState;
        for(let i =0 ;i<groupLevelOptions.length;i++){
            if(item.groupLevel ==groupLevelOptions[i].value ){
                return(
                    <span>{groupLevelOptions[i].label}</span>
                )
            }
        }
    }


    clickShowAuthorizationEquipment=(item)=>{
        let _this =this;
        this.setState({
            itemDetail: item
        })
            
        _this.getgetGroupAuthorizeEquipmentList(item)
       
    }

    getgetGroupAuthorizeEquipmentList=(item)=>{

        let that =this;
        let params = {granteeId:item.id,granteeType:"USER_GROUP",page:1,pageSize:15}
        Http.request('getGroupAuthorizeEquipmentApi',params).then(function(response) {
            that.setState({
                authorazitionEquipmentList : response.items
            })
            that.showAuthorizationEquipmentFun();

        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    showAuthorizationEquipmentFun=()=>{
        State.showAuthorizationEquipmentDialog = !State.showAuthorizationEquipmentDialog;
    }

    



    renderItems=(items)=>{
        let that = this;
        var dom = items.map(function(item,index){
            return(
                <div className="content-item-line" key={index}>
                    <span className="item-block" style={{width:"15%"}}>{item.name}</span>
                    <span className="item-block" style={{width:"8%"}}>
                        {
                            that.returnGroupLevel(item)
                        }
                    </span>
                    <span className="item-block" style={{width:"12%"}}>{item.communityName}</span>
                    <span className="item-block" style={{width:"25%"}}>{item.customerName}</span>
                    <span className="item-block" style={{width:"15%"}}>{ DateFormat(item.ctime,"yyyy-mm-dd HH:MM:ss")}</span>
                    <span className="item-block" style={{width:"6%"}}>{item.creatorName}</span>
                    <span className="item-block" style={{width:"19%"}}>
                        <Button  label="移出组"  type="operation" operation="dropOutGroup" onClick={that.clickShowDropOutGroup.bind(this,item)}/>
                        {
                            item.groupLevel == "NORMAL" &&
                            
                            <Button  label="组授权设备"  type="operation" operation="changeEquipment" onClick={that.clickShowAuthorizationEquipment.bind(this,item)}/>
                            
                        }
                    </span>
                </div>
            )
        })
        return dom;
    }

    openAllGroupList=()=>{
        
        State.openAllGroupListDialog = !State.openAllGroupListDialog
    }


    confirmAddMemberToGroup=()=>{
        let that = this;
        let  {memberDetailInfo} = this.props;
        let {groupDetail}= this.state;
        let sendParams ={
            groupId : groupDetail.id,
            uids : memberDetailInfo.uid
        }
        Http.request('addGroupMemberApi',{},sendParams).then(function(response) {
            
            that.openAddTipDialogFun();
            Message.success("成功加入组");
            that.getItems();
            
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    clickAddMemberBtn=(groupDetail)=>{

        let _this =this;
        this.setState({
            groupDetail :groupDetail
        },function(){
            _this.openAddTipDialogFun();
        })
        
    }



    openAddTipDialogFun=()=>{
        State.openAddTipDialog = !State.openAddTipDialog;
    }




    


	render() {
        let {memberDetailInfo,doorTypeOptions} = this.props;
        let groupLevelOptions = PropsState.groupLevelOptions;
        var title = memberDetailInfo.name + "已加入的组";
        let {getGroupContainMemberParams,itemDetail,items,authorazitionEquipmentList,groupDetail} = this.state;
        
		return (
		    <div className="belong-of-door-group" >
                <div className="add-group-btn">
                    <Button label="加入组"  onTouchTap={this.openAllGroupList} />
                </div>
				<Section title={title} description="" >
                    <div className="title-line">
                        <span className="item-block" style={{width:"15%"}} >组名称</span>
                        <span className="item-block" style={{width:"8%"}}>组级别</span>
                        <span className="item-block" style={{width:"12%"}}>所属社区</span>
                        <span className="item-block" style={{width:"25%"}}>公司名称</span>
                        <span className="item-block" style={{width:"15%"}}>创建时间</span>
                        <span className="item-block" style={{width:"6%"}}>创建人</span>
                        <span className="item-block" style={{width:"18%"}}>操作</span>

                    </div>
                    <div className="table-body-content">
                        {
                            this.renderItems(items)
                        }
                    </div>
                    
                    
                    <Dialog
			          title="退出组"
			          open={State.showDropOutGroup}
			          onClose={this.showDropOutGroupFun}
			          contentStyle={{width:425}}
			        >
			          <DropOutGroup
			            onCancel={this.showDropOutGroupFun}
                        confirmDropOutGroup = {this.confirmDropOutGroup}
                        itemDetail = {itemDetail}
                        memberDetailInfo={memberDetailInfo}
			          />
			        </Dialog>

                    <Drawer 
			        	open={State.showAuthorizationEquipmentDialog}
			        	onClose = {this.showAuthorizationEquipmentFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
                        <div className="person-group-items-list">   
                            <div className="person-group-item-list-close-btn">
                                <img src={close} onClick={this.showAuthorizationEquipmentFun}/>
                            
                            </div>                
                            <AuthorizationEquipment 
                                memberDetailInfo={itemDetail} 
                                granteeId={itemDetail.id} 
                                doorTypeOptions={doorTypeOptions} 
                                granteeType="USER_GROUP"
                                noShowAddNew = {true}
                                rootPage = "personal"
                            /> 
                        </div>  

					</Drawer>
                    <Drawer 
			        	open={State.openAllGroupListDialog}
			        	onClose = {this.openAllGroupList}
					    width={"70%"} 
					    openSecondary={true} 
					>
                        <div className="person-group-items-list">   
                            <div className="person-group-item-list-close-btn">
                                <img src={close} onClick={this.openAllGroupList}/>
                            </div>                
                            <AllGroupList rootPage="personalDoorPermmision" clickAddMemberBtn={this.clickAddMemberBtn}/> 
                        </div>  

					</Drawer>

                    <Dialog
			          title="将成员加入组"
			          open={State.openAddTipDialog}
			          onClose={this.openAddTipDialogFun}
			          contentStyle={{width:425}}
			        >
                      <AddMemberIntoGroup 
                        memberDetailInfo={memberDetailInfo} 
                        confirmAddMemberToGroup={this.confirmAddMemberToGroup}
                        groupDetail ={groupDetail}
                    />
			        </Dialog>
                    

                </Section>
			</div>
		);

	}

}
