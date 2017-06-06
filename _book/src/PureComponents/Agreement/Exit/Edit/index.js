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
import {Http} from 'kr/Utils'
import {
  Dialog,
  Section,
  Grid,
  Notify,
  BreadCrumbs,
  Title,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';
// import allState from "../../State";

import {
  observer,
  inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer

export default class EditCreate extends Component {

  constructor(props, context) {
    super(props, context);

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      stationVos: [],
      initialValues: {},
      optionValues: {},
      formValues: {},
      openConfirmCreate: false
    }

    Store.dispatch(reset('exitEditForm'));
  }

  onCreateSubmit(formValues) {
    const {params} = this.props;
    Http.request('addFnaContractWithdrawal',formValues).then(function(response) {
      Notify.show([{
        message: '编辑成功',
        type: 'success',
      }]);
      this.props.CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
      this.props.CommunityAgreementList.openEditAgreement=false;

      //location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/exit/" + response.contractId + "/detail";

    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });
  }

  onCancel() {
    //window.history.back();
    this.props.CommunityAgreementList.openEditAgreement=false;
  }

  componentDidMount() {

    var _this = this;
    const {
      params
    } = this.props;
    let initialValues = {};
    let optionValues = {};
    let stationVos = [];

    Http.request('fina-contract-intention', {
      customerId: params.customerId,
      mainBillId: params.orderId,
      type : 1,
    }).then(function(response) {

      //initialValues.ContractStateType = 'EXECUTE';

      initialValues.mainbillid = params.orderId;

      initialValues.leaseBegindate = new Date;
      initialValues.leaseEnddate = new Date;

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

      Http.request('getFnaContractWithdrawalById', {
        id: params.id
      }).then(function(response) {

        optionValues.contractFileList = response.contractFileList;
        optionValues.lessorContactName = response.lessorContactName;

        initialValues.id = response.id;
        initialValues.contractstate = response.contractstate;
        initialValues.leaseId = response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress = response.leaseAddress;
        initialValues.lessorContactName = response.lessorContactName;
        initialValues.leaseContact = response.leaseContact;
        initialValues.lessorContacttel = response.lessorContacttel;
        initialValues.leaseContacttel = response.leaseContacttel;
        initialValues.contractVersionType = response.contractVersion;
        if (response.payType) {
          initialValues.paytype = response.payType.id;

        }
        if (response.payment) {
          initialValues.paymodel = response.payment.id;

        }
        if(!response.hasOwnProperty('agreement') || !!!response.agreement){
          initialValues.agreement = '无';
        }else{
          initialValues.agreement = response.agreement;
        }
        initialValues.stationnum = response.stationnum;
        initialValues.wherefloor = response.wherefloor;
        initialValues.rentaluse = response.rentaluse;
        initialValues.contractmark = response.contractmark;
        initialValues.totalrent = response.totalrent;
        initialValues.totaldeposit = response.totaldeposit;
        initialValues.lessorContactid = response.lessorContactid;
        initialValues.depositamount = response.depositamount;
        initialValues.totalreturn = response.totalreturn;
        //时间

        initialValues.signdate = new Date(response.signdate);
        initialValues.leaseBegindate = new Date(response.leaseBegindate);
        initialValues.leaseEnddate = new Date(response.leaseEnddate);
        initialValues.withdrawdate = response.withdrawdate;


        //处理stationvos
        stationVos = response.stationVos;


        _this.setState({
          initialValues,
          optionValues,
          stationVos
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


  render() {

    let {
      initialValues,
      optionValues,
      stationVos
    } = this.state;
    return (

      <div style={{marginLeft:22}}>
      <Title value="编辑退租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
     <div style={{marginTop:10}}>
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
      </div>
    </div>
    );
  }
}