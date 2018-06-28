
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
class EditThird extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            SecondSelect:[],
            FirstSelect:[],
            infoList:{},
        }
        this.getFirstData();
    }
    componentDidMount() {
        var _this = this;
        var id = this.props.detail.id
        var infoList = {};
        Http.request('three-level-detail', {
                threeLevelId: id
            },{}).then(function(response) {
                infoList.subLevelId = response.subLevelId;
                infoList.firstLevelId = response.firstLevelId;
                infoList.name = response.name;
                _this.setState({
                    infoList:infoList
                },function() {
                     _this.getSecondData();
                    Store.dispatch(initialize('EditThird',infoList));
                })
                
            }).catch(function(err) {});

    }
    getFirstData=()=>{
          var _this = this;
          Http.request('first-level-list', {},{}).then(function(response) {
                var FirstSelect = response.items.map((item, index) => {
                    item.label = item.name;
                    item.value = item.id;
                    return item;
			    });
                _this.setState({
                    FirstSelect: FirstSelect
                },function(){
                   
                })
            }).catch(function(err) {});

    }
    getSecondData=()=>{
        let infoList = this.state.infoList;
        var _this = this;
        Http.request('sub-level-info', {
            firstLevelId:infoList.firstLevelId
        },{}).then(function(response) {
                var SecondSelect = response.items.map((item, index) => {
                    item.label = item.name;
                    item.value = item.id;
                    return item;
			    });
                _this.setState({
                    SecondSelect: SecondSelect
                })
         }).catch(function(err) {});
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
            const {onSubmit,detail} = this.props;
            if(form.name == undefined){
                Message.errortimeout("请输入子模块名称");
                return ;
            }
            //提交
			var params = {
          firstLevelId: form.firstLevelId,
          name: form.name,
          subLevelId: form.subLevelId,
          threeLevelId: detail.id,
			}
			onSubmit && onSubmit(params);
    }
    onSelect = (item) => {
		var _this = this;
        Http.request('sub-level-info', {
            firstLevelId:item.id
        }, {}).then(function(response) {
                var SecondSelect = response.items.map((item, index) => {
                    item.value = item.id;
                    item.label = item.name;
                    return item;
                })
                _this.setState({
                    SecondSelect: SecondSelect,
                })
        }).catch(function(err) {

        });
	}
    render() {
        const {handleSubmit,detail,error} = this.props;
        let {FirstSelect,SecondSelect} = this.state;
        //console.log(detail);
        return (

            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:'100%',marginTop:30,paddingBottom:30}}  >
                <div className="level-group">
                    <KrField
                        name="firstLevelId"
                        style={{width:180,marginLeft:14}}
                        component="select"
                        label="所属菜单"
                        options={FirstSelect}
                        inline={true}
                        requireLabel={true}
                        onChange={this.onSelect}
                    />
                    <KrField
                            name="subLevelId"
                            style={{width:200,marginLeft:13}}
                            component="select"
                            label=""
                            options={this.state.SecondSelect}
                            inline={true}
                    />
                </div>
                
                <KrField
                        name="name"
                        style={{width:300,marginLeft:14}}
                        component="input"
                        label="子模块名称"
                        inline={true}
                        requireLabel={true}
                        value={detail.name}
				/>

                 <KrField
                    name="url"
                    style={{width:300,marginLeft:14,marginTop:10}}
                    component="input"
                    label="路径"
                    inline={true}
                    requireLabel={true}
                   
				/>
                <div>
                    <KrField 
                        inline={true} 
                        name="sideFoldFlag" 
                        requireLabel={true} 
                        component="group" 
                        label="是否侧栏折叠"
                        style={{marginTop:10,marginLeft:14}}
                    >
                        <KrField name="sideFoldFlag" label="是" type="radio" value="1" />
                        <KrField name="sideFoldFlag" label="否" type="radio" value='0' />
                    </KrField>
                </div>

                <div>
                    <KrField 
                        inline={true} 
                        name="topFoldFlag" 
                        requireLabel={true} 
                        component="group" 
                        label="是否上栏折叠" 
                        style={{marginTop:10,marginLeft:14}}
                    >
                        <KrField name="topFoldFlag" label="是" type="radio" value="1" />
                        <KrField name="topFoldFlag" label="否" type="radio" value='0' />
                    </KrField>
                </div>
                
                <div>
                    <KrField 
                        inline={true} 
                        name="leader" 
                        requireLabel={true} 
                        component="group" 
                        label="是否展示" 
                        style={{marginTop:10,marginLeft:14}}
                    >
                        <KrField name="leader" label="是" type="radio" value="1" />
                        <KrField name="leader" label="否" type="radio" value='0' />
                    </KrField>
                </div>
                <div>
                    <KrField
                        name="remark"
                        style={{width:300,marginLeft:14}}
                        component="input"
                        label="备注"
                        inline={true}
                        requireLabel={true}
                      
                    />
                </div>
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
	form: 'EditThird',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditThird);
