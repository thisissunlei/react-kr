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
            }
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
                uid : memberDetailInfo.id
            }
        },function(){
            let {getGroupContainMemberParams} = that.state;
            Http.request('getGroupContainMember',getGroupContainMemberParams).then(function(response) {
                console.log("response",response);
                that.setState({
                    items : response.items
                })
            }).catch(function(err) {
                Message.error(err.message);
            });
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
            that.showCancleAuthorization();
            that.refreshPage();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }


    renderItems=(items)=>{
        let that = this;
        var dom = items.map(function(item,index){
            return(
                <div className="content-item-line">
                    <span className="item-block" style={{width:"12%"}}>{item.name}</span>
                    <span className="item-block" style={{width:"5%"}}>{item.groupLevel}</span>
                    <span className="item-block" style={{width:"10%"}}>{item.communityName}</span>
                    <span className="item-block" style={{width:"10%"}}>{item.customerName}</span>
                    <span className="item-block" style={{width:"12%"}}>{item.name}</span>
                    <span className="item-block" style={{width:"10%"}}>{item.creatorName}</span>
                    <span className="item-block" style={{width:"16%"}}>
                        <Button  label="退出该组"  type="operation" operation="dropOutGroup" onClik={that.showDropOutGroupFun}/>
                        <Button  label="查看组授权设备"  type="operation" operation="changeEquipment" onClik={that.showDropOutGroupFun}/>
                    </span>
                </div>
            )
        })
        return dom;
    }





    


	render() {
        let {memberDetailInfo} = this.props;
        let groupLevelOptions = State.groupLevelOptions;
        var title = memberDetailInfo.name + "已加入的组";
        let {getGroupContainMemberParams,itemDetail,items} = this.state;
        
		return (
		    <div className="belong-of-door-group" >
				<Section title={title} description="" >
                    <div className="title-line">
                        <span className="item-block" style={{width:"12%"}} >组名称</span>
                        <span className="item-block" style={{width:"5%"}}>组级别</span>
                        <span className="item-block" style={{width:"10%"}}>所属社区</span>
                        <span className="item-block" style={{width:"10%"}}>公司名称</span>
                        <span className="item-block" style={{width:"12%"}}>创建时间</span>
                        <span className="item-block" style={{width:"10%"}}>创建人</span>
                        <span className="item-block" style={{width:"16%"}}>操作</span>

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
                </Section>
			</div>
		);

	}

}
