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

          <TableRow  >
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>4</TableRowColumn>
            <TableRowColumn>Steve Brown</TableRowColumn>
            <TableRowColumn><RaisedButton label="创建订单" href="/#/operation/customerManage/343/order/create" /></TableRowColumn>
         </TableRow>
    );

  }


  renderOrderItem(){

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

    const { error, handleSubmit, pristine, reset, submitting} = this.props;

    const {communitys} = this.state;


    return (

      <div>

      <BreadCrumbs children={['系统运营','财务管理']}/>

      <Section title="客户信息编辑" description=""> 

			<Grid>
					<Row>
						<Col md={2}> <RaisedButton label="新建" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
						<Col md={6}> </Col>
						<Col md={2}> <KrField name="username" type="text" /></Col> 
						<Col md={2}> <RaisedButton label="搜索" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
					</Row>
				</Grid>

            <Table displayCheckbox={true} style={{marginTop:20}}  toggleVisibility="odd">
                <TableHeader>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>出租方名称</TableHeaderColumn>
                  <TableHeaderColumn>是否启用</TableHeaderColumn>
                  <TableHeaderColumn>地址</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>

				<TableBody>
					{this.renderCustomerItem()}
					<TableRow displayCheckbox={false} visibility={false}>
						<TableRowColumn colSpan={10}>
							{this.renderOrderItem()}
						</TableRowColumn>
					</TableRow>

					{this.renderCustomerItem()}
					<TableRow displayCheckbox={false}>
						<TableRowColumn colSpan={10}>
							{this.renderOrderItem()}
						</TableRowColumn>
					</TableRow>

					{this.renderCustomerItem()}
					<TableRow displayCheckbox={false}>
						<TableRowColumn colSpan={10}>
							{this.renderOrderItem()}
						</TableRowColumn>
					</TableRow>

					{this.renderCustomerItem()}
					<TableRow displayCheckbox={false}>
						<TableRowColumn colSpan={10}>
							{this.renderOrderItem()}
						</TableRowColumn>
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






