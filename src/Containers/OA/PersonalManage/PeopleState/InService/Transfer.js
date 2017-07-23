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
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
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
                            style={{width:262,marginLeft:28}}
                            component="labelText"
                            label="原部门:"
                            value = {department.depName}
                            requireLabel={true}
						/>
                 <KrField grid={1}
                            style={{width:262,marginLeft:28}}
                            name="depId"
                            component="selectTree"
                            label="部门:"
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
    
	return errors
}

export default reduxForm({ form: 'Transfer',validate})(Transfer);