import React from 'react';
import Notify from '../../Notify';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Http,
} from "kr/Utils";
import WrapComponent from '../WrapComponent';

import './index.less';

export default class FileUploadComponent extends React.Component {

	static defaultProps = {
		multiple: true,
		defaultValue: []
	}

	static PropTypes = {
		multiple: React.PropTypes.bool,
		accept: React.PropTypes.string,
		defaultValue: React.PropTypes.array,
		onChange: React.PropTypes.func,
		inline: React.PropTypes.bool
	}

	constructor(props) {
		super(props)
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

	setInitValue = (defaultValue) => {
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
	//from 表单绑定
	onSetInputValue = () => {
		let {
			files
		} = this.state;
		let {
			input,
			onChange
		} = this.props;

		let fileIds = [];
		files.forEach(function(item, index) {
			fileIds.push(item.id);
		});
		input.onChange(fileIds.toString());
		onChange && onChange(files);

	}
	//删除方案
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
	//进度条
	progressBar = () =>{
		var _this = this;
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
		
	}
	onError = (message) => {
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
	//上传成功
	onSuccess = (response,name) => {
		var params = {
			fileUrl:response.url,
			fileName:name
		}
		let {
			input,
			onChange
		} = this.props;
		let {
			files
		} = this.state;

		files.unshift(params);

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
		// onChange && onChange(files);
	}
	
	onTokenSuccess = (form) => {
		this.setState({
			form
		});
	}

	onTokenError = () => {
		Notify.show([{
			message: '初始化上传文件失败',
			type: 'danger',
		}]);
	}
	//附件识别
	onChange = (event) => {
		var _this = this;
		let file = event.target.files[0];
		if (!file) {
			return;
		}
		this.progressBar();
		
		this.getUpFileUrl(file);
		return ;
	}

	//获取上传路径
	getUpFileUrl = (file) =>{
		var form = new FormData();
		let _this = this;
		let params = {category:'op/upload',isPublic:'false'}
	
		Http.request("global-get-up-files-url",params).then(function (res) {
			/**
			 * 一下数据赋值必须按顺序  必须 必须  必须
			*/
			form.append('OSSAccessKeyId', res.ossAccessKeyId);
			form.append('policy', res.policy);
			form.append('Signature', res.sign);
			form.append('key', res.pathPrefix+'/'+file.name);
			form.append('uid', res.uid);
			form.append('callback', res.callback);
			form.append('x:original_name', file.name);
			form.append('file', file);
			_this.doUpFile(res.serverUrl,form,file.name)

		}).catch(function (err) {
			_this.onError(err.message)
		});
	}
	//文件上传方法
	doUpFile = (serverUrl,form,name) => {
		var _this = this;
		var xhrfile = new XMLHttpRequest();
		xhrfile.onreadystatechange = function() {
			if (xhrfile.readyState === 4) {
				var fileResponse = xhrfile.response;
				if (xhrfile.status === 200) {
					if (fileResponse && fileResponse.code > 0) {
						_this.onSuccess(fileResponse.data,name);
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
		xhrfile.open('POST', serverUrl, true);
		xhrfile.responseType = 'json';
		xhrfile.send(form);
	}


	renderFiles = (files) => {
		var list;
		if(files){
			return list=files.map((item,index)=>{
					return (
						<li key={index}>
							<a href={item.fileUrl} target="_blank">{item.fileName}</a>
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
			type,
			meta: {
				touched,
				error
			},
			style,
			requireLabel,
			multiple,
			accept,
			inline
		} = this.props;
		let {
			files,
			progress,
			isUploading
		} = this.state;
		let fileBgStyles = {};
		// let showList = (files.length>=6)?'hidden':'visible';
		let showList = (files.length>=6)?'none':'block';

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
					{touched && error && <div className="error-wrap"> <span>{error}</span> </div>}
				</WrapComponent>
		);


	}
}


// <input type="file" onChange={this.onChange} name={input.name}/>
