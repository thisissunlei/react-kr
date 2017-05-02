import React, {
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
	Notify,
	BreadCrumbs,
	Title,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button
} from 'kr-ui';
import {Http} from 'kr/Utils';

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
			initialValue: {},
			optionValue: {},
			formValues: {},
			stationVoList:[],
			openConfirmCreate: false,
			openLocalStorages:false
		}
		this.isConfirmSubmiting = false;
		Store.dispatch(reset('admitCreateForm'));
	}
	componentWillUnmount() {
		Store.dispatch(reset('admitCreateForm'));
	}

	onCreateSubmit(formValues) {

		this.setState({
			formValues
		});
		var _this = this;

		this.openConfirmCreateDialog();
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
		let keyWord = params.orderId+params.customerId+'INTENTIONcreate';
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
		let sign = false;
		let _this = this;
		let keyWord = params.orderId+ params.customerId+'INTENTIONcreate';
			 if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')>1){
				_this.setState({
					openLocalStorages:true
				})
				sign = true;
			 }
		if(!sign){
		 	this.getBasicData()
		 }
	}

	onConfrimSubmit() {

				if(this.isConfirmSubmiting){
					return ;
				}
				this.isConfirmSubmiting = true;

		let {
			formValues
		} = this.state;
		let {
			params
		} = this.props;
			var _this = this;
		Http.request('addFinaContractIntentletter', {}, formValues).then(function(response) {
			_this.isConfirmSubmiting = false;
			_this.removeLocalStorage();
			Notify.show([{
				message: '创建成功',
				type: 'success',
			}]);

			window.setTimeout(function() {
				window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			}, 0);

		}).catch(function(err) {
				_this.isConfirmSubmiting = false;
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onCancel() {
		this.cancelRemoveLocalStorage();

			window.history.back();

	}

	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {
		this.getlocalSign()
	}


	getBasicData=()=>{
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
			let keyWord = params.orderId+params.customerId+'INTENTIONcreate';
			initialValues.num  = localStorage.getItem(keyWord+'num') ||1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;

			initialValues.setLocalStorageDate = +new Date();
			
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress || null;
			initialValues.contractcode = response.contractCode;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';
			// initialValues.agreement = '无';
			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.paymentList = response.payment.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			optionValues.payTypeList = response.payType.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			// optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;
			optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			initialValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')


			_this.setState({
				initialValues,
				optionValues,
				// stationVoList
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
		this.getBasicData();
		this.removeLocalStorage();
	}
	getLocalStorage=()=>{
		this.setState({
			openLocalStorages:false,
		})
		this.getLocalStorageSata();
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
			let keyWord = params.orderId+params.customerId+'INTENTIONcreate';
			initialValues.num  = localStorage.getItem(keyWord+'num') ||1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num') || 1;

			initialValues.setLocalStorageDate = +new Date();
			
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			initialValues.leaseAddress = response.customer.customerAddress || null;
			initialValues.contractcode = response.contractCode;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';
			// initialValues.agreement = '无';
			optionValues.fnaCorporationList = response.fnaCorporation.map(function(item, index) {
				item.value = item.id;
				item.label = item.corporationName;
				return item;
			});
			optionValues.paymentList = response.payment.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});

			optionValues.payTypeList = response.payType.map(function(item, index) {
				item.value = item.id;
				item.label = item.dicName;
				return item;
			});
			optionValues.floorList = response.customer.floor;
			optionValues.customerName = response.customer.customerName;
			// optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;
			optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			initialValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
			optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName')
			//获取localStorage数据
			let mainbillId = localStorage.getItem(keyWord +'mainbillid');
			let customerId = localStorage.getItem(keyWord +'customerId');
			if(mainbillId && customerId){
				initialValues.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				initialValues.templockday = localStorage.getItem(keyWord+'templockday');
				initialValues.signdate = localStorage.getItem(keyWord+'signdate') || '日期';
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				optionValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') || null;
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate');

				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');


				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid')
				initialValues.paymentId = parseInt(localStorage.getItem(keyWord+'paymentId'));
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement') || "无";
				initialValues.totalrent = localStorage.getItem(keyWord+'totalrent') || 0;
				initialValues.stationnum = localStorage.getItem(keyWord+'stationnum') || 0;
				initialValues.boardroomnum = localStorage.getItem(keyWord+'boardroomnum') || 0;
				initialValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'));

				// optionValue.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];

			}
			initialValues.stationVoList = localStorage.getItem(keyWord+'stationVos') || '[]';
			let stationVoList = JSON.parse(initialValues.stationVoList) || [];
			initialValues.num = 1+parseInt(localStorage.getItem(keyWord+'num'));


			_this.setState({
				initialValues,
				optionValues,
				stationVoList
			});

		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});


	}
	
	

	render() {

		let {
			initialValues,
			optionValues,
			initialValue,
			optionValue,
			 stationVoList,
			 openLocalStorages
		} = this.state;

		return (


			<div>

				<Title value="创建承租意向书_财务管理"/>

		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			<Section title="承租意向书" description="">
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} initialValue={initialValue} onCancel={this.onCancel} stationVoList={stationVoList} optionValues={optionValues}/>
			</Section>

			<Dialog
				title="承租意向书"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				onClose={this.openConfirmCreateDialog}
				open={this.state.openConfirmCreate} >
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} optionValues={optionValues} />
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
