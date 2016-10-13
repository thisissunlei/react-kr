import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector} from 'redux-form';
import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
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
        <Grid style={{marginTop:30}}>
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

SettingCreateForm= reduxForm({
  form: 'settingCreateForm',
})(SettingCreateForm);

const SettingViewForm = (props)=>{
  const prop=props.items
  console.log(props)
  return (
    <div>
        <KrField component="labelText" label="字段名称" value={prop.dicName} /> 
        <KrField name="corporationName" component="labelText"  label="支付方式" value={prop.dicName}/> 
        <KrField name="enableflag" component="labelText"  label="是否有效" value={prop.enableFlag?'是':'否'}/> 
        <KrField name="corporationDesc" component="labelText" label="备注" value={prop.remark}/> 

  </div>
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
 
 SettingUpdateForm= reduxForm({
  form: 'settingUpdateForm',
})(SettingUpdateForm);

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

    actions.callAPI('getSysDicPayment',{
      id:'',
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

    this.setState({
      openView:!this.state.openView
    });

  }

  openUpdateDialog(index){

    this.setState({
      openUpdate:!this.state.openUpdate
    });

  }


  renderCustomerItem(){
    var index='sd';


  let items = this.props.items || [];






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
              <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/34324/detail" /></TableRowColumn>
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

      <BreadCrumbs children={['系统运营','财务管理']}/>

      <Section title="客户信息编辑" description=""> 


          <RaisedButton label="新建" primary={true} onTouchTap={this.openCreateDialog} />


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
      {/*<SettingUpdateForm />*/}
      </Dialog>
   </div>
  );
  }
}








export default connect((state)=>{
  return {
    items:state.common.getSysDicPayment
  }
})(OrderCreate);






