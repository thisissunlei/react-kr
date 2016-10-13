import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';

import {Actions,Store} from 'kr/Redux';

import {
Dialog,
Snackbar,
  Table, 
  TableBody, 
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn,
  TableFooter,
  Section,
  KrField,
  LabelText,
  Grid,
  Row,
  Col,
  Button,
  BreadCrumbs,
  Loading,
  Notify
} from 'kr-ui';


let SettingCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName,onCancel} = props;

	return (

<form onSubmit={handleSubmit(onSubmit)}>

			<KrField name="dicName" type="text" component="input" label="字段名称" />  
       <KrField name="enableFlag" component="group" label="是否有效">
					<KrField name="enableFlag" label="是" type="radio" value="2"/>
					<KrField name="enableFlag" label="否" type="radio" value="3" />
              </KrField>
		 <KrField name="remark" type="textarea" label="备注"  placeholder="备注信息"/> 

        <Grid style={{marginTop:30}}>
          <Row>
            <Col md={8}></Col>
            <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <Button  label="取消" type="button" onTouchTap={onCancel} /> </Col>
          </Row>
        </Grid>
    </form>
	);
}

SettingCreateForm= reduxForm({
  form: 'settingCreateForm',
})(SettingCreateForm);

const SettingViewForm = (props)=>{

	const {items} = props;

  return (
    <div>
        <KrField component="labelText" label="字段名称" value={items.dicName} /> 
        <KrField name="corporationName" component="labelText"  label="支付方式" value={items.dicName}/> 
        <KrField name="enableflag" component="labelText"  label="是否有效" value={items.enableFlag?'是':'否'}/> 
        <KrField name="corporationDesc" component="labelText" label="备注" value={items.remark}/> 
  </div>
  );
}

 



let SettingUpdateForm = function(props){

    const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

  return (

      <form onSubmit={handleSubmit(onSubmit)}>
              <KrField name="dicName" type="hidden" label="id"  value={props.id}/> 
              <KrField name="dicName" type="text" label="字段名称"  value={props.dicName}/> 
              <KrField name="enableflag" component="group" label="是否有效">
                <KrField name="enableflag" label="是" type="radio" value="1"/>
                <KrField name="enableflag" label="否" type="radio" value="0" />
              </KrField>
               <KrField name="remark" component="textarea" label="备注"  placeholder="备注信息"/> 
              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel}  /> </Col>
                </Row>
              </Grid>
        </form>
  );
}
 
 SettingUpdateForm= reduxForm({
  form: 'settingUpdateForm',
})(SettingUpdateForm);

export default class SettingList extends Component {

  constructor(props,context){
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);
    
    this.confirmUpdateSubmit=this.confirmUpdateSubmit.bind(this);
    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.renderCustomerItem = this.renderCustomerItem.bind(this);
    this.renderOrderItem = this.renderOrderItem.bind(this);
    this.openUpdateDialog = this.openUpdateDialog.bind(this);
    this.getListData = this.getListData.bind(this);


    this.state = {
      open:false,
      openCreate:false,
      openView:false,
		  openUpdate:false,
      items:[]
    }

    this.getListData();

  }

	componentDidMount(){

		var _this = this;

		Store.dispatch(Actions.callAPI('getSysDicPayment',{ 
			 id:'',
		})).then(function(response){
			_this.setState({
				items:response
			});
		}).catch(function(err){
			Notify.show([{
				message:'报错了',
				type: 'danger',
			}]);
		});

	}


  getListData(){
    var {actions} = this.props;
    var _this = this;
  }


  confirmSubmit(values){

    console.log('----');

    Store.dispatch(Actions.callAPI('addSysDicPayment',{},values)).then(function(response){
       Notify.show([{
        message:'创建成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    })

 


    this.openCreateDialog();

      window.setTimeout(function(){
        window.location.reload();
      },1000);


  }

  confirmUpdateSubmit(values){

    Store.dispatch(Actions.callAPI('editSysDicPayment',{},values)).then(function(response){
       Notify.show([{
        message:'编辑成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    });

    this.openUpdateDialog();

/*
window.setTimeout(function(){
        window.location.reload();
      },1000);
*/
      

  }

  openCreateDialog(){

    this.setState({
      openCreate:!this.state.openCreate
    });

  }

 openViewDialog(index){

    this.setState({
      openView:!this.state.openView
    });

  }

  openUpdateDialog(){

    this.setState({
      openUpdate:!this.state.openUpdate
    });

  }
  

  renderCustomerItem(){

  	let items = this.state.items || [];

    return (
        <TableBody colSpan={10} insertElement={this.renderOrderItem()}>

          {items.map((item,index)=>{
            return (
             <TableRow key={index}>
					 <TableHeaderColumn></TableHeaderColumn>
					<TableRowColumn>{item.dicName}</TableRowColumn>
						<TableRowColumn>{item.enableFlag}</TableRowColumn>
						<TableRowColumn>{item.creater}</TableRowColumn>
						<TableRowColumn>{item.createTime}</TableRowColumn>
						<TableRowColumn>{item.remark}</TableRowColumn>
						<TableRowColumn>
					  <Button label="查看" type="link"  onClick={this.openViewDialog.bind(this,index)}/>
					  <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this,index)}/>
					  <Button label="添加子项" type="link"  />
					</TableRowColumn>
				 </TableRow>
              );

          })}
         
          <TableRow>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn>备注备注备注备注备</TableRowColumn>
            <TableRowColumn>
              <Button label="查看" type="link"  onClick={this.openViewDialog.bind(this)}/>
              <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this)}/>
              <Button label="添加子项" type="link"  />
            </TableRowColumn>
         </TableRow>
      </TableBody>
    );

  }


  renderOrderItem(item,customerId){

    return(

      <Table toggleVisibility="odd">
          <TableHeader>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
          </TableHeader>
          <TableBody>
             <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn>Employed</TableRowColumn>
            </TableRow>
      
             <TableRow>
              <TableRowColumn>1</TableRowColumn>
              <TableRowColumn>John Smith</TableRowColumn>
              <TableRowColumn><Button label="创建订单" href="/#/operation/customerManage/343/order/34324/detail" /></TableRowColumn>
            </TableRow>
           </TableBody>
       </Table>
    );
  }


  render() {

    const {communitys} = this.state;

    const actions = [
        <Button
        label="关闭"
        primary={true}
         style={{marginLeft:10}}
        onTouchTap={this.openViewDialog.bind(this)}
        />,
      ];

    return (

      <div>

      <BreadCrumbs children={['系统运营','合同信息','基础配置']}/>

      <Section title="客户信息编辑" description=""> 

          <Button label="新建" primary={true} onTouchTap={this.openCreateDialog} />

            <Table displayCheckbox={true} style={{marginTop:20}} toggleVisibility="odd">
                <TableHeader>
                  <TableHeaderColumn>字段名称</TableHeaderColumn>
                  <TableHeaderColumn>是否有效</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>备注</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>
                {this.renderCustomerItem()}
             </Table>
      </Section>

      <Dialog
        title="新建"
        modal={true}
        open={this.state.openCreate}
      >
        <SettingCreateForm onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
      </Dialog>

      <Dialog
        title="查看"
        modal={true}
        actions={actions}
        open={this.state.openView}
      >

      <SettingViewForm items={this.state.items}/>

      </Dialog>

       <Dialog
        title="编辑"
        modal={true}
        open={this.state.openUpdate}
     >
      <SettingUpdateForm  onSubmit={this.confirmUpdateSubmit} onCancel={this.openUpdateDialog}/>
      </Dialog>
   </div>
  );
  }
}



