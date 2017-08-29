import React from 'react';
import {
	  KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
		Tooltip
} from 'kr-ui';
import {reduxForm}  from 'redux-form';
import './index.less';

class AddForm  extends React.Component{

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

			<div className='pessi-form-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
					 <div className="title" style={{marginBottom:"30px"}}>
							<div><span className="new-icon"></span><label className="title-text">新建表单</label></div>
							<div className="customer-close" onClick={this.onCancel}></div>
					 </div>
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
	                             style={{width:262,marginBottom:5,marginLeft:30}}
	                             name="name"
	                             component="input"
	                             label="表单表明 "
	 						            />
												</div>

												<KrField
                             grid={1/2}
                             style={{width:262,marginBottom:5}}
                             name="name"
                             component="select"
                             label="表单类型"
                             requireLabel={true}
 						            />

 												<KrField
                              grid={1/2}
                              style={{width:262,marginBottom:5,marginLeft:30}}
                              name="name"
                              component="select"
                              label="表单分类"
															requireLabel={true}
  						            />

													<div className='m-form-radio'><KrField grid={1/2} style={{width:262}} name="enable" component="group" label="是否启用" requireLabel={true}>
							  							 <KrField name="enable" label="启用" type="radio" value='1' />
							  							 <KrField name="enable" label="停用" type="radio" value='0' />
							  						</KrField></div>

                         <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'544px'}}  component="textarea"  maxSize={100} style={{width:554}} placeholder='请输入描述' lengthClass='type-list-textarea'/>

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

export default reduxForm({ form: 'AddForm',validate})(AddForm);
