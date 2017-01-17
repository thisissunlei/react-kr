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
      forgetPwd:false,
      verifyByMail:true,
      verifyByMobile:false,
      noneName:false,
      nonePwd:false,
      editPwd:false,
      canLogin:true,
      pwdOneHide:true,
      pwdTwoHide:true,
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
  forgetPwd=()=>{
    this.setState({
      forgetPwd:true,
      canLogin:false,
    })
  }
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
    })
  }
  goToVerify=()=>{
    this.setState({
      forgetPwd:true,
      editPwd:false,
      verifyByMail:true,
    })
  }
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
                      <li className="info" id="showMsg">&nbsp;</li>
                       <li className="input-txt loginname">
                         <Input style={{width:"80%",marginTop:5}} type="text" name="loginname" placeholder="请输入手机号或者邮箱"/>
                         { this.state.noneName && <span className="redErr">请输入您的手机号/邮箱</span>}
                       </li>
                       <li className="input-txt loginpwd">
                         <Input style={{width:"80%",marginTop:5}} name="stationnum" component="input" type="password" placeholder="请输入密码"/>
                           { this.state.nonePwd && <span className="redErr">请输入密码</span>}
                       </li>

                       <li>
                          <p  className="login-btn" onClick={this.submit}>登&nbsp;&nbsp;&nbsp;录</p>
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
                  					<li className="info J_msg" >&nbsp;</li>
                  			         <li className="input-txt loginpwds">

                  			         	<Input type="text"   placeholder="请输入邮箱"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <Input type="text" className="codes" id="verifyCode" name="verifyCode"  placeholder="请输入验证码"/>
                  				          </div>
                  				          <span className="sendCode" id="sendVerifyCodeLabel"  >发送验证码</span>
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
                  					<li className="info J_msg" id="showMsg" >&nbsp;</li>
                  			         <li className="input-txt loginpwds">
                  			         	<Input type="text" placeholder="请输入手机"/>
                  			         </li>
                  				     <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <input type="text" className="codes" id="verifyCode" name="verifyCode"  placeholder="请输入验证码"/>
                  				          </div>
                  				          <span className="sendCode" id="sendVerifyCodeLabel"  >发送验证码</span>
                  				     </li>
                  			         <li>
                  			             <input type="button" value="下一步" onClick={this.toEditPwd} className="login-btn next"  />
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
            				         <input type="hidden" name="loginkey" id="loginkey"/>
            					 		   <li className="info" id="showMsg"  ></li>
            					       <li className="input-txt pwdone pwd">
                                   <Input
                                       type={this.state.pwdOneHide?'password':'text'}
                                       className="J_pwd"
                                       ref="onePwd"
                                       name="onePwd"
                                       placeholder="请输入密码"
                                    />
                                  <span
                                      className={this.state.pwdOneHide?'hidePwd':' '}
                                      onClick={this.showPwdOne}>
                                  </span>
            					       </li>
            						     <li className="input-txt pwdtwo pwd">
                                      <Input
                                          type={this.state.pwdTwoHide?'password':'text'}
                                          className="J_pwdTwo"
                                          ref="twoPwd"
                                          placeholder="请再次输入密码"
                                      />
                                    <span
                                        className={this.state.pwdTwoHide?'hidePwd':' '}
                                        onClick={this.showPwdTwo}>
                                    </span>
            						     </li>
          					         <li>
          					             <input type="button" value="完成并登录" className="login-btn J_login" />
          					         </li>
          					         <li onClick={this.goToVerify} className="login-pwdinfo">
          					              返回上一步
          					         </li>
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
