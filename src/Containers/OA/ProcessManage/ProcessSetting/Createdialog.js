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
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            options:[],
        }
    }
    componentDidMount() {
        // var opt=[];
        // if (this.props.detail.orgType=='DEPARTMENT') {
        //    opt = [
        //                 {label:'部门',value:'DEPARTMENT'},
    	// 			];
            
        // }else if(this.props.detail.orgType=='ROOT'){
        //     opt = [
        //                 {label:'分部',value:'SUBCOMPANY'}
    	// 			];
        // }else{
        //   opt = [
        //                 {label:'部门',value:'DEPARTMENT'},
        //                 {label:'分部',value:'SUBCOMPANY'}
    	// 			];
        // }
        // this.setState({
        //     options:opt
        // },function(){
        //     Store.dispatch(change('Createdialog','orgType','DEPARTMENT'));
        // })
        Store.dispatch(change('Createdialog','sex','MALE'))
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        
        const {onSubmit,detail} = this.props;
        var params = Object.assign({},form);
        params.dimId = this.props.detail.dimId;
        params.orgId = this.props.detail.orgId;
        params.superOrgType = this.props.detail.orgType;
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
                {/*<KrField
                    style={{width:262,marginTop:6}}
                    inline={false}
                    label="排序号"
                    grid={1/2}
                    component="input"
                    name="code"
                    requireLabel={true}
                    placeholder="排序号"
                />*/}
                <KrField style={{width:262,marginTop:14,marginLeft:28}} name="enable" component="group" label="是否显示" grid={1} requireLabel={false}>
                    <KrField style={{marginTop:10}} name="enable" label="显示" type="radio" value={true} />
                    <KrField style={{marginTop:10}} name="enable" label="不显示" type="radio" value={false} />
 				</KrField>
               <KrField
                  grid={1}
                  left={30}
                  name="desc"
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
	if (!values.orgName) {
		errors.orgName = '请输入下级名称';
	}else if (values.orgName.length>20) {
		errors.orgName = '下级名称最多20个字符！';
	}
    
    // if (!values.adminId) {
	// 	errors.adminId = '请选择管理员';
	// }
    // if (!values.chargeId) {
	// 	errors.chargeId = '请选择负责人';
	// }
    if (!values.code) {
		errors.code = '请输入编码';
	}else if (values.code.length>30) {
		errors.code = '下级名称最多30个字符！';
	}
    if (!values.orgType) {
		errors.orgType = '请选择下级类型';
	}
	return errors
}
export default reduxForm({
	form: 'Createdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Createdialog);
