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
export default class DelVoucher extends Component {

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
        this.getInfo({
          verifyStatus: 'CHECKED'
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
    var url = `/api/krspace-finance-web/finaVerify/data/export-excel?payWay=${searchParams.payWay || ' '}&idList=${idList}&corporationId=${searchParams.corporationId || ' '}&communityId=${searchParams.communityId || ' '}&createEndTime=${searchParams.createEndTime || ' '}&createStratTime=${searchParams.createStratTime || ' '}&customerName=${searchParams.customerName || ' '}&dealEndTime=${searchParams.dealEndTime || ' '}&dealStartTime=${searchParams.dealStartTime || ' '}&flowCategoryId=${searchParams.flowCategoryId || ' '}&verifyStatus=CHECKED`;
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
  EditAuditSubmit = (form) => {
      var _this = this;
      var params = Object.assign({}, form);
      Store.dispatch(Actions.callAPI('edit-verify-checked', {}, params)).then(function(response) {
        Message.success('修改成功');
        _this.setState({
          Params: {
            page: 1,
            pageSize: 10,
            verifyStatus: 'CHECKED'
          }
        })
        _this.openEditCreate();
        _this.getInfo(this.state.Param);

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
        verifyStatus: 'CHECKED',
        customerName: form.content
      }
    }, function() {
      this.getParentCount({
        verifyStatus: 'CHECKED',
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

      </div>

    );

  }

}
