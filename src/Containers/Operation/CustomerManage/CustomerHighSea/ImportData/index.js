import React from 'react';
import {reduxForm} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Button,
	Grid,
	Row,
	Col,
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
	};
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	
	render(){

		let {handleSubmit}=this.props;
		
		return(
				
				<div className='m-importData'>
					<form onSubmit={handleSubmit(this.onSubmit)}>
					  
					  <span className='source-customer'>客户来源:</span>
                      <KrField  grid={1} name="intentionCommunityId" style={{marginTop:4,width:262}} component='searchIntend'  onChange={this.onChangeIntend} placeholder='请选择'/>

                      <div style={{marginTop:9}}>
                        <span className='m-upload-file'>上传文件:</span>
						<span className='import-logo' onClick={this.importFile}><span className='import-pic'></span><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
						<input type="hidden" name="companyId" />
						<span className='load-demo icon-template' onClick={this.onLoadDemo}>下载模板</span>
					 </div>

					   <Grid style={{marginTop:12}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定导入" type="submit"  onTouchTap={this.onSubmit}/></div>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
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