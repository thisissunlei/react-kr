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
import {DateFormat} from 'kr/Utils';
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
import './index.less';

export default class JoinCreate extends React.Component {

  static contextTypes = {
    params: React.PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.openConfirmCreateDialog = this.openConfirmCreateDialog.bind(this);
    this.onCreateSubmit = this.onCreateSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.state = {
      stationVos: [],
      delStationVos:[],
      initialValues: {},
      optionValues: {},
      formValues: {},
      openConfirmCreate: false,
      openLocalStorages:false
    }

    Store.dispatch(reset('reduceCreateForm'));

  }

  onCreateSubmit(formValues) {
    let {
      params
    } = this.props;
    let _this = this;
    Store.dispatch(Actions.callAPI('addOrEditContinueContract', {}, formValues)).then(function(response) {
      _this.removeLocalStorage();      
      Notify.show([{
        message: '更新成功',
        type: 'success',
      }]);
      location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/renew/" + response.contractId + "/detail";

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
    window.location.href = `./#/operation/customerManage/${params.customerId}/order/${params.orderId}/detail`;
  }

  removeLocalStorage=()=>{
    let {params} = this.props;
    let keyWord = params.orderId+params.customerId+'RENEWedit';
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
    let keyWord = params.orderId+ params.customerId+'RENEWedit';
       if(localStorage.getItem(keyWord_'num')>3){
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
    let delStationVos =[];

    Store.dispatch(Actions.callAPI('fina-contract-intention', {
      customerId: params.customerId,
      mainBillId: params.orderId,
      communityId: 1,
      type :1,

    })).then(function(response) {


      let keyWord = params.orderId+ params.customerId+'RENEWedit';
      initialValues.num = localStorage.getItem(keyWord+'num')|| 1;

      initialValues.contractstate = 'UNSTART';
      initialValues.mainbillid = params.orderId;
      initialValues.customerId = params.customerId;

      initialValues.setLocalStorageDate = +new Date();

      // initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

      // optionValues.contractCode = response.contractCode;
      
      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
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

      Store.dispatch(Actions.callAPI('renewshow', {
        id: params.id
      })).then(function(response) {

        optionValues.lessorContactName =response.lessorContactName;

        optionValues.contractFileList =response.contractFileList;

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
        initialValues.paytype =response.payType.id;
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
          initialValues.agreement = '无';
        }else{
          initialValues.agreement = response.agreement;
        }
        initialValues.lessorContacttel = response.lessorContacttel;

        //时间
        initialValues.firstpaydate = DateFormat(response.firstpaydate, "yyyy-mm-dd hh:MM:ss");
        initialValues.signdate = DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseBegindate = DateFormat(response.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseEnddate = DateFormat(response.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
        delStationVos = [];



        //处理stationvos
        stationVos =response.stationVos;



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
    let delStationVos =[];

    Store.dispatch(Actions.callAPI('fina-contract-intention', {
      customerId: params.customerId,
      mainBillId: params.orderId,
      communityId: 1,
      type :1,

    })).then(function(response) {

      initialValues.contractstate = 'UNSTART';
      initialValues.mainbillid = params.orderId;
      initialValues.customerId = params.customerId;

      initialValues.setLocalStorageDate = +new Date();

      // initialValues.signdate = +new Date((new Date()).getTime() - 24 * 60 * 60 * 1000);

      // optionValues.contractCode = response.contractCode;
      
      optionValues.communityAddress = response.customer.communityAddress;
      optionValues.leaseAddress = response.customer.customerAddress;
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

      Store.dispatch(Actions.callAPI('renewshow', {
        id: params.id
      })).then(function(response) {
        //获取localStorage数据s
        let keyWord = params.orderId+ params.customerId+'RENEWedit';
        let mainbillId = localStorage.getItem(keyWord +'mainbillid');
        let customerId = localStorage.getItem(keyWord +'customerId');

        optionValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName') ||response.lessorContactName;

        optionValues.contractFileList = JSON.parse(localStorage.getItem(keyWord+'contractFileList')) ||response.contractFileList;

        initialValues.id = response.id;
        initialValues.leaseId = parseInt(localStorage.getItem(keyWord+'leaseId')) || response.leaseId;
        initialValues.contractcode = response.contractcode;
        initialValues.leaseAddress = localStorage.getItem(keyWord+'leaseAddress') ||response.leaseAddress;
        initialValues.lessorContactName = localStorage.getItem(keyWord+'lessorContactName') ||response.lessorContactName;
        initialValues.leaseContact = localStorage.getItem(keyWord+'leaseContact') ||response.leaseContact;
        initialValues.leaseContacttel = localStorage.getItem(keyWord+'leaseContacttel') ||response.leaseContacttel;
        initialValues.lessorContactid = localStorage.getItem(keyWord+'lessorContactid') ||response.lessorContactid;
        initialValues.payType = parseInt(localStorage.getItem(keyWord+'payType')) ||response.payType.id
        initialValues.paymodel = parseInt(localStorage.getItem(keyWord+'paymodel')) ||response.payment.id;
        initialValues.totaldeposit = localStorage.getItem(keyWord+'totaldeposit') ||response.totaldeposit;
        initialValues.paytype = parseInt(localStorage.getItem(keyWord+'paytype')) ||response.payType.id;
        initialValues.rentaluse = localStorage.getItem(keyWord+'rentaluse') ||response.rentaluse;
        initialValues.contractmark = localStorage.getItem(keyWord+'contractmark') ||response.contractmark;
        initialValues.totalrent = localStorage.getItem(keyWord+'totalrent') ||response.totalrent;
        initialValues.contractVersionType = response.contractVersion;
        if (response.rentamount) {
          rentamount = response.rentamount;
          _this.setState({
            rentamount
          });

        }
        if(!response.hasOwnProperty('agreement') || !!!response.agreement){
          initialValues.agreement = localStorage.getItem(keyWord+'agreement') ||'无';
        }else{
          initialValues.agreement = localStorage.getItem(keyWord+'agreement') ||response.agreement;
        }
        initialValues.lessorContacttel = localStorage.getItem(keyWord+'lessorContacttel') ||response.lessorContacttel;

        //时间
        initialValues.firstpaydate = localStorage.getItem(keyWord+'firstpaydate')||DateFormat(response.firstpaydate, "yyyy-mm-dd hh:MM:ss");
        initialValues.signdate = localStorage.getItem(keyWord+'signdate')||DateFormat(response.signdate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseBegindate = localStorage.getItem(keyWord+'leaseBegindate')||DateFormat(response.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
        initialValues.leaseEnddate = localStorage.getItem(keyWord+'leaseEnddate')||DateFormat(response.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
        delStationVos = JSON.parse(localStorage.getItem(keyWord+'delStationVos')) || [];



        //处理stationvos
        stationVos =  JSON.parse(localStorage.getItem(keyWord+'stationVos')) || response.stationVos;



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
    let {initialValues} = this.state;
    this.setState({
      openLocalStorages:false,

    })  
    this.getBasicData();
  }
  getLocalStorage=()=>{
    this.setState({
      openLocalStorages:false,
    })
    
    this.getLocalStorageSata();
    console.log('getLocalStorage')
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
        	<Title value="编辑续租协议书_财务管理"/>
      <BreadCrumbs children={['系统运营','客户管理','续租协议']}/>
      <Section title="续租协议书" description="">
          <NewCreateForm onSubmit={this.onCreateSubmit} initialValues={initialValues} onCancel={this.onCancel} optionValues={optionValues} stationVos={stationVos} delStationVos={delStationVos}/>
      </Section>

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
