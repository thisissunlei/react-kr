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

class AddRole  extends React.Component{

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

			<div className='m-role-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="角色名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:27,marginBottom:5}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>


                         <KrField
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="allotUserId"
                            component="treePersonnel"
                            label="分配人员"
                            ajaxUrlName = "get-personnel-tree"
                            requireLabel={true}
                            checkable = {true}
                        />

                        <KrField grid={1} label="描述" name="desc" heightStyle={{height:"78px",width:'542px'}} style={{width:552}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='role-len-textarea'/>

                        
                       <Grid style={{marginBottom:5,marginLeft:-32,marginTop:-12}}>
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
       errors.name='请填写角色名称';  
    }else if(values.name.length>20){
       errors.name='角色名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写编码'  
    }else if(values.code.length>30){
       errors.code='编码不能超过30个字符';   
    }

    if(!values.allotUserId){
       errors.allotUserId='请选择分配人员'   
    }
    
	return errors
}

export default reduxForm({ form: 'AddRole',validate})(AddRole);