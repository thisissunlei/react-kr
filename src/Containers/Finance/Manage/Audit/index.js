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
  Title
} from 'kr-ui';

import ToDoAudit from './ToDoAudit';
import DoAudit from './DoAudit';
import DoneAudit from './DoneAudit';

export default class AuditList extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      tab: 'table',
      countList: " "
    }
    this.getCount()
  }

  componentDidMount() {}
  getCount = (formd) => {


    var params = Object.assign({},formd);
    console.log("paramdddd1111",formd);
    var _this = this;
    Store.dispatch(Actions.callAPI('get-fina-flow-count', params, {})).then(function(response) {
      _this.setState({
        countList: response
      })

    }).catch(function(err) {});
    console.log("paramdddd222222",formd);
  }

  //操作相关
  onOperation(type, itemDetail) {

      this.setState({
        itemDetail
      });

      if (type == 'view') {
        this.openViewDialog();
      } else if (type == 'edit') {
        this.openEditDetailDialog();
      } else if (type == 'delete') {
        this.openDeleteDialog();
      }
    }
    //编辑
  openEditDetailDialog() {
    this.setState({
      openEditDetail: !this.state.openEditDetail
    });
  }

  //查看
  openViewDialog() {
      this.setState({
        openView: !this.state.openView
      });
    }
    //删除
  openDeleteDialog() {
    this.setState({
      openDelete: !this.state.openDelete
    });
  }

  merchants = () => {
    let {
      tab,
      initSearch
    } = this.state;
    tab = 'merchants';
    this.setState({
      tab,
      initSearch: 'm'
    });
  }

  personal = () => {
    let {
      tab,
      initSearch
    } = this.state;
    tab = 'personal';
    this.setState({
      tab,
      initSearch: 'p'
    });
  }
  signedClient = () => {
    let {
      tab,
      initSearch
    } = this.state;
    tab = 'signedClient';

    this.setState({
      tab,
      initSearch: 's'
    });
  }


  render() {
    let {
      tab,
      initSearch,
      countList
    } = this.state;
    const activeTab = {
      color: '#2b8dcd',
      borderBottom: "1px solid #eee",
      fontSize: '16px'
    }
    const commenTab = {
      color: '#666',
      borderBottom: "1px solid #eee",
      fontSize: '16px'
    }


    let merchantsStyle = (tab == 'merchants' || tab == 'table') ? activeTab : commenTab;
    let personalStyle = (tab == 'personal') ? activeTab : commenTab;
    let signedClientStyle = (tab == 'signedClient') ? activeTab : commenTab;

    if (countList != " ") {
      return (

        <div>
          <Title value="审核列表"/>
          <Tabs className="tabs">
            <Tab label={`待审核（${countList.unCheckedCount}）`} onActive={this.merchants} style={merchantsStyle}>
                <ToDoAudit
                      count={this.getCount}
                      tab={initSearch}
                />
            </Tab>
            <Tab label={`已审核（${countList.checkedCount}）`}  onActive={this.personal} style={personalStyle}>
               <DoAudit
                      count={this.getCount}
                       tab={initSearch}
                />
            </Tab>

            <Tab label={`已退回（${countList.reCount}）`} onActive={this.signedClient} style={signedClientStyle}>
                <DoneAudit
                      count={this.getCount}
                       tab={initSearch}
                />
            </Tab>
        </Tabs>
      </div>

      );
    } else {
      return (
        <div></div>
      )
    }

  }

}
