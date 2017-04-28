import React from 'react';
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
	Notify,
	BreadCrumbs,
	Title,
	Dialog,
  Section,
  Grid,
  Row,
  ListGroup,
  ListGroupItem,
  Button
} from 'kr-ui';

import './index.less';
import NewCreateForm from './NewCreateForm';
import allState from "../../State";


export default class JoinCreate extends React.Component {

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

		this.onCreateSubmit = this.onCreateSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		this.state = {
			stationVos: [],
			initialValues: {},
			optionValues: {},
			formValues: {},
			delStationVos:[]
		}


	}

	onCreateSubmit(formValues) {
		formValues = Object.assign({}, formValues);
		let {
			params
		} = this.props;

		let _this = this;
		Http.request('addOrEditIncreaseContract', {}, formValues).then(function(response) {

			_this.removeAllLocalStorage();
			Notify.show([{
				message: '更新成功',
				type: 'success',
			}]);
			allState.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
			allState.openEditAgreement=false;

			//location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/increase/" + response.contractId + "/detail";

		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	onCancel() {
		this.removeLocalStorage();
		let {
			params
		} = this.context;
		allState.openEditAgreement=false;
		//window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
	}

	removeLocalStorage=()=>{
		let {params} = this.props;
		let keyWord = params.orderId+''+params.customerId+''+allState.agreementId+'ADDRENTedit';
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

	componentDidMount() {
		Store.dispatch(reset('increaseCreateForm'));
		this.getlocalSign()
	}

	getBasicData=()=>{

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];
		let delStationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 1,
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.setLocalStorageDate = +new Date();
			// initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

			initialValues.contractcode = response.contractCode;

			if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement = response.agreement;
				}
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';

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


			Http.request('show-checkin-agreement', {
				id: params.id
			}).then(function(response) {

				let keyWord = params.orderId+''+params.customerId+''+allState.agreementId+'ADDRENTedit';
				initialValues.num = localStorage.getItem(keyWord+'num')||1;
				if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=2){
					initialValues.oldNum = localStorage.getItem(keyWord+'num')||1;
				}
				
				optionValues.lessorContactName = response.lessorContactName;
				optionValues.contractFileList = response.contractFileList;
				initialValues.id = response.id;
				initialValues.leaseId = response.leaseId;
				initialValues.contractcode = response.contractcode;
				initialValues.contractVersionType = response.contractVersion;

				initialValues.lessorContactid = response.lessorContactid;
				initialValues.lessorContactName = response.lessorContactName;

				initialValues.leaseId =  response.leaseId;
				initialValues.leaseAddress =  response.leaseAddress;
				initialValues.leaseContact =  response.leaseContact;
				initialValues.leaseContacttel =  response.leaseContacttel;
				initialValues.paytype =  response.payType.id;
				initialValues.paymodel =  response.payment.id;
				initialValues.stationnum = response.stationnum;
				initialValues.wherefloor =  response.wherefloor;
				initialValues.rentaluse =  response.rentaluse;
				initialValues.contractmark =  response.contractmark || '';
				initialValues.totalrent =  response.totalrent;
				initialValues.totaldeposit = response.totaldeposit;
				initialValues.lessorContacttel =  response.lessorContacttel;
				if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement =  '无';
				}else{
					initialValues.agreement =  response.agreement;
				}
				//时间
				initialValues.firstpaydate =  DateFormat(response.firstpaydate,'yyyy-mm-dd hh:MM:ss');
				initialValues.signdate = DateFormat(response.signdate,'yyyy-mm-dd hh:MM:ss');
				initialValues.leaseBegindate =DateFormat(response.leaseBegindate,'yyyy-mm-dd hh:MM:ss');
				initialValues.leaseEnddate = DateFormat(response.leaseEnddate,'yyyy-mm-dd hh:MM:ss');

				initialValues.stationVos = response.stationVos;
				initialValues.delStationVos = [];
				stationVos = initialValues.stationVos;
				delStationVos = initialValues.delStationVos;

				//处理stationvos

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
	getLocalStorageSata=()=>{

		var _this = this;
		const {
			params
		} = this.props;
		let initialValues = {};
		let optionValues = {};
		let stationVos = [];
		let delStationVos = [];

		Http.request('fina-contract-intention', {
			customerId: params.customerId,
			mainBillId: params.orderId,
			communityId: 1,
			type : 1,
		}).then(function(response) {

			initialValues.contractstate = 'UNSTART';
			initialValues.mainbillid = params.orderId;
			initialValues.customerId = params.customerId;
			initialValues.leaseContact = response.customer.customerMember;
			initialValues.leaseContacttel = response.customer.customerPhone;
			initialValues.setLocalStorageDate = +new Date();
			// initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

			initialValues.contractcode = response.contractCode;


			if(!response.hasOwnProperty('agreement') || !!!response.agreement){
					initialValues.agreement = '无';
				}else{
					initialValues.agreement = response.agreement;
				}
			optionValues.communityAddress = response.customer.communityAddress;
			optionValues.leaseAddress = response.customer.customerAddress;
			//合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
			initialValues.contracttype = 'ADDRENT';

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


			Http.request('show-checkin-agreement', {
				id: params.id
			}).then(function(response) {
				let keyWord = params.orderId+''+params.customerId+''+allState.agreementId+'ADDRENTedit';
				optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');
				optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList'))|| [];
				initialValues.id = response.id;
				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'lessorContactName'));
				initialValues.contractcode = response.contractcode;
				initialValues.contractVersionType = localStorage.getItem(keyWord+'contractVersionType');

				initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid');
				initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName');

				initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId'));
				initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress');
				initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact');
				initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel');
				initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype'));
				initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel'));
				initialValues.stationnum = localStorage.getItem(keyWord+'stationnum');
				initialValues.wherefloor = localStorage.getItem(keyWord+'wherefloor');
				initialValues.rentaluse = localStorage.getItem(keyWord+'rentaluse');
				initialValues.contractmark = localStorage.getItem(keyWord+'contractmark')||  '';
				initialValues.totalrent = localStorage.getItem(keyWord+'totalrent');
				initialValues.totaldeposit = localStorage.getItem(keyWord+'totaldeposit');
				initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel');
				initialValues.agreement = localStorage.getItem(keyWord+'agreement')
				//时间
				initialValues.firstpaydate =localStorage.getItem(keyWord+'firstpaydate')||  DateFormat(response.firstpaydate,'yyyy-mm-dd hh:MM:ss');
				initialValues.signdate =localStorage.getItem(keyWord+'signdate')||  DateFormat(response.signdate,'yyyy-mm-dd hh:MM:ss');
				initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate')|| DateFormat(response.leaseBegindate,'yyyy-mm-dd hh:MM:ss');
				initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate')|| DateFormat(response.leaseEnddate,'yyyy-mm-dd hh:MM:ss');

				initialValues.stationVos = JSON.parse(localStorage.getItem(keyWord+'stationVos')) || [];
				initialValues.delStationVos = JSON.parse(localStorage.getItem(keyWord+'delStationVos')) || [];
				stationVos = initialValues.stationVos;
				delStationVos = initialValues.delStationVos;


				initialValues.oldNum = localStorage.getItem(keyWord+'num')||1;
				initialValues.num = 1+parseInt(localStorage.getItem(keyWord+'num'));

				//处理stationvos

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




getlocalSign=()=>{
    let {
      params
    } = this.props;
    let _this = this;
    let sign = false;
    let keyWord = params.orderId+''+ params.customerId+''+allState.agreementId+'ADDRENTedit';
       if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')>2){
        _this.setState({
          openLocalStorages:true
        })
        sign = true;

       }
     if(!sign){
      this.getBasicData()
     }
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

			<div>
			<Title value="编辑增租协议书_财务管理"/>
		 	<BreadCrumbs children={['系统运营','客户管理','增租协议书']}/>
			<div style={{marginTop:10}}>
					<NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} delStationVos={delStationVos}/>
			</div>

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
