import React from 'react';
import {
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button,
    KrField,
    Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm}  from 'redux-form';

 class Leave extends React.Component{

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

			<div style={{marginTop:'35px'}}>
             <form onSubmit={handleSubmit(this.onSubmit)}>

             <KrField grid={1/2}
                       style={{width:262,marginLeft:28}}
                       name="leaveType"
                       component="selecTemployees"
                       label="离职类型"
                       requireLabel={true}
                       otherType="leaveType"
       />

       <KrField grid={1/2}
                 style={{width:262,marginLeft:28}}
                 name="leaveDate"
                 component="date"
                 label="离职时间"
                 requireLabel={true}
        />


              <KrField
                  grid={1}
                  label="离职原因"
                  name="leaveReason"
                  heightStyle={{height:"78px",width:'543px'}}
                  component="textarea"
                  maxSize={30}
                  requireLabel={true}
                  placeholder="请输入描述"
                  style={{width:553,marginLeft:'28px'}}
                  lengthClass='leave-len-textarea'/>

			   <Grid style={{marginTop:-12,marginBottom:5}}>
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

    if(!values.leaveType){
       errors.leaveType='请选择离职类型'
    }

     if(!values.leaveReason){
       errors.leaveReason='请填写离职原因'
    }

	return errors
}

export default reduxForm({ form: 'Leave',validate})(Leave);
