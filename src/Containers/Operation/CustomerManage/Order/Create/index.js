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


 
class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);

		console.log('this',props);

		this.state = {
			open:false,
			communitys:[]
		}



	}

	componentDidMount(){

		var {actions} = this.props;
		var _this = this;

		actions.callAPI('community-city-select',{},{}).then(function(response){
			_this.setState({
				communitys:response
			});
		}).catch(function(err){
			console.log('--err',err);
		});



		actions.callAPI('get-customName-orderName',{
			customerId:this.props.params.customerId
		},{}).then(function(response){
			_this.props.initialValues.customerName = response.customerName;
			_this.props.initialValues.mainbillname = response.mainbillname;
		}).catch(function(err){
			console.log('--err',err);
		});

	}

	componentWillReceiveProps(nextProps){



		console.log('nextProps',nextProps);
	}

	confirmSubmit(values){

		var {actions} = this.props;

		values.customerid = this.props.customerId;

		actions.callAPI('enter-order',{},values).then(function(response){
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


  	const { error, handleSubmit, pristine, reset, submitting} = this.props;

  	const {communitys} = this.state;

    return (

      <div>

			<BreadCrumbs children={['运营平台','财务管理','新增客户订单']}/>

			<Section title="新增客户订单" description=""> 

				 <form onSubmit={handleSubmit(this.confirmSubmit)}>

				<Grid style={{marginTop:30}}>

					<Row>
						<Col md={12} > <KrField name="customerName" type="text" label="客户名称"  disabled={true}/> </Col>
					</Row>

					<Row>
						<Col md={12} > 
						 <KrField name="ordertype" component="select" label="订单类型">
						     <option>请选择类型</option>
						     <option value="1">工位订单</option>
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
						<Col md={12} > <KrField name="cityName" label="所在城市" type="text"  disabled={true}/> </Col>
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
			</Section>
			
	 </div>
	);
  }
}


OrderCreate= reduxForm({
  form: 'orderCreateForm'
})(OrderCreate);


const selector = formValueSelector('orderCreateForm');

function mapStateToProps(state){

  const communityid = selector(state, 'communityid');

	return {
		communityid,
		initialValues:{
			customerName:'haahah'
		}
	};
}


export default connect(mapStateToProps)(OrderCreate);



