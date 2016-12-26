import React, {
	Component
} from 'react';

import $ from 'jquery';
import {
	FontIcon,
	Notify,
} from 'kr-ui';
import ReactDOM from 'react-dom';
import './index.less';
import {ShallowEqual} from 'kr/Utils';
export default class UpLoadList extends Component {

	static defaultProps = {
		backgroundColor:"#fff",
		ShadowColor:'transparent'
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		/**
		 * place有四个参数值top,bottom,left,right
		 */
		place:React.PropTypes.string,
		backgroundColor:React.PropTypes.string,
		/**
		 * tooltip内容的阴影，box-shadow的参数
		 */
		boxShadow:React.PropTypes.string,
		/**
		 * 与box-shadow的阴影色相同
		 */
		open:React.PropTypes.bool


	}

	constructor(props){
		super(props);
		this.state={
			width:0,
			height:0,
			open:this.props.open,
			progress:0,
			isUploading: false,
			isInit: true,
			form: {},
			files:this.props.fileList,
			offsetTop:this.props.offsetTop,
			fileName:''
		}

	}
	componentDidMount() {
		this.renderHover();
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.open,nextProps.open)){
			this.setState({
				open:nextProps.open
			},function(){
				this.renderHover();
			})
			
		}
	}
	renderHover=()=>{
		// let {tipName} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		// node.style.backgroundColor = backgroundColor;
		let {open} = this.props;
		if(open){
			node.style.visibility = 'visible';
		}else{
			node.style.visibility = 'hidden';
		}
		parent.style.position = "relative";
		this.setState({
			width:node.offsetWidth,
			height:node.offsetHeight
		})
	}
	delete(id){
		console.log('id',id);
	}
	onError(message) {
		message = message || '上传文件失败';

		this.setState({
			progress: 0,
			isUploading: false
		});
		alert(message);
	}

	onSuccess(response) {
		response = Object.assign({}, response);

		let {
			form
		} = this.state;

		let fileUrl = `/krspace_oa_web/doc/docFile/downFile?sourceservicetoken=${form.sourceservicetoken}&operater=${form.operater}&fileId=${response.id}`;

		response.fileUrl = fileUrl;
		response.fileName = response.filename;

		let {
			input,
			onChange
		} = this.props;
		let {
			files
		} = this.state;

		// files.unshift(response);
		files.push('0');

		console.log('files', files);
		this.setState({
			files,
			progress: 0,
			isUploading: false
		});

		// this.onSetInputValue();
		onChange && onChange(files);
	}
	onSetInputValue() {
		let {
			files
		} = this.state;
		let {
			input
		} = this.props;
		console.log('fsadd');
		let fileIds = [];
		files.forEach(function(item, index) {
			fileIds.push(item.id);
		});
		input.onChange(fileIds.toString());
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
	onChange=(event)=> {

		var _this = this;


		let file = event.target.files[0];
		console.log('file-----', file)
		if (!file) {
			return;
		}

		this.setState({
			isUploading: true,
			fileName:file.name,
		});


		if (file) {
			var progress = 0;
			var timer = window.setInterval(function() {
				if (progress >= 100) {
					window.clearInterval(timer);
					_this.setState({
						progress: 0,
						isUploading: false
					});
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
									_this.onSuccess(fileResponse.data);

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
					xhrfile.onerror = function(e) {
						console.error(xhr.statusText);
					};

					xhrfile.open('POST', '/api-old/krspace_oa_web/doc/docFile/uploadSingleFile', true);
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
	}
	renderLoad=()=>{
		let {files} = this.state;
		if(files.length<=6){
			return (
				<li className="ui-file">
					<div className="file-button">
						<span className="file-icon">+</span>
						<input type="file" name="file" onChange={this.onChange} />
						添加文件
					</div>
				</li>
			)
		}else{
			return ;
		}
	}
	render() {
		let {isUploading,progress,files,fileName} = this.state;
		let className = 'upload-list';
		let style = {};

		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={style}>
				<ul>
				{files.map((item,index)=>{
					return (
						<li key={index}>
						
						<span className="file-name">{item}</span>
						<span className="file-delete" onClick={this.delete.bind(this,item)}>ddd</span>
						</li>
						)
				})}
				{isUploading && <li className="loading-progress"><span className="progress" style={{width:`${progress}%`}}>{progress}%</span><span>{fileName}</span></li>}

				{this.renderLoad()}
				</ul>
			</div>
		);
	}
}
