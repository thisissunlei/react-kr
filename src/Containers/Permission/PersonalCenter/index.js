
import React,{Component} from 'react';

import './index.less';
import {
	Dialog,
	Button,
	ButtonGroup,
	KrForm,
	FieldControl,
} from 'kr-ui';
import {
	Actions,
	Store
} from 'kr/Redux';
export default class PersonalCenter extends Component{

	static displayName = 'PersonalCenter';
  constructor(props, context){
    super(props,context)
		this.state={
			openVerifyId:false,
			// openVerifyMobile:false,
			// openVerifyMail:false,
			m_mContent:true,
			titleClass:true,
			togettest:true,
			name:'',
			mail:'',
			mobile:''
		}
  }
	initBasicInfo =()=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('PersonalCenterData', {
		})).then(function(response) {
			_this.setState({
				name: response.loginName,
				mail: response.email,
				mobile: response.mobile,
				pwdStrength: response.pwdStrength,
			});
		}).catch(function(err) {

		});
	}
	componentDidMount() {
		this.initBasicInfo();
		Store.dispatch(Actions.switchSidebarNav(false));
	}

	mobileTitleClick =()=>{
		this.setState({
			titleClass:true,
			m_mContent:true,
		})
	}
	mailTitleClick =()=>{
		this.setState({
			titleClass:false,
			m_mContent:false,
		})
	}
	openVerifyIdFunc = ()=>{


		this.setState({
			openVerifyId:!this.state.openVerifyId,

		})

	}

	closeVerifyIdFunc = ()=>{
		this.setState({
			openVerifyId:!this.state.openVerifyId,
		})
	}
	togettest =()=>{
		this.setState({
			togettest:false,
		})
	}
	render(){
		console.log('11111',this.state.openVerifyId);

		let {settle_mobile,settle_password}=this.state;
		return (
      <div className="g-personal-center">
          <div className="personal-data">
						<div className="left_box">
								<div className="left">
										<div className="head">

										</div>
								</div>
								<div className="middle">
									<div className="line">

									</div>
									<div className="circle">

									</div>
									<div className="circle">

									</div>
								</div>
						</div>
								<div className="right_box">
									<ul className="data">
											<li>登录账号：</li>
											<li>邮&emsp;&emsp;箱：</li>
											<li>修改头像</li>
									</ul>
								</div>

          </div>
					<div className="safe">

							<dl className="row level">
								<dt>
									您当前的账号安全程度
								</dt>
								<dd>
									<div id="bar" className="middle">

									</div>
									<p>
										安全级别：
										<span>中</span>
									</p>


								</dd>
							</dl>
							<dl className="row password">
								<dt>
									密码
								</dt>
								<dd>
									安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
								  <p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openVerifyIdFunc} className="revise">修改</span></p>
								</dd>

							</dl>
							<dl className="row mobile">
								<dt>
									手机号
								</dt>
								<dd>
									您已绑定了手机    。（您的手机为安全手机，可以找回密码）
									<p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openVerifyIdFunc} className="revise">修改</span></p>
								</dd>

							</dl>

					</div>
					<Dialog title="验证身份" open={this.state.openVerifyId} onClose={this.closeVerifyIdFunc} contentStyle={{width:"444"}}>
						{<div className="verifyId">
							<div className="m_mTitle">
								<span onTouchTap={this.mobileTitleClick} className={this.state.titleClass?'activeTitle':'normalTitle'}>
									手机号
								</span>
								<span onTouchTap={this.mailTitleClick} className={!this.state.titleClass?'activeTitle':'normalTitle'}>
									邮箱
								</span>
							</div>
							{ this.state.m_mContent && <div className="mobile_test"><span className="m_m">此处写手机号</span><span>验证码</span><div className="test"><input placeholder="6位验证码" type="text" />{ this.state.togettest && <span onTouchTap={this.togettest} className="gettest">点此获取验证码</span>}{ !this.state.togettest && <span className="timeout">倒计时</span>}</div></div>}
							{ !this.state.m_mContent && <div className="mail_test"><span className="m_m">此处写邮箱阿</span><span>验证码</span><div className="test"><input placeholder="6位验证码" type="text" />{ this.state.togettest && <span onTouchTap={this.togettest} className="gettest">点此获取验证码</span>}{ !this.state.togettest && <span className="timeout">倒计时</span>}</div></div>}
							{/*<Button label="确定" labelStyle={{color:"#fff",width:"90",height:"35"}} />
							 <Button label="取消" backgroundColor= "red" labelStyle={{color:"#499df1",width:"90",height:"35"}} />*/}
							 {!this.state.togettest && <span className="geted">&emsp;&ensp;验证码已发送到你的手机，30分钟内输入有效，验证 码等同于密码，打死也不能告诉别人。</span>}
								<ButtonGroup style={{marginLeft:'55',marginTop:'30'}}>
									<div  className='ui-btn-center'><Button label="确定" type="submit" joinEditForm /></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</ButtonGroup>
						</div>}
					</Dialog>
    	</div>
		);
	}
}
