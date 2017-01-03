import React, {
	Component
} from 'react';

import $ from 'jquery';
import {
	FontIcon,
} from 'kr-ui';
import Notify from '../Notify';
import {
	Actions,
	Store
} from 'kr/Redux';
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
		open:React.PropTypes.array


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
			files:[],
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
	componentWillUnmount(){
		console.log('componentWillUnmount');
		let node = ReactDOM.findDOMNode(this.tooltip);
		node.style.visibility = 'hidden';
	}
	renderHover=()=>{
		let {detail} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		this.getFileList(detail.id);
		// node.style.backgroundColor = backgroundColor;
		let {open} = this.props;
		if(open[1] == detail.id && open[0]){
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
	getFileList=(id)=>{
		let _this = this;
		let {open} = this.props;
		if(open[1] != id){
			return ;
		}
		Store.dispatch(Actions.callAPI('getFileList', {
			detailId: id
		})).then(function(response) {
			_this.setState({
				files:response
			})

		}).catch(function(err) {
			let node = ReactDOM.findDOMNode(_this.tooltip);
			node.style.visibility = 'hidden';
			console.log(err.message);

		});
	}
	saveFileList=(id)=>{
		let _this = this;
		Store.dispatch(Actions.callAPI('saveFileList', {
			detailId: _this.props.detail.id,
			fileId:id
		})).then(function(response) {
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
			
			// let node = ReactDOM.findDOMNode(_this.tooltip);
			// node.style.visibility = 'hidden';
			// console.log(err.message);
		});
	}

	delete(id){
		let _this = this;
		Store.dispatch(Actions.callAPI('deleteFileList', {
			detailId: _this.props.detail.id,
			fileId:id.id
		})).then(function(response) {
			_this.getFileList(_this.props.detail.id);
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	onError(message) {
		message = message || '上传文件失败';

		this.setState({
			progress: 0,
			isUploading: false
		});
		Notify.show([{
			message: message,
			type: 'danger',
		}]);
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
		files.push(response);
		this.saveFileList(response.id);

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
				if (progress >= 90) {
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
			}, 100);


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
		if(files.length<6){
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
	download(item){
		console.log('download',item);
		window.location.href = item.fileUrl;
	}
	render() {
		let {isUploading,progress,files,fileName} = this.state;
		let className = 'upload-list';
		let showUl = files.length?'visible':'hidden';

		let style = {};

		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={style}>
				<ul>
				{ files.map((item,index)=>{
					let bottom = (index==5)?'10px':'0';
					return (
						<li key={index} style={{marginBottom:bottom}}>
						
						<span className="file-name" onClick={this.download.bind(this,item)}>{item.fileName}</span>
						<span className="file-delete icon-delete" onClick={this.delete.bind(this,item)}></span>
						</li>
						)
				})}
				{isUploading && <li className="loading-progress"><span className="progress" style={{width:`${progress}%`}}>{progress}%</span><span className="file-name-load">{fileName}</span></li>}

				{this.renderLoad()}
				</ul>
			</div>
		);
	}
}
