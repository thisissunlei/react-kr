
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  ListGroup,
  ListGroupItem,
	SearchForm,
	Message,
} from 'kr-ui';
import dateFormat from 'dateformat';
import $ from 'jquery'
class ImportCard extends Component{
	constructor(props){
		super(props);

		this.state={
			beginCard:0,
			endCard:0,
			count:'0',
			communityText:'',
			companyText:'',
			selectSourceOption:[],
			searchForm:false,
			searchParams:{

			},
		}
		this.getDetailData();
	}
	getDetailData=()=>{
		let {detail} = this.props;
		console.log(detail);
		let params = {
			id:detail.cardId
		}
		Store.dispatch(Actions.callAPI('memberCardView', params)).then(function(response) {
			console.log('response',response);
		}).catch(function(err) {
		 	Message.error(err.message);
		});
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	 onSubmit=(values)=>{
		console.log(values);
		 // const {onSubmit} = this.props;
		 // onSubmit && onSubmit(values);
	 }

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {count} =this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px',marginBottom:25}}>
				<KrField name="person"  grid={1/1} component="labelText" label="绑定人：" value={count}/>
				<KrField name="phone"  grid={1/1} component="labelText" label="手机号：" value={count}/>
				<KrField name="bindTime"  grid={1/1} component="labelText" label="绑定时间：" value={count}/>
		  </form>
		);
	}
}
export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
