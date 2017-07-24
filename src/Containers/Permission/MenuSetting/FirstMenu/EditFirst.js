
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
    Message
} from 'kr-ui';
import './index.less';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class EditFirst extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        
    }
    componentDidMount() {
        var id = this.props.detail.id
        var infoList = {};
        var _this = this;
        Http.request('first-level-detail', {
                firstLevelId: id
            },{}).then(function(response) {
                infoList.name = response.name;
                _this.setState({
                    infoList:infoList
                },function() {
                    Store.dispatch(initialize('EditFirst',infoList));
                })
                
        }).catch(function(err) {});
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    onSubmit = (form) => {
            if(form.name == undefined){
                Message.errortimeout("请输入导航名称");
                return ;
            }
            const {onSubmit,detail} = this.props;
			var params = {
				firstLevelId: detail.id,
				name: form.name,
			}
			onSubmit && onSubmit(params);
    }
    
    render() {
        const {handleSubmit,detail} = this.props;
        console.log(detail);
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:410,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <KrField
                        name="name"
                        style={{width:310,marginLeft:14}}
                        component="input"
                        label="导航名称"
                        inline={true}
                        requireLabel={true}
				/>
                <Row style={{marginTop:30,marginBottom:15}}>
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
export default reduxForm({
	form: 'EditFirst',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditFirst);
