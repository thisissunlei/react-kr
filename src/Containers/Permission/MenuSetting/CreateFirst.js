
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
class CreateFirst extends React.Component {
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
		const {onSubmit,detail} = this.props;
       if(form.name == undefined){
            Message.errortimeout("请输入导航名称");
            return ;
        }
		onSubmit && onSubmit(form);
    }
    
    render() {
        const {handleSubmit,error} = this.props;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:356,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <KrField
                    style={{width:314,paddingLeft:20}}
                    inline={true}
                    label="导航名称"
                    component="input"
                    name="name"
                    placeholder="比如：运营平台"
                    requireLabel={true}
                />
                <KrField
                    style={{width:314,paddingLeft:48,marginTop:20}}
                    inline={true}
                    label="排序"
                    component="input"
                    name="sort"
                    placeholder="请输入排序"
                    requireLabel={true}
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
// const validate = values => {

// 	const errors = {};
// 	if (!values.name) {
// 		errors.name = '请输入导航名称';
// 	}
	
// 	return errors;
// }
export default reduxForm({
	form: 'CreateFirst',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
   // validate,
})(CreateFirst);
