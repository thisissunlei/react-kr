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



class EditAudit extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType :false,
            photoUrl:props.photoUrl || ''
        }
	}

    componentDidMount(){
        Store.dispatch(change('editAudit','enable','1'))
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
        let {handleSubmit} = this.props;
		return(

			<div className='edit-audit'>
				 <form  onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
                    <KrField grid={1/2}
                        label="是否通过"
                        name="enable"
                        style={{width:210,marginLeft:75,marginTop:25}}
                        component="group"
                        requireLabel={true}
                        inline = {true}
                    >
                        <KrField name="enable" label="是" type="radio" value="1" />
                        <KrField name="enable" label="否" type="radio" value="0" />
                    </KrField>
                    <Grid style={{marginTop:45,marginRight:40}}>
                        <Row>
                            <Col md={12} align="center">
                                <ButtonGroup>
                                    <div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit" /></div>
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

//     var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
//     var ord = /^[1-9]\d*$/;
//     if(!values.name){
//        errors.name='请填写职级名称';
//     }else if(values.name.length>20){
//        errors.name='名称不能超过20个字符';
//     }

//    if(!values.linkUrl){
//        errors.linkUrl='链接地址为必填字段';
//    }else if(!reg.test(values.linkUrl)){
//        errors.linkUrl='链接地址格式有误';
//    }
//    if(!ord.test(values.orderNum)){
//        errors.orderNum = "排序号只能为正整数"
//    }

//    if(!values.photoUrl){
//        errors.photoUrl='请上传图片';
//    }
   return errors
}

export default reduxForm({ form: 'editAudit',validate})(EditAudit);
