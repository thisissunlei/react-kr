import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
} from 'redux-form';
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
			payment: [{
				label: '支付宝支付',
				value: 'ZHIFUBAO'
			}, {
				label: '微信支付',
				value: 'WEIXIN'
			}, {
				label: '银行转账',
				value: 'YINGHANG'
			}, {
				label: 'POS机支付',
				value: 'POS'
			}],
			mainList: []
		}
		this.getCommunity();
		this.getMain();
	}

	onSubmit = (form) => {
		form.verifyStatus = "RETURNED";
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
		Http.request('get-mainbill-community', {}, {}).then(function(response) {
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

	getMain = () => {
		var mainList;
		var _this = this;
		Http.request('get-fina-corporation', {}, {}).then(function(response) {
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
	openSearch = () => {
		this.setState({
			openSearch: !this.state.openSearch
		})
	}
	onSearchSubmit = (form) => {

		this.setState({
			Params: form
		});
		this.openSearch();
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
			mainList
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}  style={{marginTop:30}}>
			    	<KrField
				    		grid={1/2}
								left={50}
								right={10}
				    		name="communityId"
				    		component="searchCommunitys"
				    		style={{marginTop:4}}
				    		label="社区名称"
				  			options={communityList}
					/>
					<KrField
				    		grid={1/2}
								right={50}
				    		left={10}
				    		name="payWay"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="收款方式"
				  			options={payment}
					/>
					<KrField
				    		grid={1/2}
								left={50}
								right={10}
				    		name="flowCategoryId"
				    		component="searchPayment"
				    		style={{marginTop:4}}
				    		label="收款类型"

					/>
					<KrField
				    		grid={1/2}
								right={50}
				    		left={10}
				    		name="corporationId"
				    		component="searchCorporation"
				    		style={{marginTop:4}}
				    		label="主体"
				  			options={mainList}
					/>
					<KrField
							grid={1/1}
							left={50}
							component="group"
							label="录入时间"
							style={{marginTop:4}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:245}} ><KrField  style={{width:245,marginLeft:-10,marginTop:2}} name="createStratTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'  style={{marginTop:25}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="createEndTime" style={{width:245,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField
							grid={1/1}
							component="group"
							label="收款时间"
							left={50}
							style={{marginTop:3}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:245}} ><KrField  style={{width:245,marginLeft:-10,marginTop:2}} name="dealStartTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'  style={{marginTop:25}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="dealEndTime" style={{width:245,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField
							grid={1/2}
							left={50}
							right={10}
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
