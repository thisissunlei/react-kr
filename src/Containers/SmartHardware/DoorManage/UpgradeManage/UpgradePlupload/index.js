import "babel-polyfill";
import {Http} from 'kr/Utils';
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	KrField,
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
	Message,
} from 'kr-ui';
import './index.less';
import plupload from 'plupload/js/plupload.full.min';
import State from '../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

 class TanLinLin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signatureInfo : {},
			expireCanUse : false,
		}
		
	}
	componentWillMount() {

	}

	getSignature=()=>{

		let _this = this;
		Http.request('getSignatureUrl',{}).then(function(response) {

			console.log("response",response);
			_this.setState({
				signatureInfo : response
			})

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	random_string=(len)=>{
		len = len || 32;
	　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
	　　var maxPos = chars.length;
	　　var pwd = '';
	　　for (var i = 0; i < len; i++) {
	    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
	    }
	    return pwd;
	}



	//获取文件后缀名
	get_suffix=(filename)=>{
	    var pos = filename.lastIndexOf('.'),
	    suffix = ''
	    if (pos != -1) {
	        suffix = filename.substring(pos)
	    }
	    return suffix;
	}

	set_file_name=(filename)=>{
		this.get_suffix(filename);
		var fileRandomName = this.random_string(10)+this.get_suffix(filename)
		return fileRandomName;
	}


	set_multipart_params=(uploader)=>{
		
		let _this = this;
		Http.request('getSignatureUrl',{}).then(function(response) {

			console.log("response",response);
			console.log("uploader====>",uploader);

			var fileNameRandom = _this.set_file_name(uploader.files[0].name);

			console.log("fileNameRandom",fileNameRandom);
			uploader.setOption({
		        'url': response.serverUrl,
		        filters: {
			       
			        max_file_size : response.maxSizeKb,
			    },
		        'multipart_params': {
						
				        'key' : response.pathPrefix+fileNameRandom,
						'policy': response.policy,
				        'OSSAccessKeyId': response.ossAccessKeyId, 
				        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
						'signature': response.sign,
						'uid' :  response.uid,
						'callback': response.callback,
						'X:original_name': fileNameRandom

					},

		    });
		    uploader.start();

		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	componentDidMount(){

		let _this = this;
		this.getSignature();

	 //    var policyText = {
		//     "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
		//     "conditions": [
		//     ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
		//     ]
		// };

		// var accessid= 'LTAIA8GOJGGoRk9E',
		// accesskey= 'ex8X9Pm8KdyFKggfxlkKGzuv3Vb3Af',
		// host = 'http://tanlinlinbucket.oss-cn-beijing.aliyuncs.com';


		

		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : 'selectfiles', 
		    //runtimes : 'flash',
			container: document.getElementById('sso-container'),
			flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',

		    // url : host,

			// multipart_params: {
			// 	'Filename': '${filename}', 
		 //        'key' : '${filename}',
			// 	'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
		 //        'OSSAccessKeyId': accessid, 
		 //        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
			// 	'signature': 'o19saGhusYBG64jrqInIFkLIjCs=',
			// },

			init: {
				PostInit: function() {
					document.getElementById('ossfile').innerHTML = '';
					document.getElementById('postfiles').onclick = function() {

					    _this.set_multipart_params(uploader);
						
						return false;
					};
				},

				FilesAdded: function(up, files) {
					console.log("files========>",files);
					console.log("up--------》",up);
					if(up.files.length>1){
						uploader.files.splice(0, 1);
					}

					plupload.each(files, function(file) {

						document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
						+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
						+'</div>';
					});
				},

				BeforeUpload:function(uploader,file){
					console.log("uploader",uploader);
					console.log("file",file);
				},

				UploadProgress: function(up, file) {
					var d = document.getElementById(file.id);
					d.getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
		            
		            var prog = d.getElementsByTagName('div')[0];
					var progBar = prog.getElementsByTagName('div')[0]
					progBar.style.width= 2*file.percent+'px';
					progBar.setAttribute('aria-valuenow', file.percent);
				},
				//上传完成
				FileUploaded: function(up, file, info) {
					//alert(info.status)
					console.log("up",up);
					console.log("file",file);
					console.log("info",info);
					console.log("State",State);
					State.uploadedInfo = JSON.parse(info.response).data;
		            if (info.status >= 200 || info.status < 200)
		            {
		                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
		            }
		            else
		            {
		                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
		            } 
				},

				Error: function(up, err) {
					console.log("err",err);
					console.log(err.message);
					document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
				}
			}
		});

		uploader.init();
		

	}



	onSubmit=(values)=>{
	}
	render(){
		let {initailPoint} = this.state;
		const { error, handleSubmit, pristine,mapStyle} = this.props;

		return (
			<div className="upgrade-plupload">


			{/*<form onSubmit={handleSubmit(this.onSubmit)}>*/}

	              
				<div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
				<div id="sso-container">
					<a id="selectfiles" href="javascript:void(0);" className='btn' style={{display:"inline-block",marginRight:10}}>选择文件</a>
					<a id="postfiles" href="javascript:void(0);" className='btn'>开始上传</a>
				</div>

				<div id="console"></div>
			{/*</form>*/}


		  	</div>
		);
	}
}
const validate = values => {
	const errors = {}

	// if (!values.email) {
	// 	errors.email = '请输入邮箱';
	// }

	return errors
}
const selector = formValueSelector('NewCreateForm');
export default TanLinLin = reduxForm({
	form: 'TanLinLin',
	validate,
})(TanLinLin);
