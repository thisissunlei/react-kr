import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';


class HightSearchForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			communityList: [],
			payment: [],
			payType: [],
			mainList: []
		}
		this.getCommunity();
		this.getPayment();
		this.getPayType();
		this.getMain();
	}

	onSubmit = (form) => {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();

	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	getCommunity = () => {
		var communityList;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-mainbill-community', {}, {})).then(function(response) {
			communityList = response.map((item, index) => {
				item.label = item.communityname;
				item.value = item.id;
				return item;
			})
			_this.setState({
				communityList: communityList
			})

		}).catch(function(err) {});
	}
	getPayment = () => {
		var payment;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-fina-payway', {}, {})).then(function(response) {
			payment = response.map((item, index) => {
				item.label = item.name;
				item.value = item.id;
				return item;
			})
			_this.setState({
				payment: payment
			})

		}).catch(function(err) {});
	}
	getPayType = () => {
		var payType;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-fina-paytype', {}, {})).then(function(response) {
			payType = response.map((item, index) => {
				item.label = item.categoryName;
				item.value = item.id;
				return item;
			})
			_this.setState({
				payType: payType
			})

		}).catch(function(err) {});
	}
	getMain = () => {
		var mainList;
		var _this = this;
		Store.dispatch(Actions.callAPI('get-fina-corporation', {}, {})).then(function(response) {
			mainList = response.map((item, index) => {
				item.label = item.corporationName;
				item.value = item.id;
				return item;
			})
			_this.setState({
				mainList: mainList
			})

		}).catch(function(err) {});
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			communityList,
			payment,
			payType,
			mainList
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
			    	<KrField   
			    			name="verifyStatus" 
			    			type="hidden" 
			    			component="input"
			    			value="UNCHECKED" 
			    	/>
				    <KrField  
				    		grid={1/2}
				    		right={34}
				    		name="communityId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="社区名称" 
				  			options={communityList}
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="payWay"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="收款方式" 
				  			options={payment}
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="flowCategoryId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="收款类型" 
				  			options={payType}
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="corporationId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="主体" 
				  			options={mainList}
					/>
					<KrField 
							grid={1/1}  
							component="group" 
							label="录入时间" 
							style={{marginTop:3}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="createStratTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="createEndTime" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField 
							grid={1/1}  
							component="group" 
							label="收款时间" 
							style={{marginTop:3}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="dealStartTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="dealEndTime" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField  
							grid={1/2}
				    		right={34}
							name="customerName" 
							type="text" 
							component="input" 
							label="客户名称" 
					 />
				<Grid style={{marginTop:10,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="确定" type="submit" />
								</div>
								<Button  
										label="取消" 
										type="button" 
										cancle={true} 
										onTouchTap={this.onCancel} 
								/>
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				</form>  
			</div>


		);
	}
}


export default reduxForm({
	form: 'hightSearchForm'
})(HightSearchForm);