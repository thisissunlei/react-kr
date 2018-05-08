import React from 'react';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Title,Dialog,Drawer,
Message
} from 'kr-ui';
import home from './images/home-community.svg';
import  "./index.less";
import ChangeCommunity from './ChangeCommunity';
import HomeLeft from './HomeLeft';
import MonthPayment from './RightDialog/MonthPayment';
import AllPayment from './RightDialog/AllPayment';
import Arrearages from './RightDialog/Arrearages';
import SignedCustomer from './RightDialog/SignedCustomer';
import AllCustomer from './RightDialog/AllCustomer';
import FCustomer from './RightDialog/FCustomer';
import NewClue from './RightDialog/NewClue';
import SettledCustomer from './RightDialog/SettledCustomer';
import HomeRight from './HomeRight';
import State from './State';
import {Http,DateFormat,Money} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
import {
	Agreement,
	Waiting
} from 'kr/PureComponents';
@inject("NavModel")
@observer

class Home  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
		const {NavModel} = this.props;
		// NavModel.setSidebar(false);
		let communityId = localStorage.getItem('OP_HOME_COMMUNITY');
		let communityName = localStorage.getItem('OP_HOME_COMMUNITY_NAME');
		if(communityId){
			State.getHomeData({cmtId:communityId});
			State.info.communityName = communityName || '';
		}else{
			State.getHomeData({cmtId:''})
		}
		State.getCommunityList()
	}
	openChangeCommunityDialog=()=>{
		State.openChangeCommunity = true;
	}
	closeChangeCommunityDialog=()=>{
		State.openChangeCommunity = false;
	}
	ChangeCommunity=(form)=>{
		State.ChangeCommunity(form);
	}
	openMonthPayment=()=>{
		State.openMonthPayment = true;
	}

	closeMonthPayment=()=>{
		State.openMonthPayment = false;
	}
	closeAllPayment=()=>{
		State.openAllPayment = false;
	}
	closeArrearages=()=>{
		State.arrearages = false;
	}
	closeSettledCustomer=()=>{
		State.openSettledCustomer  = false;
	}
	closeNewClue=()=>{
		State.newClue = false;
	}
	closeFCustomer=()=>{
		State.fCustomer = false;
	}
	closeAllCustomer=()=>{
		State.allCustomer = false;
	}
	closeSignedCustomer=()=>{
		State.signedCustomer = false;
	}
	detailOpenAgreement=()=>{
		State.openAgreementDetail = false
	}
	componentWillUnmount(){
		// let communityId = localStorage.getItem('OP_HOME_COMMUNITY');
		// console.log('----componentWillUnmount----',communityId);
		// localStorage.removeItem('OP_HOME_COMMUNITY');

	}
	render(){
		return(
			<div style={{minHeight:'910'}} className="operation-home">
				<Title value="运营首页" />
				<Waiting />
				<div className="home-main-part">
					<img src={home} className="community-img"/>
					<span className="community-name">{State.info.communityName}</span>
					<span className='change-name' onClick={this.openChangeCommunityDialog}>切换社区</span>
				</div>
				<div className='home-content'> 
					<div className="home-left">
						<HomeLeft />
					</div>
					<div className="home-right">
						<HomeRight />
					</div>
				</div>
				
				<Dialog
				title="切换社区"
				modal={true}
				onClose={this.closeChangeCommunityDialog}
				open={State.openChangeCommunity}
				contentStyle={{width:665}}>
					<ChangeCommunity  onCancel={this.closeChangeCommunityDialog} onSubmit={this.ChangeCommunity}/>
				</Dialog>
				<Dialog
						title="本月回款"
						onClose={this.closeMonthPayment}
						open={State.openMonthPayment}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<MonthPayment />
				</Dialog>
				<Dialog
						title="累计回款"
						onClose={this.closeAllPayment}
						open={State.openAllPayment}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<AllPayment />
				</Dialog>
				<Dialog
						title="社区欠款"
						onClose={this.closeArrearages}
						open={State.arrearages}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<Arrearages />
				</Dialog>
				<Dialog
						title="现入驻客户"
						onClose={this.closeSettledCustomer}
						open={State.openSettledCustomer}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<SettledCustomer />
				</Dialog>
				<Dialog
						title="已约未入驻"
						onClose={this.closeSignedCustomer}
						open={State.signedCustomer}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<SignedCustomer />
				</Dialog>
				<Dialog
						title="客户总数"
						onClose={this.closeAllCustomer}
						open={State.allCustomer}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<AllCustomer />
				</Dialog>
				<Dialog
						title="跟进中客户"
						onClose={this.closeFCustomer}
						open={State.fCustomer}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<FCustomer />
				</Dialog>
				<Dialog
						title="新增线索"
						onClose={this.closeNewClue}
						open={State.newClue}
						contentStyle ={{ width: '85%',height:'590px'}}
					>
						<NewClue />
				</Dialog>
				<Drawer
				        open={State.openAgreementDetail}
				        width={750}
				        onClose={this.detailOpenAgreement}
				        openSecondary={true}
				        containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			        >
                        <Agreement.Join.Detail
						 params={{id:State.id,customerId:State.customerId,orderId:State.mainbillId}}
                         onCancel={this.detailOpenAgreement}
						/>

		           </Drawer>
	     	</div>

		);
	}
}

export default Home;
