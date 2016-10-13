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
  Section,
  KrField,
  LabelText,
  Grid,
  Row,
  Col,
  Button,
  Notify,
  BreadCrumbs
} from 'kr-ui';



class OrderCreate extends Component {

  constructor(props,context){
    super(props, context);

    this.confirmSubmit = this.confirmSubmit.bind(this);

    this.openCreateDialog = this.openCreateDialog.bind(this);
    this.searchParams = this.searchParams.bind(this);
    this.getListData=this.getListData.bind(this);
    this.state = {
      open:false,
      openCreate:false,
    }


  }

	componentDidMount(){

		const {actions} = this.props;

		actions.callAPI('findFinaFinaflowPropertyList',{}).then(function(response){ }).catch(function(err){
		  Notify.show([{
			message:err.message,
			type: 'danger',
		  }]);
		});


	}



  confirmSubmit(values){
    var {actions} = this.props;

    actions.callAPI('addFinaFinaflowProperty',{},values).then(function(response){
        Notify.show([{
        message:'创建成功',
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

    getListData(){

    var {actions} = this.props;
    var _this = this;

    actions.callAPI('findFinaFinaflowPropertyList',{
      currentPage:'',
      pageSize:10,
      searchParam:''
    },{}).then(function(response){
      console.log('----->>>>re',response);
      }).catch(function(err){
      console.log('err',err);
      Notify.show([{
        message:'报错了',
        type: 'danger',
      }]);
    });


}
searchParams(values){

    values.corporationName = values.corporationName || ' ';
    values.page = 1;
    values.pageSize = 10;

    var {actions} = this.props;
    var _this = this;

    actions.callAPI('fnaCorporationList',values,{}).then(function(response){ }).catch(function(err){
      Notify.show([{
        message:err.message,
        type: 'danger',
      }]);
    }); 
  }

  openCreateDialog(){

    this.setState({
      openCreate:!this.state.openCreate
    });

  }

  render() {

    const { error, handleSubmit, pristine, reset, submitting,onSubmit} = this.props;

    const {communitys} = this.state;
   
    
    return (

      <div>

      <Section title="财务管理" description=""> 

      <Grid>
        
          <Row>
            <Col md={2}> <RaisedButton label="新建属性" primary={true} onTouchTap={this.openCreateDialog} /> </Col>
            <Col md={6}> </Col>
            <Col md={2}> <KrField name="searchParam" type="text" /></Col> 
            <Col md={2}> <Button label="搜索"  primary={true}  /> </Col>
          </Row>
        
        </Grid>

            <Table displayCheckbox={true} style={{marginTop:20}}  toggleVisibility="odd">
                <TableHeader>
                  <TableHeaderColumn>属性编码</TableHeaderColumn>
                  <TableHeaderColumn>属性名称</TableHeaderColumn>
                  <TableHeaderColumn>是否启用</TableHeaderColumn>
                  <TableHeaderColumn>属性类型</TableHeaderColumn>
                  <TableHeaderColumn>排序号</TableHeaderColumn>
                  <TableHeaderColumn>创建人</TableHeaderColumn>
                  <TableHeaderColumn>创建时间</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>
        <TableBody>

          <TableRow  >
            <TableRowColumn></TableRowColumn>
            <TableRowColumn>{/*{items.propdesc}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.propname}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.enableflag}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.proptype}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.ordernum}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.creatername}*/}</TableRowColumn>
            <TableRowColumn>{/*{items.createdate}*/}</TableRowColumn>
            <TableRowColumn></TableRowColumn>

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
            <Col md={12} > <KrField name="propcode" type="text" label="属性编码" /> </Col>
          </Row>
           <Row>
            <Col md={12} > <KrField name="propname" type="text" label="属性名称" /> </Col>
          </Row>
          <Row>
            <Col md={12} > 
              <KrField name="proptype" type="select" label="属性类别" > 
                 <option>请选择类别</option>
                <option value="PAYMENT ">回款</option>
                <option value="INCOME">收入</option>
              </KrField>
            </Col>
          </Row>
          <Row>
            <Col md={12} > <KrField name="ordernum" type="text" label="排序号" /> </Col>
          </Row>
          <Row>
            <Col md={4} > 
                <KrField name="enableflag" label="是否启用" type="radio"/>
             </Col>
             <Col md={4} > 
                <KrField name="enableflag" label="是" type="radio"  value="ENABLE"/>
             </Col>
             <Col md={4} > 
                <KrField name="enableflag" label="否" type="radio" value="DISENABLE"/>
             </Col>
          </Row>
          <Row>
            <Col md={12} > <KrField name="propdesc" type="textarea" label="描述"  placeholder="备注信息"/> </Col>
          </Row>

          <Row style={{marginTop:30}}>
            <Col md={8}></Col>
            <Col md={2}> <RaisedButton  label="确定" type="submit" primary={true} /> </Col>
            <Col md={2}> <RaisedButton  label="取消" type="button"  onTouchTap={this.openCreateDialog} /> </Col>
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


export default connect((state)=>{

  return {
    items:state.common.findFinaFinaflowPropertyList,
  };

})(OrderCreate);






