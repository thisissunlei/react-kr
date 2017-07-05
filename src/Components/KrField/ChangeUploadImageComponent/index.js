import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Notify from '../../Notify';
import Dialog from '../../Dialog';
import ReactDOM from 'react-dom';
import Message from '../../Message';
import './index.less';
import refresh from "./images/pic.svg";
import defaultRemoveImageIcon from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';
import DeleteSure from './DeleteSure';
import FirstSure from './FirstSure';
import WrapComponent from '../WrapComponent';

export default class ChangeUploadImageComponent extends Component {

	static defaultProps = {
			defaultValue:[]
	}

	static propTypes = {
		className: React.PropTypes.string,
		defaultValue:React.PropTypes.array,
		requestURI:React.PropTypes.string,
	}
	constructor(props,context){
		super(props,context);
		this.state={
			imgSrc:'',
			errorHide: true,
			imgUpload: false,
			timer :"",
			operateImg :false,
			files :{},
			imageStatus : true,
			images:[],
			openDelete:false,
			openFirst:false,
			deleteIndex:'',
			firstIndex:'',
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
			Message.warntimeout('请上传正确格式的图片', 'error')
			return;
		}
		if(imgSize>1000){
			Message.warntimeout('图片尺寸不得大于1M', 'error')
			return;
		}
		
		var form = new FormData();
		form.append('upfile', file);
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
					var imgArr=_this.state.images
					xhrfile.onreadystatechange = function() {
						if (xhrfile.readyState === 4) {
							var fileResponse = xhrfile.response;
							if (xhrfile.status === 200) {
								if (fileResponse && fileResponse.code > 0) {
								imgArr.push(fileResponse.data);
									_this.changeImages(imgArr);
									//Message.warntimeout('图片上传成功', 'success');
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
					xhrfile.open('POST', _this.props.requestURI, true);
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
		Message.warntimeout('图片设为首图成功', 'success');
		this.cancelFirst();
	}

	// 删除图片
	removeImage=(index)=>{
		let {images}=this.state;
		images.splice(index,1);
		this.changeImages(images);
		Message.warntimeout('图片删除成功', 'success');
		this.cancelDelete();
	}

	
	
	cancelDelete=()=>{
	 this.setState({
      	openDelete:false,
      })
	}

	cancelFirst=()=>{
	  this.setState({
      	openFirst:false,
      })
	}

    changeImages=(images)=>{
       const {input,onChange}=this.props;
       input.onChange(images);
		this.setState({
			images
		},function(){
			onChange && onChange(images);
		});

    }


	render() {

		let {
			children,
			innerBoxStyle,
			inline,
			label,
			requireLabel,
			imgFlag,
			className,
			style,
			type,
			name,
			disabled,
			photoSize,
			pictureFormat,
			pictureMemory,
			requestURI,
			imagesStyle,
			...other
		} = this.props;
		let {operateImg,images,deleteIndex} = this.state;

        var imgStyle='';
        if(imgFlag){
          imgStyle='listImg'
        }else{
          imgStyle='detailImg'
        }
		
		return(
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline} >
			<div className="ui-change-uploadimgList-box" >
				<div className='ui-uploadimg-outbox' >
					{
						images.map((item,index)=>{
							return (<div className='lostsImg' key={index}>
							<div style={{backgroundImage:`url(${item})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'contain',width:`${imagesStyle.width}`,height:`${innerBoxStyle.height}`}} className={imgStyle}></div>
							<div className="ui-uploadimg-fresh-delete">
								<div className='delete-middle'>
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.reFreshImg.bind(this,index)}>
										<img src={refresh} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-refresh" style={{top:8,cursor:'pointer'}}/>
									</div>
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-right" onClick={this.removeImage.bind(this,index)}>
										<img src={defaultRemoveImageIcon} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
									</div>
								</div>
							</div>
						</div>)
					})
				}
				
				<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg} style={this.props.innerBoxStyle}>
					<div className='ui-uploadimg-inner' style={this.props.innerStyle}>
						<span className='ui-uploadimg-button'>+</span>
						<input type='file' onChange={this.updateImage} ref="inputImg"/>
						<span className='ui-uploadimg-tip'>上传图片</span>
					</div>
				</div>
			</div>




                    {/*提示*/}
                   {/* <Dialog
						title="提示"
						modal={true}
						onClose={this.cancelDelete}
						open={this.state.openDelete}
						contentStyle ={{ width: '444',height:'238px',overflow:'visible'}}
					>
						<DeleteSure
						    onCancel={this.cancelDelete}
						    onSubmit={this.removeImage}
						/>
				    </Dialog>*/}


                    {/*提示*/}
                    {/*<Dialog
						title="提示"
						modal={true}
						onClose={this.cancelFirst}
						open={this.state.openFirst}
						contentStyle ={{ width: '444',height:'238px',overflow:'visible'}}
					>
						<FirstSure
						    onCancel={this.cancelFirst}
						    onSubmit={this.reFreshImg}
						/>
				    </Dialog>*/}

		</div>
	 </WrapComponent>
	);
  }
}
