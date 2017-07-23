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

class AddFamily  extends React.Component{

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

			<div className='m-person'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon"></span><label className="title-text">新增家庭成员</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="name"
                            component="input"
                            label="成员"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="called"
                            component="selecTemployees"
                            label="称谓"
                             requireLabel={true}
                             otherType="resourceRelation"
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="idCard"
                            component="input"
                            label="身份证"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="company"
                            component="input"
                            label="工作单位"
                             requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="position"
                            component="input"
                            label="职务"
                            requireLabel={true}
						/>
                        

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="address"
								component="input"
								label="地址"
                                requireLabel={true}
						 />

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="contractPhone"
                            component="input"
                            label="联系电话"
						/>

                       
                        <Grid style={{marginTop:17,marginBottom:5,marginLeft:-50}}>
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

    let phone=/^1[34578]\d{9}$/;
    let ph=/^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/;

    if(!values.name){
        errors.name='请填写姓名';  
    }else if(values.name.length>10){
        errors.name='姓名最多十个字符';  
    }

    if(!values.called){
        errors.called='请选择称谓';
    }

    if(!values.company){
        errors.company='请填写工作单位';  
    }else if(values.company.length>10){
        errors.company='工作单位最多二十个字符';  
    }

    if(!values.position){
        errors.position='请填写职务';  
    }else if(values.position.length>10){
        errors.position='职务最多十个字符';  
    }

     if(!values.address){
        errors.address='请填写工作地址';  
    }else if(values.address.length>30){
        errors.address='工作地址最多三十个字符';  
    }

    if(values.contractPhone&&!phone.test(values.contractPhone.toString().trim())&&!ph.test(values.contractPhone.toString().trim())){
       errors.contractPhone='请填写正确联系电话';   
    }
    
	return errors
}

export default reduxForm({ form: 'AddFamily',validate})(AddFamily);