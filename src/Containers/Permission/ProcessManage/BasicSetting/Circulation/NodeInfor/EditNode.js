import React from 'react';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    Tooltip,
    IconTip,
    DrawerTitle
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {
	Store
} from 'kr/Redux';
import './index.less';

class EditNode  extends React.Component{

	constructor(props,context){
		super(props, context);
    }
    
    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
    
	render(){

    let {handleSubmit}=this.props;
    

		return(

			<div className='m-add-node'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					   <DrawerTitle title='编辑节点信息' onCancel={this.onCancel}/>
                       <div style={{marginTop:'30px'}}><KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="节点名称"
                            requireLabel={true}
						/>

                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="type"
                            component="select"
                            label="节点类型"
                            requireLabel={true}
                            options={[{label:'创建节点',value:'CREATE'},
                            {label:'审批节点',value:'APPROVAL'},
                            {label:'归档节点',value:'ARCHIVE'}]}
						/>


                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="property"
                            component="select"
                            label="节点属性"
                            requireLabel={true}
                            options={[{label:'一般',value:'GENERAL'},
                            {label:'分叉起始点',value:'FORK_BEGIN'},
                            {label:'分叉中间点',value:'FORK_MIDDLE'},
                            {label:'通过分支数合并',value:'BRANCH_NUMBER'},
                            {label:'指定通过分支合并',value:'ASSIGN_FORK'},
                            {label:'比例合并',value:'SCALE_MERGER'},
                            ]}
                        />

                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5,marginLeft:30}}
                            name="orderNum"
                            component="input"
                            label="显示顺序"
                            requireLabel={true}
						/>

                        <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="forceBack"
                            component="select"
                            label="强制收回"
                            requireLabel={true}
                            options={[{label:'不可回收',value:'UNRECYCLE'},
                            {label:'查看前收回',value:'BEFORE_CHECK'},
                            {label:'查看后收回',value:'AFTER_CHECK'}]}
                        />


                        <KrField grid={1/2} style={{width:262,marginLeft:30}} name="forceFinish" component="group" label="强制归档" requireLabel={true}>
                                <KrField name="forceFinish" label="禁止" type="radio" value='true' />
                                <KrField name="forceFinish" label="允许" type="radio" value='false' />
                        </KrField>

                       <KrField grid={1/2} style={{width:262}} name="batchCommit" component="group" label="批量提交" requireLabel={true}>
                                <KrField name="batchCommit" label="禁止" type="radio" value='true' />
                                <KrField name="batchCommit" label="允许" type="radio" value='false' />
                        </KrField>


                         <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'544px'}}  component="textarea"  maxSize={100} style={{width:554}} placeholder='请输入描述' lengthClass='type-list-textarea'/></div>

                        <Grid style={{marginBottom:5,marginLeft:-30,marginTop:0}}>
                            <Row>
                                <Col md={12} align="center">
                                <ButtonGroup>
                                    <div  style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
                                    <Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
                                </ButtonGroup>
                                </Col>
                            </Row>
                        </Grid>
                 </form>
			</div>
		);
	}
}

const validate = values =>{
    const errors = {};
    
    if(!values.name){
       errors.name='请填写节点名称';
    }else if(values.name.length>20){
       errors.name='节点名称不能超过20个字符';
    }
    
    if(!values.type){
        errors.type='请填写节点类型';
    }

    if(!values.property){
        errors.property='请填写节点属性';
    }

    if(!values.orderNum){
        errors.orderNum='请填写显示顺序';
    }else if(isNaN(values.orderNum)){
        errors.orderNum='显示顺序必须是数字';
    }else if(values.orderNum.length>2){
        errors.orderNum='显示顺序最长2位数';
    }
    
    if(!values.forceBack){
        errors.forceBack='请填写强制收回';
    }

	return errors
}

export default reduxForm({ form: 'EditNode',validate})(EditNode);
