import React from 'react';
import {reduxForm,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
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
			customerName:''
		}
	};
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	importDataPost=(num)=>{
		const {importDataPost} = this.props;
		importDataPost && importDataPost(num);
	}
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
	}

	onChangeAdd=(params)=>{
		 this.setState({
			 customerName:params.label
		 })
		 if(!params){
			 Store.dispatch(change('ImportData','sourceName',''));
			 Store.dispatch(change('ImportData','sourceId',''));
			 return ;
		 }
		 if(params.label==params.value){
			 Store.dispatch(change('ImportData','sourceName',params.label));
			 Store.dispatch(change('ImportData','sourceId',''));
		 }else{
			 Store.dispatch(change('ImportData','sourceId',params.value));
			 Store.dispatch(change('ImportData','sourceName',params.label));
		 }
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

	 onSubmit=(params)=>{
		 let {customerName}=this.state;
		 let _this = this;
		 var form = new FormData();
		 form.append('marketData', this.state.file);
		 if(params.sourceId){
			 form.append('sourceId', params.sourceId);
		 }
		 form.append('sourceName', params.sourceName);
		 if(!customerName){
			 Message.error('请输入客户来源');
			 return false;
		 }
		 if(!this.state.file.name){
			 Message.error('请选择上传文件');
			 return false;
		 }
		 if(!params.sourceName){
			 return ;
		 }
		 var xhr = new XMLHttpRequest();
		 xhr.onreadystatechange = function() {
			 if (xhr.readyState === 4) {
				 if (xhr.status === 200) {
					 if (xhr.response && xhr.response.code > 0) {
						 State.importContent(xhr.response.data.batchId);
						 _this.importDataPost(xhr.response.data.batchId);
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
		 xhr.open('POST', '/api/krspace-finance-web/csr/market/import/actions/upload', true);
		 xhr.responseType = 'json';
		 xhr.send(form);

	 }


	 render(){

		 let {handleSubmit}=this.props;
		 let {fileName} = this.state;

		 return(

			 <div className='m-importData'>
				 <form onSubmit={handleSubmit(this.onSubmit)} style={{minWidth:'330px'}}>

					 <span className='source-customer'>客户来源:</span>
					 <KrField  grid={1} name="sourceId" style={{marginTop:4,width:262}} component='searchSourceAdd'  onChange={this.onChangeAdd} placeholder='请选择'/>
					 <KrField type='hidden' name='sourceName' />
					 <div style={{marginTop:19}}>
						 <span className='m-upload-file'>上传文件:</span>
						 <span className='import-logo'><span className='import-pic'></span><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
						 <span className='load-demo icon-template' onClick={this.onLoadDemo}>下载模板</span>
						 {fileName?<span className='file-name'>{fileName}</span>:''}
					 </div>

					 <Grid style={{marginTop:30,marginBottom:6}}>
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
