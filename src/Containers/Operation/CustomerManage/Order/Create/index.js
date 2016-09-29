import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';


import BreadCrumbs from 'kr-ui/BreadCrumbs';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Button} from 'kr-ui/Button';
import {
	Notify,
	Loading,
} from 'kr-ui';



import {Dialog,Snackbar} from 'material-ui';



let OrderCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName} = props;

	return (

			<form onSubmit={handleSubmit(onSubmit)}>

				<KrField name="customerName" type="text" label="客户名称"  disabled={true}/> 

				 <KrField name="mainbilltype" component="select" label="订单类型">
					 <option>请选择类型</option>
					 <option value="STATION">工位订单</option>
				 </KrField>

				 <KrField name="communityid" component="select" label="所在社区">
						<option>请选择社区</option>
						{communitys.map((item,index)=> <option value={item.communityId} key={index}>{item.communityName}</option>)}
				 </KrField>

				<KrField type="labelText" label="所在城市" value={cityName||'空'} /> 

			 	<KrField name="mainbillname" type="text" label="订单名称" /> 
			    <KrField name="mainbilldesc" type="textarea" label="订单描述" /> 

				<Grid>
					<Row style={{marginTop:30}}>
						<Col md={10}></Col>
						<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} disabled={submitting} /> </Col>
					</Row>
				</Grid>
		</form>
	);

}

OrderCreateForm= reduxForm({
  form: 'orderCreateForm',
})(OrderCreateForm);

class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);

		this.state = {
			open:false,
			loading:true,
		}

	}

	componentDidMount(){


		var {actions} = this.props;
		var _this = this;

		const closeAll = this.props.location.query.closeAll;

		if(closeAll){
			actions.switchSidebarNav(false);
			actions.switchHeaderNav(false);
		}


		actions.callAPI('community-city-selected',{},{}).then(function(response){
		}).catch(function(err){ });

		actions.callAPI('get-customName-orderName',{
			customerId:this.props.params.customerId
		},{}).then(function(response){

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
		},1000);

	}

	componentWillReceiveProps(nextProps){
	}

	confirmSubmit(values){

		var {actions} = this.props;

		values.customerid = this.props.params.customerId;

		actions.callAPI('enter-order',{},values).then(function(response){
			Notify.show([{
				message:'创建成功',
				type: 'success',
			}]);

			window.setTimeout(function(){
				window.top.location.reload();
			},1000);

		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

	}

	back(){

	}


  render() {


  	if(this.state.loading){
  		return(<Loading/>);
  	}

    return (

      <div>

			<BreadCrumbs children={['运营平台','财务管理','新增客户订单']} hide={!!this.props.location.query.closeAll}/>

			<Section title="新增客户订单" description="" hide={!!this.props.location.query.closeAll}> 
				<OrderCreateForm onSubmit={this.confirmSubmit} communitys={this.props.communitys} cityName={this.props.cityName}/>
			</Section>
			
	 </div>
	);
  }
}


const selector = formValueSelector('orderCreateForm');

function mapStateToProps(state){

  const communityid = selector(state, 'communityid');
	const initialValues = state.common['get-customName-orderName'];

	let communitys = state.common['community-city-selected'];

	if(Object.prototype.toString.call(communitys) !== '[object Array]'){
		communitys = [];
	}

	let cityName = '';
	communitys.map(function(item){
		if(item.communityId == communityid){
			cityName = item.cityName;
		}
	});

	return {
		cityName,
		communitys,
		initialValues
	};

}


export default connect(mapStateToProps)(OrderCreate);



/*
 


*/
