
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err
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
			main : "",
			backup :""
		}
	}
	
	componentDidMount(){
		this.getManagerPsdFun()
	}

	//获取管理员密码
	getManagerPsdFun =()=>{
		let _this = this;
		var urlParams = {deviceId:State.itemDetail.serialNo}
		Http.request('getManagerPsdUrl',urlParams).then(function(response) {
			
			_this.setState({
				main : response.main,
				backup :response.backup
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	//管理员密码出口
	openManagePsdFun=()=>{
		State.openManagePsd = !State.openManagePsd;
	}
	
	
	
	render(){
		let {main,backup}=this.state;
		var mainpsd = main+"";
		var backuppsd = backup+"";
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{marginTop:45}}>
	            <p style={{textAlign:"center",color:"#333333",fontSize:20}}>主密码：<span style={{display:"inline-block",marginRight:10,color:"#d52c2c"}}>{mainpsd.substr(0,4)}</span><span style={{color:"#0c6e0d"}}>{mainpsd.substr(4)}</span></p>
	            <p style={{textAlign:"center",color:"#333333",fontSize:20}}>备用密码：<span style={{display:"inline-block",marginRight:10,color:"#0c6e0d"}}>{backuppsd.substr(0,4)}</span><span style={{color:"#d52c2c"}}>{backuppsd.substr(4)}</span></p>
	            <Grid style={{marginTop:30,marginBottom:'4px'}}>
	                <Row>
	                    <ListGroup>
	                      <ListGroupItem style={{width:400,textAlign:'center',padding:0}}>
	                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.openManagePsdFun} />
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
