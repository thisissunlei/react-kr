import React from 'react';

import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http
} from "kr/Utils";
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


class NewCreateMainbill extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			MainbillType: [],

		}
		this.getMainbillType();
	}
	getMainbillType = () => {
		var _this = this;
		var MainbillType;
		Http.request('get-mainbill-type').then(function(response) {
			MainbillType = response.map((item) => {
				item.label = item.dicName;
				item.value = item.id;
				return item;
			})
			_this.setState({
				MainbillType: MainbillType
			})

		});

	}
	onSubmit = (form) => {
		form = Object.assign({},form);
		var formList = form;
		const {
			onSubmit,
			detail,
			billOInfo,
			onMainBillSubmit
		} = this.props;
		formList.company = detail.company;
		if (detail.name) {
			formList.name = detail.name;
		}
		if (detail.tel) {
			formList.tel = detail.tel;
		}
		if (billOInfo == 0) {
			onMainBillSubmit && onMainBillSubmit(formList)
		} else {
			onSubmit && onSubmit(formList);
		}



	}
	mainBillType = (item) => {
		let {
			billOInfo,
			detail,
			customerId
		} = this.props;
		var form;
		if (billOInfo == 0) {
			if (customerId > 0) {
				Http.request('get-mainbill-id', {
					customerId: customerId,
					mainBillTypeName: item.label,
				}).then(function(response) {
					Store.dispatch(change('newCreateMainbill', "mainbillname", response));
				});
			}
		} else {

			Http.request('getMainbillName', {
				company: detail.company,
				mainBillTypeName: item.label,
			}).then(function(response) {
				Store.dispatch(change('newCreateMainbill', "mainbillname", response));
			});

		}

	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}



	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
		} = this.props;
		let {
			MainbillType
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
					<KrField
							grid={1/2}
				    		left={50}
				    		right={10}
							name="mainbilltype"
							type="text"
							component="select"
							label="订单类型"
							options={MainbillType}
							requireLabel={true}
							onChange={this.mainBillType}

					 />
					 <KrField
							grid={1/2}
				    		right={50}
				    		left={10}
							name="communityid"
							type="text"
							component="searchCommunitys"
							label="所属社区"
							requireLabel={true}
					 />
					 <KrField
							grid={1/2}
				    		left={50}
				    		right={10}
							name="mainbillname"
							type="text"
							component="input"
							label="订单名称"
							requireLabel={true}
					 />
					 <KrField
					 			left={50}
								style={{width:545}}
								name="mainbilldesc"
								component="textarea"
								label="备注"
								maxSize={100}
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
const validate = values => {

	const errors = {}

	if (!values.mainbilltype) {
		errors.mainbilltype = '请选择订单类型';
	}
	if (!values.communityid) {
		errors.communityid = '请选择所属社区';
	}
	if (!values.mainbillname) {
		errors.mainbillname = '请输入订单名称';
	}
	return errors
}

export default reduxForm({
	form: 'newCreateMainbill',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateMainbill);
