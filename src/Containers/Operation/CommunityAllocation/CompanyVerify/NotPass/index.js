import React from 'react';
import {Http} from 'kr/Utils';
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
  Title,
  KrDate,
  Tooltip,
  Drawer,
  Message,
  CheckPermission
} from 'kr-ui';

import './index.less';
export default class NotPass extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemDetail: {},
      searchParams:{
        verifyStatus:'FAILED',
        page:1,
        pageSize:15,
      }
    }
  }
 

  render() {
    let {
      itemDetail
    } = this.state;
    return (
      <div className="g-not-pass">
        <Table
            style={{marginTop:10}}
            ajax={true}
            ajaxUrlName='verification-page'
            ajaxParams={this.state.searchParams}
            onOperation={this.onOperation}
            onPageChange = {this.pageChange}
      >
                <TableHeader>
                <TableHeaderColumn>公司名称</TableHeaderColumn>
                <TableHeaderColumn>公司简称</TableHeaderColumn>
                <TableHeaderColumn>企业Logo</TableHeaderColumn>
                <TableHeaderColumn>社区</TableHeaderColumn>
                <TableHeaderColumn>创建时间</TableHeaderColumn>
                <TableHeaderColumn>审核人</TableHeaderColumn>
                <TableHeaderColumn>审核时间</TableHeaderColumn>
                <TableHeaderColumn>备注</TableHeaderColumn>
                <TableHeaderColumn>操作</TableHeaderColumn>
              </TableHeader>

            <TableBody >
                  <TableRow>
                    <TableRowColumn 
                              name="compnayName" 
                              component={(value,oldValue)=>{
                              var TooltipStyle=""
                              if(value.length==""){
                                TooltipStyle="none";

                              }else{
                                TooltipStyle="block";
                              }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                              <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
                        }}></TableRowColumn>
                        <TableRowColumn 
                              name="shortName"
                              component={(value,oldValue)=>{
                              var TooltipStyle=""
                              if(value.length==""){
                                TooltipStyle="none";

                              }else{
                                TooltipStyle="block";
                              }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                              <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>
                        <TableRowColumn 
                              name="logo"
                              component={(value)=>{
                                return (
                                  <div style={{paddingTop:5}} >
                                    <img src={value}/>
                                  </div>
                              )
                        }} ></TableRowColumn>
                    <TableRowColumn name="cmtName" ></TableRowColumn>
                    <TableRowColumn 
                        name="cDate" 
                        component={(value) => {
                                return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
                          }}
                      ></TableRowColumn>
                        <TableRowColumn 
                              name="verifierName"
                              component={(value,oldValue)=>{
                              var TooltipStyle=""
                              if(value.length==""){
                                TooltipStyle="none";

                              }else{
                                TooltipStyle="block";
                              }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                              <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>
                        <TableRowColumn 
						                	name="verifyDate" 
						                	component={(value) => {
						                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
						                    }}
						                ></TableRowColumn>
                    <TableRowColumn 
                              name="remark"
                              component={(value,oldValue)=>{
                              var TooltipStyle=""
                              if(value.length==""){
                                TooltipStyle="none";

                              }else{
                                TooltipStyle="block";
                              }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                              <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>
                    <TableRowColumn  >
                        <Button label="编辑" type="operation" operation="edit" />
                    </TableRowColumn>
                    </TableRow>
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
      </div>
    );

  }

}
