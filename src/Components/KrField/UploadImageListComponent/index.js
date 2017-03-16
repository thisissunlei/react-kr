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
import refresh from "./images/pic.svg";
import defaultRemoveImageIcon from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';

export default class UploadImageListComponent extends Component {

	static defaultProps = {
			defaultValue:[]
	}

	static propTypes = {
		className: React.PropTypes.string,
		defaultValue:React.PropTypes.array
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
			images:[],
			photo:{
				first:false,
				photoId:''
			}
		}

		this.init = false;

	}


	setDefaultValue = (images)=>{

		if (this.init){
			return ;
		}

		if(images && images.length){
			this.setState({
				images
			});
			this.changeImages(images);
			this.init = true;
		}

	}

	componentDidMount() {
		this.setDefaultValue(this.props.defaultValue);
	}

	componentWillReceiveProps(nextProps){
		this.setDefaultValue(nextProps.defaultValue);
	}

	onTokenError() {
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
	updateImage=(event)=>{
        
        let {images}=this.state;

		this.setState({
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
		if(imgType!== "image/jpg" && imgType!== "image/jpeg"&& imgType!== "image/png"){
			//this.refs.inputImg.value ="";
			//this.refs.inputImgNew.value ="";
			// this.refs.uploadImage.src="";
			_this.setState({
				errorHide: false,
				errorTip:"请上传正确格式的图片"
			})
			return;
		}
		if(imgSize>1000){
			//this.refs.inputImg.value ="";
			//this.refs.inputImgNew.value ="";
			//this.refs.uploadImage.src="";
			_this.setState({
				errorHide: false,
				errorTip:"图片尺寸不得大于1M"
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
					//console.log("response",xhr.response);
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
									fileResponse.data.map((item,index)=>{
                                     images.push({
										photoId:item.id,
										src:item.ossHref,
									 }); 
									})				
									_this.changeImages(images);
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
					xhrfile.open('POST', '/api/krspace-finance-web/cmt/community/upload-photo/type/multi', true);
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
		// 暂时觉得此处用不着了，等连上服务器需要再检查一下
		_this.setState({
			imgUpload: true,
			operateImg : false
		});
	}



	//设为首图
	reFreshImg=(index)=>{
		let {images}=this.state;
		var indexPicSrc=images[index];
		this.refs.inputImg.value ="";
		if(index!=0){
			images.splice(index,1);
			images.unshift(indexPicSrc);
		}
		this.changeImages(images);
	}

	// 删除图片
	removeImage=(index)=>{
		//console.log('delete:',index,'images');
		let {images}=this.state;
		images.splice(index,1);
		//console.log('delete:',index,'images',images);
		this.changeImages(images);
	}

    changeImages=(images)=>{
       const {input,onChange}=this.props;
       input.onChange(images);
		this.setState({
			images
		},function(){
			console.log('changeImages:',this.state.images);
			onChange && onChange(images);
		});

    }

    
	render() {
		let {children,className,style,type,name,disabled,photoSize,pictureFormat,pictureMemory,requestURI,...other} = this.props;
		let {operateImg,images} = this.state;
         
		return(
			<div className="ui-uploadimgList-box" style={style}>

				<div className='ui-uploadimg-outbox' >

					{
						images.map((item,index)=>{
							return (<div className='lostsImg'>
							<img className="image"  src={item.src}  ref="uploadImage" style={{display:'block'}}/>
							<div className="ui-uploadimg-fresh-delete">
								<div className='delete-middle'>
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.reFreshImg.bind(this,index)}>
										<img src={refresh} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-refresh" style={{top:9,cursor:'pointer'}}/>
									</div>
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-right" onClick={this.removeImage.bind(this,index)}>
										<img src={defaultRemoveImageIcon} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
									</div>
								</div>
							</div>
						</div>)
					})
				}

				<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
					<div className='ui-uploadimg-inner' >
						<span className='ui-uploadimg-button'>+</span>
						<input type='file' onChange={this.updateImage} ref="inputImg"/>
						<span className='ui-uploadimg-tip'>上传图片</span>
					</div>
				</div>
			</div>
			<p className="ui-uploadimg-error" style={{display:this.state.errorHide?"none":"block"}} >
				{this.state.errorTip}
			</p>

		</div>
	);
  }
}
