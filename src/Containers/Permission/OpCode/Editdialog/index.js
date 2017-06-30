
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
import './index.less';
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
        var id = this.props.detail.id;
        Http.request('op-code-detail', {
                id: id
            },{}).then(function(response) {
				// if(response.enableFlag==1){
				// 	response.enableFlag="1";
				// }else{
				// 	response.enableFlag="0";
				// }
				Store.dispatch(initialize('editdialog', response));
				_this.setState({
					infoList:response,
				});
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

            <div className="g-opcode-create">
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
                <div className="u-operations-edit-title">
                  <span>编辑业务</span>
                </div>
				<KrField
    						 left={42}
    	 					 name="name"
                			 requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="名称"
    						 component="input"
							 inline={true}
    	 		/>
               <KrField
    						 left={42}
    	 					 style={{marginTop:4}}
    	 					 label="编码"
							 name="codeName"
							 component="labelText"
							 value={this.state.infoList.codeName}
							 inline={true}
							 requireLabel={true}
    	 		/>
				{/*<KrField
						style={{width:360,marginLeft:40,marginBottom:2,marginRight:200}}
						name="enableFlag"
						component="group"
						label="是否启用"
						inline={true}
						requireLabel={true}
				>
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
	form: 'editdialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(Editdialog);
