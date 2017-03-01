import React, {
	Component,
	PropTypes
} from 'react';
import {
	observer
} from 'mobx-react';

import {
	reduxForm,
  Fields,
	formValueSelector,
	change,
	initialize
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
	Button,
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
			saltStr:'',
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
		this.HandleTabKey();
	}
	//屏蔽tab
	HandleTabKey=(evt)=>{
				document.onkeydown = function() {
				if (event.keyCode == 9) {  //如果是其它键，换上相应在ascii 码即可。
						return false; //非常重要
				}
		}
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
		Store.dispatch(Actions.callAPI('loginSubmit', {},{
			loginName:_this.refs.loginName.value,
			loginPwd:_this.refs.loginPwds.value,
		})).then(function(response) {
			//跳转？
		}).catch(function(err) {
			 if(err.code==-1){
			 	Message.error(err.message)
			 }
			 if(err.code==-2){
			 	Message.error(err.message)

			 }
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
		this.refs.verifyCodeByMail.value='';
		var _this = this;
		console.log(_this.refs.loginMail.value);
		this.setState({
			gettingMail:true,
			regettestMailState:false,
			togetMailtest:false,
		},function(){

			Store.dispatch(Actions.callAPI('getVcodeByMail', {
				email:_this.refs.loginMail.value,
			},{})).then(function(response) {
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
	//邮箱验证点击获取验证码函数zhangchi@krspace.cn
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
	//身份验证By邮箱点击确认后
	submitIdByMail=()=>{
		if(this.refs.verifyCodeByMail.value){
			this.submitVerifyIDbyMail()
		}else{
			Message.error("请填写验证码")
		}
	}
	//邮箱身份验证点击确定
	submitVerifyIDbyMail =()=>{
			var _this = this;
				Store.dispatch(Actions.callAPI('validEmailCode', {},{
					email:_this.refs.loginMail.value,
					code:_this.refs.verifyCodeByMail.value,
				})).then(function(response) {
					_this.setState({
						isLegal:true,
						//timeminMobile:"",//
						//timeminMail:"",//
						saltStr:response.saltStr,
						editPwd:true,
						forgetPwd:false,
						canLogin:false,
					})
				}).catch(function(err) {
					if(err.code<0){
						Message.error(err.message)
					//           	console.log(err)
					}
				});
	}
	//手机验证
	togetMobiletestCode=()=>{
		this.refs.verifyCodeByMobile.value='';
		this.setState({
			regettestMobileState:false,
			gettingMobile:true,
			togetMobiletest:false,
		},function(){
			var _this = this;
			Store.dispatch(Actions.callAPI('getVcodeByPhone',{
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
	submitIdByMobile=()=>{
		if(this.refs.verifyCodeByMobile.value){
			//console.log("111",document.getElementsByClassName("code")[0].value);
			this.submitVerifyIDbyMobile()
		}else{
			Message.error("请填写验证码")
		}
	}

	//手机身份验证点击确定
	submitVerifyIDbyMobile =()=>{
			var _this = this;
			//console.log("1",this.state.regettestMobileState);
				Store.dispatch(Actions.callAPI('validPhoneCode',{},{
					mobile:_this.refs.loginMobile.value,
					code:_this.refs.verifyCodeByMobile.value,
				})).then(function(response) {
					_this.setState({
						isLegal:true,
						//timeminMobile:"",//
						//timeminMail:"",//
						saltStr:response.saltStr,
						editPwd:true,
						forgetPwd:false,
						canLogin:false,
					},function(){
					//	console.log("2",this.state.regettestMobileState);
							_this.setState({

							})
					})
				}).catch(function(err) {
					if(err.code<0){
						Message.error(err.message)
					//           	console.log(err)
				//          	console.log(err);
					}
				});
	}
	// onSubmit(form){
	// 	const {
	// 		onSubmit
	// 	} = this.props;
	//  onSubmit && onSubmit(form);
	// }
	//修改密码点击确定后的函数ing
	submitPwd =(values)=>{
		console.log(values.new);
			var _this = this;
			Store.dispatch(Actions.callAPI('setNewPwd', {},{
				pwd:values.new,
				rePwd:values.newagain,
				saltStr:_this.state.saltStr
			})).then(function(response) {
				Message.success("修改成功");
				_this.goToEdited();
				// window.setTimeout(function(){
				// 	window.location.href="/login/login"
				// }
				// 	,1000)
			}).catch(function(err) {
				if(err.code<0){
					Message.error(err.message)
				}
			});
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
		// this.setState({
		// 	notSame:fasle,
		// })
		// var _this = this;
		// if(_this.refs.onePwd!==_this.refs.twoPwd){
		// 	_this.setState({
		// 		notSame:true,
		// 	})
		// 	return;
		// }
		// if(_this.refs.onePwd.value==_this.refs.twoPwd){
		//
		// 	return;
		// }
		var _this = this;
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
		const {handleSubmit} = this.props;
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
											<li className="hideInput">
												<input type="text" />
											</li>
											 <li className="loginName">

												 <input
														 type='text'
														 name="loginName"
														 ref="loginName"
														 placeholder="请输入手机号或者邮箱"
													/>
												{ this.state.noneName && <span className="redErr">请输入您的手机号/邮箱</span>}
												</li>
                				{/*
												<li className="input-txt loginpwd">
                         <Input style={{width:"80%",marginTop:5}} ref="loginPwds" component="input" type="password" placeholder="请输入密码"/>
                           { this.state.nonePwd && <span className="redErr">请输入密码</span>}
                       	</li>
											 */}

											 <li className="hideInput">
 												<input type="text" />
 												</li>
											 <li className="loginPwd">
												 <input
														 type='password'
														 name="loginPwds"
														 ref="loginPwds"
														 placeholder="请输入密码"
													/>
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
                       <li onClick={this.forgetPwd} className="login-pwdinfo pointer">
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
                  			         	<input type="text" ref="loginMail" placeholder="请输入邮箱"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <input type="text" className="codes" ref="verifyCodeByMail" placeholder="请输入验证码"/>
                  				          </div>

																			{ this.state.togetMailtest && <span className="sendCode" onClick={this.togetMailtestCode} >发送验证码</span>}
																			{ this.state.gettingMail && <span className="timeout">正在发送...</span>}
																			{ this.state.MailTimeDisabledState && <span className="timeout">{this.state.timeminMail+this.state.timedisabled}</span>}
																			{ this.state.regettestMailState && <span className="sendCode" onClick={this.togetMailtestCode} >重新获取</span>}
																 </li>
                  			         <li>
                  			             <input onClick={this.submitIdByMail} type="button" value="下一步" className="login-btn next"  />
                  			         </li>
                  			         <li onClick={this.goToLogin} className="login-pwdinfo pointer">
                  			             返回登录
                  			         </li>

                  			 </ul>

                  		</div>

                  }
                  { !this.state.verifyByMail &&

                  		<div className="login-content">
                  			 <ul className="login-content-ul">
                  			         <li className="input-txt loginpwds">
                  			         	<input type="text" ref="loginMobile" placeholder="请输入手机"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <input type="text" className="codes" ref="verifyCodeByMobile" placeholder="请输入验证码"/>
                  				          </div>
																			{ this.state.togetMobiletest && <span className="sendCode" onClick={this.togetMobiletestCode} >发送验证码</span>}
																			{ this.state.gettingMobile && <span className="timeout">正在发送...</span>}
																			{ this.state.MobileTimeDisabledState && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}
																			{this.state.regettestMobileState && <span onClick={this.togetMobiletestCode} className="sendCode">重新获取</span>}

                  				     </li>
                  			         <li>
                  			             <input type="button" value="下一步" onClick={this.submitIdByMobile} className="login-btn next"  />
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
									<form onSubmit={handleSubmit(this.submitPwd)}>

                    <div className="login-tip">重置密码</div>
                      <div className="login-content">
                					 <ul className="login-content-ul">
														<li className="hideInput">
															<input type="text" />
														</li>
														 <li className="inputtest">
															 <KrField
																	 type={this.state.pwdOneHide?'password':'text'}
																	 component="input"
																	 name="new"
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
																	 name="newagain"
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

          					         <li>
          					             <input value="完成并登录" type="submit" className="login-btn J_login" />

          					         </li>
          					         <li onClick={this.goToVerify} className="login-pwdinfo">
          					              返回上一步
          					         </li>
                					 </ul>

                  </div>
								</form>
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
const validate = values => {

	const errors = {}

	if (!values.new) {
		errors.new = '请填写新密码';
	}

  if (!values.newagain) {
		errors.newagain = '请再次输入新的登录密码';
	}

  if (values.newagain && values.new && values.new !== values.newagain ) {
    errors.newagain = '两次密码输入不一致';
  }

	return errors
}
//export default reduxForm({form:'Login',validate})(Login);
const selector = formValueSelector('Login');
export default reduxForm({ form: 'Login', validate})(Login);
