import React, {
	Component,
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	reduxForm,
  Fields

} from 'redux-form';

import {
	Actions,
	Store,
  connect,
} from 'kr/Redux';

import {
	Input,
  KrField,
  ListGroup,
  ListGroupItem,
  Message,
	Notify,
} from 'kr-ui';

import State from './State';
import './index.less';

@observer
class Login extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,

	}
	constructor(props, context) {
		super(props, context);
    this.state={
			noneName:false,
      nonePwd:false,
			errThree:false,
			//验证
      forgetPwd:false,
			timedisabled:'S后重新获取',
			//邮箱
      verifyByMail:true,
			togetMailtest: true,
			gettingMail: false,
			MailTimeDisabledState:false,
			timeminMail:60,
			regettestMailState:false,
			//手机
      verifyByMobile:false,
			togetMobiletest: true,
			gettingMobile:false,
			MobileTimeDisabledState:false,
			regettestMobileState:false,
			timeminMobile:60,
			//重置
      editPwd:false,
      canLogin:true,
      pwdOneHide:true,
      pwdTwoHide:true,
			notSame:false,
			//重置成功
			edited:false,
			timeToLogin:3,
    }
	}
	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
    this.getCanvas();
	}
  getCanvas=()=>{
    var canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d'),
      w = canvas.width = window.innerWidth,
      h = canvas.height = window.innerHeight,

      hue = 217,
      stars = [],
      count = 0,
      maxStars = 1200;

    var canvas2 = document.createElement('canvas'),
      ctx2 = canvas2.getContext('2d');
    canvas2.width = 100;
    canvas2.height = 100;
    var half = canvas2.width / 2,
      gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
    gradient2.addColorStop(0.025, '#fff');
    gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
    gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
    gradient2.addColorStop(1, 'transparent');

    ctx2.fillStyle = gradient2;
    ctx2.beginPath();
    ctx2.arc(half, half, half, 0, Math.PI * 2);
    ctx2.fill();

    // End cache

    function random(min, max) {
      if (arguments.length < 2) {
        max = min;
        min = 0;
      }

      if (min > max) {
        var hold = max;
        max = min;
        min = hold;
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function maxOrbit(x, y) {
      var max = Math.max(x, y),
        diameter = Math.round(Math.sqrt(max * max + max * max));
      return diameter / 2;
    }

    var Star = function() {

      this.orbitRadius = random(maxOrbit(w, h));
      this.radius = random(60, this.orbitRadius) / 12;
      this.orbitX = w / 2;
      this.orbitY = h / 2;
      this.timePassed = random(0, maxStars);
      this.speed = random(this.orbitRadius) / 900000;
      this.alpha = random(2, 10) / 10;

      count++;
      stars[count] = this;
    }

    Star.prototype.draw = function() {
      var x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
        y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
        twinkle = random(10);

      if (twinkle === 1 && this.alpha > 0) {
        this.alpha -= 0.05;
      } else if (twinkle === 2 && this.alpha < 1) {
        this.alpha += 0.05;
      }

      ctx.globalAlpha = this.alpha;
      ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
      this.timePassed += this.speed;
    }

    for (var i = 0; i < maxStars; i++) {
      new Star();
    }

    function animation() {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.8;
      ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'lighter';
      for (var i = 1, l = stars.length; i < l; i++) {
        stars[i].draw();
      };

      window.requestAnimationFrame(animation);
    }

    animation();
  }
	//登录部分
	submitLogin=()=>{
		if(!this.refs.loginName.value){
			this.setState({
				noneName:true,
			})

		}
		if(!this.refs.loginPwds.value){
			this.setState({
				nonePwd:true,
			})
		}
		if(this.refs.loginName.value && this.refs.loginPwds.value){
			this.setState({
				forgetPwd:false,
				canLogin:true,
				verifyByMail:true,
				nonePwd:false,
				noneName:false,
			})
		}
		var _this = this;
		Store.dispatch(Actions.callAPI('personalLogin', {},{
			loginName:_this.refs.loginName,
			loginPwds:_this.refs.loginPwds,
		})).then(function(response) {
		}).catch(function(err) {
			// if(err.code<0){
			// 	Message.error(err.message)
			// }
		});
	}
	goToVerify=()=>{
		this.setState({
			forgetPwd:true,
			editPwd:false,
			verifyByMail:true,
		})
	}
  forgetPwd=()=>{
    this.setState({
      forgetPwd:true,
      canLogin:false,
    })
  }
	//验证部分
  mailTitleClick=()=>{
    this.setState({
      verifyByMail:true,
    })
  }
  mobileTitleClick=()=>{
    this.setState({
      verifyByMail:false,
    })
  }
  goToLogin=()=>{
		this.setState({
			forgetPwd:false,
			canLogin:true,
			verifyByMail:true,
			nonePwd:false,
			noneName:false,
		})
  }
	//邮箱验证
	togetMailtestCode=()=>{
		this.refs.verifyCode.value='';
		this.setState({
			gettingMail:true,
			regettestMailState:false,
			togetMailtest:false,
		},function(){
			var _this = this;
			Store.dispatch(Actions.callAPI('loginGetVerifyCode', {},{
				codeType:'MAIL',
				email:_this.refs.loginMail.value,
			})).then(function(response) {
				_this.togetMailtest()
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
				}
				_this.setState({
					gettingMail:false,
					togetMailtest:true,
				})
			});
		})
	}
	//邮箱验证点击获取验证码函数
	togetMailtest =()=>{
		window.clearTimeout(this.timerMail);
		var _this = this;
		this.setState({
			MailTimeDisabledState:true,
			regettestMailState:false,
			timeminMail:60,
			gettingMail:false,
		},function(){
			time()
		})
		function time() {
				if (_this.state.timeminMail == 0) {
						_this.setState({
							regettestMailState:true,
							MailTimeDisabledState:false,
							togetMailtest:false,
						})
				} else {
					_this.setState({
						timeminMail:--_this.state.timeminMail,
					})
					_this.timerMail =	window.setTimeout(function() {
								time()
						},
						1000)
				}
		}
	}
	//手机验证
	togetMobiletestCode=()=>{
		this.refs.verifyCode.value='';
		this.setState({
			regettestMobileState:false,
			gettingMobile:true,
			togetMobiletest:false,
		},function(){
			var _this = this;
			Store.dispatch(Actions.callAPI('loginGetVerifyCode', {},{
				codeType:'SMS',
				mobile:_this.refs.loginMobile.value,
			})).then(function(response) {
				_this.togetMobiletest()
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
				}
				_this.setState({
					gettingMobile:false,
					togetMobiletest:true,
				})
			});
		})
	}
	//手机验证点击获取验证码函数old
	togetMobiletest =()=>{
		window.clearTimeout(this.timer);
		var _this = this;
		this.setState({
			togettest:true,
			gettingMobile:false,
			MobileTimeDisabledState:true,
			regettestMobileState:false,
			timeminMobile:60,
		},function(){
			time()
		})
		function time() {
        if (_this.state.timeminMobile == 0) {
            _this.setState({
							regettestMobileState:true,
							MobileTimeDisabledState:false,
							togetMobiletest:false,
						})
        } else {
					_this.setState({
						timeminMobile:--_this.state.timeminMobile,
					})
            _this.timer = window.setTimeout(function() {
                time()
            },
            1000)
        }
    }
	}
	//重置密码
	toEditPwd=()=>{
    this.setState({
      editPwd:true,
      forgetPwd:false,
      canLogin:false,
    })
  }
	showPwdOne=()=>{
		this.setState({
			pwdOneHide:!this.state.pwdOneHide,
		})
	}
	showPwdTwo=()=>{
		this.setState({
			pwdTwoHide:!this.state.pwdTwoHide,
		})
	}
	//重置密码完成
	goToEdited=()=>{
		this.setState({
			notSame:fasle,
		})
		var _this = this;
		if(_this.refs.onePwd!==_this.refs.twoPwd){
			_this.setState({
				notSame:true,
			})
			return;
		}
		if(_this.refs.onePwd.value==_this.refs.twoPwd){

			return;
		}
		window.clearTimeout(this.timerLogin)

		this.setState({
			edited:true,
			editPwd:false,
			timeToLogin:3,
		},function(){
			time()
		})
		function time(){
			if (_this.state.timeToLogin == 0) {
					window.location.reload();
			} else {
				_this.setState({
					timeToLogin:--_this.state.timeToLogin,
				})
				_this.timerLogin =	window.setTimeout(function() {
							time()
					},
					1000)
			}
		}
	}
	render() {

		return (
          <div className="g-permission-login">
            <canvas id="canvas"></canvas>
          {<div className="content">
            <div className="content-wrap">
              <div className="login-title">
                氪空间管理平台
              </div>
              <div className="login-box">
                <div className="logos"></div>
                { this.state.canLogin &&
                  <div>
                  <div className="login-tip">登录</div>
                  <div className="login-content">
                     <ul className="login-content-ul">
                       <li className="input-txt loginname">
                         <Input style={{width:"80%",marginTop:5}} type="text" ref="loginName" placeholder="请输入手机号或者邮箱"/>
                         { this.state.noneName && <span className="redErr">请输入您的手机号/邮箱</span>}
                       </li>
                       <li className="input-txt loginpwd">
                         <Input style={{width:"80%",marginTop:5}} ref="loginPwds" component="input" type="password" placeholder="请输入密码"/>
                           { this.state.nonePwd && <span className="redErr">请输入密码</span>}
                       </li>

											 { this.state.errThree &&
												 <li className="clearfix">
				                   <div className="input-verifycode">
					                   <Input type="text" placeholder="请输入验证码"/>
				                   </div>
				                   <div className="input-verifycode-img"></div>
			                 	</li>
										 	 }
                       <li>
                          <p  className="login-btn" onClick={this.submitLogin}>登&nbsp;&nbsp;&nbsp;录</p>
                       </li>
                       <li onClick={this.forgetPwd} className="login-pwdinfo">
                         忘记密码?
                       </li>
                     </ul>
                    </div>
                    </div>
                }
                { this.state.forgetPwd &&
                    <div className="verifyTotal">
                      <div className="tabList">
                  			<p className={this.state.verifyByMail?'activeTitle':'normalTitle'} onClick={this.mailTitleClick}>验证邮箱</p>
                        <p className={!this.state.verifyByMail?'activeTitle':'normalTitle'} onClick={this.mobileTitleClick}>验证手机</p>
                  		</div>
                  { this.state.verifyByMail &&

                  		<div className="login-content">
                  			 <ul className="login-content-ul">
                  			         <li className="input-txt loginpwds">
                  			         	<Input type="text" ref="loginMail" placeholder="请输入邮箱"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <Input type="text" className="codes" ref="verifyCode" placeholder="请输入验证码"/>
                  				          </div>

																			{ this.state.togetMailtest && <span className="sendCode" onClick={this.togetMailtestCode} >发送验证码</span>}
																			{ this.state.gettingMail && <span className="timeout">正在发送...</span>}
																			{ this.state.MailTimeDisabledState && <span className="timeout">{this.state.timeminMail+this.state.timedisabled}</span>}
																			{ this.state.regettestMailState && <span className="sendCode" onClick={this.togetMailtestCode} >重新获取</span>}
																 </li>
                  			         <li>
                  			             <Input onClick={this.toEditPwd} type="button" value="下一步" className="login-btn next"  />
                  			         </li>
                  			         <li onClick={this.goToLogin} className="login-pwdinfo">
                  			             返回登录
                  			         </li>

                  			 </ul>

                  		</div>

                  }
                  { !this.state.verifyByMail &&

                  		<div className="login-content">
                  			 <ul className="login-content-ul">
                  			         <li className="input-txt loginpwds">
                  			         	<Input type="text" ref="loginMobile" placeholder="请输入手机"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <Input type="text" className="codes" ref="verifyCode" placeholder="请输入验证码"/>
                  				          </div>
																			{ this.state.togetMobiletest && <span className="sendCode" onClick={this.togetMobiletestCode} >发送验证码</span>}
																			{ this.state.gettingMobile && <span className="timeout">正在发送...</span>}
																			{ this.state.MobileTimeDisabledState && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}
																			{this.state.regettestMobileState && <span onClick={this.togetMobiletestCode} className="sendCode">重新获取</span>}

                  				     </li>
                  			         <li>
                  			             <Input type="button" value="下一步" onClick={this.toEditPwd} className="login-btn next"  />
                  			         </li>
                  			         <li onClick={this.goToLogin} className="login-pwdinfo">
                  			             返回登录
                  			         </li>
                  			 </ul>
                  		</div>
                  }
                  	</div>
                }
                { this.state.editPwd &&
                  <div className="editPwd">
                    <div className="login-tip">重置密码</div>
                      <div className="login-content">
                					 <ul className="login-content-ul">
														 <form >
            					    {/*
														<li className="input-txt pwdone pwd">
                                   <KrField
                                       type={this.state.pwdOneHide?'password':'text'}
																			 name="onePwd"
                                       ref="onePwd"
                                       placeholder="请输入密码"
																			 notifys={['6-20位字符','只能包含大小写字母、数字以及标点符号（除空格）','大写字母、小写字母、数字和标点符号至少包含两种']}
                                    />

                                  <p
                                      className={this.state.pwdOneHide?'hidePwd':' '}
                                      onClick={this.showPwdOne}>
                                  </p>
            					       </li>
														*/}
														<li className="hideInput">
															<input type="text" />
														</li>
														 <li className="inputtest">
															 <KrField
																	 type={this.state.pwdOneHide?'password':'text'}
																	 component="input"
																	 name="onePwdadsfasdf"
																	 autoComplete="off"
																	 ref="onePwd"
																	 placeholder="请输入密码"
																	 notifys={['6-20位字符','只能包含大小写字母、数字以及标点符号（除空格）','大写字母、小写字母、数字和标点符号至少包含两种']}
																/>
																<p
																		className={this.state.pwdOneHide?'hidePwd':' '}
																		onClick={this.showPwdOne}>
																</p>
														 </li>
														 <li className="inputtesttwo">
															 <KrField
																 	 component="input"
																	 autoComplete="off"
																	 type={this.state.pwdTwoHide?'password':'text'}
																	 name="twoPwd"
																	 ref="twoPwd"
																	 placeholder="请再次输入密码"
																/>
																<p
																		className={this.state.pwdTwoHide?'hidePwd':' '}
																		onClick={this.showPwdTwo}>
																</p>
														 </li>
														 {this.state.notSame &&
															 <li className="notSame">
																 两次输入的密码不一致 请重新输入
															 </li>
														 }

            						{/*
													<li className="input-txt pwdtwo pwd">
																			<KrField
																					type={this.state.pwdTwoHide?'password':'text'}
																					ref="twoPwd"
																					name="twoPwd"
																					component="input"
																					placeholder="请再次输入密码"
																			/>
																		<p
																				className={this.state.pwdTwoHide?'hidePwd':' '}
																				onClick={this.showPwdTwo}>
																		</p>
														 </li>
													*/}
          					         <li>
          					             <input type="button" onClick={this.goToEdited} value="完成并登录" className="login-btn J_login" />
          					         </li>
          					         <li onClick={this.goToVerify} className="login-pwdinfo">
          					              返回上一步
          					         </li>
														 </form>
                					 </ul>
                  </div>
                </div>
                }
								{ this.state.edited &&
                  <div className="edited">
                    <div className="login-tip">重置完成</div>
                      <div className="login-content">
                					 <ul className="login-content-ul">
            				        	<li className="editOk"><span>重置成功，请牢记新的登录密码</span></li>
															<li className="timeToLogin"><span>该页面在{this.state.timeToLogin}秒后自动跳转到登陆页</span></li>
                					 </ul>
                  </div>
                </div>
                }


              </div>
            </div>

          </div>}

          </div>

		);
	}
}
export default reduxForm({form:'Login',enableReinitialize:true,keepDirtyOnReinitialize:true})(Login);
