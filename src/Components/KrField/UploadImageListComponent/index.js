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
import next from "./images/next.svg";
import refresh from "./images/pic.svg";
import defaultRemoveImageIcon from "./images/deleteImg.svg";
import {Actions,Store} from 'kr/Redux';
import DeleteSure from './DeleteSure';
import FirstSure from './FirstSure';
import WrapComponent from '../WrapComponent';

export default class UploadImageListComponent extends Component {

	static defaultProps = {
			defaultValue:[],
			sort:false,
	}

	static propTypes = {
		className: React.PropTypes.string,
		defaultValue:React.PropTypes.array,
		sort:React.PropTypes.boolean,
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
		if (this.init&&images.length>0){
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
		console.log('event.target.files----',event.target.files)
		//let file = event.target.files[0];
		let file = event.target.files;
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
		for(var i=0; i<file.length;i++){
				let imgType = file[i].type;
				let imgSize = Math.round(file[i].size/1024*100)/100;
				if(imgType!== "image/jpg" && imgType!== "image/jpeg"&& imgType!== "image/png"){
					Message.warntimeout('请上传正确格式的图片', 'error')
					return;
				}
				if(imgSize>1000){
					Message.warntimeout('图片尺寸不得大于1M', 'error')
					return;
				}
			form.append('file', file[i]);
		}
		//form.append('file', file);
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
							console.log('fileResponse.data',xhrfile.response)
							if (xhrfile.status === 200) {
								if (fileResponse && fileResponse.code > 0) {
									
									fileResponse.data.map((item,index)=>{
                                     images.push({
										photoId:item.id,
										src:item.ossHref,
									 });
									})
									_this.refs.inputImg.value ="";
									_this.changeImages(images);
									Message.warntimeout('图片上传成功', 'success');
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
					xhrfile.open('POST', '/api/krspace-finance-web/cmt/community/upload-photo/type/multi', true);
					xhrfile.responseType = 'json';
					xhrfile.withCredentials = true;
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
	reFreshImg=()=>{
		let {images,firstIndex}=this.state;
		var indexPicSrc=images[firstIndex];
		this.refs.inputImg.value ="";
		if(firstIndex!=0){
			images.splice(firstIndex,1);
			images.unshift(indexPicSrc);
		}
		this.changeImages(images);
		Message.warntimeout('图片设为首图成功', 'success');
		this.cancelFirst();
	}

	// 删除图片
	removeImage=()=>{
		let {images,deleteIndex}=this.state;
		images.splice(deleteIndex,1);
		this.changeImages(images);
		Message.warntimeout('图片删除成功', 'success');
		this.cancelDelete();
	}

	openDeleteFun=(index)=>{
      this.setState({
      	openDelete:true,
        deleteIndex:index
      })
	}

	openFirstFun=(index)=>{
	  this.setState({
      	openFirst:true,
        firstIndex:index
      })
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
	
	//排序相关
	swapImages(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
		this.changeImages(arr);
	}
	
	//向后
	backwardImage=($index)=>{
		let {images}=this.state;
		if($index == 0) {
            return;
		}
		this.swapImages(images,$index,$index - 1);
	}
	//向前
	forwardImage=($index)=>{
		let {images}=this.state;
		if($index == images.length -1) {
            return;
		}
		this.swapImages(images,$index,$index + 1);
	}

	render() {

		let {children,imgFlag,meta: { touched, error },className,boxStyle,style,type,name,disabled,photoSize,pictureFormat,pictureMemory,label,requireLabel,inline,requestURI,sort,...other} = this.props;
		let {operateImg,images,deleteIndex} = this.state;

        var imgStyle='';
        if(imgFlag){
          imgStyle='listImg'
        }else{
          imgStyle='detailImg'
        }
		if(sort){
			console.log("images>>>>",images);
		}
		return(
		<WrapComponent label={label} style={style} requireLabel={requireLabel} inline={inline} >
			<div className="ui-uploadimgList-box" style={boxStyle} >

				<div className='ui-uploadimg-outbox' >

					{
						images.map((item,index)=>{
							console.log("mapData",index,images.length);
							return (<div className='lostsImg'>
							<div style={{backgroundImage:`url(${item.src})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'contain'}} className={imgStyle}></div>
							<div className="ui-uploadimg-fresh-delete">
								<div className='delete-middle'>
									{(sort && index>0) && 
										<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.backwardImage.bind(this,index)}>
											<img src={next} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete prev"/>
										</div>
									}
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.openFirstFun.bind(this,index)}>
										<img src={refresh} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-refresh" style={{top:8,cursor:'pointer'}}/>
									</div>
									<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.openDeleteFun.bind(this,index)}>
										<img src={defaultRemoveImageIcon} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
									</div>
									{(sort && (index<images.length-1)) && 
										<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.forwardImage.bind(this,index)}>
											<img src={next} className="ui-uploadimg-operateimg-btn ui-uploadimg-operateimg-delete"/>
										</div>
									}
								</div>
							</div>
						</div>)
					})
				}

				<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg} style={this.props.innerBoxStyle}>
					<div className='ui-uploadimg-inner' style={this.props.innerStyle}>
						<span className='ui-uploadimg-button'>+</span>
						<input type='file' multiple onChange={this.updateImage} ref="inputImg"/>
						<span className='ui-uploadimg-tip'>上传图片</span>
					</div>
				</div>
			</div>
       



                    {/*提示*/}
                    <Dialog
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
				    </Dialog>


                    {/*提示*/}
                    <Dialog
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
				    </Dialog>

		</div>
		{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
	</WrapComponent>
	);
  }
}
