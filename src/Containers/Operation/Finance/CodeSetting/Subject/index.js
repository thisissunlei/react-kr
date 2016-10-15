import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector} from 'redux-form';
import {Dialog,Snackbar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table, 
  TableBody,
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn,
  TableFooter,
  Grid,
  Row,
  Col,
  BreadCrumbs,
  Section,
  KrField,
  LabelText,
  Button,
}from 'kr-ui';




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
  componentDidMount() {

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
            <Col md={2}> <RaisedButton label="搜索" primary={true}  /> </Col>
          </Row>
        </Grid>
        <Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='getFinaFinaflowAccountModelByAjax' ajaxParams={{
          accountname:'',
          currentPage:1,
          pageSize:10
        }} >
          <TableHeader>
          <TableHeaderColumn>科目编码</TableHeaderColumn>
          <TableHeaderColumn>科目名称</TableHeaderColumn>
          <TableHeaderColumn>科目类别</TableHeaderColumn>
          <TableHeaderColumn>是否启用</TableHeaderColumn>
          <TableHeaderColumn>排序号</TableHeaderColumn>
          <TableHeaderColumn>描述</TableHeaderColumn>
          <TableHeaderColumn>操作</TableHeaderColumn>
        </TableHeader>

        <TableBody>
              <TableRow displayCheckbox={true}>
              <TableRowColumn name="accountcode" ></TableRowColumn>
              <TableRowColumn name="accountname"></TableRowColumn>
              <TableRowColumn name="accounttype"></TableRowColumn>
              <TableRowColumn name="enableflag"></TableRowColumn>
              <TableRowColumn name="ordernum"></TableRowColumn>
              <TableRowColumn name="accountdesc"></TableRowColumn>
              <TableRowColumn>
                  <Button label="查看"  type="link" />
                  <Button label="编辑"  type="link" />
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


            <KrField name="corporationName" type="text" label="科目编码" /> 
            <KrField name="corporationName" type="text" label="科目名称" /> 
            <KrField name="corporationName" type="text" label="科目类别" >
              <option>123</option>
            </KrField>
            <KrField name="corporationAddress" component="text" type="text" label="排序号"/> 
              <KrField name="enableflag" component="group" label="是否启用">
                <KrField name="enableflag" label="是" type="radio" value="1"/>
                <KrField name="enableflag" label="否" type="radio" value="0" />
              </KrField>
               <KrField name="corporationDesc" component="textarea" label="备注"  placeholder="备注信息"/> 
              <Grid style={{marginTop:30}}>
                <Row style={{marginTop:30}}>
                <Col md={8}></Col>
                <Col md={2}> <Button  label="确定" type="submit" primary={true} /> </Col>
                <Col md={2}> <Button  label="取消" type="button" /> </Col>
                </Row>
              </Grid>

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






