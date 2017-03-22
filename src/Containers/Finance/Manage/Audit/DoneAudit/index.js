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
  Message,
  Tooltip,
  Drawer
} from 'kr-ui';

import SearchsForm from './SearchForm';
import HightSearchForm from './HightSearchForm';
import './index.less';
import ViewAudit from './ViewAudit';
import EditMoney from './EditMoney';
export default class DoneAudit extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openSearch: false,
      itemDetail: {},
      delAudit: false,
      openEditCreate: false,
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'RETURNED'
      }
    }

  }

  componentDidMount() {}
    //导出
  onExport = (values) => {
      let idList = [];
      if (values.length != 0) {
        values.map((item, index) => {
          idList.push(item.id)
        });
      }
      var url = `/api/krspace-finance-web/finaVerify/data/export-excel?idList=${idList}&communityId={communityId}&corporationId={corporationId}&createEndTime={createEndTime}&createStratTime={createStratTime}&customerName={customerName}&dealEndTime={dealEndTime}&dealStartTime={dealStartTime}&flowCategoryId={flowCategoryId}&payWay={payWay}&verifyStatus={verifyStatus}`
      window.location.href = url;
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
    }
  }

  //打开编辑回款
  openEditCreate = () => {
      this.setState({
        openEditCreate: !this.state.openEditCreate
      })
    }
    //打开查看回款
  openView = () => {
      this.setState({
        openView: !this.state.openView
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
    Store.dispatch(Actions.callAPI('del-fina-record', {}, {
      finaVerifyId: this.state.itemDetail.id
    })).then(function(response) {
      Message.success("删除成功");
      _this.setState({
        delAudit: false,
      }, function() {
        window.setTimeout(function() {
          window.location.reload();
        }, 0);
      });
    }).catch(function(err) {
      Message.error(err.message);
      _this.setState({
        delAudit: false,
      });
    });
  }
  searchParams = (form) => {

    this.setState({
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'RETURNED',
        customerName: form.content
      }
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
    });
    this.openSearch();
  }
  EditAuditSubmit = (form) => {
    var _this = this;
    if (form.mainBillId != "") {
      Store.dispatch(Actions.callAPI('edit-flow-verify', {}, form)).then(function(response) {
        Message.success('修改成功');
        _this.openEditCreate();
        window.location.reload();
      }).catch(function(err) {
        Message.error(err.message);
      });
    }
  }

  render() {
    let {
      itemDetail
    } = this.state;
    return (

      <div className="m-done-audit">
            <div className="u-search">
              <SearchsForm onSubmit={this.searchParams} openSearch={this.openSearch}/>
            </div>
             <Table
                  style={{marginTop:10}}
                  ajax={true}
                  ajaxUrlName='get-fince-info'
                  ajaxParams={this.state.Params}
                  onOperation={this.onOperation}
                  onExport={this.onExport}
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
                    </TableRowColumn>
                  </TableRow>
              </TableBody>
               <TableFooter></TableFooter>
            </Table>
            <Dialog
              title="查询"
              modal={true}
              open={this.state.openSearch}
              onClose={this.openSearch}
            >
              <HightSearchForm   onSubmit={this.onSearchSubmit} onCancel={this.openSearch} />
            </Dialog>
            <Drawer
              modal={true}
              width={750}
              open={this.state.openEditCreate}
              onClose={this.openEditCreate}
              openSecondary={true}
            >
              <EditMoney  detail={itemDetail}  onSubmit={this.EditAuditSubmit} onCancel={this.openEditCreate}  />
            </Drawer>
            <Drawer
             modal={true}
             width={750}
             open={this.state.openView}
             onClose={this.openView}
             openSecondary={true}
           >
             <ViewAudit  detail={itemDetail} onCancel={this.openView}  />
           </Drawer>
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
      </div>

    );

  }

}