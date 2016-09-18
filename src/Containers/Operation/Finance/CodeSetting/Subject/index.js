import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import Section from 'kr-ui/Section';
import {KrField,LabelText} from 'kr-ui/Form';

import {reduxForm,formValueSelector} from 'redux-form';


import BreadCrumbs from 'kr-ui/BreadCrumbs';


import {Grid,Row,Col} from 'kr-ui/Grid';

import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';


class OrderCreate extends Component {

  constructor(props,context){
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);

    this.openCreateDialog = this.openCreateDialog.bind(this);
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

  render() {

    const { error, handleSubmit, pristine, reset, submitting} = this.props;

    const {communitys} = this.state;


    return (

      <div>

      <Section title="财务管理" description=""> 

      <Grid>
          <Row>
            <Col md={2}> <RaisedButton label="新建代码" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
            <Col md={6}> </Col>
            <Col md={2}> <KrField name="username" type="text" /></Col> 
            <Col md={2}> <RaisedButton label="搜索" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
          </Row>
        </Grid>

            <Table displayCheckbox={true} style={{marginTop:20}}  toggleVisibility="odd">
                <TableHeader>
                  <TableHeaderColumn>科目编码</TableHeaderColumn>
                  <TableHeaderColumn>科目名称</TableHeaderColumn>
                  <TableHeaderColumn>科目类型</TableHeaderColumn>
                  <TableHeaderColumn>是否启用</TableHeaderColumn>
                  <TableHeaderColumn>排序号</TableHeaderColumn>
                  <TableHeaderColumn>描述</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>
        <TableBody>

          <TableRow  >
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/create" /></TableRowColumn>
         </TableRow>
          <TableRow  >
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/create" /></TableRowColumn>
         </TableRow>
        </TableBody>

        <TableFooter></TableFooter>

       </Table>

      </Section>



      <Dialog
        title="新建"
        modal={true}
        open={this.state.openCreate}
      >
      

        <form onSubmit={handleSubmit(this.confirmSubmit)}>


        <Grid style={{marginTop:30}}>

          <Row>
            <Col md={12} > <KrField name="username" type="text" label="出租方名称" /> </Col>
          </Row>

          <Row>
            <Col md={4} > 
                <KrField name="city" label="是否启用" type="radio"/>
             </Col>
             <Col md={4} > 
                <KrField name="city" label="是" type="radio" />
             </Col>
             <Col md={4} > 
                <KrField name="city" label="否" type="radio" />
             </Col>
          </Row>

          <Row>
            <Col md={12} > <KrField name="ordername" type="text" label="详细地址"/> </Col>
          </Row>

          <Row>
            <Col md={12} > <KrField name="mainbilldesc" type="textarea" label="备注"  placeholder="备注信息"/> </Col>
          </Row>

          <Row style={{marginTop:30}}>
            <Col md={8}></Col>
            <Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <RaisedButton  label="取消" type="submit"  onTouchTap={this.openCreateDialog} /> </Col>
          </Row>

        </Grid>

      {/*
      <FlatButton label="重置" primary={true} onTouchTap={reset} disabled={pristine || submitting} />
      */}

    </form>




      </Dialog>

      
   </div>
  );
  }
}


OrderCreate= reduxForm({
  form: 'orderCreateForm'
})(OrderCreate);



function mapStateToProps(state){
  return {
    items:state.notify.items,
  };
}

export default connect((state)=>{
  return {
    items:state.notify.items,
  };
})(OrderCreate);






