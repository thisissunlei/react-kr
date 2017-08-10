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
class EditDialog extends Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            options:[],
            infoList:{},
        }
    }
    componentDidMount() {
        var _this = this;
        if(this.props.type=="all"){
            console.log(this.props.itemDetail);
            var typeId = this.props.itemDetail.id;
        }else{
            var typeId = this.props.detail.typeId;
        }  
        Http.request('process-type-detail', {
                typeId: typeId,
            },{}).then(function(response) {
                  response.enable = response.enable.toString();
                  console.log(typeof response.enable);
                _this.setState({infoList: response},function(){
                  Store.dispatch(initialize('EditDialog', _this.state.infoList));
                })
            }).catch(function(err) {});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        console.log(form);
        const {onSubmit,detail} = this.props;
        var params = Object.assign({},form);
        onSubmit && onSubmit(params);
    }

    render() {
        const {handleSubmit,detail} = this.props;
       // console.log(detail);
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:636,marginTop:20}}  >
                <KrField
                    style={{width:262,marginTop:6,marginRight:28,marginLeft:35}}
                    inline={false}
                    grid={1/2}
                    label="流程类型名称"
                    component="input"
                    name="name"
                    requireLabel={true}
                    placeholder="请输入流程类型名称"
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
                <KrField style={{width:262,marginTop:14,marginLeft:28}} name="enable" component="group" label="是否显示" grid={1} requireLabel={false}>
                    <KrField style={{marginTop:10,marginRight:24}} name="enable" label="显示" type="radio" value="1" />
                    <KrField style={{marginTop:10}} name="enable" label="不显示" type="radio" value="0" />
 				</KrField>
               <KrField
                  grid={1}
                  left={30}
                  name="descr"
                  component="textarea"
                  maxSize={50}
                  style={{marginTop:12,height:78,width:590}}
                  label="描述"
                />
                <Row style={{marginTop:78,marginBottom:6}}>
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
	if (!values.name) {
		errors.name = '请输入流程类型名称';
	}else if (values.name.length>10) {
		errors.name = '流程类型名称最多10个字符！';
	}
    
    if (!values.orderNum) {
		errors.orderNum = '请输入排序号';
	}
    // if (!values.chargeId) {
	// 	errors.chargeId = '请选择负责人';
	// }
    
	return errors
}
export default reduxForm({
	form: 'EditDialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(EditDialog);
