
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
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	 onSubmit=(values)=>{
	 	let params = {
	 		startForeignCode:values.begin,
	 		endForeignCode:values.end
	 	};
	 	Store.dispatch(Actions.callAPI('memberCardImport' , params)).then(function(response) {
			console.log('response',response);
		}).catch(function(err) {
		 	Message.error(err.message);
		});
		console.log(values);
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }
	 setBeginCard=(person)=>{
	 	let {endCard} = this.state;
	 	let count = '0';
	 	if(endCard){
	 		count = endCard - person;
	 	}
	 	if(count<0){
	 		count = '0';
	 		Message.warn('起始号码不能小于终止号码','error');
	 		
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
	 		Message.warn('起始号码不能小于终止号码','error');
	 		
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
		count = count==='0'?'0':count+1;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{margin:'0 40px',marginTop:'37px'}}>
				<KrField name="begin" type="text" component="input" component="input" label="起始号码" onBlur={this.setBeginCard}/>
				<KrField name="end"  grid={1/1} type="text" component="input" label="终止号码" onBlur={this.setEndCard}/>
				<KrField name="count"  grid={1/1} component="labelText" label="数量" value={count}/>
				<Grid style={{margin:"20px 0 3px -10px"}}>
					<Row>
						<ListGroup>
								<ListGroupItem style={{width:'180px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
								<ListGroupItem style={{width:'150px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
							</ListGroup>
					</Row>
				</Grid>
				<div style={{fontSize:'12px',color:'#333',marginTop:15,marginLeft:10}}>
					<p>注意：</p>
					<p>1.导入会员卡必须连号导入，已导入的会员卡不能重复导入</p>
					<p>2.已导入并未领用的会员卡，可在会员卡管理中进行删除操作</p>
				</div>
		  </form>
		);
	}
}
const validate = values => {

	const errors = {}

	
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
