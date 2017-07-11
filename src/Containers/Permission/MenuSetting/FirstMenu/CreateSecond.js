
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
        var params = {
            firstLevelId: detail.id,
            name: form.name,
        }
		onSubmit && onSubmit(params);
    }
    
    render() {
        const {handleSubmit} = this.props;
        let {FirstSelect,SecondSelect} = this.state;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <KrField
                    style={{width:310}}
                    inline={true}
                    label="分类名称"
                    component="input"
                    name="name"
                    placeholder="比如：运营平台"
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
export default reduxForm({
	form: 'CreateFirst',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CreateFirst);
