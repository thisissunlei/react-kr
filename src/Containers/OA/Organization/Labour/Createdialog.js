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
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        const {onSubmit,detail} = this.props;
        var form = Object.assign({},form);
        form.superOrgType = detail.superOrgType;
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
                    label="下级名称"
                    component="input"
                    name="orgName"
                    requireLabel={true}
                    placeholder="下级名称"
                />
                <KrField
                    name="orgType"
                    style={{width:262,marginTop:6}}
                    component="select"
                    label="下级类型"
                    options={[
                        {label:'部门',value:'0'},
                        {label:'分部',value:'1'}
    				]}
                    inline={false}
                    requireLabel={true}
				/>
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    label="编码"
                    component="input"
                    name="orgCode"
                    requireLabel={true}
                    placeholder="编码"
                />
                <KrField 
                    style={{width:262,marginTop:6}}  
                    name="lessorContactid" 
                    component="searchOaPersonal" 
                    label="负责人" 
                    placeholder="负责人"
                    requireLabel={true}
                />
                <KrField 
                    style={{width:262,marginTop:6}}  
                    name="lessorContactid" 
                    component="searchOaPersonal" 
                    label="管理员" 
                    placeholder="管理员"
                    requireLabel={true}
                />
                <Row style={{marginTop:20,marginBottom:6}}>
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

// 	const errors = {}
// 	if (!values.name) {
// 		errors.version = '请输入下级名称';
// 	}
//     if (!values.version) {
// 		errors.version = '请选择类型';
// 	}
 
// 	return errors
// }
export default reduxForm({
	form: 'createdialog',
  enableReinitialize: true,
  //validate,
	keepDirtyOnReinitialize: true,
})(Createdialog);
