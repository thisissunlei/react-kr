import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';

import {
	observer
} from 'mobx-react';
import {
	Tabs,
	Tab,
	Message,
} from 'kr-ui';
import {

	AppointmentVisit,
	TransferCustomer,
	InfoList


} from 'kr/PureComponents';
import './index.less';
@observer
class LookCustomerList extends Component{

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
		}

		this.tabNum();

	}
	//tab数字刷新
	tabNum = () => {
		let _this=this;

		Store.dispatch(Actions.callAPI('messageLookJurisdiction')).then(function(response) {
			_this.setState({
				ARREARS_ALERT:response.rightDetails.ARREARS_ALERT,
				CUSTOMER_DUE:response.rightDetails.CUSTOMER_DUE,
				CUSTOMER_TRANSFER:response.rightDetails.CUSTOMER_TRANSFER,
				ORDER_VISIT:response.rightDetails.ORDER_VISIT,
				ARREARS_ALERT_NUM:response.unreadDetails.ARREARS_ALERT,
				CUSTOMER_DUE_NUM:response.unreadDetails.CUSTOMER_DUE,
				CUSTOMER_TRANSFER_NUM:response.unreadDetails.CUSTOMER_TRANSFER,
				ORDER_VISIT_NUM:response.unreadDetails.ORDER_VISIT,
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
				<Tab label="客户转移" >
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
				<Tab label="r" >

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="预约参观" >
						<AppointmentVisit
								tabNum = {this.tabNum}
								renovateRedDrop = {this.renovateRedDrop}
						/>
				</Tab>
			)
		}



		if(!ARREARS_ALERT){
			hideTab.push(
				<Tab label="r" >

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="催款提醒" >

				</Tab>
			)
		}


		if(false){
			hideTab.push(
				<Tab label="r" >

				</Tab>
			)
		}else{
			showTab.push(
				<Tab label="客户到期" >
					<InfoList tabNum = {this.tabNum}
						renovateRedDrop = {this.renovateRedDrop}
					/>
				</Tab>
			)
		}
		hideTab.push(
				<Tab label="r" >

				</Tab>
		)
		hideTab.push(
				<Tab label="r" >

				</Tab>
		)

		return [showTab,hideTab];
	}
	renovateRedDrop = () =>{
		let {renovateRedDrop} = this.props;
		renovateRedDrop && renovateRedDrop();
	}


	render(){
		let noWidth=4*108.33;
		let {rightDetails,unreadDetails,CUSTOMER_TRANSFER_NUM,ORDER_VISIT_NUM,CUSTOMER_DUE_NUM}=this.state;
		let tabContent=this.tabContent();
		let moveHintClass="m-lookCustomerList-num";
		let advanceClass="m-appointment-num";
		let expireClass = "m-expire-num";



		if(CUSTOMER_TRANSFER_NUM > 9 && CUSTOMER_TRANSFER_NUM < 100){
			moveHintClass="m-lookCustomerList-num-moddle";
		}
		if(CUSTOMER_TRANSFER_NUM >99){
			moveHintClass="m-lookCustomerList-num-max";
		}

		if(ORDER_VISIT_NUM > 9 && ORDER_VISIT_NUM < 100){
			advanceClass="m-appointment-num-moddle";
		}
		if(ORDER_VISIT_NUM >99){
			advanceClass="m-appointment-num-max";
		}
		if(CUSTOMER_DUE_NUM > 9 && CUSTOMER_DUE_NUM < 100){
			expireClass = "m-expire-num-moddle";
		}
		if(CUSTOMER_DUE_NUM > 99){
			expireClass = "m-expire-num-max";
		}
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
				{!!CUSTOMER_TRANSFER_NUM &&
					<div className = {moveHintClass}>
						{CUSTOMER_TRANSFER_NUM > 99 ? 99 : CUSTOMER_TRANSFER_NUM}<label>+</label>
					</div>
				}
				{!!ORDER_VISIT_NUM &&
					<div className={advanceClass}>
						{ORDER_VISIT_NUM > 99 ? 99 : ORDER_VISIT_NUM}<label>+</label>
					</div>
				}
				{!!CUSTOMER_DUE_NUM &&
					<div className={expireClass}>
						{CUSTOMER_DUE_NUM > 99 ? 99 : CUSTOMER_DUE_NUM}<label>+</label>
					</div>
				}


		    </div>


		);
	}

}
export default LookCustomerList;
