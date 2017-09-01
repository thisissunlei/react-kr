import React from 'react';
import {
	  KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    IconTip
} from 'kr-ui';
import {reduxForm}  from 'redux-form';
import './index.less';

class EditDetail  extends React.Component{

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

			<div className='pessi-type-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                       <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="表单名称 "
                            requireLabel={true}
						            />

                        <div className='form-mask'>
													<KrField
	                             grid={1/2}
	                             style={{width:262,marginBottom:5,marginLeft:36}}
	                             value='123'
	                             component="labelText"
	                             label="表单表明 "
															 inline={false}
	 						            />
													<div className='mask-icon'>
														<IconTip>
														  <div style={{textAlign:'left'}}>1、表单表名最长30个字，限定为字母、数字、下划线、必须以字母开头，不能以下划线结尾；</div>
															<div style={{textAlign:'left'}}>2、表单表名可以不填，不填的话保存时候自动生成表名，规则为：wf_ft_主键。</div>
														</IconTip>
													</div>
												</div>


												<KrField
                             grid={1/2}
                             style={{width:262,marginBottom:5}}
                             name="name"
                             component="input"
                             label="排序号"
                             requireLabel={true}
 						            />

                         <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'550px'}}  component="textarea"  maxSize={100} style={{width:560}} placeholder='请输入描述' lengthClass='type-list-textarea'/>

                        <Grid style={{marginBottom:5,marginLeft:-25,marginTop:-12}}>
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
       errors.name='请填写表单类型名称';
    }else if(values.name.length>10){
       errors.name='表单类型名称不能超过10个字符';
    }

	return errors
}

export default reduxForm({ form: 'EditDetail',validate})(EditDetail);
