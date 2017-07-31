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

class AddOrganization  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

    componentDidMount(){
         Store.dispatch(change('AddOrganization','enable','1'));
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

        let {handleSubmit,latitude}=this.props;

        var lati=[];
        latitude.map((item,index)=>{
            var list={};
            list.value=item.id;
            list.label=item.name;
            lati.push(list);
        })

		return(

			<div className='m-or-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>
                      <div className="title" style={{marginBottom:"30px"}}>
                            <div style={{marginLeft:-40}}><span className="new-icon-add"></span><label className="title-text">新建机构分权</label></div>
                            <div className="person-close" onClick={this.onCancel}></div>
                      </div>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="机构分权名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:29,marginBottom:5}}
                            name="code"
                            component="input"
                            label="编码"
                            requireLabel={true}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="dimId"
                            component="select"
                            label="所属纬度"
                            requireLabel={true}
                            options={lati}
						/>

                         <div className='m-or-enable'><KrField style={{width:262,marginLeft:29}} name="enable" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="不启用" type="radio" value='0' />
 						</KrField></div>

                        <KrField grid={1} label="描述" name="desc" heightStyle={{height:"78px",width:'544px'}} style={{width:552}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='role-len-textarea'/>

                        
                       <Grid style={{marginBottom:5,marginLeft:-42,marginTop:-12}}>
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

export default reduxForm({ form: 'AddOrganization',validate})(AddOrganization);