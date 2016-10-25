import React from 'react';
import Notify from '../../../Notify';
import Promise from 'promise-polyfill';
import {Actions,Store} from 'kr/Redux';

import './index.less';

export default class FileUploadComponent extends React.Component{

	static defaultProps = {
		multiple:true,
		defaultValue:[]
	}

	static PropTypes = {
		multiple:React.PropTypes.bool,
		accept:React.PropTypes.string,
		defaultValue:React.PropTypes.array
	}

	constructor(props){
		super(props)

		this.onChange = this.onChange.bind(this);
		this.onSuccess = this.onSuccess.bind(this);
		this.onError =  this.onError.bind(this);
		this.onTokenSuccess = this.onTokenSuccess.bind(this);
		this.onTokenError = this.onTokenError.bind(this);

		this.onDelete = this.onDelete.bind(this);
		this.onSetInputValue = this.onSetInputValue.bind(this);

		let {defaultValue} = this.props;

		this.state = {
			form:{},
			files:defaultValue,
			isUploading:false,
			progress:0
		}

	}

	componentDidMount(){

	}

	componentWillReceiveProps(nextProps){

	}

	onSetInputValue(){
		let {files} = this.state;
		let {input} = this.props;

		let fileIds = [];
		files.forEach(function(item,index){
			fileIds.push(item.id);
		});
		console.log('-----',fileIds);
		input.onChange(fileIds.toString());
	}

	onDelete(index){
		let {files} = this.state;
		let {input} = this.props;

		files.splice(index,1);

		this.setState({
			files
		});

		this.onSetInputValue();

	}

	onError(message){
		message = message || '上传文件失败';
		Notify.show([{
			message:message,
			type: 'danger',
		}]);
	}

	onSuccess(response){
		response = Object.assign({},response);

		console.log("---",response);
		let {form} = this.state;

		let fileUrl = `http://optest.krspace.cn/krspace_knowledge_wap/doc/docFile/viewFile?sourceservicetoken=${form.sourceservicetoken}&operater=${form.operater}&fileId=${response.id}`;

		response.fileUrl = fileUrl;
		response.fileName = response.filename;

		let {input} = this.props;
		let {files} = this.state;

		files.unshift(response);

		console.log('files',files);
		this.setState({
			files
		});

		this.onSetInputValue();

		Notify.show([{
			message:'上传文件成功',
			type: 'success',
		}]);
	}

	onTokenSuccess(form){
		this.setState({
			form
		});
	}

	onTokenError(){
		Notify.show([{
			message:'初始化上传文件失败',
			type: 'danger',
		}]);
	}

	onChange(event){

		var _this = this;

		this.setState({
			isUploading:true
		});

		let file = event.target.files[0];
		let fileSize = file.size;

		var progress = 0;
		var timer = window.setInterval(function(){
			if(progress>=100){
				window.clearInterval(timer);
				_this.setState({
					progress:0,
					isUploading:false
				});
			}
			progress+=10;
			_this.setState({
				progress
			});
		},300);

		var form = new FormData();
		form.append('file',file);
		   var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function(){
			  if (xhr.readyState === 4){
				if (xhr.status === 200){

					var response = xhr.response.data;
					form.append('sourceservicetoken',response.token);
					form.append('docTypeCode',response.docTypeCode);
					form.append('operater',response.operater);

					_this.onTokenSuccess({
						sourceservicetoken:response.token,
						docTypeCode:response.docTypeCode,
						operater:response.operater
					});

					 var xhrfile = new XMLHttpRequest();
							xhrfile.onreadystatechange = function(){
							  if (xhrfile.readyState === 4){
								var fileResponse = xhrfile.response;
								if (xhrfile.status === 200){
									if(fileResponse && fileResponse.code>0){
										_this.onSuccess(fileResponse.data);
									}else{
										_this.onError('后台报错,请联系管理员');
									}
								} else {
									_this.onError(xhrfile.msg);
								}
							  }
							};
							xhrfile.onerror = function (e) {
							  console.error(xhr.statusText);
							};

					xhrfile.open('POST', '/api-old/krspace_knowledge_wap/doc/docFile/uploadSingleFile', true);
					xhrfile.responseType = 'json';
					xhrfile.send(form);
				} else {
					_this.onTokenError();
				}
			  }
			};

			xhr.onerror = function (e) {
			  console.error(xhr.statusText);
			};
			xhr.open('GET', '/api/krspace-finance-web/finacontractdetail/getSourceServiceToken', true);
			xhr.responseType = 'json';
			xhr.send(null);

		/*
		Store.dispatch(Actions.callAPI('getSourceServiceToken')).then(function(response){
				form.sourceservicetoken = response.token;
				form.operater = response.userId;
				Store.dispatch(Actions.callAPI('uploadSingleFile',{},form)).then(function(response){
						console.log("response",response);
				}).catch(function(err){
					Notify.show([{
						message:err.message,
						type: 'danger',
						}]);
					});
				});
		}).catch(function(err){
			Notify.show([{
				message:'后台出错了，获取token失败!',
				type: 'danger',
			}]);
		});
*/

	}

	render(){

   	    let { input, label, type, meta: { touched, error },style,requireLabel,multiple,accept} = this.props;
		let {files,progress,isUploading} = this.state;

		let fileBgStyles = {};

		return (
			<div className="form-item-wrap" style={style}>
			<div className="form-item">
			<label className="form-label"> {requireLabel?<span className="require-label">*</span>:null} {label}</label>
			<div className="form-main">
			<div className="form-input">
				<ul className="file-list">
					{files && files.map((item,index)=>{
						return (
							<li key={index}><a href={item.fileUrl} target="_blank">{item.fileName}</a></li>
						);
					})}
				</ul>
				<div className="file-button">
					<input type="file" name="file" onChange={this.onChange}  multiple={multiple?'multiple':null} accept={accept} />
					上传文件
					{isUploading && <span className="progress" style={{width:progress}}></span>}
				</div>
			</div>
			{touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
			</div>
			</div>
			</div>
		);


	}
}


// <input type="file" onChange={this.onChange} name={input.name}/>
