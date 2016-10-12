import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {bindActionCreators} from 'redux';


import {Button} from 'kr-ui/Button';

import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';



import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import * as actionCreators from 'kr-ui/../Redux/Actions';

import {
  BreadCrumbs,
  Loading,
  Notify
} from 'kr-ui';

let SettingCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName,onCancel} = props;

	return (

<form onSubmit={handleSubmit(onSubmit)}>
        <Grid style={{marginTop:30}}>

          <Row>
            <Col md={12} > <KrField name="id" type="text" label="字段编码" /> </Col>
          </Row>

          <Row>
            <Col md={12} > <KrField name="dicName" type="text" label="字段名称" /> </Col>
          </Row>
          <Row>
              <KrField name="enableFlag" component="group" label="是否有效">
                <KrField name="enableFlag" label="是" type="radio" value="2"/>
                <KrField name="enableFlag" label="否" type="radio" value="3" />
              </KrField>
          
          </Row>

          <Row>
            <Col md={12} > <KrField name="remark" type="textarea" label="备注"  placeholder="备注信息"/> </Col>
          </Row>

          <Row style={{marginTop:30}}>
            <Col md={8}></Col>
            <Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <RaisedButton  label="取消" type="button" onTouchTap={onCancel} /> </Col>
          </Row>

        </Grid>

				
    </form>
	);

}





let SettingUpdateForm = function(props){

    const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,onCancel} = props;

  return (

      <form onSubmit={handleSubmit(onSubmit)}>


              <KrField name="corporationName" type="text" label="出租方名称" /> 

              <KrField name="enableflag" component="group" label="是否启用">
                <KrField name="enableflag" label="是" type="radio" value="1"/>
                <KrField name="enableflag" label="否" type="radio" value="0" />
              </KrField>
              
              <KrField name="corporationAddress" component="text" type="text" label="详细地址"/> 
               <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 


              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button"  onTouchTap={onCancel} /> </Col>
                </Row>
              </Grid>

        </form>

  );

}



const SettingViewForm  = (props)=>{

  return (
    <div>
        <KrField component="labelText" label="出租方名称" value={props.item.corporationName} /> 
        <KrField name="enableflag" component="labelText"  label="是否启用" value={props.item.enableflag?'是':'否'} /> 
        <KrField name="corporationName" component="labelText"  label="出租方名称" value={props.item.corporationName} /> 
        <KrField name="corporationAddress" component="labelText" type="text" label="详细地址"  value={props.item.corporationAddress}/> 
        <KrField name="corporationDesc" component="labelText" label="备注"  placeholder="备注信息" value={props.item.corporationDesc}/> 

  </div>
  );
}


 SettingCreateForm= reduxForm({
  form: 'settingCreateForm',
})(SettingCreateForm);

class OrderCreate extends Component {

  constructor(props,context){
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.back = this.back.bind(this);

    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.renderCustomerItem = this.renderCustomerItem.bind(this);
    this.renderOrderItem = this.renderOrderItem.bind(this);


    this.getListData = this.getListData.bind(this);


    this.state = {
      open:false,
      openCreate:false,
      openView:false,
      item:{}
    }


    this.getListData();


  }

  getListData(){

    var {actions} = this.props;
    var _this = this;

    actions.callAPI('fnaCorporationList',{
      corporationName:'',
      page:'',
      pageSize:20
    },{}).then(function(response){
      }).catch(function(err){
      console.log('err',err);
      Notify.show([{
        message:'报错了',
        type: 'danger',
      }]);
    });
  }


  confirmSubmit(values){
    var {actions} = this.props;

    actions.callAPI('addSysDicPayment',{},values).then(function(response){
       Notify.show([{
        message:'创建成功!',
        type: 'success',
      }]);
    }).catch(function(err){
        Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    });
    this.openCreateDialog();

      window.setTimeout(function(){
        window.location.reload();
      },1000);

  }

  openCreateDialog(){

    this.setState({
      openCreate:!this.state.openCreate
    });

  }

  back(){

  }

 openViewDialog(index){


    //const list = this.props.items;
    //console.log('item',list[index]);

    console.log('000000');

    this.setState({
      //item:list[index],
      openView:!this.state.openView
    });

  }

  openUpdateDialog(index){

    //const list = this.props.items;

    this.setState({
      openUpdate:!this.state.openUpdate
    });


    //console.log('item---',list[index]);

    /*LessorUpdateForm= reduxForm({
      form: 'orderUpdateForm',
      initialValues:list[index]
    })(LessorUpdateForm);*/

  }


  renderCustomerItem(){
    var index='sd';

    return (

        <TableBody colSpan={10} insertElement={this.renderOrderItem()}>
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
              <Button label="编辑" type="link"  onClick={this.openUpdateDialog.bind(this,index)}/>
              <Button label="添加子项" type="link"  />
            </TableRowColumn>
         </TableRow>
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
              <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/34324/detail" /></TableRowColumn>
            </TableRow>
           </TableBody>
       </Table>

        
    
    );

  }


  render() {

    const {communitys} = this.state;

    return (

      <div>

      <BreadCrumbs children={['系统运营','财务管理']}/>

      <Section title="客户信息编辑" description=""> 


          <RaisedButton label="新建" primary={true} onTouchTap={this.openCreateDialog} />


            <Table displayCheckbox={true} style={{marginTop:20}} toggleVisibility="odd">
                <TableHeader>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>字段编码</TableHeaderColumn>
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
        open={this.state.openView}
      >
      <SettingViewForm onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
      </Dialog>

       <Dialog
        title="编辑"
        modal={true}
        open={this.state.openUpdate}
      >
      <SettingUpdateForm onSubmit={this.confirmSubmit} onCancel={this.openCreateDialog}/>
      </Dialog>
   </div>
  );
  }
}








export default connect((state)=>{
  return {
    items:state.common.fnaCorporationList.items
  }
})(OrderCreate);






