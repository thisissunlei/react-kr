import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Message from '../../Message';
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
		Message.error('初始化上传文件失败,请重新上传');
	}
	operationImg=()=>{
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
        Message.error(message);
		this.setState({
			progress: 0,
			imgUpload: false
		});
	}
	onChange=(event)=>{
		let {requestUrl}=this.props;
		this.setState({
			imgSrc: "",
			operateImg :false,
			imgUpload :false,
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
				}
				progress += 10;
				_this.setState({
					progress
				});
			}, 300);
		}
		
		var form = new FormData();
		form.append('file', file);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var response = xhr.response.data;
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
					xhrfile.open('POST',requestUrl, true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			}
		};

		xhr.open('GET', '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken', true);
		xhr.responseType = 'json';
		xhr.send(null);
		// 暂时觉得此处用不着了，等连上服务器需要再检查一下
		_this.setState({
			imgUpload: true,
			operateImg : false
		});
	}
	// 校验宽高
	functionHeightWidth=(file,xhrfile)=>{
		let _this = this;
		if(file ){
                var fileData = file;
                 //读取图片数据
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                     //加载图片获取图片真实宽度和高度
                    var image = new Image();
                    image.onload=function(){
                        	_this.refs.uploadImage.src = xhrfile.response.data;
                        	_this.setState({
								imageStatus : true,
								imgUpload : true,
								operateImg : false
							});
							const {input}=_this.props;
							input.onChange(xhrfile.response.data);          
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
		let {children,className,style,type,name,...other} = this.props;
		let {operateImg} = this.state;
		return(
			<div className="ui-uploadimg-box" style={style}>
				<div className='ui-uploadimg-outbox' >
					<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
						<img className="image"  src={this.state.imgSrc}  ref="uploadImage" />
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
			</div>
		);
	}
}
