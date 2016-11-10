import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {
	KrField,
	LabelText,
	Section,
	BreadCrumbs,
	Grid,
	Row,
	Col,
	Notify,
	Loading,
	Button,
	Dialog,
	Snackbar,
	ListGroup,
	ListGroupItem
} from 'kr-ui';


import * as actionCreators from 'kr/Redux/Actions';

import '../changeBody.js'
let OrderEditForm = function (props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName,value} = props;
  	let customerName = (value && value.customerName) || '';
  	let reload = function(){
  		window.top.location.reload();
  	}
  	let Order = [
  		{value:'',label:'请选择类型'},
  		{value:'STATION',label:'工位订单'}
  	]
  	

	return (

	<form onSubmit={handleSubmit(onSubmit)} style={{padding:20}}>

			<KrField name="customerName" grid={1} type="text" label="客户名称" component="labelText" disabled={true} value={customerName} inline={false}/> 

			 <KrField name="mainbilltype" grid={1/2} right={30} component="select" label="订单类型" requireLabel={true} inline={false} options={Order}>
			 </KrField>

				 <KrField name="communityid" grid={1/2} left={30} component="select" label="所在社区" requireLabel={true} inline={false} options={communitys}>
				 </KrField>
					<KrField label="所在城市" grid={1/2} right={30} value={cityName||'无'} component="labelText" inline={false}/> 
					 <KrField name="mainbillname" grid={1/2} left={30} type="text" label="订单名称" requireLabel={true} component="text" inline={false}/> 
					 <KrField name="mainbilldesc" type="textarea" label="订单描述" component="textarea" inline={false}  maxSize={200}/> 
					<Grid >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" joinEditForm disabled={submitting} /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}><Button  label="取消" cancle={true} type="button" joinEditForm disabled={submitting} onClick={reload} /></ListGroupItem>
						</ListGroup>
					</Grid>
			</form>
	);
}

 
class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);


		this.isOk = false;

		this.state = {
			open:false,
			loading:true,
			value:''
		}

		const {initialValues} = this.props;


		const validate = values =>{

			 const errors = {}

			if(!values.mainbilltype){
				errors.mainbilltype = '请选择订单类型';
			  }else if (!values.communityid) {
				errors.communityid = '请选择所在社区';
			  }else if(!values.mainbillname){
				errors.mainbillname = '订单名称不能为空';
			  }

			  return errors
		}

		OrderEditForm = reduxForm({
			form: 'orderEditForm',
			initialValues,
			validate
		})(OrderEditForm);

	}

	componentDidMount(){

		var {actions} = this.props;
		var _this = this;

		const closeAll = this.props.location.query.closeAll;

		if(closeAll){
			actions.switchSidebarNav(false);
			actions.switchHeaderNav(false);
		}

		actions.callAPI('community-city-selected',{},{}).then(function(communitys){
			communitys = communitys.map((item)=>{
		  		item.value = item.communityId;
		  		item.label = item.communityName;
		  		return item;
		  	})
		 }).catch(function(err){ });

		actions.callAPI('get-simple-order',{
			mainBillId:this.props.params.oriderId
		},{}).then(function(response){
			_this.setState({
				value:response
			})
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},0);

	}

	componentWillReceiveProps(nextProps){
	}

	confirmSubmit(values){



		if(this.isOk){
			return false;
		}

		this.isOk = true;

		var {actions} = this.props;

		values.customerid = this.props.params.customerId;

		var _this = this;

		actions.callAPI('edit-order',{},values).then(function(response){
			Notify.show([{
				message:'更新成功',
				type: 'success',
			}]);

			window.setTimeout(function(){
				window.top.location.reload();
				_this.isOk = false;
			},0);

		}).catch(function(err){

			Notify.show([{
				message:'更新失败',
				type: 'danger',
			}]);

			window.setTimeout(function(){
				_this.isOk = false;
			},0);

		});


	}

  render() {


  	if(this.state.loading){
  		return(<Loading/>);
  	}
  	let {value} = this.state;


    return (

      <div>

				<BreadCrumbs children={['运营平台','财务管理','编辑客户订单']} hide={!!this.props.location.query.closeAll}/>
				<Section title="编辑客户订单" description="" hide={!!this.props.location.query.closeAll}> 
					<OrderEditForm onSubmit={this.confirmSubmit} communitys={this.props.communitys} cityName={this.props.cityName} initialValues={this.props.initialValues} value={value}/>
				</Section>
			
	 </div>
	);
  }
}


const selector = formValueSelector('orderEditForm');

function mapStateToProps(state){

	let communitys = state.common['community-city-selected'];

	if(Object.prototype.toString.call(communitys) !== '[object Array]'){
		communitys = [];
	}

	const communityid = selector(state, 'communityid');

	let cityName = '';
	communitys.map(function(item){
		if(item.communityId == communityid){
			cityName = item.cityName;
		}
	});

	return {
		cityName,
		initialValues:state.common['get-simple-order'],
		communitys,
   	};
}


export default connect(mapStateToProps)(OrderCreate);



