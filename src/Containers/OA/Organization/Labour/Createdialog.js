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
