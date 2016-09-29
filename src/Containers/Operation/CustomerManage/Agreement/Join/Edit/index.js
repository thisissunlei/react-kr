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
						<Col md={5}> <KrField name="username" type="text" label="出租方" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="地址" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="联系人" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="电话" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="承租方" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="地址" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="联系人" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="电话" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="所属社区" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="所在楼层" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="地址" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="合同编号" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="租赁期限"  requireLabel={true} /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="付款方式" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="支付方式" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="签署时间" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="首付款时间" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="工位" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="会议室" /> </Col>
					</Row>

					<Row>
						<Col md={11}> <KrField name="username" type="text" label="租赁用途" placeholder="办公使用" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="租金总额" placeholder="" /> </Col>
						<Col md={5} mdOffset="1"> <KrField name="username" type="text" label="押金总额" /> </Col>
					</Row>

					<Row>
						<Col md={5}> <KrField name="username" type="text" label="合同附件" /> </Col>
					</Row>

		  {/*
		  
					<Row>
						<Col md={5}> <KrField name="username" type="text" label="" /> </Col>
						<Col md={5}> <KrField name="username" type="text" label="" /> </Col>
					</Row>
		  */}


				</Grid>



				<Grid style={{marginTop:30}}>

					<Row>

						<Col md={8}></Col>
						<Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>

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




var SubmitValidationForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,cancel } = props;

  return (

    <form onSubmit={handleSubmit(submit)}>

      <KrField name="username" type="text" label="用户名" />
      <KrField name="name" type="text" label="hahah" />



				<Grid style={{marginTop:30}}>

					<Row>

						<Col md={8}></Col>
						<Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2}> <FlatButton label="取消"  onTouchTap={cancel} /> </Col>

					</Row>

				</Grid>


		  {/*
			<FlatButton label="重置" primary={true} onTouchTap={reset} disabled={pristine || submitting} />
		  */}

    </form>

  )
}

SubmitValidationForm = reduxForm({
  form: 'submitValidation'  
})(SubmitValidationForm);


export default class JoinEdit extends Component {

	constructor(props,context){
		super(props, context);


		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.confirmJoinSubmit = this.confirmJoinSubmit.bind(this);

		this.state = {
			open:false,
		}

	}

	confirmJoinSubmit(values){
		console.log('---',values);
	}

	confirmSubmit(values){
		console.log('---',values);
		this.setState({open: false});
	}
	handleOpen(){
		this.setState({open: true});
	}

	handleClose(values){
		console.log('---',values);
		this.setState({open: false});
	}

  render() {

			 const actions = [
				  <FlatButton
					label="Cancel"
					primary={true}
					onTouchTap={this.handleClose}
				  />,
				  <FlatButton
					label="Submit"
					primary={true}
					onTouchTap={this.handleClose}
				  />,
				];

    return (

      <div>
			<Section title="入驻协议书" description=""> 
				<JoinForm  submit={this.confirmJoinSubmit}/>
			</Section>

			<RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />

			<Dialog
				title="表单提交"
				modal={true}
				open={this.state.open}
			>
				<SubmitValidationForm ref="formdata" submit={this.confirmSubmit} cancel={this.handleClose}/>


			</Dialog>


			</div>
	);
  }
}

