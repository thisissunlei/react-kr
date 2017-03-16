import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Notify from '../../Notify';
import ReactDOM from 'react-dom';
import './index.less';
import refresh from "./images/refresh.svg";
import deleteImg from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';
import WrapComponent from '../WrapComponent';

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
			operateImg :false,
			files :{},
			imageStatus : true
		}
	}
	componentWillUnmount() {
		this.setState({
			files: []
		});
	}
	componentDidMount() {

	}
	componentWillReceiveProps(nextProps){
	}
	onTokenError() {
		// this.setState({
		// 	operateImg:
		// })
		Notify.show([{
			message: '初始化上传文件失败,请重新上传',
			type: 'danger',
		}]);
	}
	operationImg=()=>{
		// console.log("this.state.imgUpload)",this.state.imgUpload);
		if(this.state.imgUpload){
			this.setState({
				operateImg :true
			})
		}
	}
	notOperateImg=()=>{
		if(this.state.imgUpload){
			this.setState({
				operateImg :false
			})
		}
	}
	onTokenSuccess(form) {
		this.setState({
			form
		});
	}
	onError=(message)=>{
		message = message || '上传文件失败，请重新上传';
		Notify.show([{
			message: message,
			type: 'danger',
		}]);

		this.setState({
			progress: 0,
			imgUpload: false
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
		var {pictureMemory}=this.props;

		var {pictureFormat}=this.props;
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
		let realimgType = imgType.substr(-3).toUpperCase();
		// console.log("realimgType",realimgType);
		// console.log("pictureFormat",pictureFormat);
		// console.log(pictureFormat.split(","));
		var typeArr = pictureFormat.split(",");
		let imgSize = Math.round(file.size/1024*100)/100;
		for(var i=0;i<typeArr.length;i++){
			console.log("imgType",imgType,"typeArr[i]",typeArr[i]);
			if(imgType == typeArr[i]){
				this.refs.inputImg.value ="";
				this.refs.inputImgNew.value ="";
				this.refs.uploadImage.src="";
				_this.setState({
	  				errorHide: false,
	  				errorTip:"请上传正确格式的图片"
	  			})
	  			return;
			}
		}
	
		// console.log("pictureMemory",pictureMemory);
		if(imgSize>pictureMemory){
			this.refs.inputImg.value ="";
			this.refs.inputImgNew.value ="";
			this.refs.uploadImage.src="";
			_this.setState({
				errorHide: false,
				errorTip:"图片大小不符合要求"
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
					// console.log("response",response);
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
									_this.functionHeightWidth(file,xhrfile);
								} else {
									_this.onError(fileResponse.msg);
									return;
								}
							} else if (xhrfile.status == 413) {
								_this.onError('您上传的文件过大！');
							} else {
								_this.onError('后台报错请联系管理员！');
							}
						}
					};
					xhrfile.onerror = function(e) {
						console.error(xhr.statusText);
					};
					xhrfile.open('POST', '/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic', true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.setState({
						operateImg:false,
						mgUpload: false,
					})
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
		// 暂时觉得此处用不着了，等连上服务器需要再检查一下
		// _this.setState({
		// 	imgUpload: true,
		// 	operateImg : false
		// });
	}
	// 校验宽高
	functionHeightWidth=(file,xhrfile)=>{
		let _this = this;
		let {photoSize}=this.props;
		
		if(file ){
                var fileData = file;
                 //读取图片数据
                var reader = new FileReader();
                reader.onload = function (e) {
                 	// console.log("e",e);
                    var data = e.target.result;
                     //加载图片获取图片真实宽度和高度
                    var image = new Image();
                    image.onload=function(){
                         var width = image.width;
                         var height = image.height;
                         var realWidth = photoSize.substr(0,photoSize.indexOf("*"));
                         
                         var realHeight = photoSize.substr(photoSize.indexOf("*")+1);


                         if(width == realWidth && height == realHeight){
                         	_this.refs.uploadImage.src = xhrfile.response.data;
                        	_this.setState({
								imageStatus : true,
								imgUpload : true,
								operateImg : false
							});
							const {input}=_this.props;
							input.onChange(xhrfile.response.data);

                         	
                        }else{
                        	_this.refs.inputImg.value ="";
							_this.refs.inputImgNew.value ="";
							_this.refs.uploadImage.src="";
                         	_this.setState({
								errorHide: false,
								errorTip:"图片尺寸不符合要求",
								imageStatus : false,
								imgUpload : false
							});
                        }

                    };
                    image.src= data;
                 };
                 reader.readAsDataURL(fileData);
 
             }
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
		const {input}=this.props;
		input.onChange("");
	}
	render() {
		let {children,className,style,type,name,disabled,photoSize,pictureFormat,pictureMemory,requestURI,label,requireLabel,inline,innerstyle,...other} = this.props;
		let {operateImg} = this.state;
		// console.log("imgTitle",imgTitle,"pictureFormat",pictureFormat);

	
		return(
      	<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} >

			<div className="ui-new-uploadimg-box">
				
					<div className='ui-uploadimg-outbox' style={innerstyle}>
						<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
							<img className="image"  src={this.state.imgSrc}  ref="uploadImage" style={{opacity:this.state.imgUpload?1:0}}/>
							
							<div className='ui-uploadimg-inner' >
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
					提示：图片尺寸为{photoSize}，图片小于{pictureMemory}k,格式为{pictureFormat}
				</p>
				<p className="ui-uploadimg-error" style={{display:this.state.errorHide?"none":"block"}} >
					{this.state.errorTip}
				</p>
			</div>
      </WrapComponent>
		);
	}
}
