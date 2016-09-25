import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';


import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';


import BreadCrumbs from 'kr-ui/BreadCrumbs';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


import * as actionCreators from 'kr-ui/../Redux/Actions';



let SettingCreateForm = function(props){

  	const { error, handleSubmit, pristine, reset, submitting,communitys,onSubmit,cityName} = props;

	return (

<form onSubmit={handleSubmit(onSubmit)}>
        <Grid style={{marginTop:30}}>

          <Row>
            <Col md={12} > <KrField name="username" type="text" label="字段编码" /> </Col>
          </Row>

          <Row>
            <Col md={12} > <KrField name="username" type="text" label="字段名称" /> </Col>
          </Row>
          <Row>
            <Col md={4} > 
                <KrField name="city" label="是否有效" type="radio" value="1"/>
             </Col>
             <Col md={4} > 
                <KrField name="city" label="是" type="radio" value="2"/>
             </Col>

             <Col md={4} > 
                <KrField name="city" label="否" type="radio" value="3" />
             </Col>
          </Row>

          <Row>
            <Col md={12} > <KrField name="mainbilldesc" type="textarea" label="备注"  placeholder="备注信息"/> </Col>
          </Row>

          <Row style={{marginTop:30}}>
            <Col md={8}></Col>
            <Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <RaisedButton  label="取消" type="submit" /> </Col>
          </Row>

        </Grid>

				
    </form>
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


    this.state = {
      open:false,
      openCreate:false,
    }


  }


  confirmSubmit(values){
    var {actions} = this.props;

    actions.callAPI('enter-order',{},values).then(function(response){

    }).catch(function(err){

    });

  }

  openCreateDialog(){

    this.setState({
      openCreate:!this.state.openCreate
    });

  }

  back(){

  }


  renderCustomerItem(){

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
            <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/create" /></TableRowColumn>
         </TableRow>
      </TableBody>
    );

  }


  renderOrderItem(item,customerId){

    return(

      <Table>
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


            <Table displayCheckbox={true} style={{marginTop:20}}>
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

        <SettingCreateForm onSubmit={this.confirmSubmit}/>

      </Dialog>

      
   </div>
  );
  }
}



function mapStateToProps(state){


  return {
    items:state.notify.items,
  };
}

function mapDispatchToProps(dispatch){
  return {
    actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(OrderCreate);






