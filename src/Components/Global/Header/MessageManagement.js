import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';

import {
	observer
} from 'mobx-react';
import {
	Http
} from "kr/Utils";
import {
	Tabs,
	Tab,
	Message,
} from 'kr-ui';

import {

	AppointmentVisit,
	TransferCustomer,
	InfoList,
	UrgeMoney,


} from 'kr/PureComponents';
import './index.less';
@observer
class MessageManagement extends Component{

	constructor(props,context){
		super(props, context);
		let _this=this;
		this.state={

				//催款提醒 权限
				ARREARS_ALERT:false,
				//客户到期权限
				CUSTOMER_DUE:false,
				//客户转移权限
				CUSTOMER_TRANSFER:false,
				//预约参观 权限
				ORDER_VISIT:false,
				//催款提醒 未读数
				ARREARS_ALERT_NUM:0,
				//客户到期未读数
				CUSTOMER_DUE_NUM:0,
				//客户转移 未读数
				CUSTOMER_TRANSFER_NUM:0,
				//预约参观 未读数
				ORDER_VISIT_NUM:0,
				
				//客户id
				redNum:[],
		}

		this.tabNum();

	}
	//tab数字刷新
	tabNum = () => {
		let _this=this;

		Http.request('messageLookJurisdiction').then(function(response) {
			_this.setState({
				ARREARS_ALERT:response.rightDetails.ARREARS_ALERT,
				CUSTOMER_DUE:response.rightDetails.CUSTOMER_DUE,
				CUSTOMER_TRANSFER:response.rightDetails.CUSTOMER_TRANSFER,
				ORDER_VISIT:response.rightDetails.ORDER_VISIT,
				ARREARS_ALERT_NUM:response.unreadDetails.ARREARS_ALERT,
				CUSTOMER_DUE_NUM:response.unreadDetails.CUSTOMER_DUE,
				CUSTOMER_TRANSFER_NUM:response.unreadDetails.CUSTOMER_TRANSFER,
				ORDER_VISIT_NUM:response.unreadDetails.ORDER_VISIT,

				redNum:[{permission:response.rightDetails.CUSTOMER_TRANSFER,num:response.unreadDetails.CUSTOMER_TRANSFER},
					{permission:response.rightDetails.ORDER_VISIT,num:response.unreadDetails.ORDER_VISIT},
					{permission:response.rightDetails.ARREARS_ALERT,num:response.unreadDetails.ARREARS_ALERT},
					{permission:response.rightDetails.CUSTOMER_DUE,num:response.unreadDetails.CUSTOMER_DUE}]
			})
		}).catch(function(err) {
			if(!params.templateIdList){
				err.message="模板列表不能为空";
			}
			Message.error(err.message)
		});
	}


	onSubmit = (values) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	customerClick = (data) =>{
		const {customerClick} = this.props;
		customerClick && customerClick(data);
	}

	agreementClick = (data) =>{
		const {agreementClick} = this.props;
		agreementClick && agreementClick(data);
	}
	//tab title 的权限
	tabContent = () => {
		let {
			ARREARS_ALERT,
			CUSTOMER_DUE,
			CUSTOMER_TRANSFER,
			ORDER_VISIT,

		}=this.state;
		let showTab=[];
		let hideTab=[];

		if(!CUSTOMER_TRANSFER){
			hideTab.push(
				<Tab label="r" >

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="客户转移" 
					style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}} 
					
				>
						<TransferCustomer
							customerClick = {this.customerClick}
							tabNum = {this.tabNum}
							renovateRedDrop = {this.renovateRedDrop}
						/>

				</Tab>
			)
		}


		if(!ORDER_VISIT){
			hideTab.push(
				<Tab label="r" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="预约参观" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>
						<AppointmentVisit
								tabNum = {this.tabNum}
								renovateRedDrop = {this.renovateRedDrop}
						/>
				</Tab>
			)
		}



		if(!ARREARS_ALERT){
			hideTab.push(
				<Tab label="r" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>
				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="催款提醒" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>
					<UrgeMoney
						tabNum = {this.tabNum}
						renovateRedDrop = {this.renovateRedDrop}
						agreementClick = {this.agreementClick}

					/>
				</Tab>
			)
		}


		if(!CUSTOMER_DUE){
			hideTab.push(
				<Tab label="r" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="客户到期" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>
					<InfoList 
						tabNum = {this.tabNum}
						renovateRedDrop = {this.renovateRedDrop}
					/>
				</Tab>
			)
		}
		hideTab.push(
				<Tab label="r" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>

				</Tab>
		)
		hideTab.push(
				<Tab label="r" style = {{color:"#666",borderBottom:"solid 1px rgb(238, 238, 238)"}}>

				</Tab>
		)

		return [showTab,hideTab];
	}
	renovateRedDrop = () =>{
		let {renovateRedDrop} = this.props;
		renovateRedDrop && renovateRedDrop();
	}
	createRedNum = () => {
		
		let {redNum} = this.state;

		console.log(redNum,"?????")
		let arr = redNum.map(function(item,index){
			let moveHintClass="m-lookCustomerList-num";
			if(item.num > 9 && item.num < 100){
				moveHintClass="m-lookCustomerList-num-moddle";
			}
			if(item.num >99){
				moveHintClass="m-lookCustomerList-num-max";
			}
			if(item.num && item.permission && item.num !=0){
				return (<div className = {moveHintClass} style={{left:32+(index+1)*108}}>
							{item.num > 99 ? 99 : item.num}<label>+</label>
						</div>)
			}
		})
		return arr;
	}

	render(){
		let noWidth=4*108.33;
		let {rightDetails,unreadDetails}=this.state;
		let tabContent=this.tabContent();
		
		return(
		    <div className="m-lookCustomerList" style={{paddingLeft:8}}>
		      	<div className="title"  style={{top: 41,position: "absolute",right: 47}}>
					<div className="look-close" onClick={this.onCancel}></div>
				</div>
				<div style={{
		                marginTop:40,
		                marginLeft:-20,
		            }}>
					<span className="message-management-icon"></span>
					<span className="message-management-title" style={{fontSize: 18}}>消息提醒</span>
				</div>
				<Tabs className="tabs"
			 		inkBarStyle={{background:"#499df1",top:0}}
			 		initialSelectedIndex={-1}
			 		tabTemplateStyle={{color:"#333"}}

				>

					{tabContent}


				</Tabs>
			    <div className="no-table-click" style={{width:tabContent[1].length*108.33}}></div>
				 
				{this.createRedNum()}


		    </div>


		);
	}

}
export default MessageManagement;
