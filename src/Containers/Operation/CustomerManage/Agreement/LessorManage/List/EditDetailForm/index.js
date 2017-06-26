import React, {

	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize
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
	Notify,
	ListGroup,
	ListGroupItem,
	ButtonGroup
} from 'kr-ui';
import {Http} from 'kr/Utils';
// import './index.less'

class EditDetailForm extends React.Component {

	// static PropTypes = {
	// 	onSubmit: React.PropTypes.func,
	// 	onCancel: React.PropTypes.func,
	// 	detail: React.PropTypes.object,
	//
	// }

	constructor(props) {
		super(props);
		// this.state = {
		//
		// }
	}

	componentDidMount() {
		// let {
		// 	detail
		// } = this.props;
		//detail.enableflag = detail.enableflag.toString();
		// Store.dispatch(initialize('newCreateForm', detail));
	}

	onSubmit = (values) => {


		values = Object.assign({}, values);

		var _this = this;

		Http.request('editFnaCorporation', {}, values).then(function(response) {
			Notify.show([{
				message: '编辑成功！',
				type: 'success',
			}]);

			const {
				onSubmit
			} = _this.props;
			onSubmit && onSubmit();

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});


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
			detail
		} = this.props;
		return <div>mmm</div>;



		return (
			<form className = 'edit-detail-form' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
								<KrField grid={1/2} label="联系人邮箱"  name="mail" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>
								<KrField  grid={1/2}  name="intentionCommunityId" style={{width:262,marginLeft:28}} component='searchCommunityAll'  label="意向入驻社区" inline={false}  placeholder='请输入社区名称' requireLabel={true}/>
								<KrField grid={1/2} label="联系人微信" name="wechat" style={{width:262,marginLeft:15}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="预计入驻时间" name="inTime" style={{width:260,marginLeft:28}} component="date"/>
								<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">公司信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>

								<KrField grid={1/2} label="融资金额" name="amount" style={{width:262,marginLeft:28}} component="input" requireLabel={false}/>
								<KrField grid={1/2} label="项目名称" name="projectName" style={{width:262,marginLeft:28}} component="input"/>
								<KrField grid={1/2} label="详细地址" name="detailAddress" style={{width:262,marginLeft:28}} component="input"/>
								<KrField grid={1/2} label="公司网址" name="website" style={{width:262,marginLeft:15}} component="input"/>
						</div>

						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}


const validate = values => {

	const errors = {}

	// if (!values.corporationName) {
	// 	errors.corporationName = '请填写出租方名称';
	// }
	// if (!values.corporationAddress) {
	// 	errors.corporationAddress = '请填写详细地址';
	// }

	return errors
}

export default reduxForm({
	form: 'editDetailForm',
	initialValues: {
		enableflag: 'ENABLE'
	},
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(EditDetailForm);
