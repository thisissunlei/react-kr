
import React, {PropTypes} from 'react';
import {reduxForm,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {  Grid, Row,  Button,  ListGroup, ListGroupItem, Message, } from 'kr-ui';
class ImportCard extends React.Component{
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
		console.log("params",params);
		let {detail} = this.props;
	    let params = {
	        id: detail.id
	    }
		console.log("params",params);

	    let _this = this;
	    Http.request('memberCardDelete', params).then(function(response) {
	        const {onSubmit} = _this.props;
	    	onSubmit && onSubmit();
	        
	    }).catch(function(err) {
	        Message.error(err.message);
	    });
	    
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
