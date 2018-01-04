import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	change,
	initialize,
	reset
} from 'redux-form';

import {
	Grid,
	Row,
	Message,
	Button,
	ListGroup,
	ListGroupItem,
	KrField
} from 'kr-ui';

class ImportData extends React.Component {
	static propTypes = {
		initialValues:React.PropTypes.object,
		communityOptions:React.PropTypes.array,
		orderTypeOptions:React.PropTypes.array,
	}
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);
		
		this.state = {
			isInit: true,
			form: {},
			files: [],
			isUploading: false,
			progress: 0,
			file:{},
			fileName:'',
			csrId:'',
			communityId:''
		}
	}
	testDate=()=>{
		let _this = this;
		let {
			csrId,
			file,
			communityId
		}=this.state;
		var form = new FormData();
		form.append('file', file);
		form.append('csrId', csrId);
		form.append('communityId', communityId);
		if(!this.state.file.name){
			Message.error('请选择上传文件');
			return false;
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					if(xhr.response.code=='-1'){
						Message.error(xhr.response.message);
					}else{
						Message.success("上传文件成功");
						_this.onCancel();
						_this.onSubmit();
						
					}

				
				} else {
            	_this.onCancel(); 
					Message.error('上传文件失败');
				}
			}
		};

		xhr.onerror = function(e) {
		};
		xhr.open('POST', '/api/krspace-sso-web/member/member-excel', true);
		xhr.responseType = 'json';
		xhr.send(form);


  }

	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
	}
	importFile=()=>{
	}
	onTokenSuccess=(form)=> {
		this.setState({
			form
		});
	}

	onChange=(event)=> {

		var _this = this;
		let fileName = event.target.files[0].name;
		let arr = event.target.files[0].name.split('.');
		let type = arr[arr.length-1];
		if(type != 'xls' && type != 'xlsx'){
			Message.error('上传文件类型不对，请选择.xls或.xlsx');
			return ;
		}
		_this.setState({
			fileName,
			file:event.target.files[0]
		})


	}

	onCompanyChange=(value)=>{
		this.setState({
			csrId:value.id
		});
	}

	onCommunity=(value)=>{
		this.setState({
			communityId:value.id
		});
	}


	render() {
		let {fileName} = this.state;
		const { error, handleSubmit, pristine, reset} = this.props;

		return (
			<form className="u-import-date" onSubmit={handleSubmit(this.testDate)} name='import' style={{textAlign:'center'}}>
					<div style={{margin:0,padding:0,height:36,marginBottom:16,position:'relative',zIndex:100}}>
					<KrField 
						name="csrId"
						label="公司" 
						grid={1/2}
						inline={false}
						height={36}
						component="searchMemberCompany" 
						requireLabel={true}
						onChange={this.onCompanyChange}
					/>
					</div>
					<div style={{margin:0,padding:0,height:36,marginBottom:16}}>
					<KrField 
						name="communityId" 
						grid={1/2} 
						label="社区" 
						component="searchCommunityAll" 
						height={36}
						requireLabel={true} 
						inline={false}
						onChange={this.onCommunity}
					/>
					</div>
				
				<div style={{marginTop:50}}>
					<span className='import-logo icon-excel' onClick={this.importFile}><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
					<span className='import-font'><span className="chooce">请选择上传文件</span><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
					{fileName?<span className='file-name'>{fileName}</span>:''}
					<span className='load-demo icon-template' onClick={this.onLoadDemo}>下载excel模板</span>
				</div>
				<Grid style={{marginTop:10,marginBottom:6}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'180px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定导入" type="submit" width={90} height={34} /></ListGroupItem>
							<ListGroupItem style={{width:'150px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid>
				</form>
)
	}
}

const validate = values => {
	const errors = {}
	if (!values.csrId) {
		errors.csrId = '请输入公司名称';
	}
	return errors;
}
export default ImportData = reduxForm({
	form: 'importData',
	validate,
})(ImportData);
