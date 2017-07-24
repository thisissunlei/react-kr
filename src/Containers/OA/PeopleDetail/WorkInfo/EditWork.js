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

class EditWork  extends React.Component{

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

			<div className='m-work'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon"></span><label className="title-text">编辑工作信息</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="wageCard"
                            component="input"
                            label="工资卡号"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="calculateCompany"
                            component="input"
                            label="核算单位"
                            requireLabel={true}
						/>
                       

                          <KrField grid={1/2}
                            style={{width:262}}
                            name="probationEndDate"
                            component="date"
                            label="试用期到期时间"
						/>


                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="contractEndDate"
                            component="date"
                            label="劳动合同终止时间"
                            requireLabel={true}
						/>

                        
                        <KrField grid={1/2}
								style={{width:262}}
								name="cardTitle"
								component="input"
								label="名片tilte"
						 />

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="entrySource"
                            component="selecTemployees"
                            label="入职来源"
                            otherType="entryResource"
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

     if(!values.wageCard){
       errors.wageCard='请填写工资卡号'
    }else if(isNaN(values.wageCard)){
       errors.wageCard='工资卡号必须是数字'  
    }else if(values.wageCard.length>12||values.wageCard.length<6){
       errors.wageCard='工资卡号在6-12位之间'   
    }

     if(!values.calculateCompany){
       errors.calculateCompany='请填写核算单位'
     }
     
    if(!values.contractEndDate){
       errors.contractEndDate='请填写劳动终止时间'
     }

    
	return errors
}

export default reduxForm({ form: 'EditWork',validate})(EditWork);