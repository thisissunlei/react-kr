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
	Message,
	Dialog,
} from 'kr-ui';
import { observer, inject } from 'mobx-react';
import './index.less';
import JoinList from './JoinList';
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
			joinCount:0,
			openJoin:false,
			memberId:'',
			miniApplicationInfo:{},
			managerInfo:[]
			
		}
	}
	
	componentDidMount() {
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
		this.getBacicInfo();
	}
	
	openJoinDialog=(memberId)=>{
			this.setState({
				openJoin:!this.state.openJoin,
				memberId:memberId || ''
			})
		
		
	}
	
	getBacicInfo=()=>{
		let memberId=this.props.params.memberId;
		let _this=this;
		
		Http.request('get-member-detail',{uid:memberId}).then(function (response) {
			// 区域code  
			let area = response && response.accountInfo && response.accountInfo.areaCode || '';
			let phone = response && response.accountInfo && response.accountInfo.phone || '';
			let groupLevelOptions = [
				{
					label: '中国 +86',
					value: '0086'
				},
				{
					label: '中国香港 +852',
					value: '0852'
				},
				{
				label: '中国澳门 +853',
				value: '0853'
			}, 
			{
				label: '中国台湾 +886',
				value: '0886'
			}, {
				label: '澳大利亚 +61',
				value: '0061'
			}, {
				label: '韩国 +82',
				value: '0082'
			},{
				label: '加拿大 +1',
				value: '0001'
			}, {
				label: '马来西亚 +60',
				value: '0060'
			}, {
				label: '美国 +1',
				value: '0001'
			},
			{
				label: '日本 +81',
				value: '0081'
			}, {
				label: '新加坡 +65',
				value: '0065'
			}, {
				label: '英国 +44',
				value: '0044'
			},
		];
		let resultAreaCode = (groupLevelOptions.filter((v)=>{
			return v.value === area
		})[0].label || '') + ' '+ phone;
			_this.setState({
				accountInfo:response.accountInfo || {},
				baseInfo:response.baseInfo || {},
				companyInfo:response.companyInfo || {},
				contacts:response.contacts || {},
				joinCount:response.companyInfo.enterTimes || 0,
				managerInfo:response.managerInfo || [],
				resultAreaCode
			})
		}).catch(function (err) { 
			Message.error(err.message)
		});
		Http.request('get-user-business-info',{uid:memberId}).then(function (response) {
			_this.setState({
				socialDynamic:response.socialDynamic || {},
				workInfo:response.workInfo || {},
				miniApplicationInfo: response.miniApplicationInfo|| {},
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
					<div className="u-text">{companyInfo.enterStatus}</div>
				</div>
			)
		}else if(companyInfo.enterStatusCode=="1"){
			return(
				<div  className="u-info-photo">
					<span>入驻状态：</span>
					<div className="u-text u-red">{companyInfo.enterStatus}</div>
				</div>
			)
		}else if(companyInfo.enterStatusCode=="2"){
			return(
				<div  className="u-info-photo">
					<span>入驻状态：</span>
					<div className="u-text u-orange">{companyInfo.enterStatus}</div>
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
				workInfo,
				joinCount,
				miniApplicationInfo,
				managerInfo,
				resultAreaCode
			}=this.state;
		let memberId=this.props.params.memberId;
			
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
								value={resultAreaCode}
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
									label="姓名："
									component="labelText"
									value={baseInfo.mbrName}
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
									label="性别："
									component="labelText"
									value={baseInfo.gender}
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
									label="常驻地区："
									component="labelText"
									value={baseInfo.residentArea}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="身份证号："
									component="labelText"
									value={baseInfo.identityCode}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="兴趣爱好："
									component="labelText"
									value={baseInfo.hobbies}
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
									label="入驻时间："
									component="labelText"
									value={companyInfo.enterDate}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="企业管理员："
									component="labelText"
									value={companyInfo.leader}
									defaultValue="-"
							/>
							{joinCount>0?<div className="u-join-tip"  onClick={this.openJoinDialog.bind(this,memberId)}>查看入驻记录 （{joinCount}）>></div>:''}
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">企业管理员信息</span>
						</div>
						<div className="u-info-content">
						  {managerInfo.length>0?(
							  <table className="u-company-info-table">
								<thead>
									<tr className="u-thead">
										<th>管理的企业</th>
										<th>管理的社区</th>
									</tr>
								</thead>
								<tbody className="u-tabody">
									{managerInfo && managerInfo.map((item,index)=>{
										return(
											<tr>
												<td>{item.companyName}</td>
												<td>{item.communityName}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						  ):(
							  <div className="u-company-info-nothing">
								<div className="u-noting-img"></div>
								<div className="u-noting-txt">尚未成为任何企业的管理员</div>
							  </div>
						  )}
							
						</div>

					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">APP业务信息</span>
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
									label="打印次数："
									component="labelText"
									value={workInfo.print}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="预约的访客："
									component="labelText"
									value={workInfo.visiter}
									defaultValue="-"
							/>
						</div>
					</div>
					<div className="ui-detail-layout">
						<div className="ui-content-title">
							<span className="ui-circle">小程序业务信息</span>
						</div>
						<div className="u-info-content"> 
							<KrField
									grid={1/2} 
									label="预订KM会议室：" 
									component="labelText"
									value={miniApplicationInfo.meetingOrderTimes}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="预订散座数量："
									component="labelText"
									value={miniApplicationInfo.orderSeatNum}
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
							<KrField
									grid={1/2} 
									label="团队打Call数："
									component="labelText"
									value={socialDynamic.teamTipNum}
									defaultValue="-"
							/>
							<KrField
									grid={1/2} 
									label="创建话题数："
									component="labelText"
									value={socialDynamic.talkpointNum}
									defaultValue="-"
							/>
						</div>
					</div>
				</div>
			</Section>
			<Dialog
					title={`入驻记录（${joinCount}）`}
					modal={true}
					open={this.state.openJoin}
					onClose={this.openJoinDialog}
					contentStyle={{width:750}}
				>
						<JoinList  memberId={this.state.memberId} />
				</Dialog>
			</div>
		);
	}
}

 
