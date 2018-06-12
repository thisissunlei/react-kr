import React from 'react';
import {
    Notify,
} from 'kr-ui';
import Promise from 'promise-polyfill';
import {
	Actions,
	Store
} from 'kr/Redux';
import WrapComponent from 'kr-ui/KrField/WrapComponent';

import './index.less';

export default class ApkFileUpload extends React.Component {

	static defaultProps = {
		multiple: false,
		defaultValue: [],
		category:'op/upload',
        isPublic:true,
	}

	static PropTypes = {
		multiple: React.PropTypes.bool,
		accept: React.PropTypes.string,
		defaultValue: React.PropTypes.array,
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool,
		category:React.PropTypes.string,
        isPublic:React.PropTypes.bool

	}

	constructor(props) {
		super(props)

		this.onChange = this.onChange.bind(this);
		this.onError = this.onError.bind(this);
		this.onTokenSuccess = this.onTokenSuccess.bind(this);
		this.onTokenError = this.onTokenError.bind(this);

		this.onSetInputValue = this.onSetInputValue.bind(this);
		this.setInitValue = this.setInitValue.bind(this);

		let {
			defaultValue
		} = this.props;

		this.state = {
			isInit: true,
			form: {},
			files: defaultValue,
			isUploading: false,
			progress: 10
		}

	}

	componentWillUnmount() {
		this.setState({
			files: []
		});
	}

	componentDidMount() {
		let {
			defaultValue
		} = this.props;
	}


	componentWillReceiveProps(nextProps) {
		
		this.setInitValue(nextProps.defaultValue);
	}

	setInitValue(defaultValue) {
		console.log('defaultValue---',defaultValue)

		let {
			files,
			isInit
		} = this.state;
		if (!isInit) {
			return;
		}
		if (!defaultValue.length) {
			return;
		}
		
		files = defaultValue;
		this.setState({
			files,
			isInit: false
		});

		var _this = this;
		window.setTimeout(function() {
			_this.onSetInputValue();
		}, 0);
	}

	onSetInputValue() {

		let {
			files
		} = this.state;
		let {
			//input,
			onChange
		} = this.props;
		
		//  let fileIds = [];
		// files.forEach(function(item, index) {
		// 	console.log('item====>>>',item)
		// 	fileIds.push(item.id);
		// });
		
		
		
		 onChange && onChange(files[0]);



	}

	onFileDelete(index) {

		let {
			files
		} = this.state;
		let {
			input
		} = this.props;

		files.splice(index, 1);

		this.setState({
			files
		});

		this.onSetInputValue();

	}

	onError(message) {
		message = message || '上传文件失败';
		Notify.show([{
			message: message,
			type: 'danger',
		}]);

		this.setState({
			progress: 0,
			isUploading: false
		});
	}

	onSuccess=(response,file)=> {
		response = Object.assign({}, response);
		
		let {
			form
		} = this.state;
		let {
			input,
			onChange
		} = this.props;
		let {
			files
		} = this.state;
		response.fileName=file.name;
		files.unshift(response);

		this.setState({
			files,
			progress: 0,
			isUploading: false
		});

		this.onSetInputValue();

		Notify.show([{
			message: '上传文件成功',
			type: 'success',
		}]);
		onChange && onChange(files);
	}

	onTokenSuccess(form) {
		this.setState({
			form
		});
	}

	onTokenError() {
		Notify.show([{
			message: '初始化上传文件失败',
			type: 'danger',
		}]);
	}

	onChange(event) {

		 var _this = this;
		
		let {isPublic,category}=this.props;
		
		 let file = event.target.files[0];
		
		if (!file) {
			return;
		}

		this.setState({
			isUploading: true
		});


		if (file) {
			var progress = 10;
			var timer = window.setInterval(function() {
				if (progress >= 90) {
					window.clearInterval(timer);
					_this.setState({
						progress: 10,
						isUploading: false
					});
				}
				progress += 10;
				_this.setState({
					progress
				});
			}, 300);


		}

		// var form = new FormData();
		// form.append('apkFlie', file);
		// if(!version){
		// 	_this.onError('请填写系统版本！');
		// 	return;
		// }
		// form.append('version',version);
		// var xhrfile = new XMLHttpRequest();
		// 	xhrfile.onreadystatechange = function() {
		// 	if (xhrfile.readyState === 4) {
		// 		var fileResponse = xhrfile.response;
		// 		if (xhrfile.status === 200) {
		// 			if (fileResponse && fileResponse.code > 0) {
		// 				_this.onSuccess(fileResponse.data);

		// 			} else {
		// 				_this.onError(fileResponse.msg);
		// 			}
		// 		} else if (xhrfile.status == 413) {

		// 			_this.onError('您上传的文件过大！');
		// 		} else {
		// 			_this.onError('后台报错请联系管理员！');
		// 		}
		// 	}
		// };

		// xhrfile.open('POST', '/api/krspace-sso-web/sso/mobile/version/upload', true);
		// xhrfile.responseType = 'json';
		// xhrfile.send(form);


		var form = new FormData();
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					var response = xhr.response.data;

					form.append('OSSAccessKeyId', response.ossAccessKeyId);
					form.append('policy', response.policy);
					form.append('Signature', response.sign);
					form.append('key', response.pathPrefix+'/'+file.name);
					form.append('uid', response.uid);
					form.append('callback', response.callback);
					form.append('x:original_name', file.name);
					form.append('file', file);
					form.append('Content-Disposition',`attachment;filename=${file.name}`);
				
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
									_this.onSuccess(fileResponse.data,file);

								} else {
									_this.onError(fileResponse.msg);
								}
							} else if (xhrfile.status == 413) {

								_this.onError('您上传的文件过大！');
							} else {
								_this.onError('后台报错请联系管理员！');
							}
						}
					};
					xhrfile.open('POST', response.serverUrl, true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			}
		};
		xhr.open('GET', '/api/sso/common/upload-policy?isPublic='+isPublic+'&category='+category, true);
		xhr.responseType = 'json';
		xhr.withCredentials = true; 
		xhr.send();
		// 暂时觉得此处用不着了，等连上服务器需要再检查一下
		_this.setState({
			imgUpload: true,
			operateImg : false
		});
			
		
	}
	

	

	
	
	renderFiles=(files)=>{
		var list;
		if(files){
			return list=files.map((item,index)=>{
					return (
						<li key={index}>
							<a href={item.url} target="_blank">{item.fileName}</a>
							<span className="del" onTouchTap={this.onFileDelete.bind(this,index)}>删除</span>
						</li>
					);
				})
		}else {
			return (
				<li></li>
			)
		}
	}
	render() {

		let {
			input,
			label,
			style,
			requireLabel,
			multiple,
			accept,
			inline
		} = this.props;
		let {
			files,
			progress,
			isUploading,
			error
		} = this.state;
		let fileBgStyles = {};
		
		let showList = (files.length>=1)?'none':'block';

		return (
			<WrapComponent label={label} wrapStyle={style} requireLabel={requireLabel} inline={inline}>
				<div className="ui-file" style={{visibility:'visible',display:showList}}>
					<div className="file-button">
						<span className="file-icon">+</span>
						<input type="file" name="file" onChange={this.onChange}  multiple={multiple?'multiple':null} accept={accept} />
						添加文件
						{isUploading && <span className="progress" style={{width:progress}}>{progress}%</span>}
					</div>
				</div>
				<ul className="file-list">
					{this.renderFiles(files)}
				</ul>
					{error && <div className="error-wrap"> <span>{error}</span> </div>}
				</WrapComponent>
		);


	}
}


// <input type="file" onChange={this.onChange} name={input.name}/>
