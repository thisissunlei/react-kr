
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
class EditSecond extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            FirstSelect:[],
        }
    }
    componentDidMount() {
        this.getFirstData();
        var _this = this;
        var id = this.props.detail.id
        var infoList = {};
        Http.request('sub-leve-detail', {
                subLevelId: id
            },{}).then(function(response) {
                infoList.firstLevelId = response.firstLevelId;
                infoList.name = response.name;
                _this.setState({
                    infoList:infoList
                },function() {
                    Store.dispatch(initialize('EditSecond',infoList));
                })
                
            }).catch(function(err) {});

    }
    getFirstData=()=>{
          Http.request('first-leve-list', {},{}).then(function(response) {
                var FirstSelect = response.map((item, index) => {
                    item.label = item.name;
                    item.value = item.id;
                    return item;
			    });
                this.setState({
                    FirstSelect: FirstSelect
                })
            }).catch(function(err) {});

    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    onSubmit = (form) => {
            const {onSubmit,detail} = this.props;
			var params = {
				firstLevelId: form.firstLevelId,
				name: form.name,
				subLevelId: detail.id,
			}
			onSubmit && onSubmit(params);
    }
    
    render() {
        const {handleSubmit} = this.props;
        let {FirstSelect,SecondSelect} = this.state;
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <KrField
                        name="firstLevelId"
                        style={{width:310,marginLeft:14}}
                        component="select"
                        label="所属导航"
                        options={FirstSelect}
                        inline={true}
                        requireLabel={true}
				/>
                <KrField
                        name="name"
                        style={{width:310,marginLeft:14}}
                        component="input"
                        label="分类名称"
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
	form: 'EditSecond',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditSecond);
