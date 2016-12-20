
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
import $ from 'jquery'
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
			selectSourceOption:[],
			searchForm:false
		}
		this.basicData();

		// Store.dispatch(reset('newCreateForm'));
		// Store.dispatch(change('newCreateForm','enableflag','ENABLE'));

	}
	 onSubmit(values){
		  // console.log('onAdvanceSearchSubmit高级查询',values);
			let {content,filter} = this.props;
			let {searchForm} = this.state;
			if (!searchForm){
				values.type = filter;
				values.value = content;
			}
			console.log('values',values);

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
        <ListGroup>
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
