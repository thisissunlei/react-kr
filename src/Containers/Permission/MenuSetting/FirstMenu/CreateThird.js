
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
    Message,
} from 'kr-ui';
import './index.less';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
class CreateThird extends React.Component {
    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);
        this.state={
            infoList:{},
            projectTypeList: [
              {
                name: 'admin',
                value: 'admin'
              },
              {
                name: 'vue',
                value: 'vue'
              },
              {
                name: 'member',
                value: 'member'
              },
              {
                name: 'project',
                value: 'project'
              },
              {
                name: 'product',
                value: 'product'
              }
            ]
        }
    }
    componentDidMount() {
        var _this = this;
        var id = this.props.detail.id
        var infoList = {};
        const base = {
          projectType: 'admin',
          showFlag: 'YES',
          sideFoldFlag: 'YES',
          topFoldFlag: 'YES'
        };

      Http.request('sub-level-detail', {
            subLevelId: id
        },{}).then(function(response) {
            infoList.subLevelName = response.name;
            _this.setState({
                infoList:infoList
            },function() {
                Store.dispatch(initialize('CreateThird',Object.assign(base, infoList)));
            })
            
        }).catch(function(err) {});
    }

    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }
    onSubmit = (form) => {
		const {onSubmit,detail} = this.props;
        if(form.name == undefined){
            Message.errortimeout("请输入子模块名称");
            return ;
        }
        //todo: 待优化，策略模式
        if (form.url === undefined || form.projectType === undefined || form.sideFoldFlag === undefined || form.topFoldFlag === undefined || form.showFlag === undefined) {
          Message.errortimeout("请补充完必填信息");
          return ;
        }
        const {name, url, projectType, sideFoldFlag, topFoldFlag, descr, showFlag} = form;
        var params = {
            subLevelId: detail.id,
            name,
            url,
            projectType,
            sideFoldFlag,
            topFoldFlag,
            descr: descr || '',
            showFlag,
            sort:form.sort
        }
		onSubmit && onSubmit(params);
    }
    render() {
        const {handleSubmit,error} = this.props;
        const {projectTypeList} = this.state;
        let infoList = this.state.infoList;
        return (
            <div>
              <form onSubmit={handleSubmit(this.onSubmit)} style={{width:330,marginTop:30,paddingLeft:40,paddingRight:40}}>
                <KrField
                    style={{width:310,paddingLeft:20}}
                    inline={true}
                    label="所属分类"
                    component="labelText"
                    requireLabel={true}
                    name="subLevelName"
                    value={infoList.subLevelName}
                />
                <KrField
                    style={{width:310,paddingLeft:10}}
                    inline={true}
                    label="子模块名称"
                    component="input"
                    name="name"
                    requireLabel={true}
                    placeholder="比如：运营平台"
                />
                 <KrField
                    name="url"
                    style={{width:300,marginLeft:14,marginTop:10}}
                    component="input"
                    label="路径"
                    inline={true}
                    requireLabel={true}
                   
				/>
                <KrField
                    style={{width:314,marginTop:20}}
                    inline={true}
                    label="排序"
                    component="input"
                    name="sort"
                    placeholder="输入排序"
                    requireLabel={true}
                />
                <div>
                    <KrField
                        inline={true}
                        name="projectType"
                        requireLabel={true}
                        component="group"
                        label="项目类型"
                        style={{marginTop:10,marginLeft:14}}
                    >
                    {
                        projectTypeList.map((i,key) => (
                            <KrField name="projectType" label={i.name} type="radio" value={i.value} key={i.value}/>
                        ))
                    }
                    </KrField>
                </div>
                <div>
                    <KrField
                        inline={true} 
                        name="sideFoldFlag" 
                        requireLabel={true} 
                        component="group" 
                        label="是否侧栏折叠"
                        style={{marginTop:10,marginLeft:14}}
                    >
                        <KrField name="sideFoldFlag" label="是" type="radio" value="YES" />
                        <KrField name="sideFoldFlag" label="否" type="radio" value='NO' />
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
                        <KrField name="topFoldFlag" label="是" type="radio" value="YES" />
                        <KrField name="topFoldFlag" label="否" type="radio" value='NO' />
                    </KrField>
                </div>
                
                <div>
                    <KrField 
                        inline={true} 
                        name="showFlag"
                        requireLabel={true} 
                        component="group" 
                        label="是否展示" 
                        style={{marginTop:10,marginLeft:14}}
                    >
                        <KrField name="showFlag" label="是" type="radio" value="YES" />
                        <KrField name="showFlag" label="否" type="radio" value='NO' />
                    </KrField>
                </div>
                <div>
                    <KrField
                        name="descr"
                        style={{width:300,marginLeft:14}}
                        component="input"
                        label="备注"
                        inline={true}
                        requireLabel={false}
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
// const validate = values => {

// 	const errors = {};
// 	if (!values.name) {
// 		errors.name = '请输入子模块名称';
// 	}
	
// 	return errors;
// }
export default reduxForm({
	form: 'CreateThird',
  enableReinitialize: true,
	keepDirtyOnReinitialize: true,
   // validate,
})(CreateThird);
