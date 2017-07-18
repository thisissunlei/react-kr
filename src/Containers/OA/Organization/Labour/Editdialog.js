
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
} from 'kr-ui';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class Editdialog extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {

        var _this = this;
        var id = this.props.detail.id
        Http.request('get-version-detail', {
                id: id
            },{}).then(function(response) {
                _this.setState({infoList: response},function(){
                  Store.dispatch(initialize('editdialog', _this.state.infoList));
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

    render() {
        const {handleSubmit} = this.props;

        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:262,marginTop:20,paddingLeft:23}}  >
                <KrField
                    style={{width:262}}
                    inline={false}
                    label="机构维度名称"
                    component="input"
                    name="name"
                    requireLabel={true}
                    placeholder="机构维度"
                />
                <KrField
                    style={{width:262}}
                    inline={false}
                    label="排序"
                    component="input"
                    name="name"
                    requireLabel={true}
                    placeholder="排序"
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
	form: 'editdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Editdialog);
