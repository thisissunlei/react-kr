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
                            <div><span className="new-icon"></span><label className="title-text">编辑个人信息</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="身份证号码"
                            requireLabel={true}
						/>

                          <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="date"
                            label="出生日期"
                            requireLabel={true}
						/>
                        
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="星座"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="血型"
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="民族"
                            requireLabel={true}
						/>
                        

                        <KrField grid={1/2}
								style={{width:262,marginLeft:28}}
								name="floor"
								component="input"
								label="籍贯"
                                requireLabel={true}
						 />

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="select"
                            label="户口"
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="select"
                            label="政治面貌"
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="date"
                            label="入团时间"
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="date"
                            label="入党时间"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="毕业院校"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="专业"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="学历"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="学位"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="date"
                            label="参加工作时间"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="现居住地"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="暂/居住证号码"
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="个人邮箱"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="微信号"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="联系电话"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="身高(cm)"
						/>
                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="体重(公斤)"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="健康状况"
						/>
 
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="select"
                            label="婚姻状况"
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="紧急联系人姓名"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="紧急联系人电话"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="紧急联系人关系"
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