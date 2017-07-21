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

class AddPerson  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    componentDidMount(){
        Store.dispatch(change('AddPerson','sex','MALE'))
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
                            name="name"
                            component="input"
                            label="姓名"
                            requireLabel={true}
						/>
                       
                         <KrField grid={1/2} style={{width:262,marginLeft:28}} name="sex" component="group" label="性别" requireLabel={true}>
 							 <KrField name="sex" label="男" type="radio" value='MALE' />
 							 <KrField name="sex" label="女" type="radio" value='FAMALE' />
 						</KrField>

                          <KrField grid={1/2}
                            style={{width:262}}
                            name="mobilePhone"
                            component="input"
                            label="手机号"
                            requireLabel={true}
						/>


                        
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="code"
                            component="input"
                            label="人员编号"
                            requireLabel={true}
						/>
                        <KrField
                            grid={1/2}
                            style={{width:262}}
                            name="depId"
                            component="selectTree"
                            label="部门"
                            requireLabel={true}
                        />
                        
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="leader"
                            component="selectTree"
                            label="直接上级"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="jobId"
                            component="input"
                            label="职务"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="levelId"
                            component="input"
                            label="职级"
                            requireLabel={true}
						/>

                         <KrField grid={1/2}
                            style={{width:262}}
                            name="entryDate"
                            component="date"
                            label="入职时间"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:28}}
                            name="status"
                            component="selecTemployees"
                            label="员工属性"
                            requireLabel={true}
                            otherType="resourceStatus"

						/>
                        <KrField grid={1/2}
                            style={{width:262}}
                            name="type"
                            component="selecTemployees"
                            label="员工类别"
                            requireLabel={true}
                            otherType="resourceType"
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