import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';




import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';



import BreadCrumbs from 'kr-ui/BreadCrumbs';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';



import Loading from 'kr-ui/Loading';


 
class OrderCreate extends Component {

	constructor(props,context){
		super(props, context);

		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.back = this.back.bind(this);

		this.state = {
			loading:true,
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

		setTimeout(function(){
			_this.setState({
				loading:false
			});
		},1000)
	}


	confirmSubmit(values){
		console.log('--->>>>',values);	
		var {actions} = this.props;

		actions.callAPI('enter-order',{},values).then(function(response){

		}).catch(function(err){

		});

	}

	back(){

	}


  render() {

  	const { error, handleSubmit, pristine, reset, submitting} = this.props;

  	const {communitys} = this.state;


  	if(this.state.loading){
  		return(<Loading/>);
  	}

  


    return (

      <div>

			<BreadCrumbs children={['系统运营','财务管理']}/>

			<Section title="客户信息编辑" description=""> 

				 <form onSubmit={handleSubmit(this.confirmSubmit)}>


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
                     		{/*
								{communitys.map((item,index)=> <option value={item.communityid} key={index}>{item.communityName}</option>)}
                     		*/}
                     		
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

  const favoriteColorValue = selector(state, 'favoriteColor');

	return {
		items:state.notify.items,
    	favoriteColorValue:favoriteColorValue
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderCreate);






