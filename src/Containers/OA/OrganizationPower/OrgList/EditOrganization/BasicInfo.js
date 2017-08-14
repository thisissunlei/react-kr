import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm,initialize}  from 'redux-form';
import {Store} from 'kr/Redux';
import './index.less';

class  BasicInfo extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
            code:'',
            dimName:''
        }
	}

    componentDidMount(){
        let {id}=this.props;
        this.getEditData(id);
    }
   
   //获取编辑信息
	getEditData=(id)=>{
		var _this=this;
       Http.request('org-power-watch',{id:id}).then(function(response) {
		   if(response.enable==1){
			  response.enable='1'; 
		   }else{
			  response.enable='0';  
		   }
           Store.dispatch(initialize('BasicInfo',response));
		   _this.setState({
			   code:response.code,
			   dimName:response.dimName
		   })
        }).catch(function(err) {
          Message.error(err.message);
        });
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
        let {dimName,code}=this.state;

		return(

			<div className='m-edit-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="机构分权名称"
                            requireLabel={true}
						/>
                        <div className='add-code'><KrField grid={1/2}
                            style={{width:262,marginLeft:32,marginBottom:5}}
                            name="code"
                            component="labelText"
                            label="编码"
                            value={code}
                            requireLabel={true}
                            inline={false}
						/></div>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="dimId"
                            component="labelText"
                            label="所属纬度"
                            value={dimName}
                            requireLabel={true}
                            inline={false}
						/>

                         <div className='m-edit-enable'><KrField style={{width:262,marginLeft:32}} name="enable" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="不启用" type="radio" value='0' />
 						</KrField></div>

                        <KrField grid={1} label="描述" name="desc" heightStyle={{height:"78px",width:'542px'}} style={{width:552}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='role-len-textarea'/>

                        
                       <Grid style={{marginBottom:5,marginLeft:-45,marginTop:-12}}>
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

     if(!values.name){
       errors.name='请填写机构分权名称'; 
    }else if(values.name.length>30){
       errors.name='机构分权名称不能超过30个字符';   
    }

    if(!values.code){
      errors.code='请填写编码'  
    }else if(values.code.length>30){
       errors.code='编码不能超过30个字符';   
    }

    if(!values.dimId){
       errors.dimId='请选择纬度'   
    }
    
	return errors
}

export default reduxForm({ form: 'BasicInfo',validate})(BasicInfo);