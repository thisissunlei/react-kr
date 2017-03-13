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

export default class DoAudit extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      openNewCreate: false,
      openView: false,
      openEditDetail: false,
      openDelete: false,
      itemDetail: {},
      Params: {
        page: 1,
        pageSize: 10,
        verifyStatus: 'CHECKED'
      }
    }

  }

  componentDidMount() {}


  render() {
    return (

      <div>
       <div> 
                  {/*<SearchForm onSubmit={this.searchParams}/>*/}
            </div>
             <Table style={{marginTop:10}} ajax={true}  ajaxUrlName='get-fince-info' ajaxParams={this.state.Params}  onOperation={this.onOperation} >
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
                    <TableRowColumn name="tradingCode"></TableRowColumn>
                    <TableRowColumn name="payWayName"></TableRowColumn>
                    <TableRowColumn name="dealTime"></TableRowColumn>
                    <TableRowColumn name="corporationName"></TableRowColumn>
                    <TableRowColumn name="accountNum"></TableRowColumn>
                    <TableRowColumn name="communityName"></TableRowColumn>
                    <TableRowColumn name="payAccount"></TableRowColumn>
                    <TableRowColumn name="flowAmount"></TableRowColumn>
                    <TableRowColumn name="company"></TableRowColumn>
                    <TableRowColumn name="payee"></TableRowColumn>
                    <TableRowColumn name="remark"></TableRowColumn>
                    <TableRowColumn>
                        <Button label="查看"  type="link"  operation="view"/>
                        <Button label="编辑"  type="link"  operation="edit"/>
                        <Button label="删除"  type="link"  operation="delete"/>
                        <Button label="审核"  type="link"  operation="delete"/>
                    </TableRowColumn>
                  </TableRow>
              </TableBody>
               <TableFooter></TableFooter>
            </Table>

      </div>

    );

  }

}