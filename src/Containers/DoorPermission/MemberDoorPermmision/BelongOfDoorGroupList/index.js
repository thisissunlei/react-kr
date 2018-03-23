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

import DropOutGroup from './DropOutGroup';
import GroupAuthoriazitionEquipment from './GroupAuthoriazitionEquipment';

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
        this.getItems();
    }

    getItems=()=>{
        let that = this;
        let {memberDetailInfo} = this.props;

        this.setState({
            getGroupContainMemberParams:{
                uid : memberDetailInfo.uid
            }
        },function(){
            let {getGroupContainMemberParams} = that.state;
            Http.request('getGroupContainMember',getGroupContainMemberParams).then(function(response) {
                that.setState({
                    items : response.items
                })
            }).catch(function(err) {
                Message.error(err.message);
            });
        })
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
        let that = this;
        Http.request('deleteEquipmentFromGroupApi',{ids : itemDetail.id}).then(function(response) {
            Message.success("取消授权成功");
            that.showDropOutGroupFun();
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
    //    console.log("item",item)
        let _this =this;
        this.setState({
            itemDetail: item
        },function(){
            
            _this.getgetGroupAuthorizeEquipmentList()
        })
    }

    getgetGroupAuthorizeEquipmentList=()=>{
        let {itemDetail} = this.state;
        // console.log("itemDetail====>",itemDetail);
        let that =this;
        let params = {granteeId:itemDetail.id,granteeType:"USER"}
        Http.request('getGroupAuthorizeEquipmentApi',params).then(function(response) {
            that.setState({
                authorazitionEquipmentList : response.items
            },function(){
                that.showAuthorizationEquipmentFun();
            })
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
                    <span className="item-block" style={{width:"13%"}}>{item.communityName}</span>
                    <span className="item-block" style={{width:"13%"}}>{item.customerName}</span>
                    <span className="item-block" style={{width:"15%"}}>{item.name}</span>
                    <span className="item-block" style={{width:"13%"}}>{item.creatorName}</span>
                    <span className="item-block" style={{width:"19%"}}>
                        <Button  label="退出该组"  type="operation" operation="dropOutGroup" onClick={that.clickShowDropOutGroup.bind(this,item)}/>
                        <Button  label="查看组授权设备"  type="operation" operation="changeEquipment" onClick={that.clickShowAuthorizationEquipment.bind(this,item)}/>
                        {/* <span onClick={that.clickShowAuthorizationEquipment.bind(that,item)} style={{color:"#499df1",marginLeft:5}}>查看组授权设备</span> */}
                        
                        <span></span>
                    </span>
                </div>
            )
        })
        return dom;
    }




    


	render() {
        let {memberDetailInfo} = this.props;
        let groupLevelOptions = PropsState.groupLevelOptions;
        var title = memberDetailInfo.name + "已加入的组";
        let {getGroupContainMemberParams,itemDetail,items,authorazitionEquipmentList} = this.state;
        
		return (
		    <div className="belong-of-door-group" >
				<Section title={title} description="" >
                    <div className="title-line">
                        <span className="item-block" style={{width:"15%"}} >组名称</span>
                        <span className="item-block" style={{width:"8%"}}>组级别</span>
                        <span className="item-block" style={{width:"13%"}}>所属社区</span>
                        <span className="item-block" style={{width:"13%"}}>公司名称</span>
                        <span className="item-block" style={{width:"15%"}}>创建时间</span>
                        <span className="item-block" style={{width:"13%"}}>创建人</span>
                        <span className="item-block" style={{width:"19%"}}>操作</span>

                    </div>
                    <div className="table-body-content">
                        {
                            this.renderItems(items)
                        }
                    </div>
                    
                    
                    <Dialog
			          title="取消授权"
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
                        <GroupAuthoriazitionEquipment 
                            onCancel={this.showAuthorizationEquipmentFun} 
                            itemDetail={itemDetail} 
                            memberDetailInfo={memberDetailInfo}
                            closeGroupAuthoriazitionEquipment={this.showAuthorizationEquipmentFun}
                            initailAuthorazitionEquipmentList={authorazitionEquipmentList}
                        />
					</Drawer>
                    

                </Section>
			</div>
		);

	}

}
