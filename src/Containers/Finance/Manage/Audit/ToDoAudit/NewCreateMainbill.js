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


class NewCreateMainbill extends Component {

	static PropTypes = {
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
		Store.dispatch(Actions.callAPI('get-mainbill-type', {}, {})).then(function(response) {
			MainbillType = response.map((item, index) => {
				item.label = item.dicName;
				item.value = item.id;
				return item;
			})
			_this.setState({
				MainbillType: MainbillType
			})

		}).catch(function(err) {});

	}
	onSubmit = (form) => {
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
			    <form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField  
							grid={1/2}
				    		right={34}
							name="mainbilltype" 
							type="text" 
							component="select" 
							label="订单类型"
							options={MainbillType}
							requireLabel={true}
					 />
					 <KrField  
							grid={1/2}
				    		right={34}
							name="communityid" 
							type="text" 
							component="searchCommunity" 
							label="所属社区" 
							requireLabel={true}
					 />
					 <KrField  
							grid={1/2}
				    		right={34}
							name="mainbillname" 
							type="text" 
							component="input" 
							label="订单名称" 
							requireLabel={true}
					 />
					 <KrField  
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