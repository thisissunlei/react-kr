import React from 'react';
import {reduxForm} from 'redux-form';
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

import './index.less';
@observer
class ImportData extends React.Component{
	
	static PropTypes = {
			
	}
	constructor(props,context){
		super(props,context);
		this.state={
			file:{},
			fileName:''
		}
	};
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}

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

	test=()=>{
		let _this = this;
    	var form = new FormData();
		form.append('markerData', this.state.file);
		form.append('companyId', this.companyId);
		form.append('communityId', this.communityId);
		if(!this.state.file.name){
			Message.error('请选择上传文件');
			return false;
		}

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					console.log('ss',xhr.response);
					if(xhr.response.code=='-1'){
						Message.error(xhr.response.message);
					}else{
            			_this.onCancel(); 
            			_this.onSubmit();
            			Message.success("导入成功");
					}

				
				} else {
            	    _this.onCancel(); 
					Message.error('导入失败');
				}
			}
		};

		xhr.onerror = function(e) {
			console.error(xhr.statusText);
		};
		xhr.open('POST', 'http://op.krspace.cn/mockjsdata/35/krspace-finance-web/csr/market/import/actions/upload', true);
		xhr.responseType = 'json';
		xhr.send(form);

  }

	
	render(){

		let {handleSubmit}=this.props;
		let {fileName} = this.state;

		return(
				
				<div className='m-importData'>
					<form onSubmit={handleSubmit(this.onSubmit)}>
					  
					  <span className='source-customer'>客户来源:</span>
                      <KrField  grid={1} name="intentionCommunityId" style={{marginTop:4,width:262}} component='searchIntend'  onChange={this.onChangeIntend} placeholder='请选择'/>

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
									<div  className='ui-btn-center'><Button  label="确定导入" type="button" width={90} height={34} onClick={this.test}/></div>
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