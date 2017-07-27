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
import './index.less';

class AddOrganization  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    componentDidMount(){
         Store.dispatch(change('AddOrganization','enabled','true'));
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

        let {handleSubmit,latitude}=this.props;

		return(

			<div className='m-or-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="机构分权名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:27,marginBottom:5}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="subId"
                            component="select"
                            label="所属纬度"
                            requireLabel={true}
                            options={latitude}
						/>

                         <div className='m-or-enable'><KrField style={{width:262,marginLeft:27}} name="enabled" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enabled" label="启用" type="radio" value='true' />
 							 <KrField name="enabled" label="不启用" type="radio" value='false' />
 						</KrField></div>

                        <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'542px'}} style={{width:552}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='role-len-textarea'/>

                        
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
       errors.name='请填写职务类型名称';  
    }else if(values.name.length>20){
       errors.name='职务类型名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写职务类型编码'  
    }else if(values.code.length>20){
       errors.code='职务类型编码不能超过20个字符';   
    }

    if(!values.subId){
       errors.subId='请选择分部'   
    }
    
	return errors
}

export default reduxForm({ form: 'AddOrganization',validate})(AddOrganization);