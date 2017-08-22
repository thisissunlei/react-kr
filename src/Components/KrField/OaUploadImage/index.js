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
import Dialog from '../../Dialog';
import ShearDialog from './ShearDialog';
export default class OaUploadImage extends Component {
	static defaultProps = {

	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			//图像弹窗
			openImg:false
		}
	}
	componentWillUnmount() {

	}


	clamp=(param)=>{
		let {requestUrl,personId}=this.props;
		//this.dialogClick();

	 //获取文本大小
		var str=param.substring(22);
		var equalIndex= str.indexOf('=');
		if(str.indexOf('=')>0)
		{
		  str=str.substring(0, equalIndex);
		}
		var strLength=str.length;
		var fileLength=parseInt(strLength-(strLength/8)*2);
		if(fileLength>(1048576*2)){
			Message.error('大小不能超过1M');
			return ;
		}
		//获取文本大小结束


    var form = new FormData();
		form.append('userId', personId);
		form.append('avatarFile', param);
		var xhrfile = new XMLHttpRequest();
		xhrfile.onreadystatechange = function() {
			if (xhrfile.readyState === 4) {
				var fileResponse = xhrfile.response;
				if (xhrfile.status === 200) {
					if (fileResponse && fileResponse.code > 0) {
						 console.log('respon',fileResponse);
					} else {
						Message.error(fileResponse && fileResponse.msg);
						return;
					}
				} else if (xhrfile.status == 413) {
					Message.error('您上传的文件过大！');
				} else {
					Message.error('后台报错请联系管理员！');
				}
			}
		};
		xhrfile.open('POST',requestUrl, true);
		xhrfile.withCredentials = true;
		xhrfile.responseType = 'json';
		xhrfile.send(form);

	}

	dialogClick=()=>{
    this.setState({
			openImg:!this.state.openImg
		})
	}

	onCancel=()=>{
		this.dialogClick();
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

						<div className='ui-uploadimg-inner' onClick={this.dialogClick}>
               <span>更换图像</span>
						</div>


					</div>
				</div>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
		</WrapComponent>

		{/*上传图片*/}
			<Dialog
				title="修改头像"
				onClose={this.openUploadImg}
				open={this.state.openImg}
				contentStyle ={{ width: '688px',height:'auto'}}
			>
			 <ShearDialog
			  onCancel={this.onCancel}
				clamp={this.clamp}
				onChange={this.onChange}
				imgSrc={this.state.imgSrc}
			 />
		</Dialog>


  </div>
		);
	}
}
