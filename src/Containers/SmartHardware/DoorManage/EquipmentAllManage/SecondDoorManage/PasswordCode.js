
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
} from 'kr-ui';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}
	
	

	passwordDialogFun=()=>{
		let {passwordDialogFun} = this.props;
		passwordDialogFun && passwordDialogFun();
	}

	
	
	
	render(){
		var params = State.EquipmentPassword+'';
		console.log("params",params);

		return(
			<div style={{marginTop:45}}>
	            <p style={{textAlign:"center",color:"#333333",fontSize:20}}>口令码：<span style={{display:"inline-block",marginRight:10,color:"#d52c2c"}}>{params.substr(0,3)}</span><span style={{color:"#0c6e0d"}}>{params.substr(3)}</span></p>
	            <Grid style={{marginTop:30,marginBottom:'4px'}}>
	                  <Row>
	                    <ListGroup>
	                      <ListGroupItem style={{width:400,textAlign:'center',padding:0}}>
	                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.passwordDialogFun} />
	                      </ListGroupItem>
	                    </ListGroup>
	                  </Row>
	             </Grid>
	        </div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
