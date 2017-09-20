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
  Dialog,
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

import './index.less';

import {
  observer,
  inject
} from 'mobx-react';

@inject("CommunityAgreementList")
@observer
export default class JoinCreate extends React.Component {

static contextTypes = {
    params: React.PropTypes.object.isRequired
  }
  static childContextTypes = {
        params: React.PropTypes.object.isRequired
     }

  constructor(props, context) {
    super(props, context);

    this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      stationVos: [],
      initialValues: {},
      optionValues: {},
      formValues: {},
      delStationVos:[],
      openConfirmCreate: false
    }



  }

  onCreateSubmit(formValues) {
    let {
      params,onSubmit
    } = this.props;
   let _this = this;
   let {CommunityAgreementList} = this.props;
   // console.log('formValues',formValues);
   // return;
   formValues.saleList = JSON.stringify(formValues.saleList);
    Http.request('addOrEditContinueContract', {}, formValues).then(function(response) {
      _this.removeAllLocalStorage();
      Notify.show([{
        message: '更新成功',
        type: 'success',
      }]);
      onSubmit && onSubmit()
   formValues.saleList = JSON.parse(formValues.saleList);

      // CommunityAgreementList.ajaxListData({cityName:'',communityName:'',createDateBegin:'',createDateEnd:'',createrName:'',customerName:'',page:'',pageSize:'',salerName:''})
      CommunityAgreementList.openEditAgreement=false;

      // location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/renew/" + response.contractId + "/detail";

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
    let {CommunityAgreementList} = this.props;
    CommunityAgreementList.openEditAgreement=false;
    // window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
  }

   removeLocalStorage=()=>{
    let {params} = this.props;
    let keyWord = params.orderId+''+params.customerId+''+params.id+'RENEWedit';
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

  openConfirmCreateDialog() {
    this.setState({
      openConfirmCreate: !this.state.openConfirmCreate
    });
  }

  componentDidMount() {
    Store.dispatch(reset('reduceCreateForm'));
    this.getlocalSign();
    // this.getBasicData()
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
      initialValues.contractcode = response.contractCode;
      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
      initialValues.setLocalStorageDate = DateFormat(+new Date(),"yyyy-mm-dd 00:00:00");

      //合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
      initialValues.contracttype = 'RENEW';

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

     Http.request('renewshow', {
        id: params.id
      }).then(function(response) {

        //获取localStorage数据s
        let keyWord = params.orderId+''+ params.customerId+''+allState.agreementId+'RENEWedit';
        let mainbillId = localStorage.getItem(keyWord +'mainbillid');
        let customerId = localStorage.getItem(keyWord +'customerId');

        optionValues.lessorContactName = response.lessorContactName;
        initialValues.num = localStorage.getItem(keyWord+'num') ||1;
        initialValues.oldNum = localStorage.getItem(keyWord+'num') ||1;

        optionValues.contractFileList = response.contractFileList;

        initialValues.id = response.id;
        initialValues.leaseId = response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress =response.leaseAddress;
        initialValues.lessorContactName = response.lessorContactName;
        initialValues.leaseContact = response.leaseContact;
        initialValues.leaseContacttel = response.leaseContacttel;
        initialValues.lessorContactid = response.lessorContactid;
        initialValues.payType = response.payType.id
        initialValues.paymodel = response.payment.id;
        initialValues.totaldeposit = response.totaldeposit;
        initialValues.paytype = response.payType.id;
        initialValues.rentaluse = response.rentaluse;
        initialValues.contractmark = response.contractmark;
        initialValues.totalrent = response.totalrent;
        initialValues.contractVersionType = response.contractVersion;
        if (response.rentamount) {
          rentamount = response.rentamount;
          _this.setState({
            rentamount
          });

        }
        if(!response.hasOwnProperty('agreement') || !!!response.agreement){
          initialValues.agreement ='无';
        }else{
          initialValues.agreement = response.agreement;
        }
        initialValues.saleList = response.saleList;
        if(response.saleList){
          initialValues.biaodan = response.saleList.map(item=>{
            if(item){
              return item.tacticsType
            }else{
              return ''
            }
          })
        }else{
          initialValues.biaodan=[]
        }
        initialValues.lessorContacttel = response.lessorContacttel;

        //时间
        initialValues.firstpaydate = DateFormat(response.firstpaydate, "yyyy-mm-dd 00:00:00");
        initialValues.signdate =DateFormat(response.signdate, "yyyy-mm-dd 00:00:00");
        initialValues.leaseBegindate = DateFormat(response.leaseBegindate, "yyyy-mm-dd 00:00:00");
        initialValues.leaseEnddate = DateFormat(response.leaseEnddate, "yyyy-mm-dd 00:00:00");
        delStationVos = [];


        //处理stationvos
        initialValues.stationVos =  response.stationVos;
        stationVos =  response.stationVos;


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

    let keyWord = params.orderId+''+ params.customerId+''+params.id+'RENEWedit';
    let localStorageData = JSON.parse(localStorage.getItem(keyWord)) || {num:1,oldNum:1};


    Http.request('fina-contract-intention', {
      customerId: params.customerId,
      mainBillId: params.orderId,
      communityId: 1,
      type : 1,
    }).then(function(response) {

      initialValues.contractstate = 'UNSTART';
      initialValues.mainbillid = params.orderId;
      initialValues.customerId = params.customerId;
      initialValues.contractcode = response.contractCode;
      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
      initialValues.setLocalStorageDate = +new Date();
      //合同类别，枚举类型（1:意向书,2:入住协议,3:增租协议,4.续租协议,5:减租协议,6退租协议）
      initialValues.contracttype = 'RENEW';

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

      Http.request('renewshow', {
        id: params.id
      }).then(function(response) {


        initialValues.num = localStorageData.num || 1;
      
        if(localStorageData.oldNum && localStorageData.num-localStorageData.oldNum <=1){
          initialValues.oldNum = localStorageData.num;
        }else{
          initialValues.oldNum = 1;
        }
        optionValues = Object.assign({},optionValues,JSON.parse(localStorage.getItem(keyWord)));
        initialValues = Object.assign({},initialValues,JSON.parse(localStorage.getItem(keyWord)));
        if(localStorageData.oldNum && localStorageData.num-localStorageData.oldNum <=1){
          initialValues.oldNum = localStorageData.num;
        }else{
          initialValues.oldNum = localStorageData.oldNum;
        }
        initialValues.saleList = response.saleList;
        if(response.saleList){
          initialValues.biaodan = response.saleList.map(item=>{
            if(item){
              return item.tacticsType
            }else{
              return ''
            }
          })
        }else{
          initialValues.biaodan=[]
        }

        //处理stationvos
        stationVos = initialValues.stationVos || [];
        delStationVos = initialValues.delStationVos || [];

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
    let keyWord = params.orderId+''+ params.customerId+''+params.id+'RENEWedit';
    let localStorageData = JSON.parse(localStorage.getItem(keyWord)) || {num:1,oldNum:1};
    if( localStorageData.num - localStorageData.oldNum>1){
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
    let {CommunityAgreementList} = this.props;
    optionValues.saleList = CommunityAgreementList.saleList;
    return (

      <div>
          <Title value="编辑续租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','续租协议']}/>
      <div style={{marginTop:10}}>
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} delStationVos={delStationVos}/>
      </div>

      <Dialog
        title="确定新建"
        modal={true}
        autoScrollBodyContent={true}
        autoDetectWindowHeight={true}
        open={this.state.openConfirmCreate} onClose={this.openConfirmCreateDialog}>
            <ConfirmFormDetail detail={this.state.formValues} onSubmit={this.onConfrimSubmit} onCancel={this.openConfirmCreateDialog} />
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
