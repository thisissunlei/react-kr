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
import PropTypes from 'prop-types'
export default class MainNewsUploadImageComponent extends Component {
	static defaultProps = {

	}


	static propTypes = {
		className : PropTypes.string,
		onDeleteImg : PropTypes.func,

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
			imageStatus : true,

			isInit:true
		}
	}
	componentWillUnmount() {
		this.setState({
			files: []
		});

	}
	componentWillMount(){
	}
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps,nextState){
		this.setInitValue(nextProps.defaultValue,nextProps.sizePhoto);

	}

	setInitValue(defaultValue,sizePhoto) {
		let {merthd}=this.props;
		if(!defaultValue){
           return ;
		}
		let {input}=this.props;
		let {
			isInit
		} = this.state;
		if (!isInit) {
			return;
		}
		
		if(sizePhoto){

			this.setState({
				isInit: false,
				imgUpload:true,
				imgSrc:defaultValue.picUrl
		    });
			if(defaultValue.picId){
                input.onChange(defaultValue.picId);
			}
			if(merthd=='Url'){
				this.setState({
					isInit: false,
					imgUpload:true,
					imgSrc:defaultValue
			  	});
			  	return;
			}

		}else{
			this.setState({
				isInit: false,
				imgUpload:true,
				imgSrc:defaultValue
		  });
		}
		

	}

	onTokenError() {
		Notify.show([{
			message: '初始化上传文件失败,请重新上传',
			type: 'danger',
		}]);
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
		let {formfile} = this.props;
		if(!formfile){
			formfile ='upfile'
		}
		let {onDeleteImg} = this.props;
		onDeleteImg && onDeleteImg();


		var {requestURI} = this.props;
		this.setState({
			// imgSrc: "",
			operateImg :false,
			imgUpload :false,
			errorHide: true
		})
		let _this = this;
		let file = event.target.files[0];
		var {pictureMemory,pictureMemoryM}=this.props;

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
		var typeArr = pictureFormat.split(",");
		let imgSize = Math.round(file.size/1024*100)/100;
		for(var i=0;i<typeArr.length;i++){
			if(imgType == typeArr[i]){
				this.refs.inputImg.value ="";
				this.refs.inputImgNew.value ="";
				this.setState({
					imgSrc:'',
				})
				// this.refs.uploadImage.backgroundImage=`url('')`;
				_this.setState({
	  				errorHide: false,
	  				errorTip:"请上传正确格式的图片"
	  			})
	  			return;
			}
		}
		if(pictureMemory){
			if(imgSize>pictureMemory){
				this.refs.inputImg.value ="";
				this.refs.inputImgNew.value ="";
				// this.refs.uploadImage.backgroundImage=`url('')`;
				_this.setState({
					errorHide: false,
					errorTip:"图片大小不符合要求",
					imgSrc:''
				})
				return;
			}
		}else if(pictureMemoryM){
			if(imgSize>(pictureMemoryM*1024)){
				this.refs.inputImg.value ="";
				this.refs.inputImgNew.value ="";
				// this.refs.uploadImage.backgroundImage=`url('')`;
				_this.setState({
					errorHide: false,
					errorTip:"图片大小不符合要求",
					imgSrc:''
				})
				return;
			}
		}
		
		var form = new FormData();

		form.append(formfile, file);
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
									_this.onError(fileResponse && fileResponse.msg);
									return;
								}
							} else if (xhrfile.status == 413) {
								_this.onError('您上传的文件过大！');
							} else {
								_this.onError('后台报错请联系管理员！');
							}
						}
					};
					xhrfile.open('POST', requestURI, true);
         			xhrfile.withCredentials = true;
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			}
		};
		// xhr.open('GET', 'http://optest03.krspace.cn/api/krspace-finance-web/finacontractdetail/getSourceServiceToken', true);/
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
		let {photoSize,sizePhoto,merthd}=this.props;

		if(file ){
                var fileData = file;
                 //读取图片数据
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                     //加载图片获取图片真实宽度和高度
                    var image = new Image();
                    image.onload=function(){
                         var width = image.width;
                         var height = image.height;
									_this.setState({
									imageStatus : true,
									imgUpload : true,
									operateImg : false,
									imgSrc:xhrfile.response.data
									},function(){
										_this.refs.uploadImage.style.backgroundImage = `url(${xhrfile.response.data})`;
									});
								const {input}=_this.props;
								input.onChange(xhrfile.response.data);
                     };
                    image.src= data;
                 };
                 reader.readAsDataURL(fileData);

             }//
	}
	// 删除图片
	deleteImg=()=>{
		this.setState({
			imgSrc: '',
			imgUpload: false,
			operateImg :false,
		})
		this.refs.inputImg.value ="";
		this.refs.inputImgNew.value ="";
		// this.refs.uploadImage.backgroundImage=`url(${xhrfile.response.data})`;
		let {onDeleteImg} = this.props;
		onDeleteImg && onDeleteImg();
		const {input}=this.props;
		input.onChange("");
	}

	render() {
		let {children,className,style,type,name, meta: { touched, error } ,disabled,photoSize,pictureFormat,pictureMemory,pictureMemoryM,requestURI,label,requireLabel,inline,innerstyle,defaultValue,onDeleteImg,sizePhoto,formfile,center,...other} = this.props;
		let {operateImg} = this.state;
		return(
      	<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} >

			<div className={center==center?"ui-new-uploadimg-box-center":"ui-new-uploadimg-box"}>

					<div className='ui-uploadimg-outbox' style={innerstyle}>
						<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
							{	this.state.imgSrc
								&& <div className="image" ref="uploadImage" style={{opacity:this.state.imgUpload?1:0,backgroundImage:`url(${this.state.imgSrc})`}}></div>
							}
						   

							<div className='ui-uploadimg-inner-new' >
								<span className='ui-uploadimg-button'>+</span>
								<input type='file' onChange={this.onChange} ref="inputImg"/>
								<span className='ui-uploadimg-tip'>上传图片</span>
							</div>
							<div className="ui-uploadimg-fresh-delete" style={{display:this.state.operateImg?"block":"none",textAlign:'center'}}>
								<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.reFreshImg}>
									<img src={refresh} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-refresh"/>
									<input type='file' onChange={this.onChange} ref="inputImgNew" className="ui-refreshImgBtn" />
								</div>
								<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-right" onClick={this.deleteImg}>
			
									<img src={deleteImg} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
								</div>
							</div>
						</div>
					</div>

				<p className="ui-uploadimg-notice">
					{pictureMemory?<span>提示：图片小于{pictureMemory}k,格式为{pictureFormat}</span>:<span>提示：图片小于{pictureMemoryM}M,格式为{pictureFormat}</span>}
				</p>
				<p className="ui-uploadimg-error" style={{display:this.state.errorHide?"none":"block"}} >
					{this.state.errorTip}
				</p>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }

      </WrapComponent>
		);
	}
}
