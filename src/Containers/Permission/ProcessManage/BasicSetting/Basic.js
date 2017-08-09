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
                    name="wfName"
                    requireLabel={true}
                    placeholder="请输入流程类型名称"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    label="流程编码"
                    grid={1/2}
                    component="input"
                    name="wfCode"
                    requireLabel={true}
                    placeholder="排序号"
                />
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    name="wfTypeId"
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
                    name="wfOrderNum"
                    requireLabel={true}
                    placeholder="排序号"
                />
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    inline={false}
                    grid={1/2}
                    label="慧正流程唯一标识"
                    component="input"
                    name="hzCode"
                    requireLabel={true}
                    placeholder="请输入流程类型名称"
                />
                <KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    grid={1/2}
                    name="hrmResourceId"
                    component="treePersonnel"
                    label="对接人"
                    requireLabel={true}
                    ajaxUrlName = "get-personnel-tree"
                    valueText={(infoList.hrmResourceId && infoList.hrmResourceId[0] && infoList.hrmResourceId[0].orgName)?infoList.hrmResourceId:[{orgName:''}]}
                />
                
                <KrField style={{width:262,marginTop:14,marginLeft:28}} name="allowRequest" component="group" label="发起流程请求" grid={1} requireLabel={true}>
                    <KrField style={{marginTop:10}} name="allowRequest" label="允许" type="radio" value="1" />
                    <KrField style={{marginTop:10}} name="allowRequest" label="不允许" type="radio" value="0" />
 				</KrField>
                 <KrField style={{width:262,marginTop:14,marginLeft:34}} name="newRequestShow" component="group" label="新办是否显示" grid={1} requireLabel={true}>
                    <KrField style={{marginTop:10}} name="newRequestShow" label="显示" type="radio" value="1" />
                    <KrField style={{marginTop:10}} name="newRequestShow" label="不显示" type="radio" value="0" />
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
	
		if (!values.wfName) {
			errors.wfName = '请输入流程名称';
		}else if (values.wfName.length>20) {
			errors.wfName = '流程名称最多20个字符！';
		}   
		if (!values.wfCode) {
			errors.wfCode = '请输入流程编码';
		}

		if (!values.wfOrderNum) {
			errors.wfOrderNum = '请输入排序号';
		}

		// if (!values.hrmResourceId) {
		// 	errors.hrmResourceId = '请选择对接人';
		// }
		if (!values.hzCode) {
			errors.hzCode = '请输入慧正流程唯一标识';
		}else if (values.hzCode.length>50) {
			errors.hzCode = '慧正流程唯一标识最多50个字符！';
		} 

	return errors
}
export default reduxForm({
	form: 'Basic',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Basic);
