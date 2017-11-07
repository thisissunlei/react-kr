import "babel-polyfill";
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
} from 'kr-ui';
import './index.less';
import plupload from 'plupload/js/plupload.full.min';

 class TanLinLin extends React.Component{
	constructor(props){
		super(props);
		this.state={
			initailPoint : '承德'
		},
		this.client = {}
	}
	componentWillMount() {
	}

	componentDidMount(){
	    var policyText = {
		    "expiration": "2020-01-01T12:00:00.000Z", //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
		    "conditions": [
		    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
		    ]
		};

		var accessid= 'LTAIA8GOJGGoRk9E',
		accesskey= 'ex8X9Pm8KdyFKggfxlkKGzuv3Vb3Af',
		host = 'http://tanlinlinbucket.oss-cn-beijing.aliyuncs.com';


		

		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,silverlight,html4',
			browse_button : 'selectfiles', 
		    //runtimes : 'flash',
			container: document.getElementById('sso-container'),
			flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
			silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',

		    url : host,

			multipart_params: {
				'Filename': '${filename}', 
		        'key' : '${filename}',
				'policy': 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
		        'OSSAccessKeyId': accessid, 
		        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
				'signature': 'o19saGhusYBG64jrqInIFkLIjCs=',
			},

			init: {
				PostInit: function() {
					document.getElementById('ossfile').innerHTML = '';
					document.getElementById('postfiles').onclick = function() {
						uploader.start();
						return false;
					};
				},

				FilesAdded: function(up, files) {
					plupload.each(files, function(file) {
						document.getElementById('ossfile').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ')<b></b>'
						+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
						+'</div>';
					});
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
			<div className="demo-tll">


					<form onSubmit={handleSubmit(this.onSubmit)}>


			              	<KrField name="newuploadImage"
								component="map"
								placeholder="例如：北京市1111"
								style={{width:252,height:36}}
								mapStyle={{width:400,height:400}}
								initailPoint ={initailPoint}
							/>

							<Grid style={{marginTop:19,marginBottom:'4px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
										<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
									</ListGroup>
								</Row>
							</Grid>

							<div id="ossfile">你的浏览器不支持flash,Silverlight或者HTML5！</div>
							<div id="sso-container">
								<a id="selectfiles" href="javascript:void(0);" className='btn' style={{display:"inline-block",marginRight:10}}>选择文件</a>
								<a id="postfiles" href="javascript:void(0);" className='btn'>开始上传</a>
							</div>

					</form>


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
