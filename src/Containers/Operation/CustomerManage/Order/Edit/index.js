import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';

import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';


import BreadCrumbs from 'kr-ui/BreadCrumbs';

import {Grid,Row,Col} from 'kr-ui/Grid';

import {Button} from 'kr-ui/Button';
import {Notify} from 'kr-ui';



import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import * as actionCreators from 'kr/Redux/Actions';



let OrderEditForm = function (props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName} = props;

	return (

	<form onSubmit={handleSubmit(onSubmit)}>
					<Grid style={{marginTop:30}}>
						<Row>
							<Col md={12} > <KrField name="customerName" type="text" label="客户名称"  disabled={true}/> </Col>
						</Row>
						<Row>
							<Col md={12} > 
							 <KrField name="mainbilltype" component="select" label="订单类型">
								 <option>请选择类型</option>
								 <option value="STATION">工位订单</option>
							 </KrField>
							 </Col>
						</Row>
						<Row>
							<Col md={12} > 
									 <KrField name="communityid" component="select" label="所在社区">
											<option>请选择社区</option>
												{communitys.map((item,index)=> <option value={item.communityId} key={index}>{item.communityName}</option>)}
									 </KrField>
								</Col>
						</Row>
						<Row>
							<Col md={12} > <LabelText label="所在城市" text={cityName||'空'}/> </Col>
						</Row>
						<Row>
							<Col md={12} > <KrField name="mainbillname" type="text" label="订单名称" /> </Col>
						</Row>
						<Row>
							<Col md={12} > <KrField name="mainbilldesc" type="textarea" label="订单描述" /> </Col>
						</Row>
						<Row style={{marginTop:30}}>
							<Col md={10}></Col>
							<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} /> </Col>
						</Row>
					</Grid>
			</form>
	);
}

OrderEditForm = reduxForm({
  form: 'orderEditForm'
})(OrderEditForm);

 
class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);

		console.log('this',props);

		this.state = {
			open:false,
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

		actions.callAPI('community-city-selected',{},{}).then(function(communitys){ }).catch(function(err){ });

		actions.callAPI('get-simple-order',{
			mainBillId:this.props.params.oriderId
		},{}).then(function(){
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});

	}

	componentWillReceiveProps(nextProps){
		console.log('nextProps',nextProps);
	}

	confirmSubmit(values){

		var {actions} = this.props;

		values.customerid = this.props.customerId;

		actions.callAPI('edit-order',{},values).then(function(response){
			Notify.show([{
				message:'创建成功',
				type: 'success',
			}]);
		}).catch(function(err){
			Notify.show([{
				message:'创建失败',
				type: 'danger',
			}]);
		});

	}

	back(){

	}


  render() {

    return (

      <div>

				<BreadCrumbs children={['运营平台','财务管理','编辑客户订单']} hide={!!this.props.location.query.closeAll}/>

				<Section title="编辑客户订单" description="" hide={!!this.props.location.query.closeAll}> 
					<OrderEditForm onSubmit={this.confirmSubmit} communitys={this.props.communitys} cityName="hfhf" initialValues={this.props.initialValues}/>
				</Section>
			
	 </div>
	);
  }
}



function mapStateToProps(state){

	let communitys = state.common['community-city-selected'];

	if(Object.prototype.toString.call(communitys) !== '[object Array]'){
		communitys = [];
	}

	console.log('----communitys',communitys);

	return {
		initialValues:state.common['get-simple-order'],
		communitys,
   	};
}


export default connect(mapStateToProps)(OrderCreate);



