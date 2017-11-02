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
import {
	Http,
	DateFormat
} from "kr/Utils";
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class Basic extends Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            options:[],
            infoList:[],
        }
    }
    componentDidMount() {
        var _this = this;
            console.log(_this.props.id);
        var wfId = _this.props.id;
        Http.request('process-detail', {
                wfId: wfId,
            },{}).then(function(response) {
                response.newRequestShow = response.newRequestShow.toString();
                response.allowRequest = response.allowRequest.toString();
                _this.setState({infoList: response},function(){
                  Store.dispatch(initialize('Basic', _this.state.infoList));
                })
            }).catch(function(err) {});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        
        // console.log("basic",form);
        const {onSubmit,detail} = this.props;
        var params = Object.assign({},form);
        if(!isNaN(params.formId)){
            params.formId = [{orgId:params.formId}] 
        }
        if(!isNaN(params.resourceId)){
            params.resourceId = [{orgId:params.resourceId}] 
        }
        
        onSubmit && onSubmit(params);
    }

    render() {
        const {handleSubmit,detail} = this.props;
        const {infoList} = this.state;
       // console.log(detail);
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:636,marginTop:20,paddingLeft:12}}  >
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    inline={false}
                    grid={1/2}
                    label="流程名称"
                    component="input"
                    name="name"
                    requireLabel={true}
                    placeholder="请输入流程类型名称"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    label="流程编码"
                    grid={1/2}
                    component="labelText"
                    name="code"
                    requireLabel={true}
                    value={infoList.code}
                />
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    name="typeId"
                    type="text"
                    component="SearchProcessType"
                    label="流程类型"
                    requireLabel={true}
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    label="排序号"
                    grid={1/2}
                    component="input"
                    name="orderNum"
                    requireLabel={true}
                    placeholder="排序号"
                />

                <KrField
                    grid={1/2}
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    name="formId"
                    component="formTypeTree"
                    label="表单名称"
                    valueText={infoList.formName ? [{orgName:infoList.formName}]:[{orgName:''}]}
                    ajaxUrlName = "form-type-tree"
                    requireLabel={true}
                />
               

                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    grid={1/2}
                    name="resourceId"
                    component="treePersonnel"
                    label="对接人"
                    requireLabel={true}
                    ajaxUrlName = "get-personnel-tree"
                    valueText={(infoList.resourceName)?[{orgName:infoList.resourceName}]:[{orgName:''}]}
                />
                
                <KrField style={{width:262,marginTop:14,marginLeft:34}} name="allowRequest" component="group" label="发起流程请求" grid={1} requireLabel={true}>
                    <KrField style={{marginTop:10}} name="allowRequest" label="允许" type="radio" value="true" />
                    <KrField style={{marginTop:10}} name="allowRequest" label="不允许" type="radio" value="false" />
 				</KrField>
                 <KrField style={{width:262,marginTop:14,marginLeft:32}} name="newRequestShow" component="group" label="新办是否显示" grid={1} requireLabel={true}>
                    <KrField style={{marginTop:10}} name="newRequestShow" label="显示" type="radio" value="true" />
                    <KrField style={{marginTop:10}} name="newRequestShow" label="不显示" type="radio" value="false" />
 				</KrField>
               <KrField
                  grid={1}
                  left={30}
                  name="descr"
                  component="textarea"
                  maxSize={200}
                  style={{marginTop:12,height:56,width:590}}
                  label="描述"
                />
                <Row style={{marginTop:78,marginBottom:6}}>
      					<Col md={12} align="center">
      						<ButtonGroup>
      							<div className='ui-btn-center'>
      								<Button
      										label="保存"
      										type="submit"
      										height={34}
      										width={90}
      								/>
      							</div>
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
        console.log(values,"PPPPPPPPPP");
		if (!values.name) {
			errors.name = '请输入流程名称';
		}else if (values.name.length>20) {
			errors.name = '流程名称最多20个字符！';
		}   

		if (!values.orderNum) {
			errors.orderNum = '请输入排序号';
		}

		if (!values.resourceId) {
			errors.resourceId = '请选择对接人';
		}
		if (!values.formId) {
			errors.formId = '请输入表单名称';
		}else if (values.formId.length>50) {
			errors.formId = '表单名称最多50个字符！';
		} 

	return errors
}
export default reduxForm({
	form: 'Basic',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Basic);
