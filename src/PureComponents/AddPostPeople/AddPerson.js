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

class AddPerson  extends React.Component{

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

			<div className='m-addPerson'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div><span className="new-icon"></span><label className="title-text">新增用户</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="姓名"
                            requireLabel={true}
						/>
                       
                         <KrField grid={1/2} style={{width:262,marginLeft:28}} name="enable" component="group" label="性别" requireLabel={true}>
 							 <KrField name="enable" label="男" type="radio" value='1' />
 							 <KrField name="enable" label="女" type="radio" value='0' />
 						</KrField>

                          <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="手机号"
                            requireLabel={true}
						/>


                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="人员编号"
                            requireLabel={true}
						/>
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="selectTree"
                            label="部门"
                            requireLabel={true}
                        />
                        
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="selectTree"
                            component="selectTree"
                            label="直接上级"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="input"
                            label="职务"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="input"
                            label="职级"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="date"
                            label="入职时间"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="area"
                            component="select"
                            label="员工属性"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="area"
                            component="select"
                            label="员工类别"
                            requireLabel={true}
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

export default reduxForm({ form: 'AddPerson',validate})(AddPerson);