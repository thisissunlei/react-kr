import React, {
	Component,
	PropTypes
} from 'react';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
	Title,
} from 'kr-ui';
import './index.less';

export default class JoinCreate extends Component {

	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.state = {
			initialValues: {},
			optionValues: {},
			formValues: {},
			openConfirmCreate: false
		}
		Store.dispatch(reset('joinCreateForm'));
	}

	onCreateSubmit(formValues) {
		console.log('--first--formValues', formValues)
		this.setState({
			formValues
		}, function() {
			this.openConfirmCreateDialog();
		});
	}

	onConfrimSubmit() {

		let {
			formValues
		} = this.state;

		let {
			params
		} = this.props;
		console.log('-to', formValues)
		formValues.stationVos = JSON.stringify(formValues.stationVos);


		var _this = this;
		Store.dispatch(Actions.callAPI('addOrEditEnterContract', {}, formValues)).then(function(response) {

			_this.setState({
				baiscInf: response
			});

			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);

			window.setTimeout(function() {
				window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/join/" + response.contractId + "/detail";
			}, 0);

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		this.openConfirmCreateDialog();
	}

	onCancel() {
		window.history.back();
	}

	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {


	}


	render() {

		let {
			initialValues,
			optionValues
		} = this.state;


		return (

			<div>

				
			</div>
		);
	}
}