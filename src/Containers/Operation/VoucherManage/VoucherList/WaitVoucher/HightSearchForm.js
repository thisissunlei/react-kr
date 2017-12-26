import React from 'react';

import {
	reduxForm,
} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	ButtonGroup
} from 'kr-ui';
import './index.less';


class HightSearchForm extends React.Component {

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
			},
			{
				label: "转移",
				value: "TRANSFER"
			},
			{
				label: "社区变更",
				value: "NONE"
			},
			{
				label:'押金转租',
				value:'DEP_RENT'
			},
			{
				label:'租金转押',
				value:'RENT_DEP'
			}],
			payType: [],
			mainList: []
		}
		 this.getCommunity();
		// this.getMain();
	}

	onSubmit = (form) => {
		form.status = "0";
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
		var _this = this;
		Http.request('findCommunityVoucher').then(function(response) {
			response.communityList.map((item, index) => {
				item.label = item.communityname;
				item.value = item.id;
				return item;
			})

			_this.setState({
				communityList: response.communityList
			})

		}).catch(function(err) {
		});
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
			    <form onSubmit={handleSubmit(this.onSubmit)}  style={{marginTop:30}}>
          <KrField
                grid={1/2}
                left={35}
  							right={15}
                name="payWay"
                type="select"
                style={{marginTop:4}}
                label="付款方式"
                options={payment}
          />
					<KrField
				    		grid={1/2}
								right={47}
				    		left={5}
				    		name="communityId"
				    		component="searchCommunityAll"
				    		style={{marginTop:4}}
				    		label="入驻社区"
							inline={false}
					/>
          <KrField
              grid={1/2}
              left={35}
              right={15}
              name="paymentAccount"
              type="text"
              component="input"
              label="付款方名称"
           />
           <KrField
               grid={1/2}
               right={47}
               left={5}
               name="customerName"
               type="text"
               component="input"
               label="签约方名称"
            />
					<KrField
							grid={1/1}
							component="group"
							label="创建日期"
							left={35}
							right={15}
							style={{marginTop:3}}
					>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start'><KrField  style={{width:255,marginLeft:-10,marginTop:2}} name="startDate" component="date" /></div></ListGroupItem>
									<div style={{display:'inline-block',marginTop:25,marginRight:3}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end' sty><KrField name="stopDate" style={{width:255,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		        </div>
					</KrField>

				<Grid style={{marginTop:10,marginBottom:5,marginLeft:6}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center' style={{marginRight:35}}>
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
