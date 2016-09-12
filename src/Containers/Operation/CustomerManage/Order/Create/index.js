import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';



import {reduxForm } from 'redux-form';
import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import BreadCrumbs from 'kr-ui/BreadCrumbs';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import * as actionCreators from 'kr-ui/../Redux/Actions';





var JoinForm = (props) => {

  const { error, handleSubmit, pristine, reset, submitting,submit,communitys} = props;

  return (

    <form onSubmit={handleSubmit(submit)}>


				<Grid style={{marginTop:30}}>

					<Row>
						<Col md={12} > <KrField name="username" type="text" label="客户名称" /> </Col>
					</Row>

					<Row>
						<Col md={12} > 
						 <KrField name="ordertype" component="select" label="订单类型">
						     <option value="1">工位订单</option>
						 </KrField>
						 </Col>
					</Row>

					<Row>
						<Col md={12} > 

                     <KrField name="communityid" component="select" label="所在社区">
                     		<option>请选择社区</option>
                     		{communitys.map((item,index)=> <option value={item.communityid} key={index}>{item.communityName}</option>)}
						 </KrField>
		
						    </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="city" label="所在城市" type="text"  disabled={true}/> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="ordername" type="text" label="订单名称" disabled={true} /> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="mainbilltype" type="text" label="订单编号"/> </Col>
					</Row>

					<Row>
						<Col md={12} > <KrField name="mainbilldesc" type="textarea" label="订单描述" /> </Col>
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

 
class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);


		this.state = {
			open:false,
			communitys:[]
		}

	


		


	}

	componentDidMount(){
			var {actions} = this.props;

		var _this = this;
		actions.callAPI('community_city_select',{},{}).then(function(response){
			_this.setState({
				communitys:response
			});

			console.log(response);

		});
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
				<JoinForm  submit={this.confirmSubmit} cancel={this.back} initialValues={{
					username:'张山',
					city:'aaa'
				}} communitys={this.state.communitys}/>

			</Section>
			
	 </div>
	);
  }
}









function mapStateToProps(state){

	return {
		
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderCreate);




