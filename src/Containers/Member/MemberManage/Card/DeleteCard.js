
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
			selectSourceOption:[],
			searchForm:false,
			searchParams:{

			},
		}
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
		
	onSubmit = (values) => {
	    let params = {
	        id: this.props.detail.cardId
	    }
	    Store.dispatch(Actions.callAPI('memberCardDelete', params)).then(function(response) {
	        console.log('response', response);
	    }).catch(function(err) {
	        Message.error(err.message);
	    });
	    console.log(values);
	    const {onSubmit} = this.props;
	    onSubmit && onSubmit(values);
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {count} =this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px'}}>
				<p style={{textAlign:'center',fontSize:'14px',color:"#000",marginBottom:40}}>确认删除该会员卡？</p>
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
export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
