import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
  Actions,
  Store
} from 'kr/Redux';
import {
  reduxForm,
  formValueSelector,
  change
} from 'redux-form';

import {
  Form,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Button,
  Section,
  Grid,
  Row,
  Col,
  Dialog,
  Tabs,
  Tab,
  KrField,
  Title,
  KrDate,
  Tooltip,
  Drawer,
  Message
} from 'kr-ui';
import SearchForm from './SearchForm';
import HightSearchForm from './HightSearchForm';
import AddMoney from './AddMoney';
import NewCreateCustomer from './NewCreateCustomer';
import NewCreateMainbill from './NewCreateMainbill';
import ViewAudit from './ViewAudit';
import EditMoney from './EditMoney';
import GoAudit from './GoAudit';


import './index.less';
export default class ToDoAudit extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openNewCreate: false,
      openView: false,
      delAudit: false,
      openSearch: false,
      openAddCreate: false,
      openEditCreate: false,
      openAudit: false,
      itemDetail: {},
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'UNCHECKED'
      },
      openCreateCustomer: false,
      openCreateMainbill: false,
      CustomerList: {},
      showName: false,
      openSomeAudit: false,
      AuditList: [],
      billOInfo: '',
      customerId: '',
      noneSomeAudit: false,
      mainBill: false,
      mainBillId: '',
      corporationId: ''
    }

  }
  componentWillReceiveProps(nextProps) {
      if (nextProps.tab != this.props.tab) {
        this.setState({
          Params: {
            verifyStatus: 'UNCHECKED'
          }
        }, function() {
          this.getParentCount({
            verifyStatus: 'UNCHECKED'
          })
        })
      }

    }
    //调用获取条目
  getParentCount = (form) => {
    let {
      count
    } = this.props;
    count && count(form);
  }

  //操作相关
  onOperation = (type, itemDetail) => {

      this.setState({
        itemDetail
      });

      if (type == 'view') {
        this.openView();
      } else if (type == 'edit') {
        this.openEditCreate();
      } else if (type == 'delete') {
        this.delAudit(itemDetail);
      } else if (type == 'audit') {
        this.openAudit();
      }
    }
    //打开查看回款
  openView = () => {
    this.setState({
      openView: !this.state.openView
    })
  }
  openEditCreate = () => {
      this.setState({
        openEditCreate: !this.state.openEditCreate
      })
    }
    //审核
  openAudit = () => {
      this.setState({
        openAudit: !this.state.openAudit
      })
    }
    //删除此条数据
  delAudit = (itemDetail) => {
    this.setState({
      itemDetail
    });
    this.setState({
      delAudit: !this.state.delAudit
    })
  }
  sureToDel = (itemDetail) => {
      var _this = this;
      //console.log(itemDetail);
      Store.dispatch(Actions.callAPI('del-fina-unchecked-record', {}, {
        finaVerifyId: this.state.itemDetail.id
      })).then(function(response) {
        Message.success("删除成功");
        _this.setState({
          delAudit: false,
        }, function() {
          window.setTimeout(function() {
            window.location.reload();
          }, 800);
        });
      }).catch(function(err) {
        Message.error(err.message);
        _this.setState({
          delAudit: false,
        });
      });
    }
    //新建客户订单
  onSubmitMainbill = (form) => {
      var _this = this;
      Store.dispatch(Actions.callAPI('save-customer', form, {})).then(function(response) {
        Message.success('新建成功');
        _this.openCreateMainbill();

        _this.setState({
          showName: !_this.state.showName
        })

        _this.setState({
          mainBill: true,
          mainBillId: response.mainBillId,
          customerId: response.customerId,
          corporationId: response.corporationId
        })
        Store.dispatch(change('addMoney', "customerId", response.customerId));
        Store.dispatch(change('addMoney', "mainBillId", response.mainBillId));
      }).catch(function(err) {
        Message.error(err.message);
      });
    }
    //新建订单
  onMainBillSubmit = (form) => {
    form.company = '';
    form.customerId = this.state.customerId;
    var _this = this;
    Store.dispatch(Actions.callAPI('save-main-bill', {}, form)).then(function(response) {
      Message.success('新建成功');
      _this.openCreateMainbill();
      _this.setState({
        showName: !_this.state.showName
      })
      var customerList = {
        label: response.company,
        value: response.customerId
      }

      var mainBills = {
        label: response.mainBillName,
        value: response.mainBillId
      }
      _this.setState({
        mainBill: true,
        mainBillId: response.mainBillId,
        corporationId: response.corporationId
      })

      Store.dispatch(change('addMoney', "mainBillId", response.mainBillId));

    }).catch(function(err) {
      Message.error(err.message);
    });
  }

  onSubmitCustomer = (form) => {

    this.setState({
      CustomerList: form
    })
    this.openCreateCustomer();
    this.openCreateMainbill();


  }

  openCreateMainbill = (id, customerId) => {
    this.setState({
      openCreateMainbill: !this.state.openCreateMainbill,
      billOInfo: id,
      customerId: customerId
    })
  }
  openCreateCustomer = () => {
    this.setState({
      openCreateCustomer: !this.state.openCreateCustomer
    })
  }

  //导出
  onExport = (values) => {
    var searchParams = this.state.Params;
    let idList = [];
    values.map((item, index) => {
      idList.push(item.id)
    });
    var url = `/api/krspace-finance-web/finaVerify/data/export-excel?payWay=${searchParams.payWay || ' '}&idList=${idList}&corporationId=${searchParams.corporationId || ' '}&communityId=${searchParams.communityId || ' '}&createEndTime=${searchParams.createEndTime || ' '}&createStratTime=${searchParams.createStratTime || ' '}&customerName=${searchParams.customerName || ' '}&dealEndTime=${searchParams.dealEndTime || ' '}&dealStartTime=${searchParams.dealStartTime || ' '}&flowCategoryId=${searchParams.flowCategoryId || ' '}&verifyStatus=UNCHECKED`;
    console.log("2", values);
    console.log("list", idList);
    window.location.href = url;

  }
  searchParams = (form) => {
    this.setState({
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'UNCHECKED',
        customerName: form.content
      }
    }, function() {
      this.getParentCount({
        verifyStatus: 'UNCHECKED',
        customerName: form.content
      })
    });
  }

  openSearch = () => {
    this.setState({
      openSearch: !this.state.openSearch
    })
  }
  onSearchSubmit = (form) => {

      this.setState({
        Params: form
      }, function() {
        this.getParentCount(form)
      });
      this.openSearch();
    }
    //打开添加回款
  openAddCreate = () => {
      this.setState({
        openAddCreate: !this.state.openAddCreate
      })
    }
    //添加回款保存
  AddOnSubmit = (form) => {
      var _this = this;
      if (form.mainBillId != "") {
        Store.dispatch(Actions.callAPI('save-flow-verify', {}, form)).then(function(response) {
          Message.success('新建成功');
          _this.openAddCreate();
          window.location.reload();
        }).catch(function(err) {
          Message.error(err.message);
        });
      }


    }
    //编辑保存
  onEditSubmit = (form) => {
      var _this = this;
      if (form.mainBillId != "") {
        Store.dispatch(Actions.callAPI('edit-flow-unchecked-verify', {}, form)).then(function(response) {
          Message.success('修改成功');
          _this.openEditCreate();
          window.location.reload();
        }).catch(function(err) {
          Message.error(err.message);
        });
      }

    }
    //打开批量审核
  openSomeAudit = () => {
    console.log("123", this.AuditNum);
    if (!this.AuditNum) {
      this.noneSomeAudit();
    } else {
      console.log("hhhhhhnmd");
      this.setState({
        openSomeAudit: !this.state.openSomeAudit
      })
    }
  }
  onSelect = (values, list) => {
      console.log("jinrusele");
      let {
        AuditList
      } = this.state;
      AuditList = [];
      var n = 0;
      if (list.length != 0) {
        list.map((item, value) => {
          AuditList.push(item.id)
          n++;
        });
      }
      this.AuditNum = n;
      console.log(AuditList);
      this.AuditList = AuditList;
    }
    //批量审核
  AuditSome = () => {
    console.log(this.AuditList);
    Store.dispatch(Actions.callAPI('batch-edit-verify-status', {}, {
      finaVerifyIds: this.AuditList,
    })).then(function(response) {
      Message.success("审核成功");
      window.setTimeout(function() {
        window.location.reload();
      }, 800);
    }).catch(function(err) {
      Message.error(err.message);
    });
  }
  noneSomeAudit = () => {
    this.setState({
      noneSomeAudit: !this.state.noneSomeAudit
    })

  }
  render() {
    let {
      CustomerList,
      itemDetail,
      billOInfo,
      customerId,
      mainBill,
      mainBillId,
      corporationId
    } = this.state;
    console.log('corporationId1111', corporationId)
    return (

      <div className="m-todo-audit">
            <div className="u-search">
                  <SearchForm
                          onSubmit={this.searchParams}
                          openSearch={this.openSearch}
                          openAdd={this.openAddCreate}
                          openSomeAudit={this.openSomeAudit}
                  />
            </div>
            <Table
                  style={{marginTop:10}}
                  ajax={true}
                  ajaxUrlName='get-fince-info'
                  ajaxParams={this.state.Params}
                  onOperation={this.onOperation}
                  onExport={this.onExport}
                  onSelect={this.onSelect}
                  exportSwitch={true}
              >
              <TableHeader>
                  <TableHeaderColumn>流水号</TableHeaderColumn>
                  <TableHeaderColumn>收款方式</TableHeaderColumn>
                  <TableHeaderColumn>收款日期</TableHeaderColumn>
                  <TableHeaderColumn>主体</TableHeaderColumn>
                  <TableHeaderColumn>我司账号</TableHeaderColumn>
                  <TableHeaderColumn>社区</TableHeaderColumn>
                  <TableHeaderColumn>付款账户</TableHeaderColumn>
                  <TableHeaderColumn>付款金额</TableHeaderColumn>
                  <TableHeaderColumn>客户名称</TableHeaderColumn>
                  <TableHeaderColumn>收款人</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                    <TableRowColumn name="tradingCode" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:80,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payWayName"></TableRowColumn>
                    <TableRowColumn name="dealTime"  component={(value, oldValue) => {
                          return (<KrDate value={value} format="yyyy-mm-dd"/>)
                    }}></TableRowColumn>
                    <TableRowColumn name="corporationName"component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="accountNum" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="communityName" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payAccount" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="flowAmount"></TableRowColumn>
                    <TableRowColumn name="company" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payee" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="remark" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn>
                        <Button label="查看"  type="operation"  operation="view"/>
                        <Button label="编辑"  type="operation"  operation="edit"/>
                        <Button label="删除"  type="operation"  operation="delete"/>
                        <Button label="审核"  type="operation"  operation="audit"/>
                    </TableRowColumn>
                  </TableRow>
              </TableBody>
               <TableFooter></TableFooter>
            </Table>
            <Dialog
              title="高级查询"
              modal={true}
              open={this.state.openSearch}
              onClose={this.openSearch}
              contentStyle={{width:666}}
            >
              <HightSearchForm   onSubmit={this.onSearchSubmit} onCancel={this.openSearch} />
            </Dialog>
            <Drawer
              modal={true}
              width={750}
              open={this.state.openAddCreate}
              onClose={this.openAddCreate}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
              <AddMoney corporationId={corporationId} customerId={customerId} mainBill={mainBill} mainBillId={mainBillId} openCreateMainbill={this.openCreateMainbill} showName={this.state.showName} onSubmit={this.AddOnSubmit} onCancel={this.openAddCreate} openCreateCustomer={this.openCreateCustomer} />
            </Drawer>
            <Drawer
              modal={true}
              width={750}
              open={this.state.openEditCreate}
              onClose={this.openEditCreate}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
              <EditMoney  detail={itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditCreate} openCreateCustomer={this.openCreateCustomer} />
            </Drawer>
            <Drawer
             modal={true}
             width={750}
             open={this.state.openView}
             onClose={this.openView}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             <ViewAudit  detail={itemDetail} onCancel={this.openView}  />
           </Drawer>
            <Dialog
              title="新建客户"
              modal={true}
              open={this.state.openCreateCustomer}
              onClose={this.openCreateCustomer}
            >
              <NewCreateCustomer
                      onCancel={this.openCreateCustomer}
                      onSubmit={this.onSubmitCustomer}
              />
            </Dialog>
             <Dialog
              title="新建订单"
              modal={true}
              open={this.state.openCreateMainbill}
              onClose={this.openCreateMainbill}
            >
              <NewCreateMainbill
                      detail={CustomerList}
                      billOInfo={billOInfo}
                      onCancel={this.openCreateMainbill}
                      onSubmit={this.onSubmitMainbill}
                      onMainBillSubmit={this.onMainBillSubmit}
                      customerId={customerId}

              />
            </Dialog>
            <Dialog
              title="提示"
              modal={true}
              contentStyle ={{ width: '444',height:'238px',overflow:'visible'}}
              open={this.state.delAudit}
              onClose={this.delAudit}
            >
            <div className='list-delete'>
              <p className='sureIncome'>是否确定删除？</p>


                <div style={{paddingLeft:'100px'}}>
                      <div  className='ui-btn-center'><Button  label="确定"  onTouchTap={this.sureToDel}/></div>
                      <Button  label="取消" type="button" cancle={true} onTouchTap={this.delAudit} />

                         </div>

            </div>
            </Dialog>
            <Dialog
              title="审核"
              modal={true}
              contentStyle ={{ width: '662',overflow:'visible'}}
              open={this.state.openAudit}
              onClose={this.openAudit}
            >
              <GoAudit  detail={itemDetail} onSubmit="" onCancel={this.openAudit} />
            </Dialog>

            <Dialog
              title="批量审核"
              modal={true}
              contentStyle ={{ width: '444',overflow:'visible'}}
              open={this.state.openSomeAudit}
              onClose={this.openSomeAudit}
            >
            <div className='list-delete'>
              <p className='sureAudit'>确认要批量审核所选择的{this.AuditNum}条数据嘛？审核后数据无法进行修改！</p>


                <div style={{paddingLeft:'100px'}}>
                      <div  className='ui-btn-center'><Button  label="确定" onClick={this.AuditSome}/></div>
                      <Button  label="取消" type="button" cancle={true} onTouchTap={this.openSomeAudit} />

                         </div>

            </div>
            </Dialog>
            <Dialog
              title="提示"
              modal={true}
              contentStyle ={{ width: '444',overflow:'visible'}}
              open={this.state.noneSomeAudit}
              onClose={this.noneSomeAudit}
            >
            <div className='list-delete'>
              <p className='sureAudit' style={{textAlign:'center'}}>请先选择审核数据！</p>


              <div style={{textAlign:'center'}}>
                      <div  className='ui-btn-center'><Button  label="确定" onClick={this.noneSomeAudit}/></div>
                      <Button  label="取消" type="button" cancle={true} onTouchTap={this.noneSomeAudit} />
                      </div>
            </div>
            </Dialog>
      </div>

    );

  }

}