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
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            range:'',
            limit:'',
            rangeType:0,       
            infoList:{},
            allRole:[],
        }
    }
    componentDidMount() {
        var _this = this;
        var id = this.props.detail.limitId;
        var rangeType;
        Http.request('process-authority-detail', {
                limitId: id,
            },{}).then(function(response) {
                response.enable = response.enable.toString();
                if(response.limitType=='SUBCOMPANY'){
                    rangeType=1;
                }else if(response.limitType=='DEPARTMENT'){
                    rangeType=2;
                }else if(response.limitType=='ROLE'){
                    rangeType=3;
                }else if(response.limitType=='HRMRESOURCE'){
                    rangeType=4;
                }else{
                    rangeType=0;
                }
                _this.setState({
                    range:response.limitType=='ALL'?false:true,
                    limit:response.limitType=='SUBCOMPANY'||'DEPARTMENT'?true:false,
                    rangeType:rangeType,
                    infoList:response,
                },function(){
                  Store.dispatch(initialize('EditDialog', _this.state.infoList));
                })
        }).catch(function(err) {});
        Http.request('role-power-all', {}).then(function (response) {
            _this.setState({
                allRole:response.items
            })
		}).catch(function (err) {
			Message.error(err.message)
		});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        
        const {onSubmit,detail} = this.props;
        var params = Object.assign({},form);
        onSubmit && onSubmit(params);
    }
    changeType=(item)=>{
        switch(item.value)
            {
            case 'SUBCOMPANY':
                this.setState({
                    limit:true,
                    rangeType:1,
                })
                break;
            case 'ROLE':
                this.setState({
                    limit:false,
                    rangeType:3,
                })
                break;
            case 'DEPARTMENT':
                this.setState({
                    limit:true,
                    rangeType:2,
                })
                break;
            case 'ALL':
                this.setState({
                    limit:false,
                    rangeType:0,
                })
                break;
            case 'HRMRESOURCE':
                this.setState({
                    limit:false,
                    rangeType:4,
                })
                break;        
            }
    }
    render() {
        const {handleSubmit,detail} = this.props;
        console.log(this.state.infoList);
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:262,marginTop:30,paddingLeft:32}}  >
                <KrField
                    style={{width:262}}
                    inline={false}
                    label="权限类型"
                    component="select"
                    name="limitType"
                    requireLabel={true}
                    placeholder="权限类型"
                    options={
                        [
                            {label:'分部',value:'SUBCOMPANY'},
                            {label:'部门',value:'DEPARTMENT'},
                            {label:'角色',value:'ROLE'},
                            {label:'人员',value:'HRMRESOURCE'},
                            {label:'所有人',value:'ALL'},
    				    ]
                    }
                    onChange={this.changeType}
                />
                     {this.state.rangeType == '1'
                        &&
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="rangeId"
                            component="treeDivision"
                            label="选择机构"
                            ajaxUrlName = "role-sub-tree"
                            requireLabel={true}
                            checkable = {true}
                            valueText={(this.state.infoList.range && this.state.infoList.range[0] && this.state.infoList.range[0].orgName)?this.state.infoList.range:[{orgName:''}]}
                        />
                    }
                    {this.state.rangeType == '2'
                        &&
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="rangeId"
                            component="treeDepartment"
                            label="选择机构"
                            ajaxUrlName = "role-dep-tree"
                            requireLabel={true}
                            checkable = {true}
                            valueText={(this.state.infoList.range && this.state.infoList.range[0] && this.state.infoList.range[0].orgName)?this.state.infoList.range:[{orgName:''}]}
                        />
                    }
                    {this.state.rangeType == '3'
                        &&
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="rangeId"
                            leftData={this.state.allRole}
                            component="switchSlide"
                            label="选择角色"
                            checkable = {true}
                            control='double'
                            requireLabel={true}
                            multiSwitch={true}
                            rightData={this.state.infoList.roleRange}
                        />
                    }
                    {this.state.rangeType == '4'
                        &&
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="rangeId"
                            component="treePersonnel"
                            label="选择范围"
                            ajaxUrlName = "role-new-tree"
                            requireLabel={true}
                            checkable = {true}
                            valueText={(this.state.infoList.range && this.state.infoList.range[0] && this.state.infoList.range[0].orgName)?this.state.infoList.range:[{orgName:''}]}
                        />
                }
                {this.state.rangeType == '0'
                        &&
                        ''
                }

                {
                    this.state.limit &&
                    <KrField
                        style={{width:262,marginTop:6}}
                        inline={false}
                        label="限定条件"
                        component="select"
                        name="limitAuth"
                        options={
                            [
                                {label:'所有人',value:'ALL'},
                                {label:'负责人',value:'MANAGER'},
                                {label:'管理员',value:'ADMIN'},
                            ]
                        }
                        requireLabel={true}
                        placeholder="限定条件"
                    />
                }
                
                <KrField style={{width:262,marginTop:8}} name="enable" component="group" label="是否启用" grid={1} requireLabel={false}>
                    <KrField style={{marginTop:10,marginRight:24,marginLeft:4}} name="enable" label="启用" type="radio" value='1' />
                    <KrField style={{marginTop:10}} name="enable" label="不启用" type="radio" value='0' />
 				</KrField>
               
                <Row style={{marginTop:15,marginBottom:6}}>
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
	   if (!values.rangeId) {
		errors.rangeId = '请选择范围';
	}
	return errors
}
export default reduxForm({
	form: 'EditDialog',
  enableReinitialize: true,
  validate,
	keepDirtyOnReinitialize: true,
})(EditDialog);
