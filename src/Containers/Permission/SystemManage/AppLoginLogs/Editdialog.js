import React, {Component} from 'react';
import {Actions, Store} from 'kr/Redux';
import {
	Http
} from "kr/Utils";
import {
    KrField,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    Button,
    ButtonGroup,
    Section,
    Grid,
    Row,
    Col,
    Dialog,
    ListGroup,
    ListGroupItem
} from 'kr-ui';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class Editdialog extends Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);

    }
    componentDidMount() {

        var _this = this;
        var id = this.props.detail.id
        Http.request('get-version-detail', {
                id: id
            },{}).then(function(response) {
                _this.setState({infoList: response},function(){
                  Store.dispatch(initialize('Editdialog', _this.state.infoList));
                })
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

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:670,marginTop:30,paddingLeft:40,paddingRight:40}}  >
                <span className="u-audit-close" style={{marginRight:40}}  onTouchTap={this.onCancel}></span>
                <div className="u-operations-edit-title">
                  <span>编辑版本</span>
                </div>
                <KrField
    	 					 grid={1/2}
    						 left={42}
    						 right={18}
    	 					 name="version"
                 requireLabel={true}
    	 					 style={{marginTop:4}}
    	 					 label="系统版本"
    						 component="input"
    	 			 		/>
    					<KrField
    			    		grid={1/2}
    							right={69}
     						 left={4}
    			    		name="osType"
                  requireLabel={true}
    			    		type="select"
    			    		style={{marginTop:4}}
    			    		label="设备类型"
    							options={[
    					      {label:'android',value:'ANDROID'},
    					      {label:'ios',value:'IOS'}
    					    ]}
    					/>
    					<KrField
    							grid={1/2}
    							left={42}
    							right={18}
    							name="enable"
    							type="select"
                  requireLabel={true}
    							style={{marginTop:4}}
    							label="启用标识"
    							options={[
    								{label:'启用',value:'ENABLE'},
    								{label:'未启用',value:'DISABLE'}
    							]}
    					/>
    					<KrField
    							grid={1/2}
    							right={69}
     						 left={4}
    							name="forced"
    							type="select"
    							style={{marginTop:4}}
                  requireLabel={true}
    							label="是否强制更新"
    							options={[
    								{label:'强制',value:'FORCED'},
    								{label:'不强制',value:'UNFORCED'}
    							]}
    					/>
              <KrField
                  grid={1/2}
                  left={42}
                  right={18}
                  name="appType"
                  requireLabel={true}
                  type="select"
                  style={{marginTop:4}}
                  label="	app 类型"
                  options={[
                    {label:'m_app',value:'MAPP'},
                    {label:'tv_app',value:'TVAPP'}
                  ]}
              />
              <KrField
                  grid={1/2}
                  right={69}
                  requireLabel={true}
                 left={4}
                  name="downUrl"
                  type="input"
                  style={{marginTop:4}}
                  label="下载地址"
              />
            <KrField
              grid={1/2}
              style={{width:325,marginLeft:-10,marginTop:2,paddingLeft:53}}
              name="publishTime"
              label="发布时间"
              requireLabel={true}
              component="date"
              />
              <KrField
                  grid={1/2}
                  right={48}
                 left={25}
                  name="updateInfo"
                  type="input"
                  style={{marginTop:4}}
                  label="版本更新内容"
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
	form: 'editdialog',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Editdialog);
