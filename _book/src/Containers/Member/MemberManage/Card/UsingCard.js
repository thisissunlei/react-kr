
import React, {PropTypes} from 'react';
import {reduxForm,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Button,
  ListGroup,
  ListGroupItem,
	Message,
} from 'kr-ui';
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
	 onSubmit=(values)=>{
	 	let params = {
	 		startForeignCode:values.begin,
	 		endForeignCode:values.end,
	 		receiveId:values.user,
	 		communityId:values.community
	 	}
	 	const {onSubmit} = this.props;
	 	Http.request('memberCardUse',{}, params).then(function(response) {
			onSubmit && onSubmit(values);
		}).catch(function(err) {
		 	Message.error(err.message);
		});
		 
		 
	 }
	 setBeginCard=(person)=>{
	 	let {endCard} = this.state;
	 	let count = '0';
	 	if(endCard){
	 		count = endCard - person;
	 	}
	 	if(count<0){
	 		count = '0';
	 		Message.warntimeout('起始号码不能小于终止号码','error');
	 		
	 	}
	 	this.setState({
	 		beginCard:person,
	 		count:count
	 	})
	 }
	 setEndCard=(person)=>{
	 	let {beginCard} = this.state;
	 	let count = '0';
	 	if(beginCard){
	 		count = person - beginCard;
	 	}
	 	if(count<0){
	 		count = '0';
	 		Message.warntimeout('起始号码不能小于终止号码','error');
	 		
	 	}
	 	this.setState({
	 		endCard:person,
	 		count:count
	 	})
	 }

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {count} =this.state;
		count = count === '0'?'0':count+1;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{margin:'0 40px',marginTop:'37px'}}>
				<KrField name="community" component="searchCommunity" label="社区"/>
				<KrField name="user" component="searchPersonel" label="领用人"/>
				<KrField name="begin" type="text" component="input" label="起始号码" onBlur={this.setBeginCard}/>
				<KrField name="end" type="text"  grid={1/1} component="input" label="终止号码" onBlur={this.setEndCard}/>
				<KrField name="count"  grid={1/1} component="labelText" label="数量" value={count}/>
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

	
	if (!values.community) {
		errors.community = '请选择社区';
	}
	if (!values.user) {
		errors.user = '请选择领用人';
	}
	if(values.begin && values.begin.length!=10){
		errors.begin = '请输入10位会员卡号';
	}
	if (isNaN(+values.begin) ) {
		errors.begin = '请输入数字';

	}
	if (!values.begin) {
		errors.begin = '请填写起始号码';
	}


	
	if(values.end && values.end.length!=10){
		errors.end = '请输入10位会员卡号';
	}
	if (isNaN(+values.end) ) {
		errors.end = '请输入数字';

	}
	if (!values.end) {
		errors.end = '请填写终止号码';
	}

	

	return errors
}

export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
