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

class  NewModel  extends React.Component{

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

			<div className='m-sql-add'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="名称"
                            requireLabel={true}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:27,marginBottom:5}}
                            name="dbType"
                            component="select"
                            label="数据库类型"
                            requireLabel={true}
                            options={[{value:'MYSQL',label:'mysql'},{value:'ORACLE',label:'oracle'}]}
						/>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="operType"
                            component="select"
                            label="操作类型"
                            requireLabel={true}
                            options={[{value:'TABLE_CREATE',label:'创建表'},{value:'TABLE_DELETE',label:'删除表'},{value:'TABLE_EDIT_DESCR',label:'修改表注释'},
                            {value:'FIELD_ADD',label:'新增字段'},{value:'FIELD_DELETE',label:'删除字段'},{value:'FIELD_RENAME',label:'修改字段名'},{value:'FIELD_MODIFY',label:'修改字段属性'}]}
						/>
                        <KrField grid={1/2}
                            style={{width:262,marginLeft:27,marginBottom:5}}
                            name="sqlTemplate"
                            component="input"
                            label="SQL模版"
                            requireLabel={true}
						/>

                        
          
                       <Grid style={{marginBottom:5,marginLeft:-39,marginTop:5}}>
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
       errors.name='请填写模版名称';  
    }else if(values.name.length>20){
       errors.name='模版名称不能超过20个字符';   
    }

    if(!values.dbType){
        errors.dbType='请选择数据库类型';
    }
    if(!values.operType){
        errors.operType='请选择操作类型';
    }
    if(!values.sqlTemplate){
        errors.sqlTemplate='请填写SQL模版';
    }

    
    
	return errors
}

export default reduxForm({ form: 'NewModel',validate})(NewModel);