import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {KrField} from 'kr-ui/Form';


import {Grid,Row,Col} from 'kr-ui/Grid';

import Dialog from 'material-ui/Dialog';
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
						<KrField name="type" component="select" label="订单类型">
							 <option></option>
						            <option value="11">Red</option>
						            <option value="00ff00">Green</option>
						            <option value="0000ff">Blue</option>
						 </KrField>
						 </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="所在社区" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="所在城市" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="订单名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="订单编号" /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="username" type="textarea" label="订单描述" /> </Col>
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




export default class JoinEdit extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);


		this.state = {
			open:false,
		}

	}

	confirmSubmit(values){
		console.log('---',values);
	}

	back(){

	}





  render() {

	

    return (

      <div>
			<Section title="客户信息编辑" description=""> 
				<JoinForm  submit={this.confirmSubmit} cancel={this.back}/>
			</Section>
	 </div>
	);
  }
}




