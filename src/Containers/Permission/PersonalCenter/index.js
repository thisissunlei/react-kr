
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
			PwdOrMobile:'',
			m_mContent:true,
			titleClass:true,
			togetMobiletest:true,
			togetMailtest:true,
			MobileTimeDisabled_state:false,
			MailTimeDisabled_state:false,
			timeminMobile:60,
			timeminMail:60,
			timedisabled:'秒后,重新获取验证码',
			regettest_state:false,
			regettest:'重新获取验证码',
			pwdStrengthClass:'',
			name:'',
			mail:'',
			mobile:'',
			pwdStrength:'',
			pwdLevel:'',
			VerifyCodeSuccessOrFail:'',
		}
  }
	initBasicInfo = ()=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('PersonalCenterData', {
		})).then(function(response) {
			_this.setState({
				name: response.loginName,
				mail: response.email,
				mobile: response.mobile,
				pwdStrength: response.pwdStrength,

			},function(){
				if (_this.state.pwdStrength<50) {
					_this.setState({
						pwdStrengthClass:'low',
						pwdLevel:'低',
						})
					}else if (50<_this.state.pwdStrength&&_this.state.pwdStrength<70) {
						_this.setState({
							pwdStrengthClass:'middle',
							pwdLevel:'中',
						})
					}else if (_this.state.pwdStrength>80) {
						_this.setState({
							pwdStrength:'high',
							pwdLevel:'高',
						})

				}
			});
		}).catch(function(err) {

		});
	}
	componentDidMount() {
		this.initBasicInfo();

	}
	componentWillReceiveProps(){

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
	openPwdVerifyIdFunc = ()=>{

		this.setState({
			openVerifyId:!this.state.openVerifyId,
			togetMobiletest:true,
			togetMailtest:true,
			MobileTimeDisabled_state:false,
			MailTimeDisabled_state:false,
			regettest_state:false,
			timeminMobile:60,
			timeminMail:60,
			PwdOrMobile:'pwd',
		})

	}
	openMobileVerifyIdFunc = ()=>{


		this.setState({
			openVerifyId:!this.state.openVerifyId,
			togetMobiletest:true,
			togetMailtest:true,
			MobileTimeDisabled_state:false,
			MailTimeDisabled_state:false,
			regettest_state:false,
			timeminMobile:60,
			timeminMail:60,
			PwdOrMobile:'mobile',
		})

	}
	getVerificationCode = ()=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('PersonalCenterGetVerificationCode', {
		})).then(function(response) {
			_this.setState({
				VerifyCodeSuccessOrFail: response.message,

			});
		}).catch(function(err) {

		});
	}
	closeVerifyIdFunc = ()=>{
		this.setState({
			openVerifyId:!this.state.openVerifyId,
		})
	}
	togetMobiletest =()=>{
		var _this = this;
		this.setState({
			togetMobiletest:false,
			MobileTimeDisabled_state:true,
			regettest_state:false,

		},function(){
			time()
		})
		var wait=60;
		function time() {
			console.log(_this.state.timeminMobile)
        if (wait == 0) {
            _this.setState({
							regettest_state:true,
							MobileTimeDisabled_state:false,
							timeminMobile:60,
						})


        } else {
					_this.setState({

						timeminMobile:--_this.state.timeminMobile,
					})
            wait--;
            window.setTimeout(function() {
                time()
            },
            1000)
        }
    }
	}
	togetMailtest =()=>{
		var _this = this;
		this.setState({
			togetMailtest:false,
			MailTimeDisabled_state:true,
			regettest_state:false,

		},function(){
			time()
		})
		var wait=60;
		function time() {

				if (wait == 0) {
						_this.setState({
							regettest_state:true,
							MailTimeDisabled_state:false,
							timeminMail:60,
						})


				} else {
					_this.setState({


						timeminMail:--_this.state.timeminMail,
					})
						wait--;
						window.setTimeout(function() {
								time()
						},
						1000)
				}
		}
	}
	render(){


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
											<li>登录账号：{this.state.name}</li>
											<li>邮&emsp;&emsp;箱：{this.state.mail}</li>
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
									<div id="bar" className={this.state.pwdStrengthClass}>

									</div>
									<p>
										安全级别：
										<span>{this.state.pwdLevel}</span>
									</p>


								</dd>
							</dl>
							<dl className="row password">
								<dt>
									密码
								</dt>
								<dd>
									安全性高的密码可以使帐号更安全。建议您定期更换密码，设置一个包含字母，符号或数字中至少两项且长度超过6位的密码。
								  <p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openPwdVerifyIdFunc} className="revise">修改</span></p>
								</dd>

							</dl>
							<dl className="row mobile">
								<dt>
									手机号
								</dt>
								<dd>
									您已绑定了手机 {this.state.mobile}。（您的手机为安全手机，可以找回密码）
									<p className="setted">&ensp;已设置&ensp;<span className="bl">|</span>&ensp;<span onTouchTap={this.openMobileVerifyIdFunc} className="revise">修改</span></p>
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
							{ this.state.m_mContent && <div className="mobile_test"><span className="m_m">此处写手机号</span><span>验证码</span><div className="test"><input placeholder="6位验证码" type="text" /><span className="alltest">{ this.state.togetMobiletest && <span onTouchTap={this.togetMobiletest} className="gettest">点此获取验证码</span>}{ this.state.MobileTimeDisabled_state && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}{this.state.regettest_state && <span onTouchTap={this.togetMobiletest} className="regettest">{this.state.regettest}</span>}</span></div></div>}
							{ !this.state.m_mContent && <div className="mail_test"><span className="m_m">此处写邮箱阿</span><span>验证码</span><div className="test"><input placeholder="6位验证码" type="text" /><span className="alltest">{ this.state.togetMailtest && <span onTouchTap={this.togetMailtest} className="gettest">点此获取验证码</span>}{ this.state.MailTimeDisabled_state && <span className="timeout">{this.state.timeminMail+this.state.timedisabled}</span>}{this.state.regettest_state && <span onTouchTap={this.togetMailtest} className="regettest">{this.state.regettest}</span>}</span></div></div>}

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
