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
import {reduxForm}  from 'redux-form';
import './index.less';

class EditRankList  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
            jobTypes:[],
            isType : false,
        }
	}

     componentWillReceiveProps(nextProps){
        
        if(nextProps.editDetail.subId ){
            this.dataReady({value:nextProps.editDetail.subId});
        }
       
    }
     //类型
	dataReady=(data)=>{
       var _this=this;
	   Http.request('rank-type-info',{
		   orgType:'DEPARTMENT',
		   orgId:data.value
	   }).then(function(response) {

		   _this.setState({
			    jobTypes:response.jobTypes
		  })

     }).catch(function(err) {
          Message.error(err.message);
     });	
	}
    onChange = (data) =>{
        console.log(data,"????????")
        this.dataReady(data)
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

        let {handleSubmit,subCompany,editDetail}=this.props;
        let {jobTypes,isType} = this.state;

		return(

			<div className='m-rank-post'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="职级名称"
                            requireLabel={true}
                            
						/>
                         <KrField grid={1/2}
                            style={{width:262,marginLeft:34,marginBottom:5}}
                            name="subId"
                            component="select"
                            label="分部"
                            onChange = {this.onChange}
                            requireLabel={true}
                            options={subCompany}
						/>
                      {(isType || editDetail.subId ) && <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="typeId"
                            component="select"
                            label="职务类型"
                            requireLabel={true}
                            options={jobTypes}
						/>}

                        <KrField grid={1/2}
                            style={(isType || editDetail.subId )?{width:262,marginLeft:34,marginBottom:5}:{width:262,marginBottom:5}}
                            name="level"
                            component="input"
                            label="等级"
                            requireLabel={true}
						/>
                         <div className='m-post-enable'><KrField style={(isType || editDetail.subId )?{width:262,marginBottom:5}:{width:262,marginLeft:34,marginBottom:5}} name="enabled" component="group" label="职级状态" requireLabel={true}>
 							 <KrField name="enabled" label="启用" type="radio" value='true' />
 							 <KrField name="enabled" label="停用" type="radio" value='false' />
 						</KrField></div>

                        <KrField grid={1} label="职级描述" name="descr" heightStyle={{height:"78px",width:'550px'}} style={{width:560}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='list-len-textarea'/>

                        
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
       errors.name='请填写职级名称';  
    }else if(values.name.length>10){
       errors.name='职级名称不能超过10个字符';   
    }
   
   if(!values.typeId){
       errors.typeId='请选择职务类型';
   }

  if(!values.level){
       errors.level='请填写等级';
   }else if(isNaN(values.level)){
       errors.level='等级必须是数字'
   }else if(values.level>30){
       errors.level='等级最大不超过30'
   }
    
	return errors
}

export default reduxForm({ form: 'EditRankList',validate})(EditRankList);