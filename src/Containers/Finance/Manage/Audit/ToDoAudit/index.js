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
  Tooltip
} from 'kr-ui';
import SearchForm from './SearchForm';
import './index.less';
export default class ToDoAudit extends Component {

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
        verifyStatus: 'UNCHECKED'
      }
    }

  }

  componentDidMount() {}
    //导出
  onExport = () => {

  }
  searchParams = () => {

  }
  render() {
    return (

      <div className="m-todo-audit">
            <div className="u-search"> 
                  <SearchForm onSubmit={this.searchParams}/>
            </div >
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
                        <Button label="审核"  type="operation"  operation="audit"/>
                    </TableRowColumn>
                  </TableRow>
              </TableBody>
               <TableFooter></TableFooter>
            </Table>

        


          

      </div>

    );

  }

}