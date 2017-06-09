import React, { Component, PropTypes } from 'react';
import { Actions, Store } from 'kr/Redux';
import {
	change
} from 'redux-form';

import './index.less';
import {
	Http
} from "kr/Utils";
import {
	Drawer
} from "kr-ui";

import LookCustomerList from "../LookCustomerList";
import Agreement from "../Agreement";

import MessageManagement from "./MessageManagement";
import {
	observer,
	inject
} from 'mobx-react';

@inject("NotifyModel")
@observer
class TheBell extends React.Component {

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props, context) {
		super(props, context);

	
		this.state = {
			bottomNav: false,
			toggle: true,
			right_bar:{switch_value:false},
			inforLogoShow:false,
			url:window.location.hash,
			infoTab:'',
			hasUnRead:0,
			//客户详情打开
			openLookCustomerList:false,
			//合同详情打开
			openAgreementDetail:false,
			//客户 客户名称
			customerName:'',
			openMassage:false,
			//客户id
			msgExtra:0,
			//是否显示红点
			showRedDrop:false,
			//消息铃铛显示
			showMassge:false,
			params:{

				id:260,
				customerId:273,
				orderId:166

			},
			//合同类型
			contractType:'',
			customerId:0,
			contractId:0,
			mainbillId:0
		}
		this.hasInfoListTab = [
			{url:'community',code:'111'}
		]
		// this.inforShowList();
		this.renovateRedDrop();

	}

 //消息提醒关闭
 messageCancel= () =>{

	 this.setState({
		 openLookCustomerList:false,
	 })
 }
 //判断红点是否显示
 renovateRedDrop = () =>{
	 let _this = this;
	 let showRedDrop = false;
	 let showMassge = false;
	 let Details=[];
	 let sum=0;
	 Http.request('messageLookJurisdiction').then(function(response) {

		for (var key in response.rightDetails){
		    if(response.rightDetails[key]){
				showMassge=true;
				break;
			}
		}
		for (var key in response.rightDetails){
		    if(response.rightDetails[key]){
				sum+=response.unreadDetails[key]||0;
			}
		}
		if(sum != 0){
			showRedDrop=true;
		}

		 _this.setState({
			 showRedDrop:showRedDrop,
			 showMassge:showMassge
		 })
	 }).catch(function(err) {

	 });
 }
	//获取未读消息数
	getUnReadInfo=()=>{
		let _this = this;
		Http.request('getUnReadInfo', {
            startTime: '',endTime:''
        }).then(function(response) {
            if(response.msgCount){
            	_this.setState({
            		hasUnRead:response.msgCount
            	})
            }else{
            	_this.setState({
            		hasUnRead:0
            	})
            }
        }).catch(function(err) {
        });
	}
	//重置列别表
  resettingAll = () =>{

	}

	onClose=()=>{
		const {NotifyModel} = this.props;

		const {customerTransform,appointmentVisit,urgeMoney,infoList} = NotifyModel;
		customerTransform.setSearchParams({
				page: 1 ,
				pageSize: 15,
				createDateEnd: "",
				createDateStart:"",
		});
		appointmentVisit.setSearchParams({
			page: 1,
			pageSize: 15,
			createDateEnd:"",
			createDateStart:"",
			msgCommunity : "",
		});
		urgeMoney.setSearchParams({
			page:1,
			pageSize:15,
			endTime:"",
			startTime:"",
			communityId:""
		});
		infoList.setSearchParams({
			page:1,
			pageSize:15,
			endTime:"",
			startTime:"",
			communityId:""
		});
		Store.dispatch(change('transferSearchForm','transferDateBegin',""));
		Store.dispatch(change('transferSearchForm','transferDateEnd',""));
		Store.dispatch(change('searchFormVisit','visitCreateDateBegin',""));
		Store.dispatch(change('searchFormVisit','visitCreateDateEnd',""));
		Store.dispatch(change('searchFormVisit','visitCommunity',""));
		Store.dispatch(change('searchFormUrge','urgeCreateDateBegin',""));
		Store.dispatch(change('searchFormUrge','urgeCreateDateEnd',""));
		Store.dispatch(change('searchFormUrge','urgeCommunity',""));
		Store.dispatch(change('infoSearchForm','infoCreateDateBegin',""));
		Store.dispatch(change('infoSearchForm','infoCreateDateEnd',""));
		Store.dispatch(change('infoSearchForm','infoCommunity',""));

		this.setState({
			openMassage:!this.state.openMassage
		})
	}

    showInfo=()=>{


		var  {
			actions,
			sidebar_nav,
			flag,
			right_bar
		} = this.props;
		this.setState({
			openMassage:!this.state.openMassage,
		})

	}


	//客户名称被点击
	customerClick = (data) => {

		let msgExtra = JSON.parse(data.msgExtra)
		this.setState({
			customerName : data.customerName,
			msgExtra : msgExtra.customerId,
			openLookCustomerList:true,
		})
	}
	//合同被点击
	agreementClick = (data) =>{
		let {contractType,customerId,mainbillId,contractId} = data;
		this.setState({

			openAgreementDetail : true,
			contractType : contractType,
			customerId : customerId,
			contractId : contractId,
			mainbillId : mainbillId
		})
	}
	//客户详情关闭按钮
	lookCustomerListClose = () =>{
		this.setState({
			openLookCustomerList:false
		})

	}
	//合同详情打开
	agreementDetailOpen = () =>{
		this.setState({
			openAgreementDetail:true
		})
	}
	//合同详情关闭
	agreementDetailClose = () =>{
		this.setState({
			openAgreementDetail:false
		})
	}
	//合同详情样式模板
	contractRender=()=>{
				let {contractType,customerId,contractId,mainbillId} = this.state;
		        let contractSelect='';
			      if(contractType == 'INTENTION'){
                            contractSelect=<Agreement.Admit.Detail
						    						params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                            onCancel={this.agreementDetailClose}
                            eidtBotton = "none"
						  />
			           	 }

                         if(contractType == 'ENTER'){
                            contractSelect=<Agreement.Join.Detail
						 params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                         onCancel={this.agreementDetailClose}
                         eidtBotton = "none"
						/>
			           	 }

			           	  if(contractType == 'ADDRENT'){
                            contractSelect=<Agreement.Increase.Detail
						 params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                         onCancel={this.agreementDetailClose}
                         eidtBotton = "none"
						/>
			           	 }


			           	 if(contractType == 'LESSRENT'){
                            contractSelect=<Agreement.Reduce.Detail
						params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                         onCancel={this.agreementDetailClose}
                         eidtBotton = "none"
						/>
			           	 }


			           	 if(contractType == 'QUITRENT'){
                            contractSelect=<Agreement.Exit.Detail
						   params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                           onCancel={this.agreementDetailClose}
                           eidtBotton = "none"
						/>
			           	 }

                          if(contractType == 'RENEW'){
                            contractSelect=<Agreement.Renew.Detail
						 params={{id:contractId,customerId:customerId,orderId:mainbillId}}
                         onCancel={this.agreementDetailClose}
                         eidtBotton = "none"
						/>
			           	 }

			     return contractSelect
	}





	messageDrawerClick = () =>{
		this.setState({
			openLookCustomerList : false,
			openMassage : false,
			openAgreementDetail : false
		})
	}
	render() {

		var styles = {
			paddingLeft: 0,
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			backgroundColor: '#FFFFFF',
			height: "60px",
			zIndex: 10
		};

		let width = 570;

		let {
				inforLogoShow,
				infoTab,
				hasUnRead,
				customerName,
				msgExtra,
				openLookCustomerList,
				openMassage,
				showRedDrop,
				showMassge,
				openAgreementDetail,
				params

			} = this.state;
		let showInfoLogo = inforLogoShow?'inline-block':'none';
		let {bellStyle} = this.props;
		

		return (

			<div className="no-print">
				
                {showMassge && <div className = "ui-bellIcon" onClick = {this.showInfo} style = {bellStyle} >
										<span className="icon-info information-logo"  ></span>
						{ showRedDrop && <span className="ui-un-read-count" ></span>}
								</div>}
				<Drawer 
					open={openMassage} 
					width={750} 
					openSecondary={true} 
					containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10,paddingLeft:45,paddingRight:47}}
					onClose = {this.onClose}
				>
					
					<MessageManagement
						ref = "message"
						onCancel = {this.onClose}
						customerClick = {this.customerClick}
						renovateRedDrop = {this.renovateRedDrop}
						agreementClick = {this.agreementClick}
						resettingAll = {this.resettingAll}
					/>
				</Drawer>
				{/*客户详情*/}
				<Drawer 
					open={openLookCustomerList} 
					width={750} 
					openSecondary={true}
					containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}
					onClose={this.lookCustomerListClose}
				>
					<LookCustomerList
						 comeFrom="Merchant"
		                 operType="PERSON"
						 comeFrom="message"
		                 companyName={customerName}
		                 listId={msgExtra}
						onCancel={this.lookCustomerListClose}


					/>
				</Drawer>
				{/*合同详情*/}
				<div className = "bell-agreement">
				<Drawer 
					open={openAgreementDetail} 
					width={750} 
					openSecondary={true} 
					containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}
					onClose={this.agreementDetailClose}
					>
					
					{this.contractRender()}
					
				</Drawer>
				</div>
				{(openLookCustomerList || openMassage || openAgreementDetail) && <div className="message-drawer" onClick={this.messageDrawerClick}></div>}
			</div>
		);
	}

}

export default TheBell;
