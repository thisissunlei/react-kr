import React, {
	Component
} from 'react';
// import $ from 'jquery';
// import {
// 	FontIcon,
// } from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
// import {ShallowEqual} from 'kr/Utils';
import refresh from "./images/refresh.svg"
import deleteImg from "./images/deleteImg.svg"
export default class UploadImage extends Component {
	static defaultProps = {
		
	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props){
		super(props);
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
	onChange=(event)=>{
		this.setState({
			imgSrc: "",
			operateImg :false,
			imgUpload :false
		})
		let _this = this;
		_this.setState({
			errorHide: true
		})
  		let input = event.target;
  		let imgType = event.target.files[0].type;
  		let imgSize = Math.round(event.target.files[0].size/1024*100)/100;
  		if(imgType!== "image/jpg" && imgType!== "image/jpeg"){
  			_this.setState({
  				errorHide: false,
  				errorTip:"请上传正确格式的图片"
  			})
  			return;
  		}
  		if(imgSize>30){
			this.setState({
				errorHide: false,
				errorTip:"图片尺寸不得大于30K"
			})
			this.refs.inputImg.value ="";
			this.refs.inputImgNew.value ="";
			return;
		}
  		if (FileReader) {
			var reader = new FileReader();
			reader.onload =function(evt){
		  		var image = new Image();
                image.onload=function(){
                    if(image.width !== 212 && image.height !== 136){
                    	_this.setState({
			  				errorHide: false,
			  				errorTip:"请上传尺寸为212*136的图片"
                    	})
                    	return;
                    }else{
                    	_this.setState({
				  			imgSrc: evt.target.result
				  		})
                    }
                 };
                image.src= evt.target.result;
			}
			reader.readAsDataURL(event.target.files[0]);
		}
		this.setState({
			imgUpload :true
		})
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
	}
	render() {
		let {children,className,style,type,name,disabled,photoSize,pictureFormat,pictureMemory,...other} = this.props;
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
