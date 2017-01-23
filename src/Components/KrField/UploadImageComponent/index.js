import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import ReactDOM from 'react-dom';
import './index.less';
import refresh from "./images/refresh.svg";
import deleteImg from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';
export default class UploadImageComponent extends Component {
	static defaultProps = {
		
	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			imgSrc:'',
			errorHide: true,
			errorTip:'',
			// 图片是否已经上传到界面
			imgUpload: false,
			timer :"",
			operateImg :false
		}
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps){
	}
	operationImg=()=>{
		if(this.state.imgUpload){
			this.setState({
				operateImg :!this.state.operateImg
			})
		}
	}
	notOperateImg=()=>{
		if(this.state.imgUpload){
			this.setState({
				operateImg :!this.state.operateImg
			})
		}
	}
	onTokenSuccess(form) {
		this.setState({
			form
		});
	}
	onChange=(event)=>{
		this.setState({
			imgSrc: "",
			operateImg :false,
			imgUpload :false,
			errorHide: true
		})
		let _this = this;
		let file = event.target.files[0];
		if (!file) {
			return;
		}
		if (file) {
			var progress = 0;
			var timer = window.setInterval(function() {
				if (progress >= 100) {
					window.clearInterval(timer);
					// _this.setState({
					// 	progress: 0,
					// 	isUploading: false
					// });
				}
				progress += 10;
				_this.setState({
					progress
				});
			}, 300);
		}
		let imgType = file.type;
		let imgSize = Math.round(file.size/1024*100)/100;
		if(imgType!== "image/jpg" && imgType!== "image/jpeg"){
			this.refs.inputImg.value ="";
			this.refs.inputImgNew.value ="";
			this.refs.uploadImage.src="";
			_this.setState({
  				errorHide: false,
  				errorTip:"请上传正确格式的图片"
  			})
  			return;
		}
		if(imgSize>30){
			this.refs.inputImg.value ="";
			this.refs.inputImgNew.value ="";
			this.refs.uploadImage.src="";
			_this.setState({
				errorHide: false,
				errorTip:"图片尺寸不得大于30K"
			})
			return;
		}
		var form = new FormData();
		form.append('file', file);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var response = xhr.response.data;
					console.log("response",response);
					form.append('sourceservicetoken', response.token);
					form.append('docTypeCode', response.docTypeCode);
					form.append('operater', response.operater);
					_this.onTokenSuccess({
						sourceservicetoken: response.token,
						docTypeCode: response.docTypeCode,
						operater: response.operater
					});
					var xhrfile = new XMLHttpRequest();
					xhrfile.onreadystatechange = function() {
						if (xhrfile.readyState === 4) {
							var fileResponse = xhrfile.response;
							if (xhrfile.status === 200) {
								if (fileResponse && fileResponse.code > 0) {
									_this.refs.uploadImage.src = xhrfile.response.data;
									const {input}=_this.props;
									input.onChange(xhrfile.response.data);
								} else {
									_this.onError(fileResponse.msg);
								}
							} else if (xhrfile.status == 413) {
								// _this.onError('您上传的文件过大！');
							} else {
								_this.onError('后台报错请联系管理员！');
							}
						}
					};
					xhrfile.onerror = function(e) {
						console.error(xhr.statusText);
					};
					xhrfile.open('POST', '/api-th/krspace-finance-web/community/sysDeviceDefinition/upload-pic', true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			}
		};

		xhr.onerror = function(e) {
			console.error(xhr.statusText);
		};
		xhr.open('GET', '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken', true);
		xhr.responseType = 'json';
		xhr.send(null);
		_this.setState({
			imgUpload: true
		});
	}
	// 删除图片
	deleteImg=()=>{
		this.setState({
			imgSrc: "",
			imgUpload: false,
			operateImg :false
		})
		this.refs.inputImg.value ="";
		this.refs.inputImgNew.value ="";
		this.refs.uploadImage.src="";
	}
	render() {
		let {children,className,style,type,name,disabled,photoSize,pictureFormat,pictureMemory,requestURI,...other} = this.props;
		return(
			<div className="ui-uploadimg-box" style={style}>
				<div className='ui-uploadimg-outbox' >
					<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
						<div className='ui-uploadimg-inner' >
							<img className="image"  src={this.state.imgSrc}  ref="uploadImage" />
							<span className='ui-uploadimg-button'>+</span>
							<input type='file' onChange={this.onChange} ref="inputImg"/>
							<span className='ui-uploadimg-tip'>上传图片</span>
						</div>
						<div className="ui-uploadimg-fresh-delete" style={{display:this.state.operateImg?"block":"none"}}>
							<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.reFreshImg}>
								<img src={refresh} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-refresh"/>
								<input type='file' onChange={this.onChange} ref="inputImgNew" className="ui-refreshImgBtn"/>
							</div>
							<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-right" onClick={this.deleteImg}>
								<img src={deleteImg} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
							</div>
						</div>
					</div>
				</div>
				<p className="ui-uploadimg-notice">
					提示：图片尺寸为{photoSize}，图片小于{pictureMemory},格式为{pictureFormat}
				</p>
				<p className="ui-uploadimg-error" style={{display:this.state.errorHide?"none":"block"}} >
					{this.state.errorTip}
				</p>
			</div>
		);
	}
}
