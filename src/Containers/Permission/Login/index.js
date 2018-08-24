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
	Http,
} from "kr/Utils";
import {
	Actions,
	Store,
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
import loginEarth from './images/newYear/earth.png'
import loginParents from './images/newYear/parents.png'
import loginSons from './images/newYear/sons.png'
import loginFireworks from './images/newYear/fireworks.png'
// 二维码图片 
import icon_Cblank from './images/OPlogin/icon_Cblank.png'
import icon_Cblue from './images/OPlogin/icon_Cblue.png'
import icon_QRblank from './images/OPlogin/icon_QRblank.png'
import icon_QRblue from './images/OPlogin/icon_QRblue.png'
var env = process.env.NODE_ENV;
var timer;
@observer
class Login extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired,

	}
	constructor(props, context) {
		super(props, context);
		this.state = {
			noneName: false,
			nonePwd: false,
			errThree: false,
			//验证
			forgetPwd: false,
			timedisabled: 'S后重新获取',
			saltStr: '',
			imgCode: '',
			// 首页手机验证码
			togetPhonetest: true,
			gettingPhone: false,
			PhoneTimeDisabledState: false,
			timeminPhone: 60,
			regettestPhoneState: false,
			//邮箱
			verifyByMail: true,
			togetMailtest: true,
			gettingMail: false,
			MailTimeDisabledState: false,
			timeminMail: 60,
			regettestMailState: false,
			//手机
			verifyByMobile: false,
			togetMobiletest: true,
			gettingMobile: false,
			MobileTimeDisabledState: false,
			regettestMobileState: false,
			timeminMobile: 60,
			//重置
			editPwd: false,
			canLogin: true,   //临时修改 取反
			pwdOneHide: true,
			pwdTwoHide: true,
			notSame: false,
			//重置成功
			edited: false,
			timeToLogin: 3,
			LoginHeight: 0,
			//二维码
			QRCode: false,  //临时修改 取反
		//	test: true,  //临时修改 取反
			QrcodeExpired: false,
			headPic: icon_QRblank,
		}
	}
	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
		var docuW = document.documentElement.clientHeight;
		this.setState({
			LoginHeight: docuW
		})
		this.getCanvas();
		this.HandleEnterKey();
		//=======
		// this.windowResize();
		// window.onresize = this.windowResize;

		// 临时修改 
		if(env=='production'){
			// 临时修改 
		   this.handleProduction()
		}
	}
	// 当前环境为线上时触发 
	handleProduction = () =>{
		// this.setState({
		// 	canLogin:false,
		// 	QRCode:true,
		// 	test:false,
		// },() =>{ this.getQRCode()})
		
	} 
	windowResize = () => {
		var width = document.body.clientWidth;
		var height = document.body.clientHeight;
		var initProportion = 1280 / 768;
		var proportion = width / height;

		if (initProportion > proportion) {
			this.loginBg.style.backgroundSize = "auto 100%";
		} else {
			this.loginBg.style.backgroundSize = "100% auto";
		}
		if (1200 > width && width > 1000) {
			console.log("---------", width)
			var poor = 1200 - width;
			this.loginParents.style.width = 300 - poor / 4 + "px";
			this.loginSons.style.width = 300 - poor / 4 + "px";
		}
	}
	//屏蔽tab
	HandleEnterKey = (evt) => {
		var _this = this;
		document.onkeydown = function () {
			if (event.keyCode == 13) {
				_this.submitLogin();
			}
		}
	}

	getCanvas = () => {
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

		var Star = function () {

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

		Star.prototype.draw = function () {
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
	submitLogin = () => {
		if (!this.refs.loginName.value) {
			Message.error('请输入账号');
			return;
		}
		if (!this.refs.loginPwds.value) {
			Message.error('请输入密码');
			return;
		}
		if (!this.refs.imgCode.value) {
			Message.error('请输入手机验证码');
			return;
		}
		if (this.refs.loginName.value && this.refs.loginPwds.value && this.refs.imgCode.value) {
			this.setState({
				forgetPwd: false,
				canLogin: true,
				verifyByMail: true,
				nonePwd: false,
				noneName: false,
			})
		}
		var obj = {};
		if (this.state.errThree) {
			if(!this.refs.imgCode.value){
				Message.error('请输入正确的验证码')
			}
			obj = {
				loginName: this.refs.loginName.value,
				loginPwd: this.refs.loginPwds.value,
				imgCode: this.refs.imgCode.value || '',
			}
		} else {
			obj = {
				loginName: this.refs.loginName.value,
				loginPwd: this.refs.loginPwds.value,
				loginValicode:this.refs.imgCode.value,
			}
		}
		var _this = this;

		function getQueryString(name) {
			const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
			const r = window.location.search.substr(1).match(reg);
			if (r != null) {
				return decodeURIComponent(r[2]);
			}
			return null;
		}

		Http.request('loginSubmit', {}, obj).then(function (response) {
			//跳转？
			debugger;
			const redirectUrl = getQueryString('RU');
			window.location.href = (redirectUrl ? redirectUrl : './');
		}).catch(function (err) {
			if (err.code == -1) {
				Message.error(err.message)
			}
			// if (err.code == -2) {
			// 	_this.setState({
			// 		errThree: true,
			// 	})
			// }
		});
	}
	//验证码切换
	updateCode = () => {
		this.time = new Date();
		this.setState({
			imgCode: ''
		}, function () {
			this.setState({
				imgCode: `/api/krspace-sso-web/sso/login/getImageCode?loginName=${this.refs.loginName.value}&time=${this.time}`,
			})
		})
	}
	goToVerify = () => {
		this.setState({
			forgetPwd: true,
			editPwd: false,
			verifyByMail: true,
		})
	}
	forgetPwd = () => {
		this.setState({
			forgetPwd: true,
			canLogin: false,
		})
	}
	//验证部分
	mailTitleClick = () => {
		this.setState({
			verifyByMail: true,
		})
	}
	mobileTitleClick = () => {
		this.setState({
			verifyByMail: false,
		})
	}
	goToLogin = () => {
		this.setState({
			forgetPwd: false,
			canLogin: true,
			verifyByMail:true,
			nonePwd: false,
			noneName: false,
		})
	}
	// 首页登录获取手机验证码
	getPhonetestCode = () => {
		this.refs.imgCode.value = '';
		var _this = this;
		let phone =this.refs.loginName.value ;
		let password = this.refs.loginPwds.value||'';
//  gi.js
	Http.request('startCaptcha',{loginName:phone,loginPwd:password}).then(function(response) {
	initGeetest({
	  // 以下配置参数来自服务端 SDK
	  gt: response.gt,
	  challenge: response.challenge,
	  offline: !response.success,
	  new_captcha: response.new_captcha,
	  product: 'bind',
	}, function (captchaObj) {
		  // 这里可以调用验证实例 captchaObj 的实例方法
		  captchaObj.onReady(function () {
			captchaObj.verify();
		});
		captchaObj.onSuccess(function () {
		  var verifySuccess = captchaObj.getValidate();
		  Http.request('get-verifyCode',{mobile:response.mobile,geetest_challenge:verifySuccess.geetest_challenge,geetest_seccode:verifySuccess.geetest_seccode,geetest_validate:verifySuccess.geetest_validate}).then(function(response) {
			_this.setState({
				PhoneTimeDisabledState: true,
				regettestPhoneState: false,
				togetPhonetest: false,
				timeminPhone: 60,
			}, function () {
				let {timeminPhone} = _this.state;
				var InterTimer = setInterval(function(){
				timeminPhone--;
				_this.setState({timeminPhone},()=>{
					if(timeminPhone<=0){
						clearInterval(InterTimer);
						_this.setState({
						  regettestPhoneState: true,
						  PhoneTimeDisabledState: false,
						  togetPhonetest: false,
					  })
					  }  
				})
	
			  },1000)
			})
			

			}).catch(function(err) {
				if (err.code < 0) {
					Message.error(err.message)
				}
			});

	  });
	  captchaObj.onClose(function () {
		_this.setState({
			regettestPhoneState: true,
			PhoneTimeDisabledState: false,
			togetPhonetest: false,
		})
	  });
	})

  }).catch(function(err) {
	if (err.code < 0) {
		Message.error(err.message)
	}
  });
	}

	
	// 验证手机验证
	togetPhonetest = () => {
		window.clearTimeout(this.timerPhone);
		var _this = this;
		this.setState({
			PhoneTimeDisabledState: true,
			regettestPhoneState: false,
			timeminPhone: 60,
			gettingPhone: false,
		}, function () {
			time()
		})
		function time() {
			if (_this.state.timeminPhone == 0) {
				_this.setState({
					regettestPhoneState: true,
					PhoneTimeDisabledState: false,
					togetPhonetest: false,
				})
			} else {
				_this.setState({
					timeminPhone: --_this.state.timeminPhone,
				})
				_this.timerPhone = window.setTimeout(function () {
					time()
				},
					1000)
			}
		}
	}

	//邮箱验证
	togetMailtestCode = () => {
	//  gi.js
	let phone = this.refs.loginMail.value;
	var _this = this;
	Http.request('startCaptcha',{loginName:phone,loginPwd:''}).then(function(response) {
		initGeetest({
		  // 以下配置参数来自服务端 SDK
		  gt: response.gt,
		  challenge: response.challenge,
		  offline: !response.success,
		  new_captcha: response.new_captcha,
		  product: 'bind',
		}, function (captchaObj) {
			  // 这里可以调用验证实例 captchaObj 的实例方法
			  captchaObj.onReady(function () {
			  captchaObj.verify();
			});
			captchaObj.onSuccess(function () {
				// 
			  var verifySuccess = captchaObj.getValidate();
			  _this.refs.verifyCodeByMail.value = '';
			  _this.setState({
		  gettingMail: true,
		  regettestMailState: false,
		  togetMailtest: false,
		  MailTimeDisabledState:true,
	  },()=>{
		Http.request('getVcodeByMail',{email:phone,geetest_challenge:verifySuccess.geetest_challenge,geetest_seccode:verifySuccess.geetest_seccode,geetest_validate:verifySuccess.geetest_validate}).then(function(response) {
			_this.togetMailtest()
		}).catch(function (err) {
				if (err.code < 0) {
					Message.error(err.message)
				}
				_this.setState({
					gettingMail: false,
					togetMailtest: true,
					MailTimeDisabledState:false,
				})
		});
		
	  })	  });
		  captchaObj.onClose(function () {
			_this.setState({
				gettingMail: false,
				togetMailtest: true,
				MailTimeDisabledState:false,
			})
		  });
		})
	
	  }).catch(function(err) {
		if (err.code < 0) {
			Message.error(err.message)
		}
	  });
	}



	//邮箱验证点击获取验证码函数zhangchi@krspace.cn
	togetMailtest = () => {
		window.clearTimeout(this.timerMail);
		var _this = this;
		this.setState({
			MailTimeDisabledState: true,
			regettestMailState: false,
			timeminMail: 60,
			gettingMail: false,
			togetMailtest:false,
		}, function () {
			time()
		})
		function time() {
			if (_this.state.timeminMail == 0) {
				_this.setState({
					regettestMailState: true,
					MailTimeDisabledState: false,
					togetMailtest: false,
				})
			} else {
				_this.setState({
					timeminMail: --_this.state.timeminMail,
				})
				_this.timerMail = window.setTimeout(function () {
					time()
				},
					1000)
			}
		}
	}
	//身份验证By邮箱点击确认后
	submitIdByMail = () => {
		if (this.refs.verifyCodeByMail.value) {
			this.submitVerifyIDbyMail()
		} else {
			Message.error("请填写验证码")
		}
	}
	//邮箱身份验证点击确定
	submitVerifyIDbyMail = () => {
		var _this = this;
		Http.request('validEmailCode', {}, {
			email: _this.refs.loginMail.value,
			code: _this.refs.verifyCodeByMail.value,
		}).then(function (response) {
			_this.setState({
				isLegal: true,
				//timeminMobile:"",//
				//timeminMail:"",//
				saltStr: response.saltStr,
				editPwd: true,
				forgetPwd: false,
				canLogin: false,
			})
		}).catch(function (err) {
			if (err.code < 0) {
				Message.error(err.message)
			}
		});
	}

	//手机验证
	togetMobiletestCode = () => {
				//  gi.js
				let phone = this.refs.loginMobile.value;
				var _this = this;
				Http.request('startCaptcha',{loginName:phone,loginPwd:''}).then(function(response) {
					initGeetest({
					// 以下配置参数来自服务端 SDK
					gt: response.gt,
					challenge: response.challenge,
					offline: !response.success,
					new_captcha: response.new_captcha,
					product: 'bind',
					}, function (captchaObj) {
						// 这里可以调用验证实例 captchaObj 的实例方法
						captchaObj.onReady(function () {
						captchaObj.verify();
						});
						captchaObj.onSuccess(function () {
							// 
						var verifySuccess = captchaObj.getValidate();
						_this.refs.verifyCodeByMobile.value = '';
						_this.setState({
							regettestMobileState: false,
							MobileTimeDisabledState:true,
							togetMobiletest: false,
				},()=>{
					Http.request('get-verifyCode',{mobile:phone,geetest_challenge:verifySuccess.geetest_challenge,geetest_seccode:verifySuccess.geetest_seccode,geetest_validate:verifySuccess.geetest_validate}).then(function(response) {
						_this.togetMobiletest();
					}).catch(function (err) {
							if (err.code < 0) {
								Message.error(err.message)
							}
							
								_this.setState({
									regettestMobileState: false,
									togetMobiletest: true,
									MobileTimeDisabledState:false,
								})
						
					});
					
				})	  
			});
					captchaObj.onClose(function () {
						_this.setState({
							regettestMailState: false,
							togetMailtest: true,
							MailTimeDisabledState:false,
						})
					});
					})

				}).catch(function(err) {
					if (err.code < 0) {
						Message.error(err.message)
					}
				});

	}
	//手机验证点击获取验证码函数old
	togetMobiletest = () => {
		window.clearTimeout(this.timer);
		var _this = this;
		this.setState({
			togettest: true,
			gettingMobile: false,
			MobileTimeDisabledState: true,
			regettestMobileState: false,
			timeminMobile: 60,
		}, function () {
			time()
		})
		function time() {
			if (_this.state.timeminMobile == 0) {
				_this.setState({
					regettestMobileState: true,
					MobileTimeDisabledState: false,
					togetMobiletest: false,
				})
			} else {
				_this.setState({
					timeminMobile: --_this.state.timeminMobile,
				})
				_this.timer = window.setTimeout(function () {
					time()
				},
					1000)
			}
		}
	}
	submitIdByMobile = () => {
		if (this.refs.verifyCodeByMobile.value) {
			this.submitVerifyIDbyMobile()
		} else {
			Message.error("请填写验证码")
		}
	}

	//手机身份验证点击确定
	submitVerifyIDbyMobile = () => {
		var _this = this;

		//console.log("1",this.state.regettestMobileState);
		Http.request('validPhoneCode', {}, {
			mobile: _this.refs.loginMobile.value,
			code: _this.refs.verifyCodeByMobile.value,
		}).then(function (response) {
			_this.setState({
				isLegal: true,
				//timeminMobile:"",//
				//timeminMail:"",//
				saltStr: response.saltStr,
				editPwd: true,
				forgetPwd: false,
				canLogin: false,
			}, function () {
				_this.setState({

				})
			})
		}).catch(function (err) {
			if (err.code < 0) {
				Message.error(err.message)
			}
		});
	}

	/*
	* 获取二维码 
					editPwd:true,
					forgetPwd:false,
					canLogin:false,
	*/
	getQRCode = (type) => {
		let _this = this;
		let { headPic } = this.state
		if ((headPic === icon_Cblue || headPic === icon_Cblank) && type !== 'reload') {
			clearTimeout(timer);
			this.setState({ editPwd: false, canLogin: true, QrcodeExpired: false, QRCode: false, forgetPwd: false, headPic: icon_QRblank });
		} else {
			this.setState(
				{
					QrcodeExpired: false,
					QRCode: true,
					canLogin: false,
					headPic: icon_Cblank,
					forgetPwd: false,
					editPwd: false,
					errThree:false,
					// 忘记密码 密码重置 
				}, () => {
					Http.request('getQrCode', {}).then((response) => {
						//  Message.success("获取二维码");
						// 赋值
						this.setState({
							qrCodeUrl: response.qrCodeUrl,
							uuid: response.uuid
						}, () => {
							// 调取轮询 
							QRtime()

						})
					}).catch(function (err) {
						if (err.code < 0) {
							Message.error(err.message)
						}
					});
				})
		}


		// 定时器轮询
		function QRtime() {
			timer = setTimeout(() => {
				Http.request('getQrLoginStatus', { uuid: _this.state.uuid }).then((response) => {
					//	console.log(response,'ddddd'); 只有大于0 
					if (!response.code) {
						// 成功
						clearTimeout(timer);
						window.location.href = './';
					}
				}).catch(function (err) {
					// 放小于0 
					if (err.code === 0) {
						// 未登录
						QRtime();
					//	console.log(timer, 'timer');
					}
					else if (err.code === -2) {
						// 二维码过期 
						clearTimeout(timer);
					//	Message.error(err.message);
						_this.setState({ QrcodeExpired: true });
					}
					else if (err.code === -1) {
						// 异常 
						clearTimeout(timer);
						Message.error(err.message);
					}

				});
			}, 1000)
		}
	}


	// onSubmit(form){
	// 	const {
	// 		onSubmit
	// 	} = this.props;
	//  onSubmit && onSubmit(form);
	// }
	//修改密码点击确定后的函数ing
	submitPwd = (values) => {
		var _this = this;
		Http.request('setNewPwd', {}, {
			pwd: values.new,
			rePwd: values.newagain,
			saltStr: _this.state.saltStr
		}).then(function (response) {
			Message.success("修改成功");
			_this.goToEdited();
			// window.setTimeout(function(){
			// 	window.location.href="/login/login"
			// }
			// 	,1000)
		}).catch(function (err) {
			if (err.code < 0) {
				Message.error(err.message)
			}
		});
	}
	showPwdOne = () => {
		this.setState({
			pwdOneHide: !this.state.pwdOneHide,
		})
	}
	showPwdTwo = () => {
		this.setState({
			pwdTwoHide: !this.state.pwdTwoHide,
		})
	}
	//重置密码完成
	goToEdited = () => {
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
			edited: true,
			editPwd: false,
			timeToLogin: 3,
		}, function () {
			time()
		})
		function time() {
			if (_this.state.timeToLogin == 0) {
				window.location.reload();
			} else {
				_this.setState({
					timeToLogin: --_this.state.timeToLogin,
				})
				_this.timerLogin = window.setTimeout(function () {
					time()
				},
					1000)
			}
		}
	}
	// 鼠标离开
	mouseleave = () => {
		let { headPic } = this.state;
		if (headPic == icon_QRblue) {
			this.setState({ headPic: icon_QRblank })
		} else if (headPic == icon_Cblue) {
			this.setState({ headPic: icon_Cblank })
		}

	}

	// 鼠标进入
	mouseenter = () => {
		let { headPic } = this.state;
		if (headPic == icon_QRblank) {
			this.setState({ headPic: icon_QRblue })
		} else if (headPic === icon_Cblank) {
			this.setState({ headPic: icon_Cblue })
		}

	}
	

	render() {
		const { handleSubmit } = this.props;
		let { imgCode, LoginHeight, headPic } = this.state;
		var time = this.time;
		return (
			<div className="g-permission-login" style={{ height: `${LoginHeight}` }}>
				<canvas id="canvas"></canvas>
				{/* <div className="login-bg" ref = {(ref)=>{
							this.loginBg = ref;
						}}>
							<img className="login-earth" src={loginEarth} />
							<img className="login-parents" 
								ref={(ref) => {
									this.loginParents = ref;
								}} 
								src={loginParents} 
							/>
							<img className="login-sons" 
								ref={(ref) => {
									this.loginSons = ref;
								}} 
								src={loginSons} 
							/>
							<img className="login-fireworks" src={loginFireworks}/> 
						</div> */}
				{<div className="content">
					<div className="content-wrap">
						<div className="login-title">
							氪空间管理平台
              	</div>
						<div className="login-box">
							<div className={headPic === icon_QRblue ? 'QR-show QR-state' : 'QR-hide QR-state'} >
								二维码登录
								</div>
							<div className={headPic === icon_Cblue ? 'QR-show QR-state' : 'QR-hide QR-state'} >
								密码登录
								</div>
							 <div className='head-mask' onClick={() => { this.getQRCode() }} onMouseLeave={this.mouseleave} onMouseEnter={this.mouseenter} ></div>
							<div className='headPic'  >
								<img src={headPic}></img>
							</div>
							
							{this.state.canLogin &&
								<div className='login-newLogin'>
									<div className="login-tip">
										<span className='logins-log'>LOGIN</span>
										<span className='logins-denglu'>登录</span>
										<span className='logins-yellow'> </span>
									</div>
									<div className="login-content"  >
										<ul className="login-content-ul">
											{/*<li className="hideInput">
												<input type="text" />
											</li>*/}
											<li className="loginName" >
												<div className="outer-name">
													<span className="pre-name">

													</span>
													<input
														type='text'
														name="loginName"
														ref="loginName"
														placeholder="请输入手机号或者邮箱"
													/>
												</div>

												{/* { this.state.noneName && <span className="redErr">请输入您的手机号/邮箱</span>} */}
											</li>
										
											<li className="loginPwd">
												<div className="outer-pwd">
													<span className="pre-loginpwd">

													</span>
													<input
														type='password'
														name="loginPwds"
														ref="loginPwds"
														placeholder="请输入密码"
													/>
												</div>

												{/* { this.state.nonePwd && <span className="redErr">请输入密码</span>} */}
											</li>
											<li className="loginPwd1">
												<div className="outer-pwd1">
													<span className="pre-loginpwd1">

													</span>
													<input
														type='text'
														name="imgCode"
														ref="imgCode"
														placeholder="请输入验证码"
													/>
													<div className='new_sendCode'>
														{this.state.togetPhonetest && <div className='read_sendCode' onClick={this.getPhonetestCode} >发送验证码</div> }
														{this.state.PhoneTimeDisabledState && <div className='read_second'>{this.state.timeminPhone + 's'}</div> }
														{this.state.regettestPhoneState && <div className='read_reload' onClick={this.getPhonetestCode}>重新获取</div>}
													</div>
												</div>

												{/* { this.state.nonePwd && <span className="redErr">请输入密码</span>} */}
											</li>
										
											<li>
												<p className="login-btn" onClick={this.submitLogin}>登&nbsp;&nbsp;&nbsp;录</p>
											</li>
											<li onClick={this.forgetPwd} className="login-pwdinfo pointer">
												忘记密码?
                       </li>
										</ul>
									</div>
								</div>
							}

							{this.state.QRCode &&
								<div className='login-newLogin'>
									<div className="login-tip">
										<span className='logins-log'>LOGIN</span>
										<span className='logins-saomadenglu'>扫码登录</span>
										<span className='logins-saomayellow'> </span>
									</div>
									<div className="login-QR_pic">
										<div className="QR_pic-title">
											请打开氪空间APP，点击“扫一扫”并确认
											登录OP系统
											</div>
										<div className='QR_pic'>
											<img src={this.state.qrCodeUrl} />
											<div className='QR_pic_mask' style={{ display: this.state.QrcodeExpired ? 'block' : 'none' }}>
												<div onClick={() => { this.getQRCode('reload') }}>

												</div>
											</div>
										</div>
										<div className='QrcodeExpired' style={{ display: this.state.QrcodeExpired ? 'block' : 'none' }}>
											二维码已失效，点击刷新
											</div>
									</div>
								</div>
							}

							{this.state.forgetPwd &&
								<div className="verifyTotal">
									<div className="tabList tabList_forget_pas">
										<span className='logins-log'>LOGIN</span>
										<div className="forget_title">
											<p className={this.state.verifyByMail ? 'activeTitle' : 'normalTitle'} onClick={this.mailTitleClick}>
												验证邮箱
													</p>
											<span style={{ display: this.state.verifyByMail ? 'block' : 'none' }} className='logins-yellows1'> </span>
											<p className={!this.state.verifyByMail ? 'active_shouji' : 'nomal_shouji '} onClick={this.mobileTitleClick}>
												验证手机
								   		</p>
											<span style={{ display: this.state.verifyByMail ? 'none' : 'block' }} className='logins-yellows2'> </span>
										</div>
									</div>
									{this.state.verifyByMail &&

										<div className="login-content">
											<ul className="login-content-ul tabList_forget_pas">
												<li className="input-txt loginpwds">
													<input type="text" ref="loginMail" placeholder="请输入邮箱" />
												</li>
												<li className="input-txt loginpwds clearfix ">
													<input className='' type="text" ref="verifyCodeByMail" placeholder="请输入验证码" />
		
													<div className="new_sendCode" >
														{this.state.togetMailtest && <div className='read_sendCode' onClick={this.togetMailtestCode} >发送验证码</div> }
														{this.state.MailTimeDisabledState && <div className='read_second'>{this.state.timeminMail + 's'}</div> }
														{this.state.regettestMailState && <div className='read_reload' onClick={this.togetMailtestCode}>重新获取</div>}
													</div>
												</li>
												
												<li>
													<input onClick={this.submitIdByMail} type="button" value="下一步" className="login-btn next new_next" />
												</li>
												<li onClick={this.goToLogin} className="login-pwdinfo pointer new_backlogin">
													返回登录
                  			         </li>

											</ul>

										</div>

									}
									{!this.state.verifyByMail &&

										<div className="login-content">
											<ul className="login-content-ul tabList_forget_pas">
												<li className="input-txt loginpwds">
													<input type="text" ref="loginMobile" placeholder="请输入手机号" />
												</li>
												<li className="input-txt loginpwds clearfix ">
													<input className='' type="text" ref="verifyCodeByMobile" placeholder="请输入验证码" />
													<div className="new_sendCode" >
														{this.state.togetMobiletest && <div className='read_sendCode' onClick={this.togetMobiletestCode} >发送验证码</div> }
														{this.state.MobileTimeDisabledState && <div className='read_second'>{this.state.timeminMobile + 's'}</div> }
														{this.state.regettestMobileState && <div className='read_reload' onClick={this.togetMobiletestCode}>重新获取</div>}
													</div>
												</li>
												{/* <li className="clearfix">
                  				          <div className="input-verifycode fl">
                  					            <input type="text" className="codes" ref="verifyCodeByMobile" placeholder="请输入验证码"/>
                  				          </div>
																			{ this.state.togetMobiletest && <span className="sendCode" onClick={this.togetMobiletestCode} >发送验证码</span>}
																			{ this.state.gettingMobile && <span className="timeout">正在发送...</span>}
																			{ this.state.MobileTimeDisabledState && <span className="timeout">{this.state.timeminMobile+this.state.timedisabled}</span>}
																			{this.state.regettestMobileState && <span onClick={this.togetMobiletestCode} className="sendCode">重新获取</span>}

                  				     </li> */}
												<li>
													<input type="button" value="下一步" onClick={this.submitIdByMobile} className="login-btn next new_next" />
												</li>
 
												<li onClick={this.goToLogin} className="login-pwdinfo new_backlogin">
													返回登录
                  			         </li>
											</ul>
										</div>
									}
								</div>
							}

							{this.state.editPwd &&
							<div className="new_editPass">
								<div className="verifyTotal">
									<div className="tabList tabList_forget_pas">
										<span className='logins-log'>LOGIN</span>
										<div className="forget_title">
											<p className={this.state.verifyByMail ? 'activeTitle' : 'normalTitle'} onClick={this.mailTitleClick}>
												验证邮箱
											 </p>
											<span style={{ display: this.state.verifyByMail ? 'block' : 'none' }} className='logins-yellows1'> </span>
											<p className={!this.state.verifyByMail ? 'active_shouji' : 'nomal_shouji '} onClick={this.mobileTitleClick}>
												验证手机
											 </p>
											<span style={{ display: this.state.verifyByMail ? 'none' : 'block' }} className='logins-yellows2'> </span>
										</div>
									</div>


									<div className="login-content">
										<form onSubmit={handleSubmit(this.submitPwd)}>

											<div className="login-content">

												<ul className="login-content-ul new_editpass" style={{ left: '160px' }}>
													<li className="hideInput">
														<input type="text" />
													</li>
													<li className="inputtest">
														<KrField
															type={this.state.pwdOneHide ? 'password' : 'text'}
															component="input"
															name="new"
															autoComplete="off"
															ref="onePwd"
															placeholder="请输入密码"
															notifys={['6-20位字符', '只能包含大小写字母、数字以及标点符号（除空格）', '大写字母、小写字母、数字和标点符号至少包含两种']}
														/>
														<p
															className={this.state.pwdOneHide ? 'hidePwd' : ' '}

															onClick={this.showPwdOne}>

														</p>
													</li>
													<li className="inputtesttwo">
														<KrField
															component="input"
															autoComplete="off"
															type={this.state.pwdTwoHide ? 'password' : 'text'}
															name="newagain"
															ref="twoPwd"
															placeholder="请再次输入密码"
														/>
														<p
															className={this.state.pwdTwoHide ? 'hidePwd' : ' '}
															onClick={this.showPwdTwo}>
														</p>
													</li>
													{this.state.notSame &&
														<li className="notSame">
															两次输入的密码不一致 请重新输入
					 </li>
													}

													<li>
														<input value="完成并登录" type="submit" className="login-btn J_login success_login" />

													</li>
													<li onClick={this.goToVerify} className="login-pwdinfo success_back">
														返回上一步
				 </li>
												</ul>

											</div>
										</form>

									</div>

									</div>
								</div>
							}
							{/* { this.state.editPwd &&
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
                } */}
							{this.state.edited &&
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
				<img src='./images/man.png' />
				<div className="footer-wrap">
					<p style={{ color: "#fff" }}>© 2011~2016 36氪 | 京ICP备12031756号 | 京公网安备11010802012285号</p>
				</div>
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

	if (values.newagain && values.new && values.new !== values.newagain) {
		errors.newagain = '两次密码输入不一致';
	}

	return errors
}
//export default reduxForm({form:'Login',validate})(Login);
const selector = formValueSelector('Login');
export default reduxForm({ form: 'Login', validate })(Login);
