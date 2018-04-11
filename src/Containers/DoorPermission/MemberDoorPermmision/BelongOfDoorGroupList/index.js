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
import MemberAuthoriazationEquipment from '../MemberAuthoriazationEquipment';
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
        this.memberDetailInfo = this.props.memberDetailInfo;
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
        let {memberDetailInfo,memberId} =this.props;
        this.setState({
            getGroupContainMemberParams:{
                uid : memberId,
                page : 1,
                pageSize : 25,
            },
        })
    }


    componentWillReceiveProps(nextProps){

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
        let {memberDetailInf,memberId} = this.props;
        let that = this;
        
        Http.request('deleteGroupMemberApi',{},{ids: itemDetail.id}).then(function(response) {
            that.showDropOutGroupFun();
            Message.success("移出成功");
            that.refreshPage();
        }).catch(function(err) {
            Message.error(err.message);
        });
       
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
        let params = {granteeId:item.id,granteeType:"USER_GROUP",page:1,pageSize:25}
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


    openAllGroupList=()=>{
        
        State.openAllGroupListDialog = !State.openAllGroupListDialog
    }


    confirmAddMemberToGroup=()=>{
        let that = this;
        let  {memberDetailInfo} = this.props;
        let {groupDetail}= this.state;
        var  sendParams;
        if(memberDetailInfo.accountInfo){
            sendParams ={
                groupId : groupDetail.id,
                uids : memberDetailInfo.accountInfo.uid
            }
        }
        
        Http.request('addGroupMemberApi',{},sendParams).then(function(response) {
            
            that.openAddTipDialogFun();
            Message.success("成功加入组");
            that.refreshPage();
            
        }).catch(function(err) {
            Message.error(err.message);
        });
    }

    refreshPage=()=>{
        let {getGroupContainMemberParams} = this.state;
        let newObj = {date: new Date()};
        let newParams = Object.assign({},getGroupContainMemberParams,newObj)
        this.setState({
            getGroupContainMemberParams:newParams
        })
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
        var title = "已加入的组";
        let {getGroupContainMemberParams,itemDetail,items,authorazitionEquipmentList,groupDetail} = this.state;
        let that = this;
		return (
		    <div className="belong-of-door-group" >
                <div className="add-group-btn">
                    <Button label="加入组"  onTouchTap={this.openAllGroupList} />
                </div>
				<Section title={title} description="" >
                    
                  {
                      getGroupContainMemberParams.uid && 
                      <Table
                        className="member-list-table"
                        style={{position:'inherit'}}
                        onLoaded={this.onLoaded}
                        ajax={true}
                        onProcessData={(state)=>{
                            return state;
                            }}
                        exportSwitch={false}
                        onOperation={this.onOperation}
                        ajaxFieldListName='items'
                        ajaxUrlName='getGroupContainMember'
                        ajaxParams={getGroupContainMemberParams}
                        onPageChange={this.onPageChange}
                        displayCheckbox={true}
                        onSelect={this.onSelect}
                    >
                    <TableHeader>
                        <TableHeaderColumn>组名称</TableHeaderColumn>
                        <TableHeaderColumn>组级别</TableHeaderColumn>
                        <TableHeaderColumn>所属社区</TableHeaderColumn>
                        <TableHeaderColumn>公司名称</TableHeaderColumn>
                        <TableHeaderColumn>加入时间</TableHeaderColumn>
                        <TableHeaderColumn>操作人</TableHeaderColumn>
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
                            
                            <TableRowColumn name="groupLevel"
                            style={{width:"8%"}}
                            options={groupLevelOptions}
                            component={(value,oldValue)=>{
                                if(value==""){
                                    value="-"
                                }
                                return (<span>{value}</span>)}}
                            ></TableRowColumn>


                            <TableRowColumn 
                                style={{width:"12%"}}
                                name="communityName" 
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
                                name="customerName" 
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
                                style={{width:"15%"}}
                                name="ctime" 
                                type="date" 
                                format="yyyy-mm-dd HH:MM:ss" 
                            >
                            </TableRowColumn>

                            <TableRowColumn name="creatorName"
                            style={{width:"6%"}}
                            options={doorTypeOptions}
                            component={(value,oldValue)=>{
                                if(value==""){
                                    value="-"
                                }
                                return (<span>{value}</span>)}}
                            ></TableRowColumn>


                            
                            <TableRowColumn type="operation"
                                style={{width:"19%"}}
                                component={
                                    (itemData)=>{
                                        
                                        return (
                                                <div>
                                                    <Button  label="移出组"  type="operation" operation="dropOutGroup" onClick={that.clickShowDropOutGroup.bind(this,itemData)}/>
                                                    {
                                                        itemData.groupLevel == "NORMAL" &&
                                                        
                                                        <Button  label="组授权设备"  type="operation" operation="changeEquipment" onClick={that.clickShowAuthorizationEquipment.bind(this,itemData)}/>
                                                        
                                                    }

                                                </div>
                                            )
                                    }
                                }
                            > 
                            </TableRowColumn>

                        

                    </TableRow>
                    
                    </TableBody>
                    
                    <TableFooter>
                    </TableFooter>
                    </Table>
                  }  
                
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
                            <MemberAuthoriazationEquipment 
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
