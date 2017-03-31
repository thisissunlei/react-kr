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

import './index.less';
import  ItemDetail from './ItemDetail';
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
      openItem: false,
      delVoucher: false,
      infoList:[],
      Param: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'UNCHECKED'
      },
    }
    //this.getInfo(this.state.Param);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tab != this.props.tab) {
      this.setState({
        Params: {
          verifyStatus: 'UNCHECKED'
        }
      })
    }
  }
  componentDidMount() {
    
  }

  //操作相关
  onOperation = (type, itemDetail) => {

      this.setState({
        itemDetail
      });

      if (type == 'view') {
        this.openItem();
      } else if (type == 'edit') {
        this.openEditCreate();
      } else if (type == 'delete') {
        this.delVoucher(itemDetail);
      }
    }
  //删除
  //删除此条数据
  delVoucher = (itemDetail) => {
    this.setState({
      itemDetail
    });
    this.setState({
      delVoucher: !this.state.delVoucher
    })
  }
  sureToDel = (itemDetail) => {
    var _this = this;
    //console.log(itemDetail);
    // Store.dispatch(Actions.callAPI('del-fina-record', {}, {
    //   finaVerifyId: this.state.itemDetail.id
    // })).then(function(response) {
    //   Message.success("删除成功");
    //   _this.setState({
    //     delVoucher: false,
    //   }, function() {
    //     window.setTimeout(function() {
    //       window.location.reload();
    //     }, 800);
    //   });
    // }).catch(function(err) {
    //   Message.error(err.message);
    //   _this.setState({
    //     delVoucher: false,
    //   });
    // });
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

    //打开查看回款
  openItem = () => {
    this.setState({
      openItem: !this.state.openItem
    })
  }

  // getInfo = (form) => {
  //   var params = Object.assign({}, form);
  //   var _this = this;
  //   Store.dispatch(Actions.callAPI('get-fina-flow-category', params, {})).then(function(response) {
  //     _this.setState({
  //       infoList: response
  //     })
  //
  //   }).catch(function(err) {});
  //
  // }
  searchParams = (form) => {
    var _this = this;
    this.setState({
      Params: {
        page: 1,
        pageSize: 15,
        verifyStatus: 'UNCHECKED',
        payWay: form.content
      }
    })
  }

  render() {
    let {
      itemDetail
    } = this.state;
    return (

      <div className="m-w-voucher">
        <div className="u-search">
              <SearchsForm onSubmit={this.searchParams} openSearch={this.openSearch}/>
            </div>
        <Table
                          style={{marginTop:10}}
                          ajax={true}
                          ajaxUrlName='get-fince-info'
                          ajaxParams={this.state.Params}
                          onOperation={this.onOperation}
                          exportSwitch={true}
                      >
                      <TableHeader>
                          <TableHeaderColumn>签约方名称</TableHeaderColumn>
                          <TableHeaderColumn>收款方式</TableHeaderColumn>
                          <TableHeaderColumn>付款方名称</TableHeaderColumn>
                          <TableHeaderColumn>入驻社区</TableHeaderColumn>
                          <TableHeaderColumn>创建人</TableHeaderColumn>
                          <TableHeaderColumn>创建时间</TableHeaderColumn>
                          <TableHeaderColumn>备注说明</TableHeaderColumn>
                          <TableHeaderColumn>操作</TableHeaderColumn>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                            <TableRowColumn name="payWay"></TableRowColumn>
                            <TableRowColumn name="payWayName"></TableRowColumn>
                            <TableRowColumn name="payWayName"></TableRowColumn>

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
                              <TableRowColumn name="dealTime"  component={(value, oldValue) => {
                                    return (<KrDate value={value} format="yyyy-mm-dd"/>)
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
                                <Button label="删除"  type="operation"  operation="delete"/>
                            </TableRowColumn>
                          </TableRow>
                      </TableBody>
                       <TableFooter></TableFooter>
                    </Table>
                    <Drawer
                     modal={true}
                     width={750}
                     open={this.state.openItem}
                     onClose={this.openItem}
                     openSecondary={true}
                   >
                     <ItemDetail  detail={itemDetail} onCancel={this.openItem}  />
                   </Drawer>
                   <Dialog
                     title="提示"
                     modal={true}
                     contentStyle ={{ width: '444',height:'238px',overflow:'visible'}}
                     open={this.state.delVoucher}
                     onClose={this.delVoucher}
                   >
                   <div className='list-delete'>
                     <p className='sureIncome'>是否确定删除？</p>
                     <div style={{paddingLeft:'100px'}}>
                       <div  className='ui-btn-center'><Button  label="确定"  onTouchTap={this.sureToDel}/></div>
                       <Button  label="取消" type="button" cancle={true} onTouchTap={this.delVoucher} />
                      </div>
                   </div>
                   </Dialog>

      </div>

    );

  }

}
