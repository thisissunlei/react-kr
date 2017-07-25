import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm}  from 'redux-form';
import './index.less';

class EditPostType  extends React.Component{

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

        let {handleSubmit,subCompany}=this.props;

		return(

			<div className='m-type-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="name"
                            component="input"
                            label="职务类型名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:34}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="orderNum"
                            component="input"
                            label="排序号"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:34}}
                            name="subId"
                            component="select"
                            label="分部"
                            requireLabel={true}
                            options={subCompany}
						/>

                        <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'550px'}} style={{width:560}} component="textarea"  maxSize={30} placeholder='请输入描述' lengthClass='list-len-textarea'/>

                        
                       <Grid style={{marginBottom:5,marginLeft:-25}}>
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
    let stationN = /^([1-9][0-9]{0,2})$/;

     if(!values.name){
       errors.name='请填写职务类型名称';  
    }else if(values.name.length>20){
       errors.name='职务类型名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写职务类型编码'  
    }else if(values.code.length>10){
       errors.code='职务类型编码不能超过10个字符';   
    }

    if(!values.subId){
       errors.subId='请选择分部'   
    }

    if(!values.orderNum){
       errors.orderNum='请填写排序号'
    }else if(isNaN(values.orderNum)){
       errors.orderNum='排序号必须是数字'  
    }else if(values.orderNum<1){
       errors.orderNum='排序号必须大于等于1'   
    }


	return errors
}

export default reduxForm({ form: 'EditPostType',validate})(EditPostType);