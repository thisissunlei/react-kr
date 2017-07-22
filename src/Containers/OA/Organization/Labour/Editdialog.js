
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
        this.state={
            infoList:{},
        }
    }
    componentDidMount() {

        var _this = this;
        var orgId = this.props.detail.orgId;
        var orgType = this.props.detail.orgType;
        Http.request('org-detail', {
                orgId: orgId,
                orgType:orgType
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
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:644,marginTop:20}}  >
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    inline={false}
                    grid={1/2}
                    label="编码"
                    component="labelText"
                    name="code"
                    requireLabel={true}
                    placeholder="编码"
                    value={this.state.infoList.code}
                />
                <KrField
                    style={{width:262}}
                    inline={false}
                    grid={1/2}
                    label="名称"
                    component="input"
                    name="orgName"
                    requireLabel={true}
                    placeholder="名称"
                />
               
                <KrField 
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}  
                    name="chargeId" 
                    component="searchOaPersonal" 
                    grid={1/2}
                    label="负责人" 
                    placeholder="负责人"
                    requireLabel={true}
                />
                <KrField 
                    style={{width:262,marginTop:6}}  
                    name="adminId" 
                    component="searchOaPersonal" 
                    grid={1/2}
                    label="管理员" 
                    placeholder="管理员"
                    requireLabel={true}
                />
                <KrField 
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}  
                    name="orgSort" 
                    grid={1/2}
                    component="input" 
                    label="排序号" 
                    placeholder="排序号"
                    requireLabel={true}
                />
                <KrField 
                    style={{width:262,marginTop:6}}  
                    name="adminId" 
                    component="searchOaPersonal" 
                    grid={1/2}
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
const validate = values => {

	const errors = {}
	if (!values.orgName) {
		errors.orgName = '请输入名称';
	}
    if (!values.orgSort) {
		errors.orgSort = '请输入排序号';
	}
    if (!values.adminId) {
		errors.adminId = '请选择管理员';
	}
    if (!values.chargeId) {
		errors.chargeId = '请选择负责人';
	}

	return errors
}
export default reduxForm({
	form: 'editdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Editdialog);
