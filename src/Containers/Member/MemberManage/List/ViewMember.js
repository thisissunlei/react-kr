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
import './index.less';

export default class ViewMember extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
			baseInfo:{}
		}
	}
	
	componentDidMount() {
		this.getBacicInfo()
	}
	
	getBacicInfo=()=>{
		let memberId=this.props.params.memberId;
		let _this=this;
		Http.request('get-member-detail',{id:memberId}).then(function (response) {
			_this.setState({
				baseInfo:response
			})
		}).catch(function (err) { 
			Message.error(err.message)
		});
	}
	
	render() {
		let {baseInfo}=this.state;
			
			if(baseInfo.gender==0){
	     		baseInfo.gender  = "女";
			}else if(baseInfo.gender==1){
				 baseInfo.gender  = "男";
			}else{
				baseInfo.gender  = "保密";
			}
			if(baseInfo.userType=="0"){
				baseInfo.userType = "入驻会员";
			}else if(baseInfo.userType=="1"){
				baseInfo.userType = "内部会员";
			}
			if(baseInfo.leader=="0"){
				baseInfo.leader = "否";
			}else if(baseInfo.leader=="1"){
				baseInfo.leader = "是";
			}
			
			
		return (
			<div className="g-member-detail">
			<Title value="会员详情"/>
			<Section title="会员详情" description="" >
				<div className="m-member-info">
					   <KrField
							grid={1/3} 
							label="姓名:"
							alignRight={true} 
							component="labelText"
							value={baseInfo.name}
							defaultValue="无"
						 />
					   <KrField 
							   grid={1/3} 
							   alignRight={true} 
							   label="公司:" 
							   component="labelText" 
							   value={baseInfo.companyName} 
							   defaultValue="无"
						/>

					   <KrField 
							   grid={1/3}  
							   alignRight={true} 
							   component="labelText"
							   label="社区:" 
							   value={baseInfo.communityName} 
							   defaultValue="无"
						/>

					   <KrField 
							   grid={1/3} 
							   alignRight={true} 
							   label="联系电话:" 
							   component="labelText" 
							   value={baseInfo.phone} 
							   defaultValue="无"
						/>

					   <KrField 
							   grid={1/3} 
							   alignRight={true} 
							   label="职位:" 
							   component="labelText" 
							   value={baseInfo.job} 
							   defaultValue="无"
						/>

					   <KrField 
							   grid={1/3} 
							   alignRight={true} 
							   label="邮箱:" 
							   component="labelText"
							   value={baseInfo.email} 
							   defaultValue="无"
						/>

					   <KrField 
							   grid={1/3} 
							   alignRight={true} 
							   label="性别:" 
							   component="labelText" 
							   value={baseInfo.gender} 
							   defaultValue="无"
						/>

						<KrField 
								grid={1/3} 
								alignRight={true} 
								label="微信昵称:" 
								component="labelText" 
								value={baseInfo.wechatNick} 
								defaultValue="无" 
						/>

						 <KrField 
								 grid={1/3} 
								 alignRight={true} 
								 label="App昵称:" 
								 component="labelText" 
								 value={baseInfo.nick} 
								 defaultValue="无"
						 />

						 <KrField 
								 grid={1/3} 
								 alignRight={true} 
								 label="生日:" 
								 component="labelText"
								 value={baseInfo.birthday} 
								 defaultValue="无"
						 />

						

						<KrField 
								grid={1/3} 
								alignRight={true} 
								label="注册时间:"
								type="date"  
								component="labelText" 
								value={baseInfo.createTime} 
								defaultValue="无"
						/>
						<KrField 
								grid={1/3} 
								alignRight={true} 
								label="会员类型:" 
								component="labelText" 
								value={baseInfo.userType} 
								defaultValue="无"
						/>
						<KrField 
								grid={1/3} 
								alignRight={true} 
								label="企业管理员:" 
								component="labelText" 
								value={baseInfo.leader} 
								defaultValue="无"
						/>
				</div>
			</Section>
			</div>
		);
	}
}

 
