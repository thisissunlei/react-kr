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
import SearchForm from './SearchForm';
import HightSearchForm from './HightSearchForm';
import EditMoney from './EditMoney';
import ViewAudit from './ViewAudit';
import './index.less';
export default class DoAudit extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemDetail: {},
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'CHECKED'
      },
      infoList: [],
      itemDetail: [],
      openView: false,
      openEditCreate: false,
      Param: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'CHECKED'
      },
    }
    this.getInfo(this.state.Param);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tab != this.props.tab) {
      this.setState({
        Params: {
          verifyStatus: 'CHECKED'
        }
      }, function() {
        this.getParentCount({
          verifyStatus: 'CHECKED'
        })
        this.getInfo({
          verifyStatus: 'CHECKED'
        });
      })
    }

  }
  componentDidMount() {}
    //调用获取条目
  getParentCount = (formd) => {
    let {
      count
    } = this.props;
    count && count(formd);
  }

  //导出
  onExport = (values) => {
    var searchParams = this.state.Params;
    console.log(searchParams,"123");
    let idList = [];
    values.map((item, index) => {
      idList.push(item.id)
    });
    var url = `/api/krspace-finance-web/finaVerify/data/export-excel?payWay=${searchParams.payWay || ' '}&idList=${idList}&corporationId=${searchParams.corporationId || ' '}&communityId=${searchParams.communityId || ' '}&createEndTime=${searchParams.createEndTime || ' '}&createStratTime=${searchParams.createStratTime || ' '}&customerName=${searchParams.customerName || ' '}&dealEndTime=${searchParams.dealEndTime || ' '}&dealStartTime=${searchParams.dealStartTime || ' '}&flowCategoryId=${searchParams.flowCategoryId || ' '}&verifyStatus=CHECKED`;
      window.location.href = url;
      console.log(idList);
      console.log(url);
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
  EditAuditSubmit = (form) => {
      var _this = this;
      Store.dispatch(Actions.callAPI('edit-verify-checked', {}, form)).then(function(response) {
        Message.success('修改成功');
        _this.openEditCreate()
        _this.setState({
          Params: {
            verifyStatus: 'CHECKED'
          }
        })
      }).catch(function(err) {});

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

  getInfo = (form) => {
    var _this = this;
    Store.dispatch(Actions.callAPI('get-fina-flow-category', form, {})).then(function(response) {
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
        verifyStatus: 'CHECKED',
        customerName: form.content
      }
    }, function() {
      this.getParentCount({
        verifyStatus: 'CHECKED',
        customerName: form.content
      })
      this.getInfo();
    });
  }
  openSearch = () => {
    this.setState({
      openSearch: !this.state.openSearch
    })
  }
  onSearchSubmit = (form) => {
    this.openSearch();

    this.setState({
      Params: form
    }, function() {

      this.getParentCount(form)
      this.getInfo();
    });


  }

  render() {
    let {
      itemDetail
    } = this.state;
    console.log("asdfsda",this.state.Params);
    return (

      <div className="m-do-audit">
            <div  className="u-search">
                  <SearchForm onSubmit={this.searchParams} openSearch={this.openSearch} detail={this.state.infoList}/>
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
              <EditMoney  detail={itemDetail} onSubmit={this.EditAuditSubmit} onCancel={this.openEditCreate}  />
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
      </div>

    );

  }

}
