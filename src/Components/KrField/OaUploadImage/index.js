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
import WrapComponent from '../WrapComponent';
export default class OaUploadImage extends Component {
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
			imageStatus : true,
			isInit:true
		}
	}
	componentWillUnmount() {
		this.setState({
			files: []
		});
	}

	componentWillReceiveProps(nextProps){
	 if(nextProps.defaultValue&&nextProps.defaultValue.hasOwnProperty('picUrl')&&nextProps.defaultValue.picUrl!=''){
		 this.setInitValue(nextProps.defaultValue);
	  }
	}

	setInitValue(defaultValue) {
		let {input}=this.props;
		let {
			isInit
		} = this.state;
		if (!isInit) {
			return;
		}
		this.setState({
				isInit: false,
				imgUpload:true,
				imgSrc:defaultValue.picUrl
		});
		input.onChange(defaultValue.picId);

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

  //错误提示
	onError=(message)=>{
		message = message || '上传文件失败，请重新上传';
    Message.error(message);
		this.setState({
			progress: 0,
			imgUpload: false
		});
	}

  //上传文件
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
					xhrfile.withCredentials = true;
					xhrfile.send(form);
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
                        	_this.setState({
														imageStatus : true,
														imgUpload : true,
														operateImg : false,
														imgSrc:xhrfile.response.data[0].ossHref
													});
											const {input}=_this.props;
											input.onChange(xhrfile.response.data[0].id);
                    };
                    image.src= data;
                 };
                 reader.readAsDataURL(fileData);
             }
	}

	//删除图片
	deleteImg=()=>{
		this.setState({
			imgSrc: "",
			imgUpload: false,
			operateImg :false
		})
		this.refs.inputImg.value ="";
		this.refs.inputImgNew.value ="";
		const {input}=this.props;
		input.onChange("");
	}

	render() {
		let {children,className,style,meta: { touched, error },type,label,inline,requireLabel,name,...other} = this.props;
		let {operateImg} = this.state;
		return(
			<div className = "ui-oa-upload-image">
		 	<WrapComponent label={label} style={style} requireLabel={requireLabel} inline={inline} >
			<div className="ui-oa-upload-box">
				<div className='ui-uploadimg-outbox' >
					<div className='ui-uploadimg-innerbox' onMouseEnter={this.operationImg} onMouseLeave={this.notOperateImg}>
						{this.state.imgSrc&&
						 <div style={{position:'absolute',zIndex:'10',backgroundImage:`url(${this.state.imgSrc})`,backgroundRepeat:'no-repeat',backgroundPosition:'center',backgroundSize:'contain',width:'120px',height:'120px'}}></div>
						 }
						<div className='ui-uploadimg-inner' >
               <span>更换图像</span>
							 <input type='file' onChange={this.onChange} ref="inputImg" style={{marginTop:'-20px'}}/>
						</div>
						<div className="ui-uploadimg-fresh-delete" style={{display:(this.state.operateImg&&this.state.imgSrc)?"block":"none",zIndex:'11',width:120,height:120,textAlign:'center'}}>
							<div className="ui-uploadimg-operateimg ui-uploadimg-operateimg-left" onClick={this.reFreshImg} style={{marginRight:'30px'}}>
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
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>
        </div>
		);
	}
}
