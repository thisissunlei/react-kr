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

class EditRole  extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state = {
          isSure:false
        }
	}


    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

     typeOnChange=(param)=>{
       if(param.value=='DEPARTMENT'){
           this.setState({
             isSure:true  
           })
       }else{
          this.setState({
             isSure:false
          })
       }
    }

	render(){

        let {handleSubmit,roleArr,detail}=this.props;
        let {isSure}=this.state;

         detail.map((item,index)=>{
            item.orgName=item.label;
            item.orgId=item.value;
        })

        
		return(

			<div className='m-add-role'>
				 <form onSubmit={handleSubmit(this.onSubmit)}>

                        <KrField
                            grid={1}
                            style={{width:262,marginBottom:5}}
                            name="roleId"
                            component="select"
                            label="角色"
                            requireLabel={true}
                            options={roleArr}
						/>


                        <KrField grid={1}
                            style={{width:262,marginBottom:5}}
                            name="orgType"
                            component="select"
                            label="机构类型"
                            onChange = {this.typeOnChange}
                            requireLabel={true}
                            options={[{value:'DEPARTMENT',label:'部门'},{value:'SUBCOMPANY',label:'分部'}]}
						/>


                       {isSure&&<KrField
                            grid={1/2}
                            style={{width:262}}
                            name="orgId"
                            component="treeDepartment"
                            label="选择机构"
                            onChange = {this.onChange}
                            ajaxUrlName = "role-dep-tree"
                            requireLabel={true}
                            checkable = {true}
                            valueText={(detail && detail[0] && detail[0].orgName)?detail:[{orgName:''}]}
                        />}


                         {!isSure&&<KrField
                            grid={1/2}
                            style={{width:262}}
                            name="orgId"
                            component="treeDivision"
                            label="选择机构"
                            onChange = {this.onChange}
                            ajaxUrlName = "role-sub-tree"
                            requireLabel={true}
                            checkable = {true}
                            valueText={(detail && detail[0] && detail[0].orgName)?detail:[{orgName:''}]}
                        />}


                        <Grid style={{marginBottom:5,marginLeft:-28,marginTop:18}}>
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

    if(!values.roleId){
       errors.roleId='请选择角色';  
    }

    if(!values.orgType){
      errors.orgType='请选择机构类型'  
    }


    if(values.orgList&&values.orgList.length==0){
       errors.orgId='请选择机构'   
    }
    
	return errors
}

export default reduxForm({ form: 'EditRole',validate})(EditRole);
