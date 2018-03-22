import React from 'react';
import {
	Http,
	ReactHtmlParser
} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Title,
	Section,
	KrField,
	KrDate,
	Message
} from 'kr-ui';
import { observer, inject } from 'mobx-react';
import './index.less';
@inject("NavModel")
@observer
export default class ViewMember extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
			accountInfo:{},
			baseInfo:{},
			companyInfo:{},
			contacts:{},
			socialDynamic:{},
			workInfo:{},
		}
	}
	
	componentDidMount() {
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
		this.getBacicInfo();
	}
	
	getBacicInfo=()=>{
		let memberId=this.props.params.memberId;
		let _this=this;
		Http.request('get-member-detail',{uid:memberId}).then(function (response) {
		
			_this.setState({
				accountInfo:response.accountInfo || {},
				baseInfo:response.baseInfo || {},
				companyInfo:response.companyInfo || {},
				contacts:response.contacts || {},
			})
		}).catch(function (err) { 
			Message.error(err.message)
		});
		Http.request('get-user-business-info',{uid:memberId}).then(function (response) {
			
			_this.setState({
				socialDynamic:response.socialDynamic || {},
				workInfo:response.workInfo || {}
			})
		}).catch(function (err) { 
			Message.error(err.message)
		});
	}

	renderStatus=(companyInfo)=>{
		

		if(companyInfo.enterStatusCode=="0"){
			return(
				<div  className="u-info-photo">
					<span>入驻状态：</span>
					<div className="u-text u-green">{companyInfo.enterStatus}</div>
				</div>
			)
		}else if(companyInfo.enterStatusCode=="1"){
			return(
				<div  className="u-info-photo">
					<span>入驻状态：</span>
					<div className="u-text u-orange">{companyInfo.enterStatus}</div>
				</div>
			)
		}else if(companyInfo.enterStatusCode=="2"){
			return(
				<div  className="u-info-photo">
					<span>入驻状态：</span>
					<div className="u-text u-red">{companyInfo.enterStatus}</div>
				</div>
			)
		}
		

	}
	
	render() {
		let {
				baseInfo,
				accountInfo,
				companyInfo,
				contacts,
				socialDynamic,
				workInfo
			}=this.state;
			
			
		return (
			<div className="g-member-detail">
			<Title value="会员详情"/>
			<Section title="会员详情" description="" >
				<div className="m-member-info">
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">账号信息</span>
						</div>
						<div className="u-info-content">
							<KrField
								grid={1/2} 
								label="UserID："
								component="labelText"
								value={accountInfo.uid}
								defaultValue="-"
							/>
							<KrField
								grid={1/2} 
								label="注册时间：" 
								component="labelText"
								value={accountInfo.regDate}
								defaultValue="-"
							/>
							<KrField
								grid={1/2} 
								label="手机号："
								component="labelText"
								value={accountInfo.phone}
								defaultValue="-"
							/>
							<KrField
								grid={1/2} 
								label="绑定的微信："
								component="labelText"
								value={accountInfo.weChat}
								defaultValue="-"
							/>
							<KrField
								grid={1/2} 
								label="绑定的QQ：" 
								component="labelText"
								value={accountInfo.qq}
								defaultValue="-"
							/>
							<KrField
								grid={1/2} 
								label="绑定的微博：" 
								component="labelText"
								value={accountInfo.microBlog}
								defaultValue="-"
							/>
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">个人基本信息</span>
						</div>
						<div className="u-info-content">
							<div  className="u-info-photo">
								<span>头像：</span>
								{baseInfo.avatar?<img className="u-info-photo-img" src={baseInfo.avatar} />:'-'}	
							</div>	
							<KrField
									grid={1/2} 
									label="昵称："
									component="labelText"
									value={baseInfo.nick}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="个人签名："
									component="labelText"
									value={baseInfo.slogan}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="性别："
									component="labelText"
									value={baseInfo.gender}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="生日："
									component="labelText"
									value={baseInfo.birthday}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="常驻地区："
									component="labelText"
									value={baseInfo.residentArea}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="行业：" 
									component="labelText"
									value={baseInfo.industry}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="兴趣爱好："
									component="labelText"
									value={baseInfo.hobbies}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="身份证号："
									component="labelText"
									value={baseInfo.identityCode}
									defaultValue="-"
							/>
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">联系方式（社交展示）</span>
						</div>
						<div className="u-info-content"> 
							<KrField
									grid={1/2} 
									label="手机号："
									component="labelText"
									value={contacts.linkPhone}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="邮箱："
									component="labelText"
									value={contacts.email}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="微信号：" 
									component="labelText"
									value={contacts.weChat}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="微博号："
									component="labelText"
									value={contacts.microBlog}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="QQ号："
									component="labelText"
									value={contacts.qq}
									defaultValue="-"
							/>
						</div>
					</div>

					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">入驻相关信息（当前状态）</span>
						</div>
						<div className="u-info-content">
							<KrField
									grid={1/2} 
									label="姓名："
									component="labelText"
									value={companyInfo.mbrName}
									defaultValue="-"
							/>
							{this.renderStatus(companyInfo)}
							<KrField
									grid={1/2} 
									label="所属客户：" 
									component="labelText"
									value={companyInfo.companyName}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="所属社区："
									component="labelText"
									value={companyInfo.cmtName}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="企业管理员："
									component="labelText"
									value={companyInfo.leader}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="入驻时间："
									component="labelText"
									value={companyInfo.enterDate}
									defaultValue="-"
							/>
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">业务信息</span>
						</div>
						<div className="u-info-content"> 
							<KrField
									grid={1/2} 
									label="问题反馈：" 
									component="labelText"
									value={workInfo.feedback}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="预定会议室："
									component="labelText"
									value={workInfo.reservation}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="预约的访客："
									component="labelText"
									value={workInfo.visiter}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="打印次数："
									component="labelText"
									value={workInfo.print}
									defaultValue="-"
							/>
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">社交、互动信息</span>
						</div>
						<div className="u-info-content"> 
							<KrField
									grid={1/2} 
									label="报名活动：" 
									component="labelText"
									value={socialDynamic.activityNum}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="发布的动态："
									component="labelText"
									value={socialDynamic.topicNum}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="评论&回复数："
									component="labelText"
									value={socialDynamic.replyNum}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="点赞数："
									component="labelText"
									value={socialDynamic.tipNum}
									defaultValue="-"
							/>
						</div>
					</div>
				</div>
			</Section>
			</div>
		);
	}
}

 
