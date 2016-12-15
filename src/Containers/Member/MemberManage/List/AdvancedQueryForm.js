
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
} from 'kr-ui';
import $ from 'jQuery'
class NewCreateForm extends Component{
	 static PropTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
	 }

	constructor(props){
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.state={
			communityText:'',
			companyText:'',
			selectSourceOption:[],
			selectSourceOption:[]

		}
		this.basicData();

		// Store.dispatch(reset('newCreateForm'));
		// Store.dispatch(change('newCreateForm','enableflag','ENABLE'));

	}
	// 点确定提交时候如果有错误提示返回，否则提交,,如果邮箱存在有错误提示，不能提交
	 onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }
	 basicData=()=>{
	//  新增会员准备职位数据

		 let _this =this;
		 Store.dispatch(Actions.callAPI('getMemberPosition')).then(function(response){
			//  console.log("----------response",response);
			 response[0].jobList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.jobName;
			 });
			 response[0].registerSourceList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.sourceName;
			 });
			 _this.setState({
				selectOption:response[0].jobList,
				selectSourceOption :response[0].registerSourceList
			})
		 }).catch(function(err){
			 reject(err);
		 });
	 }
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {selectOption,selectSourceOption} =this.state;
		let options = [{
			label: '公司名称',
			value: 'BILL'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'PHONE'
		}, {
			label: '姓名',
			value: 'PHONE'
		}];
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<SearchForm searchFilter={options} style={{width:252,marginBottom:10}} defaultFilter={filter} defaultContent={content}/>
				<KrField name="work"  component="city" label="工作地点"  style={{display:'block',width:'252px',marginRight:24}}/>
				<KrField name="jobId"  grid={1/2} component="select" label="职位" options={selectOption}/>
				<KrField name="from"  grid={1/2} component="select" label="注册来源" options={selectSourceOption}/>
        <ListGroup>
			<ListGroupItem style={{width:540,paddingLeft:10,color:'#333333'}}><span>注册时间</span></ListGroupItem>
        	<ListGroupItem style={{textAlign:'center',padding:0}}></ListGroupItem>
          <ListGroupItem style={{padding:0}}>
              <KrField name="startDate"  component="date" style={{width:'252px'}} simple={true}/>
          </ListGroupItem>
          <ListGroupItem style={{textAlign:'center',padding:0,marginLeft:10}}>
						<span style={{display:'inline-block',lineHeight:'58px',margin:'0 5 0 5'}}>至</span>
					</ListGroupItem>
          <ListGroupItem style={{padding:0}}>
              <KrField name="endDate" component="date"  style={{width:252}} simple={true}/>
          </ListGroupItem>
        </ListGroup>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
									<Button  label="确定" type="submit"/>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		  </form>
		);
	}
}
const validate = values => {

	const errors = {}

	if (!values.phone) {
		errors.phone = '请输入电话号码';
	}

	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}

	if (!values.email) {
		errors.email = '请输入邮箱';
	}
	if (!values.companyId) {
		errors.companyId = '请输入公司';
	}

	if (!values.jobId) {
		errors.jobId = '请输入职位';
	}

	if (!values.name) {
		errors.name = '请输入姓名';
	}

	if (!values.enableflag) {
		errors.enableflag = '请选择是否发送验证短信';
	}
	return errors
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);
