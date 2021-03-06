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
    DrawerTitle
} from 'kr-ui';
import './index.less';
import {reduxForm, formValueSelector, change} from 'redux-form';
class Createdialog extends Component {

    constructor(props, context) {
        super(props, context);
    }

	// componentDidMount() {
	// 	Store.dispatch(change('createdialog', 'enableFlag', '1'));
	// }
	
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

            <div className="g-opcode-create">
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
            
                  <DrawerTitle title ="新建业务" onCancel = {this.onCancel}/>
				<KrField
    						 left={42}
    	 					 name="name"
                			 requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="名称"
    						 component="input"
							 inline={true}
							 maxLength={15}
    	 		/>
                <KrField
    						 left={42}
    	 					 name="codeName"
                			 requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="编码"
    						 component="input"
							 inline={true}
							 maxLength={50}
    	 		/>
				{/*<KrField style={{width:360,marginLeft:40,marginRight:40,marginBottom:2}}  name="enableFlag" component="group" label="是否启用" inline={true} requireLabel={true}>
	                	<KrField
	                			name="enableFlag"
	                			label="是"
	                			type="radio"
	                			value="1"
	                	/>
	               		 <KrField
	               		 		name="enableFlag"
	               		 		label="否"
	               		 		type="radio"
	               		 		value="0"
	               		 />
				</KrField>*/}
				<KrField
                  grid={1}
                  left={42}
                  name="desc"
                  component="textarea"
                  maxSize={300}
                  style={{marginTop:4,height:130}}
                  label="备注"
                />
                <Row style={{marginTop:80,marginBottom:15}}>
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
		errors.name = '请输入名称';
	}
	
    if (!values.codeName) {
		errors.codeName = '请选择编码';
	}
 
    if (!values.enableFlag) {
		errors.enableFlag = '请选择是否启用';
	}
	return errors;
}
export default reduxForm({
	form: 'createdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Createdialog);
