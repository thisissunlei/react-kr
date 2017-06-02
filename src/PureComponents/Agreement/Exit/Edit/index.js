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

import {
  observer,
  inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer


export default class EditCreate extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      stationVos: [],
      initialValues: {},
      optionValues: {},
      formValues: {},
      openConfirmCreate: false,
      openLocalStorages:false
    }

    Store.dispatch(reset('exitEditForm'));
  }

  onCreateSubmit(formValues) {
    const {params,onSubmit} = this.props;
    let _this = this;
    let {CommunityAgreementList}= this.props;
     Http.request('addFnaContractWithdrawal', {}, formValues).then(function(response) {
      
     _this.removeLocalStorage();
      Notify.show([{
        message: '编辑成功',
        type: 'success',
      }]);
      onSubmit && onSubmit();
      // CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
      CommunityAgreementList.openEditAgreement=false;

    }).catch(function(err) {
      Notify.show([{
        message: err.message,
        type: 'danger',
      }]);
    });
  }

  onCancel() {
    this.cancelRmoveLocalStorage();
    let {
      params
    } = this.context;
    let {CommunityAgreementList} = this.props;
    CommunityAgreementList.openEditAgreement=false;
  }
  removeLocalStorage=()=>{
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
  cancelRmoveLocalStorage=()=>{
    let {params} = this.props;
    let keyWord = params.orderId+''+params.customerId +'QUITRENTedit';
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
    let removeList = [];
    for (var i = 0; i < localStorage.length; i++) {
      let itemName = localStorage.key(i);
       if(localStorage.key(i).indexOf('NaN')!='-1' || localStorage.key(i).indexOf('undefined')!='-1'){
         removeList.push(itemName);
       }
     }
      removeList.map((item)=>{
       localStorage.removeItem(item);
    })
    let keyWord = params.orderId+ ''+params.customerId+'QUITRENTedit';
    let localData = JSON.parse(localStorage.getItem(keyWord)) ;
    if(!localData){
      this.getBasicData();
      return;
    }
    let num = JSON.parse(localStorage.getItem(keyWord)).num || 0;
    let oldNum = JSON.parse(localStorage.getItem(keyWord)).oldNum || 0;
       if(num-oldNum>1){
        _this.setState({
          openLocalStorages:true
        })
        sign = true;
       }
    if(!sign){
      this.getBasicData();
    }
  }

  componentDidMount() {
    this.getlocalSign();
  }


  getLocalStorageSata=()=>{
     var _this = this;
    const {
      params
    } = this.props;
    let initialValues = {};
    let optionValues = {};
    let stationVos = [];


    let keyWord = params.orderId+''+ params.customerId+'QUITRENTedit';
    let localStorageData = JSON.parse(localStorage.getItem(keyWord)) || {num:1,oldNum:1};




    Http.request('fina-contract-intention', {
      customerId: params.customerId,
      mainBillId: params.orderId,
      type :1,
    }).then(function(response) {
      
        initialValues = JSON.parse(localStorage.getItem(keyWord));

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
      // optionValues.contractCode = response.contractCode;
      optionValues.floorList = response.customer.floor;
      optionValues.customerName = response.customer.customerName;
      optionValues.leaseAddress = response.customer.customerAddress;
      optionValues.communityName = response.customer.communityName;
      optionValues.communityId = response.customer.communityid;
      optionValues.mainbillCommunityId = response.mainbillCommunityId || 1;

      Http.request('getFnaContractWithdrawalById', {
        id: params.id
      }).then(function(response) {
         //获取localStorage数据s
        let keyWord = params.orderId+ params.customerId+'QUITRENTedit';
        let mainbillId = localStorage.getItem(keyWord +'mainbillid');
        let customerId = localStorage.getItem(keyWord +'customerId');

        optionValues.contractFileList =  JSON.parse(localStorage.getItem(keyWord+'contractFileList'))||[];
        optionValues.lessorContactName =  localStorage.getItem(keyWord+'lessorContactName');
        stationVos = response.stationVos;
        if(localStorageData.oldNum && localStorageData.num-localStorageData.oldNum <=1){
          initialValues.oldNum = localStorageData.num;
        }else{
          initialValues.oldNum = localStorageData.oldNum;
        }


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
      console.log(err)
      Notify.show([{
        message: '后台出错请联系管理员',
        type: 'danger',
      }]);
    });

  }



  getBasicData=()=>{
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
      type :1,
    }).then(function(response) {

       let keyWord = params.orderId+ params.customerId+'QUITRENTedit';
      initialValues.num = localStorage.getItem(keyWord+'num')|| 1;
      // if(localStorage.getItem(keyWord+'num')-localStorage.getItem(keyWord+'oldNum')<=1){
        initialValues.oldNum = localStorage.getItem(keyWord+'num')|| 1;
      // }

      //initialValues.ContractStateType = 'EXECUTE';

      initialValues.mainbillid = params.orderId;
      initialValues.customerId = params.customerId;

      initialValues.setLocalStorageDate = +new Date();

      initialValues.leaseBegindate = DateFormat(new Date , "yyyy-mm-dd hh:MM:ss");
      initialValues.leaseEnddate =  DateFormat(new Date , "yyyy-mm-dd hh:MM:ss");


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
      // optionValues.contractCode = response.contractCode;
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
        initialValues.leaseId =response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress =response.leaseAddress;
        initialValues.lessorContactName =  response.lessorContactName;
        initialValues.leaseContact = response.leaseContact;
        initialValues.lessorContacttel =response.lessorContacttel;
        initialValues.leaseContacttel = response.leaseContacttel;
        initialValues.contractVersionType =response.contractVersion;
        if (response.payType) {
          initialValues.paytype = response.payType.id;

        }
        if (response.payment) {
          initialValues.paymodel =response.payment.id;

        }
        if(!response.hasOwnProperty('agreement')  || !!!response.agreement){
          initialValues.agreement = '无';
        }else{
          initialValues.agreement = response.agreement;
        }
        initialValues.stationnum = response.stationnum;
        initialValues.wherefloor =response.wherefloor;
        initialValues.rentaluse = response.rentaluse;
        initialValues.contractmark = response.contractmark;
        initialValues.totalrent = response.totalrent;
        initialValues.totaldeposit = response.totaldeposit;
        initialValues.lessorContactid =response.lessorContactid;
        initialValues.depositamount = response.depositamount || 0;
        initialValues.totalreturn = response.totalreturn || 0;
        //时间

        initialValues.signdate = DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseBegindate =DateFormat(response.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseEnddate = DateFormat(response.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
        initialValues.withdrawdate =DateFormat(response.withdrawdate , "yyyy-mm-dd hh:MM:ss");


        //处理stationvos
        stationVos = response.stationVos;


        _this.setState({
          initialValues,
          optionValues,
          stationVos
        });

      }).catch(function(err) {
        console.log(err)
        Notify.show([{
          message: '后台出错请联系管理员',
          type: 'danger',
        }]);
      });


    }).catch(function(err) {
      console.log(err)
      Notify.show([{
        message: '后台出错请联系管理员',
        type: 'danger',
      }]);
    });

  }

  onCancelStorage=()=>{
    let {initialValues} = this.state;
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


  render() {

    let {
      initialValues,
      optionValues,
      stationVos
    } = this.state;
    return (

      <div>
      <Title value="编辑退租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','退租协议']}/>
      <div>
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos}/>
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
