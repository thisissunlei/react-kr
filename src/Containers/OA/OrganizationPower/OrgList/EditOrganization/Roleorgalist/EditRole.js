import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm,change}  from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils'
import './index.less';

class EditRole  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
         
        }
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

			<div className='m-add-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                        <KrField
                            grid={1}
                            style={{width:262,marginBottom:5}}
                            name="code"
                            component="select"
                            label="角色"
                            requireLabel={true}
						/>


                        <KrField grid={1}
                            style={{width:262,marginBottom:5}}
                            name="subId"
                            component="select"
                            label="机构类型"
                            onChange = {this.onChange}
                            requireLabel={true}
						/>


                       <KrField
                            grid={1}
                            style={{width:262}}
                            name="typeId"
                            component="selectTree"
                            label="选择机构"
                            requireLabel={true}
						/>


                        <Grid style={{marginBottom:5,marginLeft:-28,marginTop:18}}>
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
       errors.name='请填写职务名称';  
    }else if(values.name.length>20){
       errors.name='职务名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写职务编码'  
    }else if(values.code.length>30){
       errors.code='职务编码不能超过30个字符';   
    }

    if(!values.typeId){
        errors.typeId='请选择职务类型名称';  
    }
    
    if(!values.subId){
        errors.subId='请选择分部';
    }
    
	return errors
}

export default reduxForm({ form: 'EditRole',validate})(EditRole);
