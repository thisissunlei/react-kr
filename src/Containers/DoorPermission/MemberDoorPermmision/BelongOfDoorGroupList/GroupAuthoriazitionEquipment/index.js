

import React from 'react';
import {
	Title,
	Button,
	Section,
	Dialog,
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Tooltip
} from 'kr-ui';

import SearchForm from './SearchForm';
import close from "../../images/close.svg";
import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import State from '../State';
import PropsState from '../../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DropOutGroup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			items:[],
		}
	}

	componentDidMount(){
        let {initailAuthorazitionEquipmentList}= this.props;
		this.setState({
			items : initailAuthorazitionEquipmentList 
		})
	}

	

	renderItems=(items)=>{

		let that = this;
		var dom = items.map(function(item,index){
			return(
				<div key={index} className="content-item-line">
				
					<span className="item-line-span">{item.communityName}</span>
					<span className="item-line-span">{item.title}</span>
					<span className="item-line-span">{item.doorCode}</span>
					<span className="item-line-span deviceId-line-span">{item.deviceId}</span>
					<span className="item-line-span">{that.renderDoorType(item.doorType)}</span>
					<span className="item-line-span">{that.renderAuthoriaztionTime(item)}</span>
				</div>
			)
		})
		return dom;
	}

	renderAuthoriaztionTime=(item)=>{
		// console.log("item",item);

		var str = DateFormat(item.startAt,"yyyy-mm-dd HH:MM:ss") + "-" + DateFormat(item.endAt,"yyyy-mm-dd HH:MM:ss")
		return (
			<span>{str}</span>
		)
	}


	renderDoorType=(doorType)=>{
		let doorTypeOptions = PropsState.doorTypeOptions;
		for(let i=0;i<doorTypeOptions.length;i++){
			if(doorTypeOptions[i].value == doorType){
				return(
					<span>{doorTypeOptions[i].label}</span>
				)
			}
		}

	}

	submitSearchParams=(values)=>{
		
		let {itemDetail} = this.props;
		let that =this;

		var staticParams = {granteeId:itemDetail.id,granteeType:"USER"}

		var sendParams = Object.assign({},staticParams,values);
		
        Http.request('getGroupAuthorizeEquipmentApi',sendParams).then(function(response) {
            that.setState({
                items : response.items
            })
        }).catch(function(err) {
            Message.error(err.message);
        });
	}

	closePage=()=>{
		let {closeGroupAuthoriazitionEquipment }= this. props;
		closeGroupAuthoriazitionEquipment && closeGroupAuthoriazitionEquipment();
	}

	render() {
        let {memberDetailInfo,itemDetail} = this.props;
		let {items} = this.state;
		console.log("items",items);
		return (
		    <div style={{marginTop:20,padding:20,boxSizing: "border-box"}} className="authoriaztion-equipment">
                <div style={{width:"100%",height:30,boxSizing: "border-box"}}>
                    <img src={close} style={{dispaly:"inline-block",verticalAlign:"top",width:30,float:"right",cursor:"pointer"}} onClick={this.closePage}/>
                </div>
				<div>
					<SearchForm submitSearchParams={this.submitSearchParams}/>
				</div>
                <div>
                    <div className="title">
                        <span className="item-line-span community-id-item">社区名称</span>
                        <span className="item-line-span">屏幕展示标题</span>
                        <span className="item-line-span">屏幕展示编号</span>
                        <span className="item-line-span">硬件ID</span>
                        <span className="item-line-span">门类型</span>
                        <span className="item-line-span last-line-span">授权时间</span>
                    </div>
                    <div className="content-item-line">
						{
							this.renderItems(items)
						}
					</div>
                </div>
			</div>
		);

	}

}

