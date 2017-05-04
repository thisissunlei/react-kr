import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {
	observer
} from 'mobx-react';
import {Notify} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
import {Actions,Store} from 'kr/Redux';
import upload from "./images/upload.png";
import State from '../State';

@observer
export default class HeaderUpload extends Component {
	static defaultProps = {

	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			imgSrc:this.props.defaultUrl || '',
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
		if(this.props.defaultUrl != nextProps.defaultUrl){
			this.setState({
				imgSrc:nextProps.defaultUrl
			})
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

		let {index} = this.props;
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
									console.log('ddddd',fileResponse)
									_this.setState({
										imgSrc:fileResponse.data
									})
									// State.stationVos[index].headerUrl = fileResponse.data;
									let uploadUrl = _this.props.onChange;
									uploadUrl && uploadUrl(fileResponse.data,_this.props.index)
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
					xhrfile.open('POST', '/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic', true);
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
	render() {
		let {imgSrc} = this.state;
		console.log('img')
		return(
			<div className="ui-upload-header">
				<div className='ui-uploadimg-inner' >
					<img className="image"  src={imgSrc || upload}/>
					<input type='file' onChange={this.onChange} className="upload-input"/>
				</div>
			</div>
		);
	}
}
