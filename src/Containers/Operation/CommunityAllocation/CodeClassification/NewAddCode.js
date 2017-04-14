import React from 'react';
import { connect } from 'react-redux';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,Field}  from 'kr/Utils/ReduxForm';
import {
	KrField,
	Button,
	Grid,
	Row,
	Col,
  ButtonGroup
} from 'kr-ui';

class NewAddCode  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

  onSubmit=(values)=> {
	  const {
		   onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel=()=> {
	   const {
			onCancel
		} = this.props;
		onCancel && onCancel();
    Debug.log('[[----]]');
	}


	render(){

    const {handleSubmit}=this.props;

		return(

	  <div className='m-newMerchants'>
      <form onSubmit={handleSubmit(this.onSubmit)}>
           <div className="title" style={{marginBottom:"30px"}}>
              <div><span className="new-icon"></span><label className="title-text">新增代码分类</label></div>
              <div className="customer-close" onClick={this.onCancel}></div>
           </div>
            <KrField type='hidden' name="id" mobx={true}/>
            <KrField grid={1/2} style={{marginTop:1,width:262}} name="pid" component="labelText"  label="父分类"
            mobx={true} inline={false}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="codeNo" component="input" label="代码编码" mobx={true} requireLabel={true}/>
            <KrField grid={1/2} style={{width:262}}  name="codeName" component="input" label="代码名称" mobx={true} requireLabel={true}/>
            <KrField grid={1/2} style={{width:262,marginLeft:28}}  name="sort" component="input" label="排序号" mobx={true} requireLabel={true}/>
            <KrField grid={1/2} name="enable" component="group" label="状态" mobx={true}>
                <KrField name="enable" grid={1 / 2} label="启用" type="radio" value="ENABLE" mobx={true}/>
                <KrField name="enable" grid={1 / 2} label="未启用" type="radio" value="DISENABLE" mobx={true}/>
            </KrField>

            <Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
              <Row>
                <Col md={12} align="center">
                  <ButtonGroup>
                    <div  className='ui-btn-center'><Button  label="确定" type="submit"/></div>
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
    let numberNotZero=/^[0-9]*[1-9][0-9]*$/;


    if(!values.codeName){
      errors.codeName='请输入代码名称';
    }

    if(!values.codeNo){
      errors.codeNo='请输入代码编码';
    }

    if(!values.sort){
      errors.sort='请输入排序号';
    }
    //排序号
   if(values.sort&&!numberNotZero.test(values.sort)){
     errors.sort='请输入正整数';
   }

		return errors
}
export default reduxForm({ form: 'NewAddCode',validate})(NewAddCode);
