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
import {DateFormat,Http} from 'kr/Utils';
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
import NewCreateForm from './NewCreateForm';
import ConfirmFormDetail from './ConfirmFormDetail';
import allState from "../../State";



export default class JoinCreate extends React.Component {

	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}
	 static childContextTypes = {
        params: React.PropTypes.object.isRequired
     }



		getChildContext() {
	    return {
	        params: this.props.params
	      }
	    }

	constructor(props, context) {
		super(props, context);

		this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onConfrimSubmit = this.onConfrimSubmit.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
			delStationVos:[],
			openConfirmCreate: false,
			openLocalStorages:false
		}

		Store.dispatch(reset('admitCreateForm'));

	}

	onCreateSubmit(formValues) {
		this.setState({
			formValues
		});

		var _this = this;

		setTimeout(function() {
			_this.onConfrimSubmit();
		}, 0);
		// this.openConfirmCreateDialog();
	}

	onConfrimSubmit() {

		let params = this.props.params;
		let {
			formValues
		} = this.state;
		let _this  = this;

		Http.request('updateFinaContractIntentletter', {}, formValues).then(function(response) {
			_this.removeAllLocalStorage();
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openEditAgreement=false;


			// location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

		this.openConfirmCreateDialog();
	}

	onCancel() {
		let {
			params
		} = this.context;
		this.removeLocalStorage();
		allState.openEditAgreement=false;

		// window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}
	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId+'INTENTIONedit';
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
	removeAllLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId;
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
		let keyWord = params.orderId+''+ params.customerId+'INTENTIONedit';
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

	openConfirmCreateDialog() {
		this.setState({
			openConfirmCreate: !this.state.openConfirmCreate
		});
	}

	componentDidMount() {
		this.getlocalSign();
	// 	this.getBasicData();
	// 	this.getLocalStorageSata();
	}
	//获取基础数据
	getBasicData=()=>{
		var _this = this;
		const {
			params
		} = this.props
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];
		let delStationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			type :1,
		}).then(function(response) {

			let keyWord = params.orderId+''+ params.customerId+'INTENTIONedit';

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
			initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
			initialValues.setLocalStorageDate = +new Date();
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';

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
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

			Http.request('showFinaContractIntentletter', {
				id: params.id
			}).then(function(response) {
				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.contractcode =response.contractcode;
				initialValues.lessorContactid = response.lessorContactid;
				initialValues.templockday = response.templockday;
				optionValues.contractFileList =  response.contractFileList;
				initialValues.contractFileList =  response.contractFileList;
				// initialValues.lessorContactid = response.lessorContactid;
				initialValues.leaseAddress = response.leaseAddress;
				initialValues.lessorContactName =  response.lessorContactName;
				initialValues.leaseContact =response.leaseContact;
				initialValues.leaseContacttel = response.leaseContacttel;
				initialValues.contractVersionType = response.contractVersion;
				if (response.payType) {
					initialValues.paytype = response.payType.id;

				}
				if (response.payment) {
					optionValues.payment = response.payment;
					initialValues.paymentId =response.payment.id;

				}
				if (response.boardroomnum) {
					initialValues.boardroomnum =response.boardroomnum;
				}
				initialValues.stationnum = response.stationnum;
				initialValues.wherefloor = response.wherefloor;
				initialValues.contractmark = response.contractmark || '';
				optionValues.lessorContactName = response.lessorContactName;
				initialValues.lessorContacttel = response.lessorContacttel;
				initialValues.totaldownpayment = response.totaldownpayment;
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement = response.agreement;
				}

				//时间
				initialValues.leaseBegindate =  DateFormat(response.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
				initialValues.leaseEnddate = DateFormat(response.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
				initialValues.signdate = DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");
				initialValues.stationVos = response.stationVos;
				initialValues.delStationVos =[];
				//处理stationvos
				stationVos = initialValues.stationVos;
				delStationVos = initialValues.delStationVos;
				_this.setState({
					initialValues,
					optionValues,
					stationVos,
					delStationVos
				});

			}).catch(function(err) {
				Notify.show([{
					message: '后台出错请联系管理员',
					type: 'danger',
				}]);
			});


		}).catch(function(err) {
			Notify.show([{
				message: '后台出错请联系管理员',
				type: 'danger',
			}]);
		});

	}

	//获取缓存数据
	getLocalStorageSata=()=>{
		var _this = this;
		const {
			params
		} = this.props
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];
		let delStationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			type :1,
		}).then(function(response) {
			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;


			initialValues.setLocalStorageDate = +new Date();

			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'INTENTION';

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
			optionValues.leaseAddress = response.customer.customerAddress;
			optionValues.communityName = response.customer.communityName;
			optionValues.communityId = response.customer.communityid;
			optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

			Http.request('showFinaContractIntentletter', {
				id: params.id
			}).then(function(response) {
				let keyWord = params.orderId+ ""+params.customerId+'INTENTIONedit';

				initialValues.id = response.id;
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.contractcode =response.contractcode;
				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.templockday = localStorage.getItem(keyWord+'templockday');
				optionValues.contractFileList =  JSON.parse(localStorage.getItem(keyWord+'contractFileList')) || [];
				// initialValues.lessorContactid = response.lessorContactid;
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress');
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.contractVersionType = localStorage.getItem(keyWord+'contractVersionType');
				if (response.payType) {
					initialValues.paytype = response.payType.id;

				}
				if (response.payment) {
					optionValues.payment = response.payment;
					initialValues.paymentId =response.payment.id;

				}
				if (response.boardroomnum) {
					initialValues.boardroomnum = localStorage.getItem(keyWord+'boardroomnum');
				}
				initialValues.stationnum = localStorage.getItem(keyWord+'stationnum')|| response.stationnum;
				initialValues.wherefloor = localStorage.getItem(keyWord+'wherefloor')|| response.wherefloor;
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark')||  '';
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.totaldownpayment = localStorage.getItem(keyWord+'totaldownpayment');
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = localStorage.getItem(keyWord+'agreement');
				}else{
					initialValues.agreement = localStorage.getItem(keyWord+'agreement');
				}

				//时间
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate')|| DateFormat(response.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate') ||  DateFormat(response.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
				initialValues.signdate =  localStorage.getItem(keyWord+'signdate') ||  DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");
				initialValues.stationVos = JSON.parse(localStorage.getItem(keyWord+'stationVos')) || [];
				initialValues.delStationVos = JSON.parse(localStorage.getItem(keyWord+'delStationVos')) || [];
				//处理stationvos
				stationVos = initialValues.stationVos;
				delStationVos = initialValues.delStationVos;
				initialValues.oldNum = localStorage.getItem(keyWord+'num')||1;
				initialValues.num = 1+parseInt(localStorage.getItem(keyWord+'num'));
				_this.setState({
					initialValues,
					optionValues,
					stationVos,
					delStationVos
				});

			}).catch(function(err) {
				Notify.show([{
					message: '后台出错请联系管理员',
					type: 'danger',
				}]);
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

		},function(){
			this.getBasicData()
			this.removeLocalStorage()
		})
	}
	getLocalStorage=()=>{
		this.setState({
			openLocalStorages:false,
		},function(){
			this.getLocalStorageSata();
		})
	}


	render() {

		let {
			initialValues,
			optionValues,
			stationVos,
			delStationVos
		} = this.state;

		return (

			<div style={{marginLeft:22}}>
			<Title value="编辑承租意向书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','承租协议']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} delStationVos={delStationVos} />
			</div>

			{/*<Dialog
				title="确定新建"
				modal={true}
				autoScrollBodyContent={true}
				autoDetectWindowHeight={true}
				open={this.state.openConfirmCreate} >
						<ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} />
			  </Dialog>*/}
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
