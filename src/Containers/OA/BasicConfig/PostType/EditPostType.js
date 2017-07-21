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

class EditPostType  extends React.Component{

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

			<div className='m-add-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1}
                            style={{width:262,display:'block'}}
                            name="name"
                            component="input"
                            label="职务类型名称"
                            requireLabel={true}
						/>
                        <KrField grid={1}
                            style={{width:262,display:'block'}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                        <KrField grid={1}
                            style={{width:262,display:'block'}}
                            name="orderNum"
                            component="input"
                            label="排序号"
                            requireLabel={true}
						/>

                         <KrField grid={1}
                            style={{width:262,display:'block'}}
                            name="subId"
                            component="select"
                            label="分部"
                            requireLabel={true}
						/>

                        <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'532px'}}  component="textarea"  maxSize={30} placeholder='请输入描述' style={{width:517}} lengthClass='list-len-textarea'/>

                        
                       <Grid style={{marginBottom:5,marginLeft:-50}}>
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
    let stationN = /^([1-9][0-9]{0,2})$/;

     if(!values.name){
       errors.name='请填写职务类型名称';  
    }else if(values.name.length>20){
       errors.name='职务类型名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写职务类型编码'  
    }else if(values.code.length>10){
       errors.code='职务类型编码不能超过10个字符';   
    }

    if(!values.subId){
       errors.subId='请选择分部'   
    }

    if(!values.orderNum){
       errors.orderNum='请填写排序号'
    }else if(isNaN(orderNum)){
       errors.orderNum='排序号必须是数字'  
    }


	return errors
}

export default reduxForm({ form: 'EditPostType',validate})(EditPostType);