import React from 'react';
import {reduxForm,change}  from 'redux-form';
import {
	KrField,
	Grid,
	Col,
	Row,
	ButtonGroup,
	Button,
} from 'kr-ui';
import './index.less';

class AddCode  extends React.Component{

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

			<div style={{marginTop:20,marginLeft:25}} className='m-has-create'>
			  <form onSubmit={handleSubmit(this.onSubmit)}>

                <KrField grid={1} label="编号" name="code" heightStyle={{height:"130px",width:'500px'}} style={{width:510}} maxSize={1000} component="textarea"  placeholder='请输入编号'  lengthClass='reg-len-textarea'  requireLabel={true}/>

                <Grid style={{marginBottom:5,marginLeft:-20,marginTop:0}}>
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
	if(!values.code){
		errors.code='请填写编号';
	 }
	return errors
}

export default reduxForm({ form: 'AddCode',validate})(AddCode);
