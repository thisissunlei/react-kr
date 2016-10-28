import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';


 class NewCreateForm extends Component{

	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
	}

	 componentDidMount(){
		const {detail}= this.props;
		Store.dispatch(initialize('newCreateForm',detail));
	 }

	 onSubmit(values){

		var _this = this;
		const accountcode=values.accountcode;
		const accountdesc=values.accountdesc;
		const accountname=values.accountname;
		const accounttype=values.accounttype;
		const enableflag=values.enableflag;
		const ordernum=values.ordernum;
		const id=values.id;
		
		Store.dispatch(Actions.callAPI('saveFinaFinaflowAccountModel',{},{
			accountcode:accountcode,
			accountdesc:accountdesc,
			accountname:accountname,
			accounttype:accounttype,
			enableflag:enableflag,
			ordernum:ordernum,
			id:id
		})).then(function(response){ 
			if(response.code==1){
					Notify.show([{
						message:'新建成功！',
						type: 'success',
					}]);
					 const {onSubmit} = _this.props;
					 onSubmit && onSubmit();
				}else{
					Notify.show([{
						message:response.message,
						type: 'danger',
					}]);
				}
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

 		
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	render(){

		const { error, handleSubmit, pristine, reset} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<KrField name="id" type="hidden" label="id"/> 
				<KrField name="accountcode" type="text" label="科目编码" requireLabel={true}/> 
				<KrField name="accountname" type="text" label="科目名称" requireLabel={true}/> 
				<KrField name="accounttype" type="select" label="科目类别" options={[
						{value:'PAYMENT',label:'回款'},
					   {value:'INCOME',label:'收入'},
				]} requireLabel={true}>
				</KrField>
				<KrField name="ordernum" type="text" label="排序号" requireLabel={true}/> 
				<KrField name="enableflag" component="group" label="是否启用" requireLabel={true}>
                <KrField name="enableflag" label="是" type="radio" value="ENABLE"/>
                <KrField name="enableflag" label="否" type="radio" value="DISENABLE" />
              </KrField> 
				<KrField name="accountdesc" component="textarea" label="描述"  /> 

				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={8}></Col>
						<Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
					</Row>
				</Grid>
				</form>

			
		);
	}
}
const validate = values =>{

		const errors = {}

		if(!values.accountcode){
			errors.accountcode = '请填写科目编码';
		}

		if (!values.accountname) {
			errors.accountname = '请填写科目名称';
		}

		if (!values.accounttype) {
			errors.accounttype = '请填写科目类别';
		}

		if (!values.ordernum) {
			errors.ordernum = '请填写排序号';
		}
		if (!values.enableflag) {
			errors.enableflag = '请先选择是否启用';
		}


		return errors
	}
const selector = formValueSelector('newCreateForm');

NewCreateForm = reduxForm({ form: 'newCreateForm',validate, enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default reduxForm({ form: 'newCreateForm', enableReinitialize:true, keepDirtyOnReinitialize:true })(NewCreateForm);
