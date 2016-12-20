
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
class AdvanceSearchDateForm extends Component{
	constructor(props, context) {
		super(props, context);
	}
	render(){
		return (

						<ListGroup style={{width:'610'}}>
						<ListGroupItem style={{display:'block',paddingLeft:13,marginTop:-20,marginBottom:-20,color:'#333'}}><span style={{lineHeight:'58px'}}>注册时间:</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseBegindate"  component="date" onChange={this.props.onStartChange} style={{width:'252'}} simple={true}/>
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,marginLeft:'15',marginRight:'5'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseendTime" component="date" onChange={this.props.onEndChange}  style={{width:'252'}} simple={true}/>
							</ListGroupItem>
						</ListGroup>

		)
	}
}
AdvanceSearchDateForm = reduxForm({
	form: 'advanceSearchDateForm'
})(AdvanceSearchDateForm);
class NewCreateForm extends Component{
	static DefaultPropTypes = {
		initialValues: {
			customerName: '',
			communityName: '',
			lessorAddress: '',
			payTypeList: [],
			paymentList: [],
			fnaCorporationList: [],
		}

	}
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
			searchForm:false,
			searchParams:{},
		}
		this.basicData();

		// Store.dispatch(reset('newCreateForm'));
		// Store.dispatch(change('newCreateForm','enableflag','ENABLE'));

	}
	 onSubmit(values){
		  // console.log('onAdvanceSearchSubmit高级查询',values);
			let {content,filter} = this.props;
			let {searchForm} = this.state;
			console.log(content,filter);
			if (!searchForm){
				values.type = filter;
				values.value = content;
			}
			if(!values.type){
				values.type = filter;
			}
			console.log('高级查询values',values,searchForm);

			// if(!search){
			//
			// }
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);
	 }

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }
	 basicData=()=>{
	//  新增会员准备职位数据
			let searchParamPosition = {
				communityId:'',
				companyId:'',
				memberId:''
			}
		 let _this =this;
		 Store.dispatch(Actions.callAPI('getMemberBasicData',searchParamPosition)).then(function(response){
			 response.jobList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.jobName;
			 });
			 response.registerSourceList.forEach(function(item,index){
				 item.value = item.id;
				 item.label = item.sourceName;
			 });
			 _this.setState({
				selectOption:response.jobList,
				selectSourceOption :response.registerSourceList
			})
		 }).catch(function(err){
			 reject(err);
		 });
	 }
	 city=(values)=>{
		 Store.dispatch(change('AdvancedQueryForm','city',values));
		//  console.log('city',values);
	 }
	 onFilter=(search)=>{
		 this.setState({searchForm:true});
		 Store.dispatch(change('AdvancedQueryForm','type',search.value));
		 Store.dispatch(change('AdvancedQueryForm','value',search.content));
	 }
	 onStartChange=(startTime)=>{
		 let {searchParams}=this.state;
			 let start=Date.parse(dateFormat(startTime,"yyyy-mm-dd hh:MM:ss"));
			 let end=Date.parse(dateFormat(searchParams.endTime,"yyyy-mm-dd hh:MM:ss"))

			 if(searchParams.endTime&&start>end){
				 Message.error("结束时间要小于开始时间");
				 return ;
			 }
			 Store.dispatch(change('AdvancedQueryForm','startTime',startTime));
		//  searchParams = Object.assign({}, searchParams, {startTime});
		//  this.setState({
		// 	 searchParams
		//  });
	 }
	 onEndChange=(endTime)=>{
		 let {searchParams}=this.state;
			 let start=Date.parse(dateFormat(searchParams.startTime,"yyyy-mm-dd hh:MM:ss"));
			 let end=Date.parse(dateFormat(endTime,"yyyy-mm-dd hh:MM:ss"));

			 if(searchParams.startTime&&start>end){
				 Message.error("结束时间要小于开始时间");
				 return ;
			 }
			 Store.dispatch(change('AdvancedQueryForm','endTime',endTime));
			//  searchParams = Object.assign({}, searchParams, {endTime});
			//  this.setState({
			// 	 searchParams
			//  });
	 }
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {selectOption,selectSourceOption} =this.state;
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'WECHAT'
		}, {
			label: '姓名',
			value: 'NAME'
		}];
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px'}}>

		<ListGroup>
			<ListGroupItem>
				<SearchForm searchFilter={options} style={{width:252,marginBottom:10}} defaultFilter={filter} defaultContent={content} onSubmit={this.onFilter}/>
			</ListGroupItem>
		</ListGroup>

				<KrField name="work"  component="city" label="工作地点"  style={{display:'block',width:'252px',marginRight:24}} onSubmit={this.city}/>
				<KrField name="jobId"  grid={1/2} component="select" label="职位" options={selectOption} style={{width:'252px',marginRight:'33'}}/>
				<KrField name="from"  grid={1/2} component="select" label="注册来源" options={selectSourceOption} style={{width:'252px'}}/>

				<AdvanceSearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange}/>

{/*       <ListGroup>
					<ListGroupItem style={{width:540,paddingLeft:10,color:'#333333',fontSize:'14'}}>
							注册时间
					</ListGroupItem>
        	<ListGroupItem style={{textAlign:'center',padding:0}}></ListGroupItem>
          <ListGroupItem style={{padding:0}}>
              <KrField name="startDate"  component="date" style={{width:'252px'}} simple={true}/>
          </ListGroupItem>
          <ListGroupItem style={{textAlign:'center',padding:15,fontSize:'14'}}>
							至
					</ListGroupItem>
          <ListGroupItem style={{padding:0,marginLeft:-13}}>
              <KrField name="endDate" component="date"  style={{width:252}} simple={true}/>
          </ListGroupItem>
        </ListGroup>
*/}
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
export default NewCreateForm = reduxForm({
	form: 'AdvancedQueryForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateForm);
