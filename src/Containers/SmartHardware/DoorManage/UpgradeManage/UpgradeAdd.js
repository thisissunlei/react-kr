
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
	
	

	upgradeAddFun=()=>{
		let {onCancle} = this.props;
		onCancle && onCancle();
	}



	
	
	
	render(){
		let {detail} = this.props;
		return(
			<div style={{marginTop:45}}>
	            <div style={{color:"#333333",fontSize:18,width:639,wordBreak:"break-all",wordWrap:"break-word",height:105,overflowY:"scroll"}}>{detail.url}</div>
	            <Grid style={{marginTop:30,marginBottom:'4px'}}>
	                  <Row>
	                    <ListGroup>
	                      <ListGroupItem style={{width:639,textAlign:'center',padding:0}}>
	                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.upgradeAddFun} />
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
