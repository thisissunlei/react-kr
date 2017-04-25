import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Actions, Store } from 'kr/Redux';
import * as actionCreators from '../../../Redux/Actions';
import { AppBar, Menu, MenuItem,IconMenu, IconButton, Drawer, Divider, FontIcon, FlatButton, List, ListItem, FileFolder, Avatar, FloatingActionButton } from 'material-ui';
import {
	Button,
	Message
} from 'kr-ui';
import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './index.less';
import {
	Http
} from "kr/Utils";

import SidebarNav from '../SidebarNav';
import InfoList from '../InfoList';
import {
	LookCustomerList,
	Agreement

} from 'kr/PureComponents';

import MessageManagement from "./MessageManagement";
import {
	observer,
	inject
} from 'mobx-react';

@inject("NotifyModel")
@observer

class Header extends Component {

	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	constructor(props, context) {
		super(props, context);

		this.handleToggle = this.handleToggle.bind(this);
		this.showBottomNav = this.showBottomNav.bind(this);
		this.handleRequestClose = this.handleRequestClose.bind(this);
		this.touchTitle = this.touchTitle.bind(this);
		this.inforShowList = this.inforShowList.bind(this);
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


	componentWillMount() {
		this.inforShowList();
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

  	componentWillReceiveProps(next,state){
  		this.inforShowList();
  	}


	inforShowList(){
		let url = window.location.hash;
		url = url.split('/')[1];
		let _this = this;
		let currentTab = false;
		this.hasInfoListTab.map((item)=>{
			if(item.url == url){
				currentTab = true;
			}
		})
		if(currentTab){
			_this.getUnReadInfo();
			_this.setState({
				inforLogoShow:true,
				infoTab:url,
				right_bar:{switch_value:false}
			})
		}else{
			_this.setState({
				inforLogoShow:false,
				right_bar:{switch_value:false},
				infoTab:'local',
			})
		}
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

	handleToggle() {

		var {
			actions,
			sidebar_nav,
			flag
		} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}

	showBottomNav(event) {
		event.preventDefault();

		var {
			actions,
			bottom_nav
		} = this.props;
		actions.switchBottomNav({
			switch_value: !!!bottom_nav.switch_value,
			anchor_el: event.currentTarget
		});


	}

	handleRequestClose() {

		var {
			actions,
			bottom_nav
		} = this.props;
		actions.switchBottomNav({
			switch_value: !!!bottom_nav.switch_value,
			anchor_el: event.currentTarget
		});
	};

	touchTitle() {
		window.location.href = 'http://krspace.cn';
	}

	renderHeaderNav(item, index) {

		if(!item.permission){
			return null;
		}

		let styles = {
			color: '#666666',
			width: 'auto',
			height: 60,
		}

		if(!item){
			return ;
		}

		if (item.active) {
			styles.color = '#394457';
			styles.fontWeight='600';
		}


		let jumpUrl = '';

		if (item.originUrl) {
			jumpUrl = item.originUrl;
		} else {
			jumpUrl = './#' + item.router;
		}


		return (
			<Button type="link" label={item.primaryText} key={index} style={styles} href={jumpUrl} labelStyle={{lineHeight:'60px',fontSize:"16px",fontWeight:0}} />
		);

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
	changeCount=()=>{
		let hasUnRead = --this.state.hasUnRead;
		this.setState({
			hasUnRead:hasUnRead
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

		var {
			switch_value
		} = this.props.sidebar_nav;

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
		const HeaderBar = (props) => {

			var iconClassName = '';
			let sidebarNavSwitch = this.props.sidebar_nav.switch_value;
			if (sidebarNavSwitch) {
				iconClassName = "hide-heng";
			} else {
				iconClassName = "hide-shu";

			}
			return ( < AppBar style = {
					styles
				}
				onLeftIconButtonTouchTap = {
					this.handleToggle
				}
				iconStyleLeft = {
					{
						marginTop: 0
					}
				}

				iconElementLeft = {

					<div className="main-navs" >
						 <FlatButton onTouchTap={this.handleToggle} icon={<FontIcon className={iconClassName} />} style={{color:'#fff',height:60,width:200}} />
						 <FlatButton onTouchTap={this.touchTitle}  icon={<FontIcon className="new-logo"/> } style={{height:"60px"}}/>
						{this.props.navs_items.map((item,index)=>this.renderHeaderNav(item,index))}
					</div>
				}

				iconElementRight = {
					<div style={{minWidth:70,textAlign:'right',position:"absolute",right:"10px",top:7}}>
					{showMassge && <div style={{display:"inline-block",position:'relative',marginRight:10,cursor: 'pointer'}} onClick={this.showInfo}>
						<span className="icon-info information-logo"  ></span>
						{ showRedDrop && <span className="ui-un-read-count" ></span>}
					</div>}

					< IconMenu
					iconStyle={{fill:'#394457'}}
					iconButtonElement = {
						<IconButton ><MoreVertIcon color="#fff"/></IconButton>
					}
					targetOrigin = {
						{
							horizontal: 'right',
							vertical: 'top'
						}
					}
					anchorOrigin = {
						{
							horizontal: 'right',
							vertical: 'top'
						}
					} >
					{this.props.user.nick && 	<MenuItem primaryText={this.props.user.nick} onTouchTap={(event)=>{
						window.location.hash = 'permission/personalCenter';
				}} />}

					 < MenuItem primaryText = "退出"
					onTouchTap = {
						(event) => {
							window.location.href = '/logout/logout';
						}
					}
					/>
					< /IconMenu ></div>
				}
				/>
			);
		}

		return (

			<div className="no-print">
				{this.props.header_nav.switch_value && <HeaderBar/>}
				<Drawer open={this.props.sidebar_nav.switch_value} width={180} containerStyle={{marginTop:60,paddingBottom:92,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10,background:'#394457'}}>
				<SidebarNav items={this.props.navs_current_items} current_router={this.props.current_router} current_parent={this.props.current_parent} current_child={this.props.current_child}/>
				</Drawer>
				<Drawer open={openMassage} width={750} openSecondary={true} containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10,paddingLeft:45,paddingRight:47}}>
					{/*<InfoList onClose={this.onClose} infoTab={infoTab} changeCount={this.changeCount}/>*/}

					<MessageManagement
						ref = "message"
						onCancel = {this.onClose}
						customerClick = {this.customerClick}
						renovateRedDrop = {this.renovateRedDrop}
						agreementClick = {this.agreementClick}
						resettingAll = {this.resettingAll}
					/>
				</Drawer>
				//客户详情
				<Drawer open={openLookCustomerList} width={750} openSecondary={true} containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
					<LookCustomerList
						 comeFrom="Merchant"
		                 operType="PERSON"
						 comeFrom="message"
		                 companyName={customerName}
		                 listId={msgExtra}
						onCancel={this.lookCustomerListClose}


					/>
				</Drawer>
				//合同详情
				<Drawer open={openAgreementDetail} width={750} openSecondary={true} containerStyle={{marginTop:61,paddingBottom:48,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
					{this.contractRender()}
				</Drawer>
				{(openLookCustomerList || openMassage || openAgreementDetail) && <div className="message-drawer" onClick={this.messageDrawerClick}></div>}
			</div>
		);
	}

}



function mapStateToProps(state) {

	return {
		header_nav: state.header_nav,
		sidebar_nav: state.sidebar_nav,
		right_bar:state.right_bar,
		navs_items: state.navs.items,
		navs_current_items: state.navs.current_items,
		bottom_nav: state.bottom_nav,
		current_router: state.navs.current_router,
		current_parent: state.navs.current_parent,
		current_child: state.navs.current_child,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Object.assign({}, actionCreators), dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
