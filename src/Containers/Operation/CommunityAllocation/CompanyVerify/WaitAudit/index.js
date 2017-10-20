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

import EidtAudit from './EidtAudit';
import AuditDrawer from './AuditDrawer';
import AuditDialog from './AuditDialog';
import './index.less';

export default class WaitAudit extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      itemDetail: {},
      searchParams:{
        verifyStatus:'UNDERWAY',
        page:1,
        pageSize:15,
      },
      openAudit:false,
      openAuditDialog:false,
      openDialog:false,
      companyId:'',
      openEdit:false,
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tab != this.props.tab) {
      this.setState({
        searchParams:{
          verifyStatus:'UNDERWAY',
          page:1,
          pageSize:15,
          date:new Date(),
        },
      })
    }

  }

    //操作相关
    onOperation = (type, itemDetail) => {
      this.setState({
        itemDetail
      });
      if (type == 'edit') {
        this.openEdit();
      } else if (type == 'audit') {
        this.openAudit();
      } 
  }
  
  openEdit=()=>{
    this.setState({
      openEdit:!this.state.openEdit
    })
  }
  openAudit=()=>{
    this.setState({
      openAudit:!this.state.openAudit
    })
  }
  openAuditDialog=()=>{
    this.setState({
      openAuditDialog:!this.state.openAuditDialog
    })
  }
  openDialog=()=>{
    this.setState({
      openDialog:!this.state.openDialog
    })
  }
  auditSubmit=(companyId)=>{
    this.openAuditDialog();
    this.setState({
      companyId
    })
  }
  onAuditSubmitData=()=>{
    var _this=this;
		const {companyId}=this.state;
		Http.request('verification-pass',{},{companyId:companyId}).then(function (response) {
      _this.openAuditDialog();
      Message.success('审核成功！');
      _this.openAudit();
			_this.setState({
				searchParams:{
					date:new Date(),
				}
			})

		}).catch(function (err) { 
			Message.error(err.message)
		});
  }
  openUnAudit=(companyId,type)=>{
    if(type=='1'){
      this.openDialog();
    }else{
      this.openAudit();
    }
    
  }
  unAudit=()=>{
    this.openDialog();
    this.openAudit();
    this.setState({
      searchParams:{
        date:new Date(),
      }
    })
  }

  render() {
    let {
      itemDetail
    } = this.state;
    return (
      <div className="g-wait-audit">
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
                              return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:200,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
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
                              return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:180,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                             <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
                       }} ></TableRowColumn>
                       <TableRowColumn 
                            name="logo"
                            component={(value)=>{
                              return (
                                <div style={{paddingTop:5}} >
                                  <img width={40}  src={value}/>
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
                   <TableRowColumn  >
                      <Button label="审核" type="operation" operation="audit" />
                      <Button label="编辑" type="operation" operation="edit" />
                   </TableRowColumn>
                  </TableRow>
           </TableBody>
           <TableFooter></TableFooter>
         </Table>
         <Drawer
              modal={true}
              width={750}
              open={this.state.openEdit}
              onClose={this.openEdit}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
	             	<EidtAudit
	             			onCancel={this.openEdit} 
	             			detail={itemDetail}
	             	 />
	      </Drawer>
        <Drawer
              modal={true}
              width={750}
              open={this.state.openAudit}
              onClose={this.openAudit}
              openSecondary={true}
              containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
            >
	             	<AuditDrawer
	             			onCancel={this.openUnAudit} 
	             			detail={itemDetail}
                    onSubmit={this.auditSubmit}
	             	 />
	      </Drawer>
        <Dialog
              title="退回"
              modal={true}
              contentStyle ={{ width: '662',overflow:'visible'}}
              open={this.state.openDialog}
              onClose={this.openDialog}
            >
              <AuditDialog  
                  detail={itemDetail} 
                  onSubmit={this.unAudit} 
                  onCancel={this.openDialog} 
              />
        </Dialog>
        <Dialog
	              title="审核"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openAuditDialog}
	              onClose={this.openAuditDialog}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认同意该审核吗？</p>
	                <div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.onAuditSubmitData}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openAuditDialog} />
	                      </div>
	            	  </div>
	            </Dialog>

      </div>
    );

  }

}
