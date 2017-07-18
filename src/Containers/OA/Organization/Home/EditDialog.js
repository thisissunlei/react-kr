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
    Message
} from 'kr-ui';

import './index.less';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class EditDialog extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            infoList:{},
        }
    }
    componentDidMount() {
        var _this = this;
        var infoList = {};
        infoList = this.props.detail;
        Store.dispatch(initialize('EditDialog', infoList));
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    onSubmit = (form) => {
		const {onSubmit,detail} = this.props;
        var form = Object.assign({},form);
        form.id = detail.id;
		onSubmit && onSubmit(form);
    }
    
    render() {
        const {handleSubmit,error,detail} = this.props;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:262,marginTop:20,paddingLeft:32}}  >
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
      										label="提交"
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

	const errors = {};
	if (!values.name) {
		errors.name = '请输入导航名称';
	}
	
	return errors;
}
export default reduxForm({
	form: 'EditDialog',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
    validate,
})(EditDialog);
