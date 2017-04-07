import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
    Message
} from 'kr-ui';
import State from './State';
/*import allState from '../State';
import oneState from '../OneNewAgreement/State';
import OneNewAgreement from '../OneNewAgreement';*/
import './index.less';
@observer
 class NewIndent extends Component{

		

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		let selectDatas={
			communityBaselist:[],
			customerSourceList:[],
			giveupList:[],
			levelList:[],
			roundList:[],
			stationTypeList:[],
			visitTypeList:[]
		};
		
	}
	onSubmit = (values) => {
		delete values.cityid;
		let listId=this.props.listId;
		let _this=this;
		if(!values.mainbilldesc){
			values.mainbilldesc="";
		}
		State.ChangeSubmitState();

		values.customerid=listId;
		values.mainbillname=State.orderName;
		Store.dispatch(Actions.callAPI('enter-order',{},values)).then(function(response) {
         	setTimeout(function(){
         		State.ChangeCanSubmitState();
         	},1000)
         	allState.mainBillId=response.mainBillId;
			oneState.ordersListData({customerId:allState.listId},response.mainBillId);
			Store.dispatch(change('OneNewAgreement','staionTypeId',response.mainBillId));
			
			_this.onCancel(response.mainBillId);
		}).catch(function(err) {
			 Message.error(err.message);
		});	
	}

	onCancel = (value) => {
		
		const {onCancel} = this.props;
		onCancel && onCancel(value);
	}

	hasOfficeClick = (params) =>{
		if(params.value=="HAS"){
			State.showMatureTime();
		}else if(params.value=="NOHAS"){
			State.noShowMatureTime();

		}
	}
	componentWillReceiveProps(nextProps){

		
			if(typeof(nextProps.orderReady)=="function"){
				return;
			}
			if(State.isInit){
				return;
			}
			State.orderReady(nextProps.orderReady)
			

	}
	communityChange=(value)=>{ 
		if(!value){
			return;
		}
		var community=State.orderReady.communityCity
		for(var i=0;i<community.length;i++){
			if(community[i].communityName==value.label){
				Store.dispatch(change('NewIndent','cityid',community[i].cityId));
				State.cityLableChange(community[i].cityName)
			}

		}
	}
	mainbilltypeChange=(value)=>{
		State.orderName=this.props.customerName+value.label+this.props.orderCount;

	}


	render(){
		const { error, handleSubmit, pristine, reset,companyName,customerName,orderCount} = this.props;
		
		let city=State.cityLable;
			city=!city?"无":city;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:7}}>
				<div className="title">
						<div><span className="order-new-icon"></span><label className="title-text">{companyName}</label></div>
						<div className="order-close" onClick={this.onCancel}></div>
				</div>
				
				<div className="kk" style={{marginTop:30,paddingLeft:20}}>		
					<KrField grid={1/2} label="订单类型" name="mainbilltype" style={{width:262,marginLeft:15}} component="select" 
							options={State.orderFound}
							requireLabel={true}
							onChange={this.mainbilltypeChange}
					/>
					<KrField grid={1/2} label="所在社区" name="communityid" component="select" style={{width:262,marginLeft:30}} 
							options={State.community}
							requireLabel={true}
							onChange={this.communityChange}
					/>
					
					<KrField grid={1/2} label="所在城市" name="cityid" component="labelText" style={{width:262,marginLeft:15}} value={city} inline={false}/>
					<KrField grid={1/2} label="订单名称" name="mainbillname" style={{width:262,marginLeft:30}} component="labelText" value={State.orderName?State.orderName:customerName+orderCount} requireLabel={true} inline={false}/>
					<KrField grid={1/2} label="订单描述" name="mainbilldesc" style={{width:555,marginLeft:15,marginTop:-5}} heightStyle={{height:"80px"}}  component="textarea"  maxSize={100} requireLabel={false} />
				</div>		
				<Grid style={{marginTop:0,marginRight:40}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
						
						    
				</form>
		);
	}
}
const validate = values =>{

		const errors = {};

		if(!values.mainbilltype){
			errors.mainbilltype = '请选择订单类型';
		}
		if(!values.communityid){
			errors.communityid = '请选择所在社区';
		}
		

		
		return errors
	}
export default reduxForm({ form: 'NewIndent',validate})(NewIndent);
