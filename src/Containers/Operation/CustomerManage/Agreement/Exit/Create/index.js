import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	submitForm,
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
	Notify,
	BreadCrumbs,
	Title,
	ListGroup,
	ListGroupItem,
	Button,
	Grid,
	Row

} from 'kr-ui';
import {Http} from 'kr/Utils'


import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';

export default class JoinCreate extends React.Component {

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
			openConfirmCreate: false,
			openLocalStorages:false
		}
		this.isConfirmSubmiting = false;


	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});
		this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {

		if (this.isConfirmSubmiting) {
			return;
		}
		this.isConfirmSubmiting = true;
		let {
			formValues
		} = this.state;
		let {
			params
		} = this.props;
		var _this = this;
		Http.request('addFnaContractWithdrawal', {}, formValues).then(function(response) {
			_this.removeLocalStorage();
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);
			location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/exit/" + response.contractId + "/detail";

		}).catch(function(err) {
			_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		this.openConfirmCreateDialog();
	}

	onCancel() {
		this.cancelRemoveLocalStorage()
		window.history.back();
	}

	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+params.customerId;
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 removeList.map((item)=>{
 			 localStorage.removeItem(item);
 		})
	}
	cancelRemoveLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+params.customerId + 'QUITRENTcreate';
		let removeList = [];
		for (var i = 0; i < localStorage.length; i++) {
			let itemName = localStorage.key(i);
			 if(localStorage.key(i).indexOf(keyWord)!='-1'){
				 removeList.push(itemName);
			 }
		 }
		 removeList.map((item)=>{
 			 localStorage.removeItem(item);
 		})
	}

	getlocalSign=()=>{
		let {
			params
		} = this.props;
		let _this = this;
		let sign = false;
		let keyWord = params.orderId+ params.customerId+'QUITRENTcreate';
			 if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')>1){
				_this.setState({
					openLocalStorages:true
				})
				sign = true;
			 }
		if(!sign){
			this.getBasic();
		}
	}


	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {
		Store.dispatch(reset('exitCreateForm'));

		this.getlocalSign()
	}
	getBasic=()=>{

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;

			let keyWord = params.orderId+ params.customerId+'QUITRENTcreate';
			initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;


			initialValues.setLocalStorageDate = +new Date();

			initialValues.leaseBegindate = new Date;
			initialValues.leaseEnddate = new Date;

			//initialValues.withdrawdate = +new Date();
			//initialValues.signdate = +new Date();

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseAddress = response.customer.customerAddress;


      		initialValues.contractcode = response.contractCode;


			
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'QUITRENT';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;



			_this.setState({
				initialValues,
				optionValues
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});
	}

	getLocalStorageSata=()=>{
		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type :0,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;

			let keyWord = params.orderId+ params.customerId+'QUITRENTcreate';
			initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;


			initialValues.setLocalStorageDate = +new Date();

			initialValues.leaseBegindate = new Date;
			initialValues.leaseEnddate = new Date;

			//initialValues.withdrawdate = +new Date();
			//initialValues.signdate = +new Date();

			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.leaseAddress = response.customer.customerAddress;


      		initialValues.contractcode = response.contractCode;



			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'QUITRENT';

			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

			initialValues.withdrawdate = localStorage.getItem(keyWord+'withdrawdate');
				initialValues.depositamount = parseInt(localStorage.getItem(keyWord+'depositamount')) || 0;
				initialValues.totalreturn = parseInt(localStorage.getItem(keyWord+'totalreturn')) || 0;
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

				initialValues.num = 1+parseInt(localStorage.getItem(keyWord+'num'));

			_this.setState({
				initialValues,
				optionValues
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});

	}
	onCancelStorage=()=>{
		this.setState({
			openLocalStorages:false,

		})
		this.getBasic();
		this.removeLocalStorage();
	}
	getLocalStorage=()=>{
		this.setState({
			openLocalStorages:false,
		})
		this.getLocalStorageSata();

	}

	render() {

		let {
			initialValues,
			optionValues,
			openLocalStorages
		} = this.state;

		return (

			<div>

			 <Title value="创建退租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
		<Section title="退租协议书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues}  params={this.props.params} />
			</Section>

			<Dialog
				title="退租意向书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} onClose={this.openConfirmCreateDialog}>
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues}/>
			  </Dialog>
			<Dialog
				title="提示"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={this.state.openLocalStorages} 
				contentStyle={{width:'400px'}}>
					<div>
						<p style={{textAlign:'center',margin:'30px'}}>是否加载未提交的合同数据？</p>
						<Grid>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'40%',textAlign:'right',paddingRight:'5%'}}><Button  label="确定" type="submit"  onTouchTap={this.getLocalStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
							<ListGroupItem style={{width:'40%',textAlign:'left',paddingLeft:'5%'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancelStorage}  width={100} height={40} fontSize={16}/></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
					</div>

			  </Dialog>
		</div>
		);
	}
}
