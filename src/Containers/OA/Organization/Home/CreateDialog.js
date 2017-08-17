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
class CreateDialog extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        
    }
    componentDidMount() {
        
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    onSubmit = (form) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
    }
    
    render() {
        const {handleSubmit,error} = this.props;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:262,marginTop:30,paddingLeft:32}}  >
                <KrField
                    style={{width:262}}
                    inline={false}
                    label="机构维度名称"
                    component="input"
                    name="name"
                    placeholder="机构维度"
                    requireLabel={true}
                />
                
                <Row style={{marginTop:15,marginBottom:6}}>
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

	const errors = {};
	if (!values.name) {
		errors.name = '请输入维度名称';
	}else if(values.name.length>10) {
		errors.name = '维度名称最多10个字符！';
	}
    
	if (!values.sort) {
		errors.sort = '请输入排序号';
	}
	return errors;
}
export default reduxForm({
	form: 'CreateDialog',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
    validate,
})(CreateDialog);
