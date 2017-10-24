
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


class HttpTokenDialogForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}

	closeHttpTokenDialog=()=>{
		let {onCancle} = this.props;
		onCancle && onCancle();
	}

	
	render(){

		var params = State.EquipmentHttpToken||'无';

		return(
			<div style={{marginTop:60}}>
	            <p style={{textAlign:"center",fontSize:18}}><span style={{color:"#333"}}>HttpToken：</span><span style={{color:"green"}}>{params}</span></p>
	            <Grid style={{marginTop:40,marginBottom:'4px'}}>
	                  <Row>
	                    <ListGroup>
	                      <ListGroupItem style={{width:400,textAlign:'center',padding:0}}>
	                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.closeHttpTokenDialog} />
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
export default HttpTokenDialogForm = reduxForm({
	form: 'HttpTokenDialogForm',
	validate,
})(HttpTokenDialogForm);
