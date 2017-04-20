import React from 'react';
import {reduxForm}  from 'kr/Utils/ReduxForm';
import {
	Button,
	Grid,
	Row,
	Col,
	Message,
	KrField,
	ButtonGroup,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import State from '../State';
import './index.less';

@observer
class ImportData extends React.Component{

	static PropTypes = {

	}
	constructor(props,context){
		super(props,context);
		this.state={
			file:{},
			fileName:'',
		}
	};
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
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

	 onSubmit=()=>{
		 let _this = this;
		 var form = new FormData();
		 form.append('spaceData', this.state.file);
		 form.append('communityId',State.communityId);
		 if(!this.state.file.name){
			 Message.error('请选择上传文件');
			 return false;
		 }
		 var xhr = new XMLHttpRequest();
		 xhr.onreadystatechange = function() {
			 if (xhr.readyState === 4) {
				 if (xhr.status === 200) {
					 if (xhr.response && xhr.response.code > 0) {
						 Message.warntimeout('图片上传成功', 'success');
					 } else {
						 Message.error(xhr.response.message);
					 }
				 }else {
					 _this.onCancel();
					 Message.error('上传失败');
				 }
			 }
		 };

		 xhr.onerror = function(e) {
		 };
		 xhr.open('POST', 'http://shang.krspace.cn:8082/api/krspace-finance-web/cmt/station/import/actions/upload', true);
		 xhr.responseType = 'json';
		 xhr.send(form);

	 }


	 render(){

		 let {handleSubmit}=this.props;
		 let {fileName} = this.state;

		 return(

			 <div className='m-importData m-station-importData'>
				 <form onSubmit={handleSubmit(this.onSubmit)} style={{minWidth:'330px'}}>

					 <div className='import-title'>
					   <div style={{fontSize:'16px',color:'#555',fontWeight:'500'}}>导入说明</div>
						 <ul className='import-detail'>
						  <li>1.工位编号为必填，且不能重复</li>
							<li>2.表格首行为字段名，不能删除</li>
							<li>3.若工位为会议室，则必填会议室ID</li>
						 </ul>
					 </div>

					 <div className='import-title-two'>
					   <div style={{fontSize:'16px',color:'#555',fontWeight:'500'}}>社区工位信息</div>
						 <div className='import-first'>下载模版文件，根据模版中的批注，填写社区工位</div>
					 </div>

					 <KrField type='hidden' name='communityId'/>

					 <div style={{marginTop:19}}>
						 <span className='m-upload-file'>上传文件:</span>
						 <span className='import-logo'><span className='import-pic'></span><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
             <span className='load-demo icon-template' onClick={this.onLoadDemo}>下载模板</span>
						 {fileName?<span className='file-name'>{fileName}</span>:''}
					 </div>

					 <Grid style={{marginTop:30,marginBottom:6,marginLeft:-30}}>
						 <Row>
							 <Col md={12} align="center">
								 <ButtonGroup>
									 <div  className='ui-btn-center'><Button  label="确定导入" type="submit" width={90} height={34} onClick={this.onSubmit}/></div>
									 <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/>
								 </ButtonGroup>
							 </Col>
						 </Row>
					 </Grid>
				 </form>
			 </div>
		 );
	 }
 }

 export default reduxForm({form:'ImportData',enableReinitialize:true,keepDirtyOnReinitialize:true})(ImportData);
