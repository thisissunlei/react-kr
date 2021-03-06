import React, { PropTypes} from 'react';
import {reduxForm,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
  ListGroup,
  ListGroupItem,
	Message,
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
import $ from 'jquery';
import {
	observer
} from 'mobx-react';
import State from './State';
@observer
class AdvanceSearchDateForm extends React.Component{
	constructor(props, context) {
		super(props, context);
	}
	render(){
		return (

						<ListGroup style={{width:'610'}}>
						<ListGroupItem style={{display:'block',paddingLeft:13,marginTop:-20,marginBottom:-20,color:'#333'}}><span style={{lineHeight:'58px'}}>活动时间:</span></ListGroupItem>
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
class NewCreateForm extends React.Component{
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
		this.state={
			communityText:'',
			companyText:'',
			selectSourceOption:[],
			searchForm:false,
			searchParams:{

			},
		}
	}
	componentDidMount() {

	}
	 onSubmit=(values)=>{
		let {content,filter} = this.props;
		let {searchForm} = this.state;
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel=()=>{
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }
	 city=(thirdId,secondId,name)=>{
		 Store.dispatch(change('AdvancedQueryForm','cityId',secondId));
		 Store.dispatch(change('AdvancedQueryForm','countyId',thirdId));
	 }
	 onStartChange=(startTime)=>{
		 let {searchParams}=this.state;
			 let start=Date.parse(DateFormat(startTime,"yyyy-mm-dd hh:MM:ss"));
			 let end=Date.parse(DateFormat(searchParams.endTime,"yyyy-mm-dd hh:MM:ss"))

			 if(searchParams.endTime&&start>end){
				 Message.error("结束时间不可小于开始时间");
				 return ;
			 }
			 Store.dispatch(change('AdvancedQueryForm','beginDate',startTime));
		 searchParams = Object.assign({}, searchParams, {startTime});
		 this.setState({
			 searchParams
		 });
	 }
	 onEndChange=(endTime)=>{
		 let {searchParams}=this.state;
		 let start=Date.parse(DateFormat(searchParams.startTime,"yyyy-mm-dd hh:MM:ss"));
		 let end=Date.parse(DateFormat(endTime,"yyyy-mm-dd hh:MM:ss"));
		 if(searchParams.startTime&&start>end){
				 Message.error("结束时间不可小于开始时间");
				 return ;
		 }
		 Store.dispatch(change('AdvancedQueryForm','endDate',endTime));
		 searchParams = Object.assign({}, searchParams, {endTime});
		 this.setState({
				 searchParams
		 });
	 }
	render(){
		const {handleSubmit} = this.props;
		let options = [{
			label: 'CEO Time',
			value: 'CEO_TIME'
		}, {
			label: '公开氪',
			value: 'OPEN_KR'
		}, {
			label: '社区福利',
			value: 'COMMUNITY_WELFARE'
		},  {
			label: 'Open Day',
			value: 'OPEN_DAY'
		}];
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px',marginLeft:'40px'}}>
				<KrField name="name" grid={1/2} type="text" component="input"  label="活动标题" style={{width:'252px',marginRight:'33',marginBottom:5}}/>
				<KrField name="type" grid={1/2} type="text"  component="select" label="活动类型"  options={options} style={{width:'252px'}}/>
				<KrField name="cityId"  component="city" label="活动地点"  style={{display:'block',width:'252px',marginRight:24,marginBottom:5}} onSubmit={this.city} openCity/>
				<AdvanceSearchDateForm onStartChange={this.onStartChange} onEndChange={this.onEndChange}/>
				<Grid style={{margin:"20px 0 3px -10px"}}>
					<Row>
						<ListGroup>
								<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
							</ListGroup>
					</Row>
				</Grid>
		  </form>
		);
	}
}
export default NewCreateForm = reduxForm({
	form: 'AdvancedQueryForm',
})(NewCreateForm);
