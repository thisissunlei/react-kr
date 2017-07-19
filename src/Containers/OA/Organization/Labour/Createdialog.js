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
        const {onSubmit} = this.props;
        onSubmit && onSubmit(form);
    }

    render() {
        const {handleSubmit} = this.props;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <KrField
                    style={{width:262}}
                    inline={false}
                    label="下级名称"
                    component="select"
                    name="orgName"
                    requireLabel={true}
                    placeholder="机构维度"
                />
                <KrField
                    name="orgType"
                    style={{width:262}}
                    component="select"
                    label="下级类型"
                    options={[
                        {label:'部门',value:'0'},
                        {label:'分部',value:'1'}
    				]}
                    inline={false}
                    requireLabel={true}
				/>
              </form>
            </div>
        );
    }

}
// const validate = values => {

// 	const errors = {}
// 	if (!values.version) {
// 		errors.version = '请输入版本';
// 	}
 
// 	return errors
// }
export default reduxForm({
	form: 'createdialog',
  enableReinitialize: true,
  //validate,
	keepDirtyOnReinitialize: true,
})(Createdialog);
