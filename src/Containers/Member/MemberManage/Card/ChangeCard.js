
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import { KrField, Grid, Row, Col, Button, Notify, ButtonGroup, ListGroup, ListGroupItem, SearchForm, Message, } from 'kr-ui';
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
			options:[],
			selectSourceOption:[],
			searchForm:false,
			searchParams:{

			},
		}
		
	}

	componentWillMount(){
		// this.getMenberList();
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
		
	onSubmit = (values) => {
		console.log('values',values);
	    let params = {
	    	fromId:values.originUser,
	    	toId:values.nowUser
	    }
	    let _this = this;
	    Store.dispatch(Actions.callAPI('transferMemberCard', params))
	    .then(function(response) {
	        const {onSubmit} = _this.props;
		    onSubmit && onSubmit(values);
	        
	    }).catch(function(err) {
	        Message.error(err.message);
	    });
	    
	}
	changeName=(values)=>{
		console.log(values);
	}
	selectOldUser=(value)=>{
		console.log('selectOldUser',value);
		let _this = this;
		Store.dispatch(change('ImportCardForm', 'originUser', value));

		Store.dispatch(Actions.callAPI('memberCardNum', {receiveId:value})).then(function(response) {
	       _this.setState({
	       		count:response
	       })
	        
	    }).catch(function(err) {
	        Message.error(err.message);
	    });
	}
	

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {count} =this.state;
		let nameList = [{value:1,label:'aa'},{value:2,label:'bb'},{value:3,label:'ab'},{value:5,label:'cd'}]
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px'}}>
				<KrField name="originUser" component="SearchList" label="原领用人" onChange={this.changeName} onSubmit={this.selectOldUser}/>
				<KrField name="nowUser" component="searchPersonel" label="领用人"/>
				<KrField name="count" component="labelText" label="转移数量" value={count}/>

				<Grid style={{margin:"20px 0 3px -10px"}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'165px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
							<ListGroupItem style={{width:'150px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
					</Row>
				</Grid>
		  </form>
		);
	}
}
const validate = values => {

	const errors = {}

	
	
	if (!values.originUser) {
		errors.originUser = '请选择原领用人';
	}
	if (!values.nowUser) {
		errors.nowUser = '请选择领用人';
	}

	

	return errors
}
export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
