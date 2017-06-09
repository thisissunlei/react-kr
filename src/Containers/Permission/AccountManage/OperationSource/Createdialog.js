import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions, Store} from 'kr/Redux';
import {
    KrField,
    Button,
    ButtonGroup,
    Grid,
    Row,
    Col,
    Dialog,
} from 'kr-ui';
import {reduxForm, formValueSelector, change} from 'redux-form';
class Createdialog extends Component {

    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {
      var _this = this;
      var id = this.props.detail.id
      Http.request('source-search-data', {
              id: id
          }).then(function(response) {
              _this.setState({infoList: response})
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

    render() {
        const {handleSubmit} = this.props;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
                <div className="u-operations-edit-title">
                  <span>新建操作来源</span>
                </div>
                <KrField
                        grid={1/2}
                        left={42}
                        right={18}
                        name="version"
                        requireLabel={true}
                        style={{marginTop:4}}
                        label="来源编码"
                        component="input"
                />
    					<KrField
    			    		grid={1/2}
    						right={69}
     						 left={4}
    			    		name="systemType"
                            requireLabel={true}
    			    		type="select"
    			    		style={{marginTop:4}}
    			    		label="设备类型"
                         
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

	return errors
}
export default reduxForm({
	form: 'createdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Createdialog);
