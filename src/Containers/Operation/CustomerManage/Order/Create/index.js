import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {KrField} from 'kr-ui/Form';

import BreadCrumbs from 'kr-ui/BreadCrumbs';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



var JoinForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit} = props;

  return (

    <form onSubmit={handleSubmit(submit)}>


				<Grid style={{marginTop:30}}>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="客户名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > 
						 <KrField name="order_type" component="select" label="订单类型">
							 <option>请选择订单类型</option>
						            <option value="11">Red</option>
						            <option value="00ff00">Green</option>
						            <option value="0000ff">Blue</option>
						 </KrField>
						 </Col>
					</Row>

					<Row>
						<Col md={12} > 

                     <KrField name="customer_id" component="select" label="所在社区">
							 <option>请选择社区</option>
						            <option value="11">Red</option>
						            <option value="00ff00">Green</option>
						            <option value="0000ff">Blue</option>
						 </KrField>
						 
						    </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="city" type="text" label="所在城市" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="order_name" type="text" label="订单名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="mainbill_dype" type="text" label="订单编号" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="mainbill_desc" type="textarea" label="订单描述" /> </Col>
					</Row>

					<Row style={{marginTop:30}}>
						<Col md={10}></Col>
						<Col md={1}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
						<Col md={1}> <RaisedButton  label="取消" type="submit"  /> </Col>
					</Row>

				</Grid>

		  {/*
			<FlatButton label="重置" primary={true} onTouchTap={reset} disabled={pristine || submitting} />
		  */}

    </form>

  )
}

JoinForm = reduxForm({
  form: 'joinForm'  
})(JoinForm);




export default class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);


		this.state = {
			open:false,
		}

	}

	confirmSubmit(values){
		console.log('--->>>>',values);

		

	}

	back(){

	}





  render() {

	

    return (

      <div>

			<BreadCrumbs children={['系统运营','财务管理']}/>

			<Section title="客户信息编辑" description=""> 
				<JoinForm  submit={this.confirmSubmit} cancel={this.back}/>



			</Section>
				   <Snackbar
          open={true}
          message="dfdsf"
          action="undo"
          autoHideDuration={3000}
        />
	 </div>
	);
  }
}




