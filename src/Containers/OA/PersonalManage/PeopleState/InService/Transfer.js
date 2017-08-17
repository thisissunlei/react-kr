import React from 'react';
import {reduxForm}  from 'redux-form';
import {
    KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {Http} from 'kr/Utils'

class Transfer extends React.Component{

	constructor(props,context){
		super(props, context);
	}
    
     onSubmit=(values)=>{
        let {department} = this.props;

        let submitData = {
            depId:values.depId[0].orgId,
            resourceId:department.id
        }
        const {onSubmit}=this.props;
        onSubmit && onSubmit(submitData);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }
  

	render(){

        let {handleSubmit,department}=this.props;

		return(

			<div>
              <form onSubmit={handleSubmit(this.onSubmit)}>
               
                <KrField grid={1}
                            style={{width:262,marginLeft:60,marginBottom:2}}
                            component="labelText"
                            label="原部门:"
                            value = {department.depName}
                            requireLabel={true}
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:60}}
                            name="depId"
                            component="treeDepartment"
                            label="部门:"
                            treeType = "department"
                            ajaxUrlName = "get-department-tree"
                            requireLabel={true}
					    />

			   <Grid style={{marginTop:17,marginBottom:5}}>
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

    if(!values.depId){
       errors.depId='请选择部门';
    }
    
	return errors
}

export default reduxForm({ form: 'Transfer',validate})(Transfer);