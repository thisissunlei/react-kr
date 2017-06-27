import React from 'react';
import {
  Actions,
  Store
} from 'kr/Redux';
import {
	Http
} from "kr/Utils";
import {
  reduxForm,
  change
} from 'redux-form';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Button,
  Dialog,
  KrField,
  KrDate,
  Tooltip,
  Drawer,
  Message,
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
export default class ToDoAudit extends React.Component {

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
        verifyStatus: 'UNCHECKED',
        time:new Date(),
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
      switch (type){
        case  'view':{
         this.openView();
          break;
        }
        case  'edit':{
         this.openEditCreate();
          break;
        }
        case  'delete':{
         this.delAudit(itemDetail);
          break;
        }
        case  'audit':{
         this.openAudit();
          break;
        }
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
      Http.request('del-fina-unchecked-record', {}, {
        finaVerifyId: this.state.itemDetail.id
      }).then(function(response) {
        Message.success("删除成功");
        _this.setState({
          delAudit: false,
        }, function() {
          _this.setState({
            Params:{
              verifyStatus:'UNCHECKED',
              time:new Date(),
              pageSize:15,
            }
          })
          _this.getParentCount({
            verifyStatus: 'UNCHECKED'
          })
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
      Http.request('save-customer', form, {}).then(function(response) {
        Message.success('新建成功');
        _this.openCreateMainbill();

        _this.setState({
           showName: !_this.state.showName,
          mainBill: true,
          mainBillId: response.mainBillId,
          customerId: response.customerId,
          corporationId: response.corporationId
        });
        Store.dispatch(change('addMoney', "customerId", response.customerId));
        Store.dispatch(change('addMoney', "mainBillId", response.mainBillId));
      }).catch(function(err) {
        Message.error(err.message);
      });
    }
    //新建订单
  onMainBillSubmit = (form) => {
    var _this = this;
    var {customerId}=this.state;

    form=Object.assign({},form);
    form.company = '';
    form.customerId = customerId;

    Http.request('save-main-bill', {}, form).then(function(response) {
      Message.success('新建成功');
      _this.openCreateMainbill();
      _this.setState({
        mainBill: true,
        showName: !_this.state.showName,
        mainBillId: response.mainBillId,
        corporationId: response.corporationId
      })

      Store.dispatch(change('addMoney', "mainBillId", response.mainBillId));

    }).catch(function(err) {
      Message.error(err.message);
    });
  }

  onSubmitCustomer = (form) => {
    form=Object.assign({},form);
    this.setState({
      CustomerList: form
    })
    this.openCreateCustomer();
    this.openCreateMainbill();


  }

  openCreateMainbill = (billOInfo, customerId) => {
    var {openCreateMainbill}=this.state;
    openCreateMainbill=!openCreateMainbill;
    this.setState({
      openCreateMainbill,
      billOInfo,
      customerId
    });
  }
  openCreateCustomer = () => {
    let  {openCreateCustomer}=this.state;
    openCreateCustomer=!openCreateCustomer;
    this.setState({
      openCreateCustomer
    });
  }

  //导出
  onExport = (values) => {
    var searchParams = this.state.Params;

    var params = {
      payWay:'',
      idList:[],
      corporationId:'',
      communityId:'',
      createEndTime:'',
      createStratTime:'',
      flowCategoryId:'',
      verifyStatus:'UNCHECKED'
    };
    let idList = [];
    values.map((item, index) => {
      idList.push(item.id)
    });
    params = Object.assign({},params,searchParams,{idList});
    var condition = [];
    for(var field in params){
      if (params.hasOwnProperty(field)) {
        condition.push(`${field}=${params[field]}`)
      }
    }
    var url = '/api/krspace-finance-web/finaVerify/data/export-excel?'+condition.join('&');
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
        this.getParentCount(form);
        this.openSearch();
      });

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
      if (!form.mainBillId) {
        return;
      }

      Http.request('save-flow-verify', {}, form).then(function(response) {
          Message.success('新建成功');
          _this.setState({
            Params:{
              verifyStatus:'UNCHECKED',
              time:new Date(),
              pageSize:15,
            }
          })
          _this.getParentCount({
            verifyStatus: 'UNCHECKED'
          })
           _this.openAddCreate();
        }).catch(function(err) {
          Message.error(err.message);
        });


    }
    //编辑保存
  onEditSubmit = (form) => {
      var _this = this;
      if (!form.mainBillId) {
        return;
      }
      Http.request('edit-flow-unchecked-verify', {}, form).then(function(response) {
          Message.success('修改成功');
          _this.openEditCreate();
          _this.setState({
            Params:{
              verifyStatus:'UNCHECKED',
              time:new Date(),
              pageSize:15,
            }
          })
        }).catch(function(err) {
          Message.error(err.message);
        });

    }
    //打开批量审核
  openSomeAudit = () => {
    if (!this.AuditNum) {
      this.noneSomeAudit();
      return;
    }
      this.setState({
        openSomeAudit: !this.state.openSomeAudit
      })

  }
  onSelect = (values, list) => {
      var AuditList = [];
      list.map((item, value) => {
        AuditList.push(item.id)
      });
      this.AuditNum = list.length;
      this.AuditList = AuditList;
    }
    //批量审核
  AuditSome = () => {
    var _this=this;
    this.openSomeAudit();
    Http.request('batch-edit-verify-status', {}, {
      finaVerifyIds: this.AuditList,
    }).then(function(response) {
      Message.success("审核成功");
      _this.setState({
            Params:{
              verifyStatus:'UNCHECKED',
              time:new Date(),
              pageSize:15,
            }
          })
      _this.getParentCount({
        verifyStatus: 'UNCHECKED'
      })
    }).catch(function(err) {
      Message.error(err.message);
    });
  }
  noneSomeAudit = () => {
    let {noneSomeAudit} = this.state;
    noneSomeAudit=!noneSomeAudit
    this.setState({
      noneSomeAudit
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
                    <TableRowColumn name="tradingCode" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:80,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payWayName"></TableRowColumn>
                    <TableRowColumn name="dealTime"  component={(value) => {
                          return (<KrDate value={value} format="yyyy-mm-dd"/>)
                    }}></TableRowColumn>
                    <TableRowColumn name="corporationName"component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="accountNum" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="communityName" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payAccount" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="flowAmount"></TableRowColumn>
                    <TableRowColumn name="company" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="payee" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn name="remark" component={(value)=>{
                            var styles = {
                              display:'block',
                              paddingTop:5
                            };
                            if(value.length==""){
                              styles.display="none"

                            }else{
                              styles.display="block";
                            }
                             return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                           }}></TableRowColumn>
                    <TableRowColumn>
                        <Button label="查看"  type="operation"  operation="view"/>
                        <Button label="编辑" operateCode="fina_verify_editNotVerify" type="operation"  operation="edit"/>
                        <Button label="删除" operateCode="fina_verify_delNotVerify" type="operation"  operation="delete"/>
                        <Button label="审核" operateCode="fina_verify_batch" type="operation"  operation="audit"/>
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
              <HightSearchForm
                    onSubmit={this.onSearchSubmit}
                    onCancel={this.openSearch}
              />
            </Dialog>
            <Drawer
              modal={true}
              width={750}
              open={this.state.openAddCreate}
              onClose={this.openAddCreate}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
              <AddMoney
                    corporationId={corporationId}
                    customerId={customerId}
                    mainBill={mainBill}
                    mainBillId={mainBillId}
                    openCreateMainbill={this.openCreateMainbill}
                    showName={this.state.showName}
                    onSubmit={this.AddOnSubmit}
                    onCancel={this.openAddCreate}
                    openCreateCustomer={this.openCreateCustomer}
              />
            </Drawer>
            <Drawer
              modal={true}
              width={750}
              open={this.state.openEditCreate}
              onClose={this.openEditCreate}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
              <EditMoney
                    detail={itemDetail}
                    onSubmit={this.onEditSubmit}
                    onCancel={this.openEditCreate}
                    openCreateCustomer={this.openCreateCustomer}
              />
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
