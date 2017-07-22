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

class EditPerson  extends React.Component{

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
                            <div><span className="new-icon"></span><label className="title-text">编辑个人资料</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="idCard"
                            component="input"
                            label="身份证号码"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="birthday"
                            component="date"
                            label="出生日期"
                            requireLabel={true}
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="constellation"
                            component="selecTemployees"
                            label="星座"
                            otherType="temployees"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="bloodType"
                            component="selecTemployees"
                            label="血型"
                            otherType="bloodType"
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="nation"
                            component="selecTemployees"
                            label="民族"
                            requireLabel={true}
                            otherType="nation"
						/>
                        

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="nativePlace"
								component="input"
								label="籍贯"
                                requireLabel={true}
						 />

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="household"
                            component="selecTemployees"
                            label="户口"
                            otherType="householdType"
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="politicsStatus"
                            component="selecTemployees"
                            label="政治面貌"
                            otherType="politicsStatus"
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="leagueDate"
                            component="date"
                            label="入团时间"
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="partyDate"
                            component="date"
                            label="入党时间"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="college"
                            component="input"
                            label="毕业院校"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="major"
                            component="input"
                            label="专业"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="education"
                            component="selecTemployees"
                            label="学历"
                            otherType="educationType"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="degree"
                            component="selecTemployees"
                            label="学位"
                            otherType="degree"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="workDate"
                            component="date"
                            label="参加工作时间"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="currentAddress"
                            component="input"
                            label="现居住地"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="temporaryPermit"
                            component="input"
                            label="暂/居住证号码"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="personEmail"
                            component="input"
                            label="个人邮箱"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="wechat"
                            component="input"
                            label="微信号"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="mobilePhone"
                            component="input"
                            label="联系电话"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="height"
                            component="input"
                            label="身高(cm)"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="weight"
                            component="input"
                            label="体重(公斤)"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="healthy"
                            component="selecTemployees"
                            label="健康状况"
                            otherType="healthyStatus"
						/>
 
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="maritalStatus"
                            component="selecTemployees"
                            label="婚姻状况"
                            otherType="maritalStatus"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="emergencyContact"
                            component="input"
                            label="紧急联系人姓名"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="emergencyPhone"
                            component="input"
                            label="紧急联系人电话"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="emergencyRelation"
                            component="selecTemployees"
                            label="紧急联系人关系"
                            otherType="resourceRelation"
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
    
	return errors
}

export default reduxForm({ form: 'EditPerson',validate})(EditPerson);