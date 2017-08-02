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
import {Http} from 'kr/Utils'
import './index.less';

class AddPostList  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType : false,
        }
	}

    componentDidMount(){
        Store.dispatch(change('AddPostList','enabled','true'))
    }
    //
    onChange = (data) =>{
        this.dataReady(data);
    }
    //数据准备
	dataReady=(data)=>{
	   var _this=this;
	   Http.request('rank-type-info',{
		   orgType:'SUBCOMPANY',
		   orgId:data.value
	   }).then(function(response) {
		   _this.setState({
			   jobTypes:response.jobTypes,
               isType:true
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

        let {handleSubmit,subCompany}=this.props;
        let {jobTypes,isType} = this.state;

		return(

			<div className='oa-post-list'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                       <KrField 
                            grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="职务名称"
                            requireLabel={true}
						/>
                        <KrField
                            grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                         <div className='m-post-enable'><KrField style={{width:262}} name="enabled" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enabled" label="启用" type="radio" value='true' />
 							 <KrField name="enabled" label="不启用" type="radio" value='false' />
 						</KrField></div>

                        <KrField grid={1/2}
                            style={{width:262,marginLeft:34}}
                            name="subId"
                            component="select"
                            label="分部"
                            onChange = {this.onChange}
                            requireLabel={true}
                            options={subCompany}
						/>


                        {isType&&<KrField
                            grid={1/2}
                            style={{width:262}}
                            name="typeId"
                            component="select"
                            label="职务类型"
                            options={jobTypes}
                            requireLabel={true}
						/>}

                         <KrField grid={1} label="描述" name="descr" heightStyle={{height:"78px",width:'550px'}}  component="textarea"  maxSize={30} style={{width:560}} placeholder='请输入描述' lengthClass='list-len-textarea'/>

                        <Grid style={{marginBottom:5,marginLeft:-25,marginTop:-12}}>
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
       errors.name='请填写职务名称';  
    }else if(values.name.length>20){
       errors.name='职务名称不能超过20个字符';   
    }

    if(!values.code){
      errors.code='请填写职务编码'  
    }else if(values.code.length>30){
       errors.code='职务编码不能超过30个字符';   
    }

    if(!values.typeId){
        errors.typeId='请选择职务类型名称';  
    }
    
    if(!values.subId){
        errors.subId='请选择分部';
    }
    
	return errors
}

export default reduxForm({ form: 'AddPostList',validate})(AddPostList);