



import {Http} from 'kr/Utils';
import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Message,
} from 'kr-ui';
import './index.less';
import State from '../State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class UpgradePlupload extends React.Component{
	constructor(props){
		super(props);
		this.state={
			signatureInfo : {},
			expire : 0
		}
		
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

	get_signature=(uploader)=>{
		
		var nowTimeStamp = Date.parse(new Date());
		if(this.state.expire<nowTimeStamp+10){
			
			this.send_request(uploader);
		}else{
			uploader.start();
		}
		
	}

	send_request=(uploader)=>{
		let _this = this;
		Http.request('getSignatureUrl',{isPublic:true,category:"iot/upgrade"}).then(function(response) {

			var fileNameRandom = _this.set_file_name(uploader.files[0].name);
			_this.setState({
				expire : response.expireAt
			})

			
			uploader.setOption({
		        'url': response.serverUrl,
		        filters: {
			       
			        max_file_size : response.maxSizeKb,
			    },
		        'multipart_params': {
						'Filename': uploader.files[0].name,
				        'key' : response.pathPrefix+fileNameRandom,
						'policy': response.policy,
				        'OSSAccessKeyId': response.ossAccessKeyId, 
				        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
						'signature': response.sign,
						'uid' :  response.uid,
						'callback': response.callback,
						'X:original_name': uploader.files[0].name,
						"Content-Disposition": "attachment;filename="+uploader.files[0].name
					},

		    });
		    uploader.start();

		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	set_multipart_params=(uploader,ret)=>{
		
		if(uploader.files.length<1){
			Message.error("请选择文件");
			return;
		}
		let _this = this;
		if(ret == false){
			_this.get_signature(uploader);
		}
		
	}

	loadXML =(xmlString)=>{
        var parser=new DOMParser();
    	var xmlDoc=parser.parseFromString(xmlString,"text/xml");
    	return xmlDoc;
    }


    showUploadMsg = (info)=>{
    	let _this =this;
    	try{
    		State.uploadedInfo = JSON.parse(info.response).data;
    	}catch(e){
    		var text = _this.loadXML(info.response);
        	var msg = text.getElementsByTagName("Code")[0].childNodes[0].nodeValue
        	Message.error(msg)
    	}
    }

	componentDidMount(){

		let _this = this;
		
		var host = 'http://tanlinlinbucket.oss-cn-beijing.aliyuncs.com';

		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : 'selectfiles', 
			container: document.getElementById('sso-container'),
			flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
			multi_selection :false,
		    url : host,

			init: {
				PostInit: function() {
					document.getElementById('ossfile').innerHTML = '';
					document.getElementById('postfiles').onclick = function() {

					    _this.set_multipart_params(uploader,false);
						
						return false;
					};
				},

				FilesAdded: function(up, files) {
					
					if(up.files.length>1){
						uploader.files.splice(0, 1);
					}

					plupload.each(files, function(file) {

						document.getElementById('ossfile').innerHTML = '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
						+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
						+'</div>';
					});
				},

				BeforeUpload: function(up, file) {
		            
		            _this.set_multipart_params(up,true);
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
					
					
		            if (info.status >= 200 || info.status < 200)
		            {	

		                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '上传成功';
		                
	                	_this.showUploadMsg(info);
		    
		            }
		            else
		            {
		                document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = info.response;
		            } 
				},

				Error: function(up, err) {
					
					document.getElementById('console').appendChild(document.createTextNode("\nError xml:" + err.response));
				}
			}
		});

		uploader.init();
		

	}



	
	render(){
		

		return (
			<div className="upgrade-plupload">

	              
				<div id="ossfile">你的浏览器不支持HTML5！</div>
				<div id="sso-container">
					<a id="selectfiles" href="javascript:void(0);" className='btn' style={{display:"inline-block",marginRight:10}}>选择文件</a>
					<a id="postfiles" href="javascript:void(0);" className='btn'>开始上传</a>
				</div>

				<div id="console"></div>
		


		  	</div>
		);
	}
}


