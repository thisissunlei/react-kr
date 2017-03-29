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
  Tooltip,
  Drawer,
  Message
} from 'kr-ui';

import SearchsForm from './SearchForm';

export default class WaitVoucher extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemDetail: {},
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'UNCHECKED'
      },
      infoList: [],
      itemDetail: [],
      openView: false,
      openEditCreate: false,
      Param: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'UNCHECKED'
      },
    }
    this.getInfo(this.state.Param);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tab != this.props.tab) {
      this.setState({
        Params: {
          verifyStatus: 'UNCHECKED'
        }
      }, function() {
        this.getInfo({
          verifyStatus: 'UNCHECKED'
        });
      })
    }

  }
  componentDidMount() {}

  //导出
  onExport = (values) => {
    var searchParams = this.state.Params;
    console.log(searchParams, "123");
    let idList = [];
    values.map((item, index) => {
      idList.push(item.id)
    });
    var url = `/api/krspace-finance-web/finaVerify/data/export-excel?payWay=${searchParams.payWay || ' '}&idList=${idList}&corporationId=${searchParams.corporationId || ' '}&communityId=${searchParams.communityId || ' '}&createEndTime=${searchParams.createEndTime || ' '}&createStratTime=${searchParams.createStratTime || ' '}&customerName=${searchParams.customerName || ' '}&dealEndTime=${searchParams.dealEndTime || ' '}&dealStartTime=${searchParams.dealStartTime || ' '}&flowCategoryId=${searchParams.flowCategoryId || ' '}&verifyStatus=UNCHECKED`;
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
      }
    }
    //保存编辑回款
  // EditAuditSubmit = (form) => {
  //     var _this = this;
  //     var params = Object.assign({}, form);
  //     Store.dispatch(Actions.callAPI('edit-verify-checked', {}, params)).then(function(response) {
  //       Message.success('修改成功');
  //       _this.setState({
  //         Params: {
  //           page: 1,
  //           pageSize: 10,
  //           verifyStatus: 'CHECKED'
  //         }
  //       })
  //       _this.openEditCreate();
  //       _this.getInfo(this.state.Param);
  //
  //     }).catch(function(err) {});
  //
  //   }
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

  getInfo = (form) => {
    var params = Object.assign({}, form);
    var _this = this;
    Store.dispatch(Actions.callAPI('get-fina-flow-category', params, {})).then(function(response) {
      _this.setState({
        infoList: response
      })

    }).catch(function(err) {});

  }
  searchParams = (form) => {
    var _this = this;
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
      this.getInfo(this.state.Params);
    });
  }
  openSearch = () => {
    this.setState({
      openSearch: !this.state.openSearch
    })
  }

  render() {
    let {
      itemDetail
    } = this.state;
    return (

      <div className="m-do-audit">
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
                          <TableHeaderColumn>签约方名称</TableHeaderColumn>
                          <TableHeaderColumn>收款方式</TableHeaderColumn>
                          <TableHeaderColumn>付款方名臣</TableHeaderColumn>
                          <TableHeaderColumn>入驻社区</TableHeaderColumn>
                          <TableHeaderColumn>创建人</TableHeaderColumn>
                          <TableHeaderColumn>创建时间</TableHeaderColumn>
                          <TableHeaderColumn>备注说明</TableHeaderColumn>
                          <TableHeaderColumn>操作</TableHeaderColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
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
      </div>

    );

  }

}
