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

class AddWork  extends React.Component{

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
                            <div><span className="new-icon"></span><label className="title-text">新增工作经历</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="company"
                            component="input"
                            label="公司名称"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="job"
                            component="input"
                            label="职务"
                             requireLabel={true}
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="startDate"
                            component="date"
                            label="开始时间"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="endDate"
                            component="date"
                            label="终止时间"
                             requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="contactName"
                            component="input"
                            label="联系人姓名"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="contactPhone"
								component="input"
								label="联系人电话"
                                requireLabel={true}
						 />
                        

                        <KrField grid={1/2}
								style={{width:262}}
								name="contactEmail"
								component="input"
								label="联系人邮箱"
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
    let email=/^[\w_\-\.]+@[\w\-]+(?:\.[\w\-]+)+$/;

    if(!values.company){
        errors.company='请填写公司名称';
    }
    if(!values.job){
        errors.job='请填写职务';
    }
    if(!values.startDate){
        errors.startDate='请填写开始时间';
    }
    if(!values.endDate){
        errors.endDate='请填写结束时间';
    }
    if(!values.contactName){
        errors.contactName='请填写联系人姓名';
    }
    if(!values.contactPhone){
        errors.contactPhone='请填写联系电话';
    }else if(!phone.test(values.contactPhone.toString().trim())){
        errors.contactPhone='请填写正确联系电话'; 
    }
 
    if(values.contactEmail&&!email.test(values.contactEmail)){
        errors.contactEmail='请填写正确联系人邮箱'; 
    }
    
	return errors
}

export default reduxForm({ form: 'AddWork',validate})(AddWork);