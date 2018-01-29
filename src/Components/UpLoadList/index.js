import React from 'react';
import ReactDOM from 'react-dom';
import Notify from '../Notify';
import {ShallowEqual} from 'kr/Utils';
import {Http} from 'kr/Utils';
import './index.less';
export default class UpLoadList extends React.Component {

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
			fileName:'',
			close:false
		}

	}
	componentDidMount() {
		this.renderHover();
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.open,nextProps.open)){
			this.setState({
				open:nextProps.open,
				close:!this.state.close
			},function(){
				this.renderHover();
				// document.addEventListener('click', this.docClick)


			})

		}
	}
	componentWillUnmount(){
		let node = ReactDOM.findDOMNode(this.tooltip);
		node.style.visibility = 'hidden';
	}
	renderHover=()=>{
		let {detail} = this.props;
		let node = ReactDOM.findDOMNode(this.tooltip);
		let parent = node.parentNode;
		this.getFileList(detail.id);
		let {open} = this.props;
		if(open[1] == detail.id && open[0]){
			node.style.visibility = 'visible';
		}else{
			node.style.visibility = 'hidden';
			// document.removeEventListener('click', this.docClick)

		}

		parent.style.position = "relative";
		this.setState({
			width:node.offsetWidth,
			height:node.offsetHeight
		})
	}
	docClick = (event) => {
		event = event || window.event;
		var target = event.target;
		if(target.innerHTML == '附件'){
			return;
		}
		if (target && target.className && (target.className.indexOf('upload') !== -1 || target.className.indexOf('file') !== -1)) {
			return;
		}
		let node = ReactDOM.findDOMNode(this.tooltip);
		node.style.visibility = 'hidden';
		document.removeEventListener('click', this.docClick)

		// document.addEventListener('click', this.docClick);

	}
	getFileList=(id)=>{
		let _this = this;
		let {open} = this.props;
		if(open[1] != id){
			return ;
		}
		Http.request('getFileList', {
			detailId: id
		}).then(function(response) {
			_this.setState({
				files:response
			})

		}).catch(function(err) {
			let node = ReactDOM.findDOMNode(_this.tooltip);
			node.style.visibility = 'hidden';
		});
	}
	saveFileList=(id)=>{
		let _this = this;
		Http.request('saveFileList', {
			detailId: _this.props.detail.id,
			fileId:id
		}).then(function(response) {
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);

		});
	}

	delete(id){
		let _this = this;
		let {onChange} = this.props;
		Http.request('deleteFileList', {
			detailId: _this.props.detail.id,
			fileId:id.id
		}).then(function(response) {
			_this.getFileList(_this.props.detail.id);
			onChange && onChange();
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

					xhrfile.open('POST', '/api-old/krspace_oa_web/doc/docFile/uploadSingleFile', true);
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
	}
	renderLoad=()=>{
		let {files} = this.state;
		let className = 'ui-files';
		if(!files.length){
			className += ' only-upload';
		}
		if(files.length<6){
			return (
				<li className={className}>
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
		window.location.href = item.fileUrl;
	}
	render() {
		let {isUploading,progress,files,fileName} = this.state;
		let className = 'upload-list';
		let showUl = files.length?'visible':'hidden';

		let style = {};

		return(
			<div className={className} ref={div=>{this.tooltip = div}} style={style}>
				<ul className="upload-ul">
				{!files.length && 
					<li className="upload-li"  style={{marginBottom:0}}>

						<span className="file-name" >暂无附件</span>
						</li>
				}
				{ files.map((item,index)=>{
					let bottom = (index==5)?'10px':'0';
					return (
						<li className="upload-li" key={index} style={{marginBottom:bottom}}>

						<span className="file-name" onClick={this.download.bind(this,item)}>{item.fileName}</span>
						{/*<span className="file-delete icon-delete" onClick={this.delete.bind(this,item)}></span>*/}
						</li>
						)
				})}
				{isUploading && <li className="loading-progress" style={{position:'relative'}}><span className="progress" style={{width:`${progress}%`,height:'33px',position:'absolute',top:0,lineHeight:'33px'}}>{progress}%</span><span className="file-name-load">{fileName}</span></li>}

				{/*this.renderLoad()*/}
				</ul>
			</div>
		);
	}
}
