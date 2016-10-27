import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {Binder} from 'react-binding';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
  Form,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  KrField,
  Grid,
  Row,
  Col,
  Button,
  Notify,
  Date,
} from 'kr-ui';

class SelectStationForm  extends Component{

  static PropTypes = {
    searchParams:React.PropTypes.object,
    onSubmit:React.PropTypes.func,
    onCancel:React.PropTypes.func,
  }

  constructor(props,context){
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);

    this.onSelect = this.onSelect.bind(this);
    this.getLoadData = this.getLoadData.bind(this);
    this.setReduceStartDate = this.setReduceStartDate.bind(this);
    this.deleteCommen = this.deleteCommen.bind(this);
    this.state = {
      stationVos:[],
      selected:[]
    }
  }

  componentDidMount(){
    
    this.getLoadData();
  }

  setReduceStartDate(dateValue){
    dateValue = dateFormat(dateValue,"yyyy-mm-dd h:MM:ss");

    let {stationVos} = this.state;

    stationVos = stationVos.map(function(item,index){
        item.startDate = dateValue;
        return item;
    });
    this.setState({
        stationVos
    });

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.changeValues && nextProps.changeValues.startDate){
        this.setReduceStartDate(nextProps.changeValues.startDate);
    }

  }

  getLoadData(){
    var _this  = this;
    //let {params} = this.props;
    let params = {};
    params.orderId = 3;
    Store.dispatch(Actions.callAPI('getStationOrSettingList',{mainbillid:params.orderId})).then(function(response){
      _this.setState({
        stationVos:response
      });
    }).catch(function(err){
      Notify.show([{
        message:'后台出错请联系管理员',
        type: 'danger',
      }]);
      });
  }

  onSelect(selected){
    this.setState({
      selected
    });
  }

  onSubmit(){
    var commen = this.deleteCommen();
    console.log(this.state, commen);
    let {stationVos,selected} = this.state;
    let {changeValues} = this.props;
    stationVos = stationVos.filter(function(item,index){
      if(!item.startDate){
        Notify.show([{
            message:'请选择续租结束日期',
            type: 'danger',
          }]);
          return false;
      }
      if(commen === 'false'){
        Notify.show([{
            message:'请选择相同日期',
            type: 'danger',
          }]);
          return false;
      }
        item.leaseEndDate = item.startDate;
        if(selected.indexOf(index) !==-1){
          return true;
        }
        return false;
    });
    const {onSubmit} = this.props;
    onSubmit && onSubmit(stationVos);

  }
    deleteCommen(){
      var commen;
      let {stationVos,selected} = this.state;
     var item = stationVos.filter(function(item,index){
        if(selected.indexOf(index) !==-1){
          return true;
        }
        return false;
      });
     var date = item[0].leaseEndDate;
       item.map(function(value){
        if(value.leaseEndDate !== date){
          commen =  'false';
        }
       });
       return commen;
    }

  onCancel(){
    const {onCancel} = this.props;
    onCancel  && onCancel();
  }

  render(){

    let { error, handleSubmit, pristine, reset, submitting,changeValues} = this.props;
    let {stationVos} = this.state;

    return (
      <div>
<form onSubmit={handleSubmit(this.onSubmit)}>
      <KrField grid={1/1}  name="startDate" component="date" label="续租结束日期" />
      <Table onSelect={this.onSelect}>
        <TableHeader>
          <TableHeaderColumn>类别</TableHeaderColumn>
          <TableHeaderColumn>编号／名称</TableHeaderColumn>
          <TableHeaderColumn>单价（元／月）</TableHeaderColumn>
          <TableHeaderColumn>楼层</TableHeaderColumn>
          <TableHeaderColumn>起始日期</TableHeaderColumn>
          <TableHeaderColumn>结束日期</TableHeaderColumn>
          <TableHeaderColumn>续租结束日期</TableHeaderColumn>
      </TableHeader>
      <TableBody>
      {stationVos && stationVos.map((item,index)=>{
        return (
          <TableRow key={index}>
          <TableRowColumn >{item.stationType}</TableRowColumn>
          <TableRowColumn >{item.stationId}</TableRowColumn>
          <TableRowColumn >{item.unitprice}</TableRowColumn>
          <TableRowColumn >{item.whereFloor}</TableRowColumn>
          <TableRowColumn ><Date.Format value={item.leaseBeginDate}/></TableRowColumn>
          <TableRowColumn ><Date.Format value={item.leaseEndDate}/></TableRowColumn>
          <TableRowColumn>{item.startDate}</TableRowColumn>
         </TableRow>
        );
      })}
      </TableBody>
      </Table>
      <Grid>
      <Row style={{marginTop:30}}>
      <Col md={2} align="right"> <Button  label="确定" type="submit" primary={true}/> </Col>
      <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
      </Grid>
</form>
      </div>);
  }
}

const selector = formValueSelector('selectStationForm');
export default connect((state)=>{
  let changeValues = {};
  changeValues.startDate = selector(state,'startDate');
  return {
    changeValues
  }

})(reduxForm({ form: 'selectStationForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(SelectStationForm));