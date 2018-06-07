
import React from 'react';

import {Actions, Store} from 'kr/Redux';
import {
	Http
} from "kr/Utils";
import {
    KrField,
    Button,
    ButtonGroup,
    Grid,
    Row,
    Col,
    Dialog,
    DrawerTitle
} from 'kr-ui';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
import ApkFileUpload from './ApkFileUpload';

class Editdialog extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            infoList:'',
            version:'',
            fileList:[]
        }

    }
    componentDidMount() {

        var _this = this;
        var id = this.props.detail.id
        Http.request('get-version-detail', {
                id: id
            },{}).then(function(response) {
               let arr=[];
               let obj={
                 fileUrl:response.downUrl,
                 fileName:response.apkName
               }
               arr.push(obj)
                _this.setState({infoList: response},function(){
                  Store.dispatch(initialize('editdialog', _this.state.infoList));
                })
                _this.setState({
                    fileList: arr,
                    version:response.version
                })
            }).catch(function(err) {});

    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        const {onSubmit} = this.props;
        onSubmit && onSubmit(form);
    }
    onVersionChange=(value)=>{
        this.setState({
            version:value
        })
    }

    render() {
        const {handleSubmit} = this.props;
        let {
                infoList,
                version,
                fileList
            }=this.state;
            console.log('fileList===',fileList)
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <DrawerTitle title ="编辑版本" onCancel = {this.onCancel}/>

                <KrField
    	 					 grid={1/2}
    						 left={42}
    						 right={18}
    	 					 name="version"
                             requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="系统版本"
    						 component="input"
    	 			 		/>
    					<KrField
    			    		grid={1/2}
    							right={69}
     						 left={4}
    			    		name="osType"
                            requireLabel={true}
    			    		type="select"
    			    		style={{marginTop:4}}
    			    		label="设备类型"
    							options={[
    					      {label:'ANDROID',value:'ANDROID'},
    					      {label:'IOS',value:'IOS'}
    					    ]}
    					/>
    					<KrField
    							grid={1/2}
    							left={42}
    							right={18}
    							name="enable"
    							type="select"
                  requireLabel={true}
    							style={{marginTop:4}}
    							label="启用标识"
    							options={[
    								{label:'启用',value:'ENABLE'},
    								{label:'未启用',value:'DISABLE'}
    							]}
    					/>
    					<KrField
    							grid={1/2}
    							right={69}
     						 left={4}
    							name="forced"
    							type="select"
    							style={{marginTop:4}}
                  requireLabel={true}
    							label="是否强制更新"
    							options={[
    								{label:'强制',value:'FORCED'},
    								{label:'不强制',value:'UNFORCED'}
    							]}
    					/>
              <KrField
                  grid={1/2}
                  left={42}
                  right={18}
                  name="appType"
                  requireLabel={true}
                  type="select"
                  style={{marginTop:4}}
                  label="APP类型"
                  options={[
                    {label:'M_APP',value:'MAPP'},
                    {label:'TV_APP',value:'TVAPP'},
                    {label:'tv_ads',value:'TVADS'}
                  ]}
              />
              
              <KrField
                  grid={1/2}
                  right={69}
                  requireLabel={true}
                  left={4}
                  name="appSize"
                  type="input"
                  style={{marginTop:4}}
                  label="安装包大小"
              />
            <KrField
              grid={1/2}
              style={{width:325,marginLeft:-10,marginTop:2,paddingLeft:53}}
              name="publishTime"
              label="发布时间"
              requireLabel={true}
              component="date"
              />
             
              <KrField
                  name="downUrl"
                  type="hidden"
                  style={{marginTop:4}}
                  label="下载地址"
              />
               <div className="u-upload-apk">
                  <div className="u-title">上传apk</div>
                  <ApkFileUpload  
                        version={version}
                        defaultValue={fileList}
                        onChange={(files)=>{
                            if(files){
                                Store.dispatch(change('editdialog','apkName',files.fileName));
                                Store.dispatch(change('editdialog','downUrl',files.downUrl));
                            }else{
                                Store.dispatch(change('editdialog','apkName',''));
                                Store.dispatch(change('editdialog','downUrl',''));
                            }
                           
                        }} 
                  />
              </div>
              <KrField
                  grid={1}
                  left={42}
                  right={18}
                  name="updateInfo"
                  component="textarea"
                  maxSize={2000}
                  style={{marginTop:4,height:110}}
                  label="版本更新内容"
              />
                <Row style={{marginTop:30,marginBottom:15}}>
      					<Col md={12} align="center">
      						<ButtonGroup>
      							<div className='ui-btn-center'>
      								<Button
      										label="确定"
      										type="submit"
      										height={34}
      										width={90}
      								/>
      							</div>
      							<Button
      									label="取消"
      									type="button"
      									onTouchTap={this.onCancel}
      									cancle={true}
      									height={33}
      									width={90}
      							/>
      						</ButtonGroup>

      					 </Col>
      					 </Row>
              </form>
            </div>
        );
    }

}
const validate = values => {

	const errors = {}
	if (!values.version) {
		errors.version = '请输入版本';
	}
    if (!values.osType) {
		errors.osType = '请选择设备类型';
	}
    if (!values.forced) {
		errors.forced = '请选择是否强制更新';
	}
    if (!values.publishTime) {
		errors.publishTime = '请选择发布时间';
	}
    if (!values.downUrl) {
		errors.downUrl = '请输入下载地址';
	}
    if (!values.appType) {
		errors.appType = '请选择app类型';
	}
    if (!values.enable) {
		errors.enable = '请选择启用类型';
	}
  if (!values.appSize) {
    errors.appSize = '请填写安装包大小';
  }

	return errors
}
export default reduxForm({
	form: 'editdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Editdialog);
